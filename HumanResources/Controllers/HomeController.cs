using System.Web.Mvc;
using Repository.VisitorsModel;

namespace HumanResources.Controllers
{
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			Visitors visitor = new Visitors();
			visitor.VisitorCount(AppTools.GetIPAddress);

			return View();
		}
	}
}
