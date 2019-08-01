using System.Web.Mvc;
using TDLibrary;
using Repository.KullanicilarModel;
using Repository.IcerikDilModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class IcerikDilController : Controller
    {
        IcerikDil table = new IcerikDil();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Icerik"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle(string contID)
        {
            if (!curUser.HasRight("Icerik", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            int linkID = contID == null ? 0 : contID.ToInteger();
            
            return View(table.Insert(linkID));
        }

        [HttpPost]
        public ActionResult Ekle(IcerikDil icerik)
        {
            if (!curUser.HasRight("Icerik", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid && icerik.ContID > 0)
            {
                bool result = table.Insert(icerik);

                if (result)
                {
                    curUser.Log(icerik, "i", "Ýçerikler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    icerik.Mesaj = "Kayýt eklenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                icerik.Mesaj = "Model uygun deðil.";

            icerik = (IcerikDil)table.Insert(icerik.ContID, icerik.TransID, icerik);

            return View("Ekle", icerik);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Icerik", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.Update(id));
        }

        [HttpPost]
        public ActionResult Duzenle(IcerikDil icerik)
        {
            if (!curUser.HasRight("Icerik", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Update(icerik);

                if (result)
                {
                    curUser.Log(icerik, "u", "Ýçerikler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    icerik.Mesaj = "Kayýt düzenlenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                icerik.Mesaj = "Model uygun deðil.";

            icerik = (IcerikDil)table.Update(icerik.ID, icerik);

            return View("Duzenle", icerik);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            if (curUser.HasRight("Icerik", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Ýçerikler (Dil)");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kaldir(int id)
        {
            if (curUser.HasRight("Icerik", "r"))
            {
                bool result = table.Remove(id);

                if (result)
                {
                    curUser.Log(id, "r", "Ýçerikler (Dil)");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
