using System.Web.Mvc;
using Repository.VisitorsModel;
using Repository.UsersModel;

namespace HumanResources.Areas.Ajax.Controllers
{
	public class VisitorsController : Controller
	{
		readonly Visitors model = new Visitors();
		readonly Users curUser = AppTools.User;

		[HttpGet]
		public JsonResult Index(int? id)
		{
			if (!curUser.HasRight("Website"))
				return Json(null, JsonRequestBehavior.AllowGet);

			return Json(model.List(id, null, false), JsonRequestBehavior.AllowGet);
		}


		[HttpGet]
		public JsonResult Clear()
		{
			if (!curUser.HasRight("Website", "d"))
				return Json(false, JsonRequestBehavior.AllowGet);

			bool result = model.Clear();

			if (result)
			{
				curUser.Log<Visitors>(null, "t", "Ziyaretçi");

				return Json(true, JsonRequestBehavior.AllowGet);
			}

			return Json(false, JsonRequestBehavior.AllowGet);
		}
	}
}
