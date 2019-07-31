using System.Web.Mvc;
using Repository.KullanicilarModel;
using Repository.KullaniciGrupIslemModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class KullaniciGrupIslemController : Controller
    {
        KullaniciGrupIslem table = new KullaniciGrupIslem();
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

            return View(table);
        }

        [HttpPost]
        public ActionResult Ekle(KullaniciGrupIslem kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Insert(kullanici);

                if (result)
                {
                    curUser.Log(kullanici, "i", "Kullan�c� Grup ��lemleri");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kay�t eklenemedi.";
            }
            else
                kullanici.Mesaj = "Model uygun de�il.";

            return View("Ekle", kullanici);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Kullanicilar", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.Select(id));
        }

        [HttpPost]
        public ActionResult Duzenle(KullaniciGrupIslem kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Update(kullanici);

                if (result)
                {
                    curUser.Log(kullanici, "u", "Kullan�c� Grup ��lemleri");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kay�t d�zenlenemedi.";
            }
            else
                kullanici.Mesaj = "Model uygun de�il.";

            return View("Duzenle", kullanici);
        }

        public JsonResult Sil(int id)
        {
            if (curUser.HasRight("Kullanicilar", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Kullan�c� Grup ��lemleri");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
