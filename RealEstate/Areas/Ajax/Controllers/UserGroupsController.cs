using System.Web.Mvc;
using Repository.UsersModel;
using Repository.UserGroupsModel;

namespace RealEstate.Areas.Ajax.Controllers
{
    public class UserGroupsController : Controller
    {
        UserGroups model = new UserGroups();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Users"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] UserGroups kullanici)
        {
            if (!curUser.HasRight("Users", "i"))
                return Json(null);

            bool result = model.Insert(kullanici);

            if (result)
            {
                curUser.Log(kullanici, "i", "Kullan�c� Gruplar�");

                return Json(kullanici);
            }
            else
                kullanici.Mesaj = "Kay�t eklenemedi.";

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
        public JsonResult Update([System.Web.Http.FromBody] UserGroups kullanici)
        {
            if (!curUser.HasRight("Users", "u"))
                return Json(null);

            bool result = model.Update(kullanici);

            if (result)
            {
                curUser.Log(kullanici, "u", "Kullan�c� Gruplar�");

                return Json(kullanici);
            }
            else
                kullanici.Mesaj = "Kay�t d�zenlenemedi.";

            kullanici = (UserGroups)model.Update(kullanici.ID, kullanici);

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
                curUser.Log(id, "d", "Kullan�c� Gruplar�");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }
    }
}
