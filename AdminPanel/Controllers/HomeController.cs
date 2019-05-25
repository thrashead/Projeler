using System.Web.Mvc;
using TDLibrary;

namespace AdminPanel.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            Response.Redirect(AppMgr.AdminPath);

            return View();
        }
    }
}