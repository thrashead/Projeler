using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class LogTiplerController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Loglar"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_LogTypesSelect_Result> log = entity.usp_LogTypesSelect(null).ToList();

            curUser.Log<LogTipler>(null, "s", "Log Tipleri");

            return Json(log, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Ekle([System.Web.Http.FromBody] LogTipler log)
        {
            if (!curUser.HasRight("Loglar", "i"))
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
        public JsonResult Duzenle(int id)
        {
            if (!curUser.HasRight("Loglar", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_LogTypesSelectTop_Result table = entity.usp_LogTypesSelectTop(id, 1).FirstOrDefault();

            LogTipler log = table.ChangeModel<LogTipler>();

            List<usp_LogProcessByLogTypeIDSelect_Result> logTipList = entity.usp_LogProcessByLogTypeIDSelect(id).ToList();
            log.LogProcessList.AddRange(logTipList.ChangeModelList<LogIslem, usp_LogProcessByLogTypeIDSelect_Result>());

            return Json(log, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Duzenle([System.Web.Http.FromBody] LogTipler log)
        {
            if (!curUser.HasRight("Loglar", "u"))
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
        public JsonResult Sil(int id)
        {
            if (!curUser.HasRight("Loglar", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_LogTypesCheckDelete(id);

                curUser.Log(id, "rd", "Log Tipleri");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
