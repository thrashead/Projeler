using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Models;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class LogTiplerController : Controller
    {
        readonly AdminPanelEntities _entity = new AdminPanelEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Loglar"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_LogTypesSelect_Result> log = _entity.usp_LogTypesSelect(null).ToList();

            return View(log);
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("Loglar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            LogTipler log = new LogTipler();

            return View(log);
        }

        [HttpPost]
        public ActionResult Ekle(LogTipler log)
        {
            if (!curUser.HasRight("Loglar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = _entity.usp_LogTypesInsert(log.Name, log.ShortName);

                if (result != null)
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

            usp_LogTypesSelectTop_Result table = _entity.usp_LogTypesSelectTop(id, 1).FirstOrDefault();

            LogTipler log = table.ChangeModel<LogTipler>();

            List<usp_LogProcessByLogTypeIDSelect_Result> logTipList = _entity.usp_LogProcessByLogTypeIDSelect(id).ToList();
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
                var result = _entity.usp_LogTypesUpdate(log.ID, log.Name, log.ShortName);

                if (result != null)
                {
                    curUser.Log(log, "u", "Log Tipleri");

                    return RedirectToAction("Index");
                }
                else
                    log.Mesaj = "Kayýt düzenlenemedi.";
            }
            else
                log.Mesaj = "Model uygun deðil.";

            List<usp_LogProcessByLogTypeIDSelect_Result> logTipList = _entity.usp_LogProcessByLogTypeIDSelect(log.ID).ToList();
            log.LogProcessList.AddRange(logTipList.ChangeModelList<LogIslem, usp_LogProcessByLogTypeIDSelect_Result>());

            return View("Duzenle", log);
        }

        public JsonResult Sil(int id)
        {
            try
            {
                if (curUser.HasRight("Loglar", "d"))
                {
                    _entity.usp_LogTypesCheckDelete(id);

                    curUser.Log(id, "rd", "Log Tipleri");

                    return Json(true);
                }
            }
            catch
            {
                return Json(false);
            }

            return Json(false);
        }
    }
}
