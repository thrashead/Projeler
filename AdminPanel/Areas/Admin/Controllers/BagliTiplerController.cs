using System.Web.Mvc;
using Repository.KullanicilarModel;
using Repository.BagliTiplerModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class BagliTiplerController : Controller
    {
        BagliTipler table = new BagliTipler();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("BagliTipler"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("BagliTipler", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.Insert());
        }

        [HttpPost]
        public ActionResult Ekle(BagliTipler link)
        {
            if (!curUser.HasRight("BagliTipler", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Insert(link);

                if (result)
                {
                    curUser.Log(link, "i", "Ba�l� Tipler");

                    return RedirectToAction("Index");
                }
                else
                    link.Mesaj = "Kay�t eklenemedi.";
            }
            else
                link.Mesaj = "Model uygun de�il.";

            link = (BagliTipler)table.Insert(link, null);

            return View("Ekle", link);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("BagliTipler", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.Update(id));
        }

        [HttpPost]
        public ActionResult Duzenle(BagliTipler link)
        {
            if (!curUser.HasRight("BagliTipler", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Update(link);

                if (result)
                {
                    curUser.Log(link, "u", "Ba�l� Tipler");

                    return RedirectToAction("Index");
                }
                else
                    link.Mesaj = "Kay�t d�zenlenemedi.";
            }
            else
                link.Mesaj = "Model uygun de�il.";

            link = (BagliTipler)table.Update(link.ID, link);

            return View("Duzenle", link);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            if (curUser.HasRight("BagliTipler", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Ba�l� Tipler");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kopyala(int id)
        {
            if (curUser.HasRight("BagliTipler", "c"))
            {
                bool result = table.Copy(id);

                if (result)
                {
                    curUser.Log(id, "c", "Ba�l� Tipler");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpGet]
        public JsonResult FillTypes(int? typeID)
        {
            return Json(BagliTipler.ReturnList(typeID), JsonRequestBehavior.AllowGet);
        }
    }
}
