using System.Web.Mvc;
using Repository.KullanicilarModel;
using Repository.TiplerModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class TiplerController : Controller
    {
        Tipler table = new Tipler();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Tipler"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("Tipler", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table);
        }

        [HttpPost]
        public ActionResult Ekle(Tipler tip)
        {
            if (!curUser.HasRight("Tipler", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Insert(tip);

                if (result)
                {
                    curUser.Log(tip, "i", "Tipler");

                    return RedirectToAction("Index");
                }
                else
                    tip.Mesaj = "Kayýt eklenemedi.";
            }
            else
                tip.Mesaj = "Model uygun deðil.";

            return View("Ekle", tip);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Tipler", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.Select(id));
        }

        [HttpPost]
        public ActionResult Duzenle(Tipler tip)
        {
            if (!curUser.HasRight("Tipler", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Update(tip);

                if (result)
                {
                    curUser.Log(tip, "u", "Tipler");

                    return RedirectToAction("Index");
                }
                else
                    tip.Mesaj = "Kayýt düzenlenemedi.";
            }
            else
                tip.Mesaj = "Model uygun deðil.";

            return View("Duzenle", tip);
        }

        public JsonResult Sil(int id)
        {
            if (curUser.HasRight("Tipler", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Tipler");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
