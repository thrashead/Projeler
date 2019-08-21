using System.Web.Mvc;
using Repository.NoLangContentModel;

namespace RentACar.Areas.Ajax.Controllers
{
	public class NoLangContentController : Controller
	{
		readonly NoLangContent model = new NoLangContent();

		[HttpGet]
		public JsonResult Index(int? id)
		{
			return Json(model.List(id), JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult Insert([System.Web.Http.FromBody] NoLangContent table)
		{
			bool result = model.Insert(table);

			if (result)
			{
				return Json(table);
			}
			else
			{
				table.Mesaj = "Kayıt eklenemedi.";
			}

			table = (NoLangContent)model.Insert(table, null);

			return Json(table);
		}

		[HttpGet]
		public JsonResult Update(int? id)
		{
			return Json(model.Update(id), JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult Update([System.Web.Http.FromBody] NoLangContent table)
		{
			bool result = model.Update(table);

			if (result)
			{
				return Json(table);
			}
			else
			{
				table.Mesaj = "Kayıt düzenlenemedi.";
			}

			table = (NoLangContent)model.Update(table.ID, table);

			return Json(table);
		}

		[HttpGet]
		public JsonResult Copy(int id)
		{
			bool result = model.Copy(id);

			if (result)
			{
				return Json(true, JsonRequestBehavior.AllowGet);
			}

			return Json(false, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult Delete(int? id)
		{
			bool result = model.Delete(id);

			if (result)
			{
				return Json(true, JsonRequestBehavior.AllowGet);
			}

			return Json(false, JsonRequestBehavior.AllowGet);
		}
	}
}
