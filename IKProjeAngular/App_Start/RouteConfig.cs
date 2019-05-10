using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace IKProjeAngular
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "IKService",
                url: "IKService/{action}/{id}",
                defaults: new { controller = "IKService", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "AramaService",
                url: "AramaService/{action}/{id}",
                defaults: new { controller = "AramaService", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "AdayService",
                url: "AdayService/{action}/{id}",
                defaults: new { controller = "AdayService", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "SirketService",
                url: "SirketService/{action}/{id}",
                defaults: new { controller = "SirketService", action = "Index", id = UrlParameter.Optional }
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
