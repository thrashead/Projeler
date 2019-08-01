using System.Web.Mvc;
using TDLibrary;
using Repository.KullanicilarModel;
using Repository.LogIslemModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class LogIslemController : Controller
    {
        LogIslem table = new LogIslem();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Loglar"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle(string logID)
        {
            if (!curUser.HasRight("Loglar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            int linkID = logID == null ? 0 : logID.ToInteger();

            return View(table.Insert(linkID));
        }

        [HttpPost]
        public ActionResult Ekle(LogIslem log)
        {
            if (!curUser.HasRight("Loglar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Insert(log);

                if (result)
                {
                    curUser.Log(log, "i", "Log Ýþlemleri");

                    return RedirectToAction("Index");
                }
                else
                    log.Mesaj = "Kayýt eklenemedi.";
            }
            else
                log.Mesaj = "Model uygun deðil.";

            log = (LogIslem)table.Insert(log.LogTypeID, log);

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
        public ActionResult Duzenle(LogIslem log)
        {
            if (!curUser.HasRight("Loglar", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Update(log);

                if (result)
                {
                    curUser.Log(log, "u", "Log Ýþlemleri");

                    return RedirectToAction("Index");
                }
                else
                    log.Mesaj = "Kayýt düzenlenemedi.";
            }
            else
                log.Mesaj = "Model uygun deðil.";

            log = (LogIslem)table.Update(log.ID, log);

            return View("Duzenle", log);
        }

        public JsonResult Sil(int id)
        {
            if (curUser.HasRight("Loglar", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Log Ýþlemleri");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
