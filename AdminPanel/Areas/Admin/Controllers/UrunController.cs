using System.Web.Mvc;
using TDLibrary;
using Repository.KullanicilarModel;
using Repository.UrunModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class UrunController : Controller
    {
        Urun table = new Urun();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Urun"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("Urun", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table);
        }

        [HttpPost]
        public ActionResult Ekle(Urun urun)
        {
            if (!curUser.HasRight("Urun", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                urun.Url = urun.Title.ToUrl();

                bool result = table.Insert(urun);

                if (result)
                {
                    curUser.Log(urun, "i", "�r�nler");

                    return RedirectToAction("Index");
                }
                else
                    urun.Mesaj = "Kay�t eklenemedi.";
            }
            else
                urun.Mesaj = "Model uygun de�il.";

            return View("Ekle", urun);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Urun", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.Update(id));
        }

        [HttpPost]
        public ActionResult Duzenle(Urun urun)
        {
            if (!curUser.HasRight("Urun", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                urun.Url = urun.Title.ToUrl();

                bool result = table.Update(urun);

                if (result)
                {
                    curUser.Log(urun, "u", "�r�nler");

                    return RedirectToAction("Index");
                }
                else
                    urun.Mesaj = "Kay�t d�zenlenemedi.";
            }
            else
                urun.Mesaj = "Model uygun de�il.";

            urun = (Urun)table.Update(urun.ID, urun);

            return View("Duzenle", urun);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            if (curUser.HasRight("Urun", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "�r�nler");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kaldir(int id)
        {
            if (curUser.HasRight("Urun", "r"))
            {
                bool result = table.Remove(id);

                if (result)
                {
                    curUser.Log(id, "r", "�r�nler");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kopyala(int id)
        {
            if (curUser.HasRight("Urun", "c"))
            {
                bool result = table.Copy(id);

                if (result)
                {
                    curUser.Log(id, "c", "�r�nler");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
