using System.Web.Mvc;
using Repository.UsersModel;
using Repository.LogTypesModel;

namespace RealEstate.Areas.Ajax.Controllers
{
    public class LogTypesController : Controller
    {
        LogTypes model = new LogTypes();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Logs"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] LogTypes log)
        {
            if (!curUser.HasRight("Logs", "i"))
                return Json(null);

            bool result = model.Insert(log);

            if (result)
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

            return Json(model.Update(id), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] LogTypes log)
        {
            if (!curUser.HasRight("Logs", "u"))
                return Json(null);

            bool result = model.Update(log);

            if (result)
            {
                curUser.Log(log, "u", "Log Tipleri");

                return Json(log);
            }
            else
                log.Mesaj = "Kayýt düzenlenemedi.";

            log = (LogTypes)model.Update(log.ID, log);

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
                curUser.Log(id, "r", "Log Tipleri");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }
    }
}
