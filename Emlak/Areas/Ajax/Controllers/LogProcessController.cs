using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class LogProcessController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Logs"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_LogProcessDetailSelect_Result> log = entity.usp_LogProcessDetailSelect(null).ToList();

            return Json(log, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Insert(int? linkID)
        {
            if (!curUser.HasRight("Logs", "i"))
                return Json(null, JsonRequestBehavior.AllowGet);

            LogIslem log = new LogIslem();

            List<LogTypes> tableLogTypes = entity.LogTypes.ToList();
            log.LogTypesList = tableLogTypes.ToSelectList("ID", "Name", linkID);

            return Json(log, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] LogIslem log)
        {
            if (!curUser.HasRight("Logs", "i"))
                return Json(null);

            var result = entity.usp_LogProcessInsert(log.LogTypeID, log.Name, log.ShortName, log.Description).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(log, "i", "Log Ýþlemleri");

                return Json(log);
            }
            else
                log.Mesaj = "Kayýt eklenemedi.";

            List<LogTypes> tableLogTypes = entity.LogTypes.ToList();
            log.LogTypesList = tableLogTypes.ToSelectList("ID", "Name", log.LogTypeID);

            return Json(log);
        }

        [HttpGet]
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("Logs", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_LogProcessSelectTop_Result table = entity.usp_LogProcessSelectTop(id, 1).FirstOrDefault();

            LogIslem log = table.ChangeModel<LogIslem>();

            List<LogTypes> tableLogTypes = entity.LogTypes.ToList();
            log.LogTypesList = tableLogTypes.ToSelectList("ID", "Name", log.LogTypeID);

            return Json(log, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] LogIslem log)
        {
            if (!curUser.HasRight("Logs", "u"))
                return Json(null);

            var result = entity.usp_LogProcessUpdate(log.ID, log.LogTypeID, log.Name, log.ShortName, log.Description).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(log, "u", "Log Ýþlemleri");

                return Json(log);
            }
            else
                log.Mesaj = "Kayýt düzenlenemedi.";

            List<LogTypes> tableLogTypes = entity.LogTypes.ToList();
            log.LogTypesList = tableLogTypes.ToSelectList("ID", "Name", log.LogTypeID);

            return Json(log);
        }

        [HttpGet]
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("Logs", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_LogProcessDelete(id);

                curUser.Log(id, "d", "Log Ýþlemleri");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
