using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Admin.Controllers
{
    public class KullanicilarController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Kullanicilar"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_UsersDetailSelect_Result> kullanici = entity.usp_UsersDetailSelect(null).ToList();

            curUser.Log<Kullanicilar>(null, "s", "Kullan�c�lar");

            return View(kullanici);
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("Kullanicilar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            Kullanicilar kullanici = new Kullanicilar();

            List<UserGroups> tableUserGroups = entity.UserGroups.ToList();
            kullanici.UserGroupsList = tableUserGroups.ToSelectList("ID", "Name");

            return View(kullanici);
        }

        [HttpPost]
        public ActionResult Ekle(Kullanicilar kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = entity.usp_UsersInsert(null, kullanici.Username, kullanici.Password.ToMD5(), kullanici.Active, null);

                if (result != null)
                {
                    curUser.Log(kullanici, "i", "Kullan�c�lar");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kay�t eklenemedi. Ayn� isimde ba�ka bir kullan�c� olabilir.";
            }
            else
                kullanici.Mesaj = "Model uygun de�il.";

            List<UserGroups> tableUserGroups = entity.UserGroups.ToList();
            kullanici.UserGroupsList = tableUserGroups.ToSelectList("ID", "Name", kullanici.GroupID);

            return View("Ekle", kullanici);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (curUser?.ID != id)
                if (!curUser.HasRight("Kullanicilar", "u"))
                    return RedirectToAction("AnaSayfa", "Giris");

            usp_UsersSelectTop_Result table = entity.usp_UsersSelectTop(id, 1).FirstOrDefault();
            Kullanicilar kullanici = table.ChangeModel<Kullanicilar>();

            kullanici.Password = "";

            List<UserGroups> tableUserGroups = entity.UserGroups.ToList();
            kullanici.UserGroupsList = tableUserGroups.ToSelectList("ID", "Name", kullanici.GroupID);

            return View(kullanici);
        }

        [HttpPost]
        public ActionResult Duzenle(Kullanicilar kullanici)
        {
            if (curUser?.ID != kullanici.ID)
                if (!curUser.HasRight("Kullanicilar", "u"))
                    return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                string password = kullanici.Password == null ? entity.usp_UsersOldPasswordSelect(kullanici.ID).FirstOrDefault() : kullanici.Password.ToMD5();

                if (curUser.ID == kullanici.ID)
                    kullanici.Active = true;

                var result = entity.usp_UsersUpdate(kullanici.ID, kullanici.Username, password, kullanici.Active, null);

                if (result != null)
                {
                    curUser.Log(kullanici, "u", "Kullan�c�lar");

                    if (curUser.ID == kullanici.ID)
                        Session["CurrentUser"] = entity.usp_UsersSelectTop(kullanici.ID, 1).FirstOrDefault().ChangeModel<Users>();

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kay�t d�zenlenemedi. Ayn� isimde ba�ka bir kullan�c� olabilir.";
            }
            else
                kullanici.Mesaj = "Model uygun de�il.";

            kullanici.Password = "";

            List<UserGroups> tableUserGroups = entity.UserGroups.ToList();
            kullanici.UserGroupsList = tableUserGroups.ToSelectList("ID", "Name", kullanici.GroupID);

            return View("Duzenle", kullanici);
        }

        [HttpGet]
        public ActionResult GrupDegistir(int id)
        {
            if (!curUser.HasRight("Kullanicilar", "cg"))
                return RedirectToAction("AnaSayfa", "Giris");

            usp_UsersSelectTop_Result table = entity.usp_UsersSelectTop(id, 1).FirstOrDefault();

            Kullanicilar kullanici = table.ChangeModel<Kullanicilar>();

            List<UserGroups> tableUserGroups = entity.UserGroups.ToList();
            kullanici.UserGroupsList = tableUserGroups.ToSelectList("ID", "Name", kullanici.GroupID);

            return View(kullanici);
        }

        [HttpPost]
        public ActionResult GrupDegistir(Kullanicilar kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "cg"))
                return RedirectToAction("AnaSayfa", "Giris");

            try
            {
                var result = entity.usp_UsersGroupUpdate(kullanici.ID, kullanici.GroupID);

                if (result != null)
                {
                    curUser.Log(kullanici, "cg", "Kullan�c�lar");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Grup de�i�tirilemedi.";
            }
            catch
            {
                kullanici.Mesaj = "Model uygun de�il.";
            }

            List<UserGroups> tableUserGroups = entity.UserGroups.ToList();
            kullanici.UserGroupsList = tableUserGroups.ToSelectList("ID", "Name", kullanici.GroupID);

            return View("GrupDegistir", kullanici);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            try
            {
                if (curUser.HasRight("Kullanicilar", "d"))
                {
                    if (curUser?.ID != id)
                    {
                        entity.usp_UsersSetDeleted(id);

                        curUser.Log(id, "d", "Kullan�c�lar");

                        return Json(true);
                    }
                }
                else
                {
                    return Json(false);
                }
            }
            catch
            {
                return Json(false);
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kaldir(int id)
        {
            try
            {
                if (curUser.HasRight("Kullanicilar", "rd"))
                {
                    if (curUser?.ID != id)
                    {
                        entity.usp_UsersCheckDelete(id);

                        curUser.Log(id, "rd", "Kullan�c�lar");

                        return Json(true);
                    }
                }
                else
                {
                    return Json(false);
                }
            }
            catch
            {
                return Json(false);
            }

            return Json(false);
        }
    }
}
