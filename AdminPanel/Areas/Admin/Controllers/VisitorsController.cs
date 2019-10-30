using System.Web.Mvc;
using Repository.UsersModel;
using Repository.VisitorsModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class VisitorsController : Controller
    {
        readonly Visitors table = new Visitors();
        readonly Users curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Website"))
                return RedirectToAction("Index", "Home");

            return View(table.List());
        }

        [HttpPost]
        public JsonResult Clear()
        {
            if (curUser.HasRight("Website", "d"))
            {
                bool result = table.Clear();

                if (result)
                {
                    curUser.Log<Visitors>(null, "t", "Ziyaretçiler");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
