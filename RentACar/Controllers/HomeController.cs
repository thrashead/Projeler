using Repository.TranslationModel;
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

            return View();
		}
	}
}
