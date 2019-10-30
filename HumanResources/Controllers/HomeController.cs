using Repository.TranslationModel;
using Repository.VisitorsModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HumanResources.Controllers
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