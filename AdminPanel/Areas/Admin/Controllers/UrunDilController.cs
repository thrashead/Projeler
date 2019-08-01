using System.Web.Mvc;
using TDLibrary;
using Repository.KullanicilarModel;
using Repository.UrunDilModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class UrunDilController : Controller
    {
        UrunDil table = new UrunDil();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Urun"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle(string prodID)
        {
            if (!curUser.HasRight("Urun", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            int linkID = prodID == null ? 0 : prodID.ToInteger();

            return View(table.Insert(linkID));
        }

        [HttpPost]
        public ActionResult Ekle(UrunDil urun)
        {
            if (!curUser.HasRight("Urun", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid && urun.ProdID > 0)
            {
                bool result = table.Insert(urun);

                if (result)
                {
                    curUser.Log(urun, "i", "Urunler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    urun.Mesaj = "Kayýt eklenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                urun.Mesaj = "Model uygun deðil.";

            urun = (UrunDil)table.Insert(urun.ProdID, urun.TransID, urun);

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
        public ActionResult Duzenle(UrunDil urun)
        {
            if (!curUser.HasRight("Urun", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Update(urun);

                if (result)
                {
                    curUser.Log(urun, "u", "Urunler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    urun.Mesaj = "Kayýt düzenlenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                urun.Mesaj = "Model uygun deðil.";

            urun = (UrunDil)table.Update(urun.ID, urun);

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
                    curUser.Log(id, "d", "Urunler (Dil)");

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
                    curUser.Log(id, "r", "Urunler (Dil)");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
