using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
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
                name: "Shared",
                url: "Shared/{action}/{id}",
                defaults: new { controller = "Shared", action = "GetLangs", id = UrlParameter.Optional },
                new[] { "Emlak.Controllers" }
            );

            routes.MapRoute(
                name: "Sol",
                url: "Sol/{action}/{id}",
                defaults: new { controller = "Sol", action = "AramaSonuc", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Home",
                url: "Home/{action}/{id}",
                defaults: new { controller = "Home", action = "Hakkimizda", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "RE",
                url: "RE/{action}/{id}",
                defaults: new { controller = "RE", action = "Detay", id = UrlParameter.Optional }
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
