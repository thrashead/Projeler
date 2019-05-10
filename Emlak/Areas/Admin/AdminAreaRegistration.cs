using System.Web.Mvc;

namespace Emlak.Areas.Admin
{
    public class AdminAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Admin";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Admin_default",
                "Admin/{controller}/{action}/{id}",
                new { controller = "Panel", action = "Login", id = UrlParameter.Optional },
                namespaces: new[] { "Emlak.Areas.Admin.Controllers" }
            );
        }
    }
}
