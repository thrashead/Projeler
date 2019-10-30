using System.Web.Mvc;
using Repository.UsersModel;

namespace HumanResources.Areas.Ajax.Controllers
{
    public class UsersController : Controller
    {
        Users model = new Users();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Users"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] Users kullanici)
        {
            if (!curUser.HasRight("Users", "i"))
                return Json(null);

            bool result = model.Insert(kullanici);

            if (result)
            {
                curUser.Log(kullanici, "i", "Kullanıcılar");

                return Json(kullanici);
            }
            else
                kullanici.Mesaj = "Kayıt eklenemedi. Aynı isimde başka bir kullanıcı olabilir.";

            kullanici = (Users)model.Insert(kullanici.GroupID, kullanici);

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
        public JsonResult Update([System.Web.Http.FromBody] Users kullanici)
        {
            if (!curUser.HasRight("Users", "u"))
                return Json(null);

            if (curUser?.ID == kullanici.ID)
            {
                bool result = model.Update(kullanici, curUser.ID);

                if (result)
                {
                    curUser.Log(kullanici, "u", "Kullanıcılar");

                    return Json(kullanici);
                }
                else
                    kullanici.Mesaj = kullanici.Mesaj == null ? "Kayıt düzenlenemedi. Aynı isimde başka bir kullanıcı olabilir." : kullanici.Mesaj;
            }
            else
            {
                kullanici.Mesaj = "Sadece kendi kullanıcı bilgilerinizi düzenleyebilirsiniz.";
            }

            kullanici = (Users)model.Update(kullanici.ID, kullanici);

            return Json(kullanici);
        }

        [HttpGet]
        public JsonResult ChangeGroup(int id)
        {
            if (!curUser.HasRight("Users", "cg"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.ChangeGroup(id), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ChangeGroup([System.Web.Http.FromBody] Users kullanici)
        {
            if (!curUser.HasRight("Users", "cg"))
                return Json(null);

            try
            {
                bool result = model.ChangeGroup(kullanici);

                if (result)
                {
                    curUser.Log(kullanici, "cg", "Kullanıcılar");

                    return Json(kullanici);
                }
                else
                    kullanici.Mesaj = "Grup değiştirilemedi.";
            }
            catch
            {
                kullanici.Mesaj = "Grup değiştirilemedi.";
            }

            kullanici = (Users)model.ChangeGroup(kullanici.ID, kullanici);

            return Json(kullanici);
        }

        [HttpGet]
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("Users", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            if (curUser?.ID != id)
            {
                bool result = model.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Kullanıcılar");

                    return Json(true, JsonRequestBehavior.AllowGet);
                }
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Remove(int id)
        {
            if (!curUser.HasRight("Users", "r"))
                return Json(false, JsonRequestBehavior.AllowGet);

            if (curUser?.ID != id)
            {
                bool result = model.Remove(id);

                if (result)
                {
                    curUser.Log(id, "r", "Kullanıcılar");

                    return Json(true, JsonRequestBehavior.AllowGet);
                }
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }
    }
}
