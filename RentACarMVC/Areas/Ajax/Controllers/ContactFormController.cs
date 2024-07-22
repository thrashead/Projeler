using System.Web.Mvc;
using Repository.UsersModel;
using Repository.ContactFormModel;

namespace RentACarMVC.Areas.Ajax.Controllers
{
	public class ContactFormController : Controller
	{
		readonly ContactForm model = new ContactForm();
        readonly Users curUser = AppTools.User;

        [HttpGet]
		public JsonResult Index(int? id)
		{
            if (!curUser.HasRight("Website"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(id, null, false), JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult Insert([System.Web.Http.FromBody] ContactForm table)
		{
            if (!curUser.HasRight("Website", "i"))
                return Json(null);

            table.IPAddress = AppTools.GetIPAddress;

            bool result = model.Insert(table);

            if (result)
            {
                curUser.Log(table, "i", "İletişim Formu");

                return Json(table);
            }
            else
                table.Mesaj = "Kayıt eklenemedi.";

            table = (ContactForm)model.Insert(table, null);

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
		public JsonResult Update([System.Web.Http.FromBody] ContactForm table)
        {
            if (!curUser.HasRight("Website", "u"))
                return Json(null);

            table.IPAddress = AppTools.GetIPAddress;

            bool result = model.Update(table);

            if (result)
            {
                curUser.Log(table, "u", "İletişim Formu");

                return Json(table);
            }
            else
                table.Mesaj = "Kayıt düzenlenemedi.";

            table = (ContactForm)model.Update(table.ID, table);

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
                curUser.Log(id, "c", "İletişim Formu");

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
                curUser.Log(id, "d", "İletişim Formu");

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
                curUser.Log(id, "r", "İletişim Formu");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }
	}
}
