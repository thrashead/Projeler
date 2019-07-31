using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Repository.KullanicilarModel;
using Repository.LogTiplerModel;
using Repository.LogIslemModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class LogTiplerController : Controller
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();
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

            ILogTipler log = table.Select(id);

            List<usp_LogProcessByLogTypeIDSelect_Result> logTipList = entity.usp_LogProcessByLogTypeIDSelect(id).ToList();
            log.LogProcessList.AddRange(logTipList.ChangeModelList<LogIslem, usp_LogProcessByLogTypeIDSelect_Result>());

            return View(log);
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

            List<usp_LogProcessByLogTypeIDSelect_Result> logTipList = entity.usp_LogProcessByLogTypeIDSelect(log.ID).ToList();
            log.LogProcessList.AddRange(logTipList.ChangeModelList<LogIslem, usp_LogProcessByLogTypeIDSelect_Result>());

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
