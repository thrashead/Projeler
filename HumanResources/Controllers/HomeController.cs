using Repository.VisitorsModel;
using System.Web.Mvc;

namespace HumanResources.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            Visitors visitor = new Visitors();
            visitor.VisitorCount();

            return View();
        }
    }
}