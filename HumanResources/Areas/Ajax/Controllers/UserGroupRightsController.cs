using System.Web.Mvc;
using Repository.UsersModel;
using Repository.UserGroupRightsModel;

namespace HumanResources.Areas.Ajax.Controllers
{
    public class UserGroupRightsController : Controller
    {
        UserGroupRights model = new UserGroupRights();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Users"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Insert()
        {
            if (!curUser.HasRight("Users", "i"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Insert(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] UserGroupRights kullanici)
        {
            if (!curUser.HasRight("Users", "i"))
                return Json(null);

            bool result = model.Insert(kullanici);

            if (result)
            {
                curUser.Log(kullanici, "i", "Kullanýcý Grup Haklarý");

                return Json(kullanici);
            }
            else
                kullanici.Mesaj = "Kayýt eklenemedi veya bu þekilde bir Kullanýcý Hakký zaten eklenmiþ.";

            kullanici = (UserGroupRights)model.Insert(kullanici.UserGroupTableID, kullanici.UserGroupProcessID, kullanici);

            return Json(kullanici);
        }

        [HttpGet]
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("Users", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Update(id), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] UserGroupRights kullanici)
        {
            if (!curUser.HasRight("Users", "u"))
                return Json(null);

            bool result = model.Update(kullanici);

            if (result)
            {
                curUser.Log(kullanici, "u", "Kullanýcý Grup Haklarý");

                return Json(kullanici);
            }
            else
                kullanici.Mesaj = "Kayýt düzenlenemedi veya bu þekilde bir Kullanýcý Hakký zaten eklenmiþ.";

            kullanici = (UserGroupRights)model.Update(kullanici.ID, kullanici);

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
                curUser.Log(id, "d", "Kullanýcý Grup Haklarý");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }
    }
}
