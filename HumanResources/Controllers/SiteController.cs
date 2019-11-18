using System.Web.Mvc;
using Repository.VisitorsModel;

namespace HumanResources.Controllers
{
	public class SiteController : Controller
	{
		#region Visitors

		[HttpGet]
		public JsonResult VisitorCount()
		{
			Visitors visitors = new Visitors();

			return Json(visitors.VisitorCount(AppTools.GetIPAddress), JsonRequestBehavior.AllowGet);
		}

		#endregion
	}
}
