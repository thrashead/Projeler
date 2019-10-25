using System.Web.Mvc;
using System.Web.Routing;

namespace Emlak
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Ajax",
                url: "Ajax/{controller}/{action}/{login}",
                defaults: new { controller = "Ajax", action = "Login", login = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Site",
                url: "Site/{action}/{id}",
                defaults: new { controller = "Site", action = "Slider", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Home",
                url: "Home/{action}/{id}",
                defaults: new { controller = "Home", action = "Hakkimizda", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Default",
                url: "{*anything}",
                // url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
