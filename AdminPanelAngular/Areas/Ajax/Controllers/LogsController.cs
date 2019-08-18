using System.Web.Mvc;
using Repository.UsersModel;
using Repository.LogsModel;

namespace AdminPanelAngular.Areas.Ajax.Controllers
{
    public class LogsController : Controller
    {
        Logs model = new Logs();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Logs"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Clear()
        {
            if (!curUser.HasRight("Logs", "d"))
                return Json(null, JsonRequestBehavior.AllowGet);

            bool result = model.Clear();

            if (result)
            {
                curUser.Log<Logs>(null, "t", "Loglar");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }
    }
}
