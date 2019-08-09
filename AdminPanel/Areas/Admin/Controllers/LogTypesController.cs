using System.Web.Mvc;
using Repository.UsersModel;
using Repository.LogTypesModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class LogTypesController : Controller
    {
        LogTypes table = new LogTypes();
        Users curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Logs"))
                return RedirectToAction("Index", "Home");

            return View(table.List());
        }

        public ActionResult Insert()
        {
            if (!curUser.HasRight("Logs", "i"))
                return RedirectToAction("Index", "Home");

            return View(table);
        }

        [HttpPost]
        public ActionResult Insert(LogTypes log)
        {
            if (!curUser.HasRight("Logs", "i"))
                return RedirectToAction("Index", "Home");

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
        public ActionResult Update(LogTypes log)
        {
            if (!curUser.HasRight("Logs", "u"))
                return RedirectToAction("Index", "Home");

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

            log = (LogTypes)table.Update(log.ID, log);

            return View("Update", log);
        }

        public JsonResult Delete(int id)
        {
            if (curUser.HasRight("Logs", "d"))
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
