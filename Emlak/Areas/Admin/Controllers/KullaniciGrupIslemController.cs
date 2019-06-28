using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Admin.Controllers
{
    public class KullaniciGrupIslemController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Kullanicilar"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_UserGroupProcessSelect_Result> kullanici = entity.usp_UserGroupProcessSelect(null).ToList();

            curUser.Log<KullaniciGrupIslem>(null, "s", "Kullanýcý Grup Ýþlemleri");

            return View(kullanici);
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("Kullanicilar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            KullaniciGrupIslem kullanici = new KullaniciGrupIslem();

            return View(kullanici);
        }

        [HttpPost]
        public ActionResult Ekle(KullaniciGrupIslem kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = entity.usp_UserGroupProcessInsert(kullanici.Name, kullanici.ShortName, kullanici.Description);

                if (result != null)
                {
                    curUser.Log(kullanici, "i", "Kullanýcý Grup Ýþlemleri");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kayýt eklenemedi.";
            }
            else
                kullanici.Mesaj = "Model uygun deðil.";

            return View("Ekle", kullanici);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Kullanicilar", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            usp_UserGroupProcessSelectTop_Result table = entity.usp_UserGroupProcessSelectTop(id, 1).FirstOrDefault();

            KullaniciGrupIslem kullanici = table.ChangeModel<KullaniciGrupIslem>();

            return View(kullanici);
        }

        [HttpPost]
        public ActionResult Duzenle(KullaniciGrupIslem kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = entity.usp_UserGroupProcessUpdate(kullanici.ID, kullanici.Name, kullanici.ShortName, kullanici.Description);

                if (result != null)
                {
                    curUser.Log(kullanici, "u", "Kullanýcý Grup Ýþlemleri");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kayýt düzenlenemedi.";
            }
            else
                kullanici.Mesaj = "Model uygun deðil.";

            return View("Duzenle", kullanici);
        }

        public JsonResult Sil(int id)
        {
            try
            {
                if (curUser.HasRight("Kullanicilar", "d"))
                {
                    entity.usp_UserGroupProcessDelete(id);

                    curUser.Log(id, "rd", "Kullanýcý Grup Ýþlemleri");

                    return Json(true);
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
