using System.Web.Mvc;
using Repository.UsersModel;
using Repository.UserGroupProcessModel;

namespace RentACar.Areas.Ajax.Controllers
{
    public class UserGroupProcessController : Controller
    {
        UserGroupProcess model = new UserGroupProcess();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Users"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] UserGroupProcess kullanici)
        {
            if (!curUser.HasRight("Users", "i"))
                return Json(null);

            bool result = model.Insert(kullanici);

            if (result)
            {
                curUser.Log(kullanici, "i", "Kullanýcý Grup Ýþlemleri");

                return Json(kullanici);
            }
            else
                kullanici.Mesaj = "Kayýt eklenemedi.";

            return Json(kullanici);
        }

        [HttpGet]
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("Users", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Select(id), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] UserGroupProcess kullanici)
        {
            if (!curUser.HasRight("Users", "u"))
                return Json(null);

            bool result = model.Update(kullanici);

            if (result)
            {
                curUser.Log(kullanici, "u", "Kullanýcý Grup Ýþlemleri");

                return Json(kullanici);
            }
            else
                kullanici.Mesaj = "Kayýt düzenlenemedi.";

            return Json(kullanici);
        }

        [HttpGet]
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("Users", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Delete(id);

            if (result)
            {
                curUser.Log(id, "d", "Kullanýcý Grup Ýþlemleri");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }
    }
}
