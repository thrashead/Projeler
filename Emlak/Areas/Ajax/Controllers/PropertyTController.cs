using System.Web.Mvc;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
	public class PropertyTController : Controller
	{
		readonly EmlakYeniDil model = new EmlakYeniDil();
        readonly Kullanicilar curUser = AppTools.User;

        [HttpGet]
		public JsonResult Index(int? id)
		{
            if (!curUser.HasRight("Website"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(id, null, false), JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult Insert()
		{
            if (!curUser.HasRight("Website", "i"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Insert(), JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult Insert([System.Web.Http.FromBody] EmlakYeniDil table)
		{
            if (!curUser.HasRight("Website", "i"))
                return Json(null);

            bool result = model.Insert(table);

			if (result)
			{
                curUser.Log(table, "i", "Emlaklar (Dil)");

                return Json(table);
			}
			else
			{
				table.Mesaj = "Kayıt eklenemedi.";
			}

			table = (EmlakYeniDil)model.Insert(table, table.PropID, table.TransID);

			return Json(table);
		}

		[HttpGet]
		public JsonResult Update(int? id)
		{
            if (!curUser.HasRight("Website", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Update(id), JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult Update([System.Web.Http.FromBody] EmlakYeniDil table)
		{
            if (!curUser.HasRight("Website", "u"))
                return Json(null);

            bool result = model.Update(table);

			if (result)
			{
                curUser.Log(table, "u", "Emlaklar (Dil)");

                return Json(table);
			}
			else
			{
				table.Mesaj = "Kayıt düzenlenemedi.";
			}

			table = (EmlakYeniDil)model.Update(table.ID, table);

			return Json(table);
		}

		[HttpGet]
		public JsonResult Copy(int id)
		{
            if (!curUser.HasRight("Website", "c"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Copy(id);

			if (result)
			{
                curUser.Log(id, "c", "Emlaklar (Dil)");

                return Json(true, JsonRequestBehavior.AllowGet);
			}

			return Json(false, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult Delete(int? id)
		{
            if (!curUser.HasRight("Website", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Delete(id);

			if (result)
			{
                curUser.Log(id, "d", "Emlaklar (Dil)");

                return Json(true, JsonRequestBehavior.AllowGet);
			}

			return Json(false, JsonRequestBehavior.AllowGet);
		}
	}
}
