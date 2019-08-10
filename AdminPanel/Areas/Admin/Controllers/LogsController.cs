using System.Web.Mvc;
using Repository.UsersModel;
using Repository.LogsModel;

namespace AdminPanel.Areas.Admin.Controllers
{
	public class LogsController : Controller
	{
        Logs table = new Logs();
        Users curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Logs"))
            {
                return RedirectToAction("Index", "Home");
            }

            return View(table.List());
        }

        [HttpPost]
        public JsonResult Clear()
        {
            if (curUser.HasRight("Logs", "d"))
            {
                bool result = table.Clear();

                if (result)
                {
                    curUser.Log<Logs>(null, "t", "Loglar");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
