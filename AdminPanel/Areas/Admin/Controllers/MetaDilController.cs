using System.Web.Mvc;
using TDLibrary;
using Repository.KullanicilarModel;
using Repository.MetalarDilModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class MetalarDilController : Controller
    {
        MetalarDil table = new MetalarDil();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Meta"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle(string metaID)
        {
            if (!curUser.HasRight("Meta", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            int linkID = metaID == null ? 0 : metaID.ToInteger();

            return View(table.Insert(linkID));
        }

        [HttpPost]
        public ActionResult Ekle(MetalarDil meta)
        {
            if (!curUser.HasRight("Meta", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid && meta.MetaID > 0)
            {
                bool result = table.Insert(meta);

                if (result)
                {
                    curUser.Log(meta, "i", "Metalar (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    meta.Mesaj = "Kayýt eklenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                meta.Mesaj = "Model uygun deðil.";

            meta = (MetalarDil)table.Insert(meta.MetaID, meta.TransID, meta);

            return View("Ekle", meta);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Meta", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.Update(id));
        }

        [HttpPost]
        public ActionResult Duzenle(MetalarDil meta)
        {
            if (!curUser.HasRight("Meta", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Update(meta);

                if (result)
                {
                    curUser.Log(meta, "u", "Metalar (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    meta.Mesaj = "Kayýt düzenlenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                meta.Mesaj = "Model uygun deðil.";

            meta = (MetalarDil)table.Update(meta.ID, meta);

            return View("Duzenle", meta);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            if (curUser.HasRight("Meta", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Metalar (Dil)");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kaldir(int id)
        {
            if (curUser.HasRight("Meta", "r"))
            {
                bool result = table.Remove(id);

                if (result)
                {
                    curUser.Log(id, "r", "Metalar (Dil)");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
