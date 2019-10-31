using System.Web.Mvc;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
	public class PropertyController : Controller
	{
		readonly EmlakYeni model = new EmlakYeni();
        readonly Kullanicilar curUser = AppTools.User;

        [HttpGet]
		public JsonResult Index(int? id)
		{
            if (!curUser.HasRight("Website"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(id, null, false), JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult Insert([System.Web.Http.FromBody] EmlakYeni table)
		{
            if (!curUser.HasRight("Website", "i"))
                return Json(null);

            bool result = model.Insert(table);

			if (result)
			{
                curUser.Log(table, "i", "Emlaklar");

                return Json(table);
			}
			else
			{
				table.Mesaj = "Kayıt eklenemedi.";
			}

			table = (EmlakYeni)model.Insert(table, null);

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
		public JsonResult Update([System.Web.Http.FromBody] EmlakYeni table)
		{
            if (!curUser.HasRight("Website", "u"))
                return Json(null);

            bool result = model.Update(table);

			if (result)
			{
                curUser.Log(table, "u", "Emlaklar");

                return Json(table);
			}
			else
			{
				table.Mesaj = "Kayıt düzenlenemedi.";
			}

			table = (EmlakYeni)model.Update(table.ID, table);

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
                curUser.Log(id, "c", "Emlaklar");

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
                curUser.Log(id, "d", "Emlaklar");

                return Json(true, JsonRequestBehavior.AllowGet);
			}

			return Json(false, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult Remove(int? id)
		{
            if (!curUser.HasRight("Website", "r"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Remove(id);

			if (result)
			{
                curUser.Log(id, "r", "Emlaklar");

                return Json(true, JsonRequestBehavior.AllowGet);
			}

			return Json(false, JsonRequestBehavior.AllowGet);
		}
	}
}
