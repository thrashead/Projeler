using System.Web.Mvc;

namespace IKProje.Areas.Ajax
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
                "Ajax/{controller}/{action}/{id}",
                new { id = UrlParameter.Optional },
                namespaces: new[] { "IKProje.Areas.Ajax.Controllers" }
            );
        }
    }
}
