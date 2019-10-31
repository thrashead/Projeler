using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class LogTypesController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        readonly Kullanicilar curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Logs"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_LogTypesSelect_Result> log = entity.usp_LogTypesSelect(null).ToList();

            return Json(log, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] LogTipler log)
        {
            if (!curUser.HasRight("Logs", "i"))
                return Json(null);

            var result = entity.usp_LogTypesInsert(log.Name, log.ShortName).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(log, "i", "Log Tipleri");

                return Json(log);
            }
            else
                log.Mesaj = "Kayýt eklenemedi.";

            return Json(log);
        }

        [HttpGet]
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("Logs", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_LogTypesSelectTop_Result table = entity.usp_LogTypesSelectTop(id, 1).FirstOrDefault();

            LogTipler log = table.ChangeModel<LogTipler>();

            List<usp_LogProcessByLogTypeIDSelect_Result> logTipList = entity.usp_LogProcessByLogTypeIDSelect(id).ToList();
            log.LogProcessList.AddRange(logTipList.ChangeModelList<LogIslem, usp_LogProcessByLogTypeIDSelect_Result>());

            return Json(log, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] LogTipler log)
        {
            if (!curUser.HasRight("Logs", "u"))
                return Json(null);

            var result = entity.usp_LogTypesUpdate(log.ID, log.Name, log.ShortName).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(log, "u", "Log Tipleri");

                return Json(log);
            }
            else
                log.Mesaj = "Kayýt düzenlenemedi.";

            List<usp_LogProcessByLogTypeIDSelect_Result> logTipList = entity.usp_LogProcessByLogTypeIDSelect(log.ID).ToList();
            log.LogProcessList.AddRange(logTipList.ChangeModelList<LogIslem, usp_LogProcessByLogTypeIDSelect_Result>());

            return Json(log);
        }

        [HttpGet]
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("Logs", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_LogTypesCheckDelete(id);

                curUser.Log(id, "d", "Log Tipleri");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
