using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Models;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class LogIslemController : Controller
    {
        readonly AdminPanelEntities _entity = new AdminPanelEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Loglar"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_LogProcessDetailSelect_Result> log = _entity.usp_LogProcessDetailSelect(null).ToList();

            return View(log);
        }

        public ActionResult Ekle(string logID)
        {
            if (!curUser.HasRight("Loglar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            int linkID = logID == null ? 0 : logID.ToInteger();

            LogIslem log = new LogIslem();

            List<LogTypes> tableLogTypes = _entity.LogTypes.ToList();
            log.LogTypesList = tableLogTypes.ToSelectList("ID", "Name", linkID);

            return View(log);
        }

        [HttpPost]
        public ActionResult Ekle(LogIslem log)
        {
            if (!curUser.HasRight("Loglar", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = _entity.usp_LogProcessInsert(log.LogTypeID, log.Name, log.ShortName, log.Description);

                if (result != null)
                {
                    curUser.Log(log, "i", "Log Ýþlemleri");

                    return RedirectToAction("Index");
                }
                else
                    log.Mesaj = "Kayýt eklenemedi.";
            }
            else
                log.Mesaj = "Model uygun deðil.";

            List<LogTypes> tableLogTypes = _entity.LogTypes.ToList();
            log.LogTypesList = tableLogTypes.ToSelectList("ID", "Name", log.LogTypeID);

            return View("Ekle", log);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Loglar", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            usp_LogProcessSelectTop_Result table = _entity.usp_LogProcessSelectTop(id, 1).FirstOrDefault();

            LogIslem log = table.ChangeModel<LogIslem>();

            List<LogTypes> tableLogTypes = _entity.LogTypes.ToList();
            log.LogTypesList = tableLogTypes.ToSelectList("ID", "Name", log.LogTypeID);

            return View(log);
        }

        [HttpPost]
        public ActionResult Duzenle(LogIslem log)
        {
            if (!curUser.HasRight("Loglar", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = _entity.usp_LogProcessUpdate(log.ID, log.LogTypeID, log.Name, log.ShortName, log.Description);

                if (result != null)
                {
                    curUser.Log(log, "u", "Log Ýþlemleri");

                    return RedirectToAction("Index");
                }
                else
                    log.Mesaj = "Kayýt düzenlenemedi.";
            }
            else
                log.Mesaj = "Model uygun deðil.";

            List<LogTypes> tableLogTypes = _entity.LogTypes.ToList();
            log.LogTypesList = tableLogTypes.ToSelectList("ID", "Name", log.LogTypeID);

            return View("Duzenle", log);
        }

        public JsonResult Sil(int id)
        {
            try
            {
                if (curUser.HasRight("Loglar", "d"))
                {
                    _entity.usp_LogProcessDelete(id);

                    curUser.Log(id, "rd", "Log Ýþlemleri");

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
