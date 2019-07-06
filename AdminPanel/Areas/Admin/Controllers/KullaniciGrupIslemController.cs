using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Models;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class KullaniciGrupIslemController : Controller
    {
        readonly AdminPanelEntities _entity = new AdminPanelEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Kullanicilar"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_UserGroupProcessSelect_Result> kullanici = _entity.usp_UserGroupProcessSelect(null).ToList();

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
                var result = _entity.usp_UserGroupProcessInsert(kullanici.Name, kullanici.ShortName, kullanici.Description);

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

            usp_UserGroupProcessSelectTop_Result table = _entity.usp_UserGroupProcessSelectTop(id, 1).FirstOrDefault();

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
                var result = _entity.usp_UserGroupProcessUpdate(kullanici.ID, kullanici.Name, kullanici.ShortName, kullanici.Description);

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
                    _entity.usp_UserGroupProcessDelete(id);

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
