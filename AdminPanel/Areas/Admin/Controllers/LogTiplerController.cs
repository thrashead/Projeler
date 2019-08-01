using System.Web.Mvc;
using Repository.KullanicilarModel;
using Repository.LogTiplerModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class LogTiplerController : Controller
    {
        LogTipler table = new LogTipler();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Loglar"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("Loglar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table);
        }

        [HttpPost]
        public ActionResult Ekle(LogTipler log)
        {
            if (!curUser.HasRight("Loglar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Insert(log);

                if (result)
                {
                    curUser.Log(log, "i", "Log Tipleri");

                    return RedirectToAction("Index");
                }
                else
                    log.Mesaj = "Kayýt eklenemedi.";
            }
            else
                log.Mesaj = "Model uygun deðil.";

            return View("Ekle", log);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Loglar", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.Update(id));
        }

        [HttpPost]
        public ActionResult Duzenle(LogTipler log)
        {
            if (!curUser.HasRight("Loglar", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Update(log);

                if (result)
                {
                    curUser.Log(log, "u", "Log Tipleri");

                    return RedirectToAction("Index");
                }
                else
                    log.Mesaj = "Kayýt düzenlenemedi.";
            }
            else
                log.Mesaj = "Model uygun deðil.";

            log = (LogTipler)table.Update(log.ID, log);

            return View("Duzenle", log);
        }

        public JsonResult Sil(int id)
        {
            if (curUser.HasRight("Loglar", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Log Tipleri");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
