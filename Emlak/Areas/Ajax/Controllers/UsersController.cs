using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class UsersController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Users"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_UsersDetailSelect_Result> kullanici = entity.usp_UsersDetailSelect(null).ToList();

            return Json(kullanici, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] Kullanicilar kullanici)
        {
            if (!curUser.HasRight("Users", "i"))
                return Json(null);

            kullanici.Password = kullanici.Password.ToMD5();

            var result = entity.usp_UsersInsert(null, kullanici.Username, kullanici.Password, kullanici.Active, null).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(kullanici, "i", "Kullanýcýlar");

                return Json(kullanici);
            }
            else
                kullanici.Mesaj = "Kayýt eklenemedi. Ayný isimde baþka bir kullanýcý olabilir.";

            List<UserGroups> tableUserGroups = entity.UserGroups.ToList();
            kullanici.UserGroupsList = tableUserGroups.ToSelectList("ID", "Name", kullanici.GroupID);

            return Json(kullanici);
        }

        [HttpGet]
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("Users", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_UsersSelectTop_Result table = entity.usp_UsersSelectTop(id, 1).FirstOrDefault();

            Kullanicilar kullanici = table.ChangeModel<Kullanicilar>();

            kullanici.Password = "";

            List<UserGroups> tableUserGroups = entity.UserGroups.ToList();
            kullanici.UserGroupsList = tableUserGroups.ToSelectList("ID", "Name", kullanici.GroupID);

            return Json(kullanici, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] Kullanicilar kullanici)
        {
            if (!curUser.HasRight("Users", "u"))
                return Json(null);

            if (curUser?.ID == kullanici.ID)
            {
                string password = kullanici.Password == null ? entity.usp_UsersOldPasswordSelect(kullanici.ID).FirstOrDefault() : kullanici.Password.ToMD5();

                kullanici.Password = password;

                if (curUser.ID == kullanici.ID)
                    kullanici.Active = true;

                var result = entity.usp_UsersUpdate(kullanici.ID, kullanici.Username, kullanici.Password, kullanici.Active, null).FirstOrDefault();

                if (result != null)
                {
                    curUser.Log(kullanici, "u", "Kullanýcýlar");

                    if (curUser.ID == kullanici.ID)
                        Session["CurrentUser"] = entity.usp_UsersSelectTop(kullanici.ID, 1).FirstOrDefault().ChangeModel<Users>();

                    return Json(kullanici);
                }
                else
                    kullanici.Mesaj = "Kayýt düzenlenemedi. Ayný isimde baþka bir kullanýcý olabilir.";

                kullanici.Password = "";

                List<UserGroups> tableUserGroups = entity.UserGroups.ToList();
                kullanici.UserGroupsList = tableUserGroups.ToSelectList("ID", "Name", kullanici.GroupID);

                return Json(kullanici);
            }
            else
            {
                kullanici.Mesaj = "Sadece kendi kullanýcý bilgilerinizi düzenleyebilirsiniz.";
                return Json(kullanici);
            }
        }

        [HttpGet]
        public JsonResult GrupDegistir(int id)
        {
            if (!curUser.HasRight("Users", "cg"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_UsersSelectTop_Result table = entity.usp_UsersSelectTop(id, 1).FirstOrDefault();

            Kullanicilar kullanici = table.ChangeModel<Kullanicilar>();

            List<UserGroups> tableUserGroups = entity.UserGroups.ToList();
            kullanici.UserGroupsList = tableUserGroups.ToSelectList("ID", "Name", kullanici.GroupID);

            return Json(kullanici, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GrupDegistir([System.Web.Http.FromBody] Kullanicilar kullanici)
        {
            if (!curUser.HasRight("Users", "cg"))
                return Json(null);

            try
            {
                var result = entity.usp_UsersGroupUpdate(kullanici.ID, kullanici.GroupID);

                if (result != null)
                {
                    curUser.Log(kullanici, "cg", "Kullanýcýlar");

                    return Json(kullanici);
                }
                else
                    kullanici.Mesaj = "Grup deðiþtirilemedi.";
            }
            catch
            {
                kullanici.Mesaj = "Grup deðiþtirilemedi.";
            }

            List<UserGroups> tableUserGroups = entity.UserGroups.ToList();
            kullanici.UserGroupsList = tableUserGroups.ToSelectList("ID", "Name", kullanici.GroupID);

            return Json(kullanici);
        }

        [HttpGet]
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("Users", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                if (curUser?.ID != id)
                {
                    entity.usp_UsersCheckDelete(id);

                    curUser.Log(id, "d", "Kullanýcýlar");

                    return Json(true, JsonRequestBehavior.AllowGet);
                }
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Remove(int id)
        {
            if (!curUser.HasRight("Users", "r"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                if (curUser?.ID != id)
                {
                    entity.usp_UsersSetDeleted(id);

                    curUser.Log(id, "r", "Kullanýcýlar");

                    return Json(true, JsonRequestBehavior.AllowGet);
                }
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }
    }
}
