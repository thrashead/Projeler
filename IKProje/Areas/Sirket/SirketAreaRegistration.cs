using System.Web.Mvc;

namespace IKProje.Areas.Sirket
{
    public class SirketAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Sirket";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Sirket_default",
                "Sirket/{controller}/{action}/{id}/{ilan}",
                new { controller = "Profil", action = "AnaSayfa", id = UrlParameter.Optional, ilan = UrlParameter.Optional },
                namespaces: new[] { "IKProje.Areas.Sirket.Controllers" }
            );
        }
    }
}
