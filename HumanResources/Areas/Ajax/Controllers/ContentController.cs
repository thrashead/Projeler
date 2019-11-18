using System.Web.Mvc;
using Repository.ContentModel;
using Repository.UsersModel;

namespace HumanResources.Areas.Ajax.Controllers
{
	public class ContentController : Controller
	{
		readonly Content model = new Content();
		readonly Users curUser = AppTools.User;

		[HttpGet]
		public JsonResult Index(int? id)
		{
			if (!curUser.HasRight("Content"))
				return Json(null, JsonRequestBehavior.AllowGet);

			return Json(model.List(id, null, false), JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult Insert([System.Web.Http.FromBody] Content table)
		{
			if (!curUser.HasRight("Content", "i"))
				return Json(null);

			bool result = model.Insert(table);

			if (result)
			{
				curUser.Log(table, "i", "İçerik");

				return Json(table);
			}
			else
			{
				table.Mesaj = "Kayıt eklenemedi.";
			}

			table = (Content)model.Insert(table, null);

			return Json(table);
		}

		[HttpGet]
		public JsonResult Update(int? id)
		{
			if (!curUser.HasRight("Content", "u"))
				return Json(null, JsonRequestBehavior.AllowGet);

			return Json(model.Update(id), JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult Update([System.Web.Http.FromBody] Content table)
		{
			if (!curUser.HasRight("Content", "u"))
				return Json(null);

			bool result = model.Update(table);

			if (result)
			{
				curUser.Log(table, "u", "İçerik");

				return Json(table);
			}
			else
			{
				table.Mesaj = "Kayıt düzenlenemedi.";
			}

			table = (Content)model.Update(table.ID, table);

			return Json(table);
		}

		[HttpGet]
		public JsonResult Copy(int id)
		{
			if (!curUser.HasRight("Content", "c"))
				return Json(false, JsonRequestBehavior.AllowGet);

			bool result = model.Copy(id);

			if (result)
			{
				curUser.Log(id, "c", "İçerik");

				return Json(true, JsonRequestBehavior.AllowGet);
			}

			return Json(false, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult Delete(int? id)
		{
			if (!curUser.HasRight("Content", "d"))
				return Json(false, JsonRequestBehavior.AllowGet);

			bool result = model.Delete(id);

			if (result)
			{
				curUser.Log(id, "d", "İçerik");

				return Json(true, JsonRequestBehavior.AllowGet);
			}

			return Json(false, JsonRequestBehavior.AllowGet);
		}
	}
}
