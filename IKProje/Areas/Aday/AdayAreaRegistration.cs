using System.Web.Mvc;

namespace IKProje.Areas.Aday
{
    public class AdayAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Aday";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Aday_default",
                "Aday/{controller}/{action}/{id}",
                new { controller = "Ozgecmis", action = "AnaSayfa", id = UrlParameter.Optional },
                namespaces: new[] { "IKProje.Areas.Aday.Controllers" }
            );
        }
    }
}
