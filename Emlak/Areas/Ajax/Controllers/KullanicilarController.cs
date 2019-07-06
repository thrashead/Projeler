using System;
using System.Globalization;
using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class KullanicilarController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Kullanicilar"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_UsersDetailSelect_Result> kullanici = entity.usp_UsersDetailSelect(null).ToList();

            curUser.Log<Kullanicilar>(null, "s", "Kullan�c�lar");

            return Json(kullanici, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Ekle([System.Web.Http.FromBody] Kullanicilar kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "i"))
                return Json(null);

            kullanici.Password = kullanici.Password.ToMD5();

            var result = entity.usp_UsersInsert(null, kullanici.Username, kullanici.Password, kullanici.Active, null).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(kullanici, "i", "Kullan�c�lar");

                return Json(kullanici);
            }
            else
                kullanici.Mesaj = "Kay�t eklenemedi. Ayn� isimde ba�ka bir kullan�c� olabilir.";

            List<UserGroups> tableUserGroups = entity.UserGroups.ToList();
            kullanici.UserGroupsList = tableUserGroups.ToSelectList("ID", "Name", kullanici.GroupID);

            return Json(kullanici);
        }

        [HttpGet]
        public JsonResult Duzenle(int id)
        {
            if (!curUser.HasRight("Kullanicilar", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_UsersSelectTop_Result table = entity.usp_UsersSelectTop(id, 1).FirstOrDefault();

            Kullanicilar kullanici = table.ChangeModel<Kullanicilar>();

            kullanici.Password = "";

            List<UserGroups> tableUserGroups = entity.UserGroups.ToList();
            kullanici.UserGroupsList = tableUserGroups.ToSelectList("ID", "Name", kullanici.GroupID);

            return Json(kullanici, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Duzenle([System.Web.Http.FromBody] Kullanicilar kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "u"))
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
                    curUser.Log(kullanici, "u", "Kullan�c�lar");

                    if (curUser.ID == kullanici.ID)
                        Session["CurrentUser"] = entity.usp_UsersSelectTop(kullanici.ID, 1).FirstOrDefault().ChangeModel<Users>();

                    return Json(kullanici);
                }
                else
                    kullanici.Mesaj = "Kay�t d�zenlenemedi. Ayn� isimde ba�ka bir kullan�c� olabilir.";

                kullanici.Password = "";

                List<UserGroups> tableUserGroups = entity.UserGroups.ToList();
                kullanici.UserGroupsList = tableUserGroups.ToSelectList("ID", "Name", kullanici.GroupID);

                return Json(kullanici);
            }
            else
            {
                kullanici.Mesaj = "Sadece kendi kullan�c� bilgilerinizi d�zenleyebilirsiniz.";
                return Json(kullanici);
            }
        }

        [HttpGet]
        public JsonResult GrupDegistir(int id)
        {
            if (!curUser.HasRight("Kullanicilar", "cg"))
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
            if (!curUser.HasRight("Kullanicilar", "cg"))
                return Json(null);

            try
            {
                var result = entity.usp_UsersGroupUpdate(kullanici.ID, kullanici.GroupID);

                if (result != null)
                {
                    curUser.Log(kullanici, "cg", "Kullan�c�lar");

                    return Json(kullanici);
                }
                else
                    kullanici.Mesaj = "Grup de�i�tirilemedi.";
            }
            catch
            {
                kullanici.Mesaj = "Grup de�i�tirilemedi.";
            }

            List<UserGroups> tableUserGroups = entity.UserGroups.ToList();
            kullanici.UserGroupsList = tableUserGroups.ToSelectList("ID", "Name", kullanici.GroupID);

            return Json(kullanici);
        }

        [HttpGet]
        public JsonResult Sil(int id)
        {
            if (!curUser.HasRight("Kullanicilar", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                if (curUser?.ID != id)
                {
                    entity.usp_UsersSetDeleted(id);

                    curUser.Log(id, "d", "Kullan�c�lar");

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
        public JsonResult Kaldir(int id)
        {
            if (!curUser.HasRight("Kullanicilar", "rd"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                if (curUser?.ID != id)
                {
                    entity.usp_UsersCheckDelete(id);

                    curUser.Log(id, "rd", "Kullan�c�lar");

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
