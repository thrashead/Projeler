using System.Web.Mvc;
using Repository.UsersModel;
using Repository.VisitorsModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class VisitorsController : Controller
    {
        Visitors table = new Visitors();
        Users curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Visitors"))
                return RedirectToAction("Index", "Home");

            return View(table.List());
        }

        [HttpPost]
        public JsonResult Clear()
        {
            if (curUser.HasRight("Visitors", "d"))
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
