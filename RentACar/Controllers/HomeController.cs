using Repository.TranslationModel;
using Repository.VisitorsModel;
using System.Web.Mvc;

namespace RentACar.Controllers
{
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
            if (Session["CurrentLang"] == null)
            {
                Translation translation = new Translation();
                Session["CurrentLang"] = translation.SelectByCode("TR");
            }

            Visitors visitor = new Visitors();
            visitor.VisitorCount();

            return View();
		}
	}
}
