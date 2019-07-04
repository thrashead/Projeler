using System.Web.Mvc;

namespace Emlak.Areas.Ajax
{
    public class AjaxAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Ajax";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Ajax_default",
                "Ajax/{controller}/{action}/{login}",
                new { action = "Index", login = UrlParameter.Optional }
            );
        }
    }
}