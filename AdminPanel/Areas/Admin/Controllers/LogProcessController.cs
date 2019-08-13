using System.Web.Mvc;
using TDLibrary;
using Repository.UsersModel;
using Repository.LogProcessModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class LogProcessController : Controller
    {
        readonly LogProcess table = new LogProcess();
        readonly Users curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Logs"))
                return RedirectToAction("Index", "Home");

            return View(table.List());
        }

        public ActionResult Insert(string logID)
        {
            if (!curUser.HasRight("Logs", "i"))
                return RedirectToAction("Index", "Home");

            int linkID = logID == null ? 0 : logID.ToInteger();

            return View(table.Insert(linkID));
        }

        [HttpPost]
        public ActionResult Insert(LogProcess log)
        {
            if (!curUser.HasRight("Logs", "i"))
                return RedirectToAction("Index", "Home");

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

            log = (LogProcess)table.Insert(log.LogTypeID, log);

            return View("Insert", log);
        }

        [HttpGet]
        public ActionResult Update(int id)
        {
            if (!curUser.HasRight("Logs", "u"))
                return RedirectToAction("Index", "Home");

            return View(table.Update(id));
        }

        [HttpPost]
        public ActionResult Update(LogProcess log)
        {
            if (!curUser.HasRight("Logs", "u"))
                return RedirectToAction("Index", "Home");

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

            log = (LogProcess)table.Update(log.ID, log);

            return View("Update", log);
        }

        public JsonResult Delete(int id)
        {
            if (curUser.HasRight("Logs", "d"))
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
