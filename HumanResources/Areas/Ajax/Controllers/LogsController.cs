using System.Web.Mvc;
using Repository.LogsModel;
using Repository.UsersModel;

namespace HumanResources.Areas.Ajax.Controllers
{
	public class LogsController : Controller
	{
		readonly Logs model = new Logs();
		readonly Users curUser = AppTools.User;

		[HttpGet]
		public JsonResult Index(int? id)
		{
			if (!curUser.HasRight("Logs"))
				return Json(null, JsonRequestBehavior.AllowGet);

			return Json(model.List(id, null, false), JsonRequestBehavior.AllowGet);
		}


		[HttpGet]
		public JsonResult Clear()
		{
			if (!curUser.HasRight("Logs", "d"))
				return Json(false, JsonRequestBehavior.AllowGet);

			bool result = model.Clear();

			if (result)
			{
				curUser.Log<Logs>(null, "t", "Log");

				return Json(true, JsonRequestBehavior.AllowGet);
			}

			return Json(false, JsonRequestBehavior.AllowGet);
		}
	}
}
