using System.Web.Mvc;

namespace IKProje.Areas.Is
{
    public class IsAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Is";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Is_default",
                "Is/{controller}/{action}/{id}",
                new { id = UrlParameter.Optional },
                namespaces: new[] { "IKProje.Areas.Is.Controllers" }
            );
        }
    }
}
