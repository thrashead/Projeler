using System.Web.Mvc;
using Repository.TypesModel;
using Repository.UsersModel;

namespace HumanResources.Areas.Ajax.Controllers
{
	public class TypesController : Controller
	{
		readonly Types model = new Types();
		readonly Users curUser = AppTools.User;

		[HttpGet]
		public JsonResult Index(int? id)
		{
			if (!curUser.HasRight("Types"))
				return Json(null, JsonRequestBehavior.AllowGet);

			return Json(model.List(id, null, false), JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult Insert([System.Web.Http.FromBody] Types table)
		{
			if (!curUser.HasRight("Types", "i"))
				return Json(null);

			bool result = model.Insert(table);

			if (result)
			{
				curUser.Log(table, "i", "Tip");

				return Json(table);
			}
			else
			{
				table.Mesaj = "Kayıt eklenemedi.";
			}

			table = (Types)model.Insert(table, null);

			return Json(table);
		}

		[HttpGet]
		public JsonResult Update(int? id)
		{
			if (!curUser.HasRight("Types", "u"))
				return Json(null, JsonRequestBehavior.AllowGet);

			return Json(model.Update(id), JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult Update([System.Web.Http.FromBody] Types table)
		{
			if (!curUser.HasRight("Types", "u"))
				return Json(null);

			bool result = model.Update(table);

			if (result)
			{
				curUser.Log(table, "u", "Tip");

				return Json(table);
			}
			else
			{
				table.Mesaj = "Kayıt düzenlenemedi.";
			}

			table = (Types)model.Update(table.ID, table);

			return Json(table);
		}

		[HttpGet]
		public JsonResult Copy(int id)
		{
			if (!curUser.HasRight("Types", "c"))
				return Json(false, JsonRequestBehavior.AllowGet);

			bool result = model.Copy(id);

			if (result)
			{
				curUser.Log(id, "c", "Tip");

				return Json(true, JsonRequestBehavior.AllowGet);
			}

			return Json(false, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult Delete(int? id)
		{
			if (!curUser.HasRight("Types", "d"))
				return Json(false, JsonRequestBehavior.AllowGet);

			bool result = model.Delete(id);

			if (result)
			{
				curUser.Log(id, "d", "Tip");

				return Json(true, JsonRequestBehavior.AllowGet);
			}

			return Json(false, JsonRequestBehavior.AllowGet);
		}
	}
}
