using System.Web.Mvc;
using Repository.MetaModel;
using Repository.UsersModel;

namespace HumanResources.Areas.Ajax.Controllers
{
	public class MetaController : Controller
	{
		readonly Meta model = new Meta();
		readonly Users curUser = AppTools.User;

		[HttpGet]
		public JsonResult Index(int? id)
		{
			if (!curUser.HasRight("Meta"))
				return Json(null, JsonRequestBehavior.AllowGet);

			return Json(model.List(id, null, false), JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult Insert([System.Web.Http.FromBody] Meta table)
		{
			if (!curUser.HasRight("Meta", "i"))
				return Json(null);

			bool result = model.Insert(table);

			if (result)
			{
				curUser.Log(table, "i", "Meta");

				return Json(table);
			}
			else
			{
				table.Mesaj = "Kayıt eklenemedi.";
			}

			table = (Meta)model.Insert(table, null);

			return Json(table);
		}

		[HttpGet]
		public JsonResult Update(int? id)
		{
			if (!curUser.HasRight("Meta", "u"))
				return Json(null, JsonRequestBehavior.AllowGet);

			return Json(model.Update(id), JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult Update([System.Web.Http.FromBody] Meta table)
		{
			if (!curUser.HasRight("Meta", "u"))
				return Json(null);

			bool result = model.Update(table);

			if (result)
			{
				curUser.Log(table, "u", "Meta");

				return Json(table);
			}
			else
			{
				table.Mesaj = "Kayıt düzenlenemedi.";
			}

			table = (Meta)model.Update(table.ID, table);

			return Json(table);
		}

		[HttpGet]
		public JsonResult Copy(int id)
		{
			if (!curUser.HasRight("Meta", "c"))
				return Json(false, JsonRequestBehavior.AllowGet);

			bool result = model.Copy(id);

			if (result)
			{
				curUser.Log(id, "c", "Meta");

				return Json(true, JsonRequestBehavior.AllowGet);
			}

			return Json(false, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult Delete(int? id)
		{
			if (!curUser.HasRight("Meta", "d"))
				return Json(false, JsonRequestBehavior.AllowGet);

			bool result = model.Delete(id);

			if (result)
			{
				curUser.Log(id, "d", "Meta");

				return Json(true, JsonRequestBehavior.AllowGet);
			}

			return Json(false, JsonRequestBehavior.AllowGet);
		}
	}
}
