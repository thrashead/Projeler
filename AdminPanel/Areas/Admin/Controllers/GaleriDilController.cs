using System.Web.Mvc;
using TDLibrary;
using Repository.KullanicilarModel;
using Repository.GaleriDilModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class GaleriDilController : Controller
    {
        GaleriDil table = new GaleriDil();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Galeri"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle(string galID)
        {
            if (!curUser.HasRight("Galeri", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            int linkID = galID == null ? 0 : galID.ToInteger();

            return View(table.Insert(linkID));
        }

        [HttpPost]
        public ActionResult Ekle(GaleriDil galeri)
        {
            if (!curUser.HasRight("Galeri", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid && galeri.GalID > 0)
            {
                bool result = table.Insert(galeri);

                if (result)
                {
                    curUser.Log(galeri, "i", "Galeriler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    galeri.Mesaj = "Kayýt eklenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                galeri.Mesaj = "Model uygun deðil.";

            galeri = (GaleriDil)table.Insert(galeri.GalID, galeri.TransID, galeri);

            return View("Ekle", galeri);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Galeri", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.Update(id));
        }

        [HttpPost]
        public ActionResult Duzenle(GaleriDil galeri)
        {
            if (!curUser.HasRight("Galeri", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Update(galeri);

                if (result)
                {
                    curUser.Log(galeri, "u", "Galeriler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    galeri.Mesaj = "Kayýt düzenlenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                galeri.Mesaj = "Model uygun deðil.";

            galeri = (GaleriDil)table.Update(galeri.ID, galeri);

            return View("Duzenle", galeri);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            if (curUser.HasRight("Galeri", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Galeriler (Dil)");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kaldir(int id)
        {
            if (curUser.HasRight("Galeri", "r"))
            {
                bool result = table.Remove(id);

                if (result)
                {
                    curUser.Log(id, "r", "Galeriler (Dil)");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
