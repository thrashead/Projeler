using System.Web.Mvc;
using Repository.UsersModel;
using Repository.VisitorsModel;

namespace AdminPanelAngular.Areas.Ajax.Controllers
{
    public class VisitorsController : Controller
    {
        Visitors model = new Visitors();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Website"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Clear()
        {
            if (!curUser.HasRight("Website", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Clear();

            if (result)
            {
                curUser.Log<Visitors>(null, "t", "Ziyaretçiler");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }
    }
}
