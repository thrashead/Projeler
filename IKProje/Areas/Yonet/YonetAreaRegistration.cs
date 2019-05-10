using System.Web.Mvc;

namespace IKProje.Areas.Yonet
{
    public class YonetAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Yonet";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Yonet_default",
                "Yonet/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional },
                namespaces: new[] { "IKProje.Areas.Yonet.Controllers" }
            );
        }
    }
}
