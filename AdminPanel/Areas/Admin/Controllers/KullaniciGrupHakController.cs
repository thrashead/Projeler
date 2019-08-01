using System.Web.Mvc;
using Repository.KullanicilarModel;
using Repository.KullaniciGrupHakModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class KullaniciGrupHakController : Controller
    {
        KullaniciGrupHak table = new KullaniciGrupHak();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Kullanicilar"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("Kullanicilar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");
            
            return View(table.Insert());
        }

        [HttpPost]
        public ActionResult Ekle(KullaniciGrupHak kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Insert(kullanici);

                if (result)
                {
                    curUser.Log(kullanici, "i", "Kullanýcý Grup Haklarý");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kayýt eklenemedi veya bu þekilde bir Kullanýcý Hakký zaten eklenmiþ.";
            }
            else
                kullanici.Mesaj = "Model uygun deðil.";

            kullanici = (KullaniciGrupHak)table.Insert(kullanici.UserGroupTableID, kullanici.UserGroupProcessID, kullanici);

            return View("Ekle", kullanici);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Kullanicilar", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.Update(id));
        }

        [HttpPost]
        public ActionResult Duzenle(KullaniciGrupHak kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Update(kullanici);

                if (result)
                {
                    curUser.Log(kullanici, "u", "Kullanýcý Grup Haklarý");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kayýt düzenlenemedi veya bu þekilde bir Kullanýcý Hakký zaten eklenmiþ.";
            }
            else
                kullanici.Mesaj = "Model uygun deðil.";

            kullanici = (KullaniciGrupHak)table.Update(kullanici.ID, kullanici);

            return View("Duzenle", kullanici);
        }

        public JsonResult Sil(int id)
        {
            if (curUser.HasRight("Kullanicilar", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Kullanýcý Grup Haklarý");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
