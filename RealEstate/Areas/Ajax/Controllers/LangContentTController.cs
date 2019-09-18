using System.Web.Mvc;
using Repository.UsersModel;
using Repository.LangContentTModel;

namespace RealEstate.Areas.Ajax.Controllers
{
	public class LangContentTController : Controller
	{
		readonly LangContentT model = new LangContentT();
        readonly Users curUser = AppTools.User;

        [HttpGet]
		public JsonResult Index(int? id)
        {
            if (!curUser.HasRight("Website"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(id), JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult Insert(int? linkID)
        {
            if (!curUser.HasRight("Website", "i"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Insert(null, null, linkID), JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult Insert([System.Web.Http.FromBody] LangContentT table)
        {
            if (!curUser.HasRight("Website", "i"))
                return Json(null);

            bool result = model.Insert(table);

			if (result)
				return Json(table);
			else
				table.Mesaj = "Kayıt eklenemedi.";

			table = (LangContentT)model.Insert(table, table.TransID, table.LangContentID);

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
		public JsonResult Update([System.Web.Http.FromBody] LangContentT table)
        {
            if (!curUser.HasRight("Website", "u"))
                return Json(null);

            bool result = model.Update(table);

			if (result)
				return Json(table);
			else
				table.Mesaj = "Kayıt düzenlenemedi.";

			table = (LangContentT)model.Update(table.ID, table);

			return Json(table);
		}

		[HttpGet]
		public JsonResult Copy(int id)
        {
            if (!curUser.HasRight("Website", "c"))
                return Json(false, JsonRequestBehavior.AllowGet);

            return Json(model.Copy(id), JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult Delete(int? id)
        {
            if (!curUser.HasRight("Website", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            return Json(model.Delete(id), JsonRequestBehavior.AllowGet);
		}
	}
}
