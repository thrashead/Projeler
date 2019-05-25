﻿using System.Web.Mvc;
using System.Web.Routing;

namespace CeyhanPolat
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Ajax",
                url: "Ajax/{action}/{id}",
                defaults: new { controller = "Ajax", action = "Menu", id = UrlParameter.Optional }
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
