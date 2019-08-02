using System.Web.Mvc;
using Repository.KullanicilarModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class KullanicilarController : Controller
    {
        Kullanicilar table = new Kullanicilar();
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
        public ActionResult Ekle(Kullanicilar kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Insert(kullanici);

                if (result)
                {
                    curUser.Log(kullanici, "i", "Kullan�c�lar");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kay�t eklenemedi. Ayn� isimde ba�ka bir kullan�c� olabilir.";
            }
            else
                kullanici.Mesaj = "Model uygun de�il.";

            kullanici = (Kullanicilar)table.Insert(kullanici.GroupID, kullanici);

            return View("Ekle", kullanici);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (curUser?.ID != id)
                if (!curUser.HasRight("Kullanicilar", "u"))
                    return RedirectToAction("AnaSayfa", "Giris");

            return View(table.Update(id));
        }

        [HttpPost]
        public ActionResult Duzenle(Kullanicilar kullanici)
        {
            if (curUser?.ID != kullanici.ID)
                if (!curUser.HasRight("Kullanicilar", "u"))
                    return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Update(kullanici);

                if (result)
                {
                    curUser.Log(kullanici, "u", "Kullan�c�lar");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kay�t d�zenlenemedi. Ayn� isimde ba�ka bir kullan�c� olabilir.";
            }
            else
                kullanici.Mesaj = "Model uygun de�il.";

            kullanici = (Kullanicilar)table.Update(kullanici.ID, kullanici);

            return View("Duzenle", kullanici);
        }

        [HttpGet]
        public ActionResult GrupDegistir(int id)
        {
            if (!curUser.HasRight("Kullanicilar", "cg"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.ChangeGroup(id));
        }

        [HttpPost]
        public ActionResult GrupDegistir(Kullanicilar kullanici)
        {
            if (!curUser.HasRight("Kullanicilar", "cg"))
                return RedirectToAction("AnaSayfa", "Giris");

            try
            {
                bool result = table.ChangeGroup(kullanici);

                if (result)
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

            kullanici = (Kullanicilar)table.ChangeGroup(kullanici.ID, kullanici);

            return View("GrupDegistir", kullanici);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            if (curUser.HasRight("Kullanicilar", "d"))
            {
                if (curUser?.ID != id)
                {
                    bool result = table.Delete(id);

                    if (result)
                    {
                        curUser.Log(id, "d", "Kullan�c�lar");

                        return Json(true);
                    }
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kaldir(int id)
        {
            if (curUser.HasRight("Kullanicilar", "r"))
            {
                if (curUser?.ID != id)
                {
                    bool result = table.Remove(id);

                    if (result)
                    {
                        curUser.Log(id, "r", "Kullan�c�lar");

                        return Json(true);
                    }
                }
            }

            return Json(false);
        }
    }
}
