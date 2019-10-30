using System.Web.Mvc;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
	public class FuelTypeTController : Controller
	{
		readonly YakitTipiDil model = new YakitTipiDil();

		[HttpGet]
		public JsonResult Index(int? id)
		{
			return Json(model.List(id, null, false), JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult Insert()
		{
			return Json(model.Insert(), JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult Insert([System.Web.Http.FromBody] YakitTipiDil table)
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

			table = (YakitTipiDil)model.Insert(table, table.FuelTypeID, table.TransID);

			return Json(table);
		}

		[HttpGet]
		public JsonResult Update(int? id)
		{
			return Json(model.Update(id), JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult Update([System.Web.Http.FromBody] YakitTipiDil table)
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

			table = (YakitTipiDil)model.Update(table.ID, table);

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
