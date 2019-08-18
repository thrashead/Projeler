using System.Web.Mvc;
using Repository.UsersModel;
using Repository.LogProcessModel;

namespace AdminPanelAngular.Areas.Ajax.Controllers
{
    public class LogProcessController : Controller
    {
        LogProcess model = new LogProcess();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Logs"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Insert(int? linkID)
        {
            if (!curUser.HasRight("Logs", "i"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Insert(linkID), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] LogProcess log)
        {
            if (!curUser.HasRight("Logs", "i"))
                return Json(null);

            bool result = model.Insert(log);

            if (result)
            {
                curUser.Log(log, "i", "Log Ýþlemleri");

                return Json(log);
            }
            else
                log.Mesaj = "Kayýt eklenemedi.";

            log = (LogProcess)model.Insert(log.LogTypeID, log);

            return Json(log);
        }

        [HttpGet]
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("Logs", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Update(id), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] LogProcess log)
        {
            if (!curUser.HasRight("Logs", "u"))
                return Json(null);

            bool result = model.Update(log);

            if (result)
            {
                curUser.Log(log, "u", "Log Ýþlemleri");

                return Json(log);
            }
            else
                log.Mesaj = "Kayýt düzenlenemedi.";

            log = (LogProcess)model.Update(log.ID, log);

            return Json(log);
        }

        [HttpGet]
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("Logs", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Delete(id);

            if (result)
            {
                curUser.Log(id, "d", "Log Ýþlemleri");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }
    }
}
