using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Models.FirmaModel;
using Models.KullaniciModel;

namespace Lib
{
    public class SabitDegerler
    {
        public static Kullanici AktifKullanici
        {
            get
            {
                if (System.Web.HttpContext.Current.Session["Aday"] != null)
                {
                    Kullanici kullanici = System.Web.HttpContext.Current.Session["Aday"] as Kullanici;
                    return kullanici;
                }
                else
                {
                    return null;
                }
            }
        }

        public static Firma AktifFirma
        {
            get
            {
                if (System.Web.HttpContext.Current.Session["Sirket"] != null)
                {
                    Firma firma = System.Web.HttpContext.Current.Session["Sirket"] as Firma;
                    return firma;
                }
                else
                {
                    return null;
                }
            }
        }
    }

    public class SabitSayfalar
    {
        public static RedirectToRouteResult AnaSayfa
        {
            get
            {
                return new RedirectToRouteResult(new System.Web.Routing.RouteValueDictionary(new { area = "", controller = "Giris", action = "AnaSayfa" }));
            }
        }

        public class Aday
        {
            public static RedirectToRouteResult AdayGiris
            {
                get
                {
                    return new RedirectToRouteResult(new System.Web.Routing.RouteValueDictionary(new { area = "Aday", controller = "Islem", action = "Giris" }));
                }
            }

            public static RedirectToRouteResult AdayAnaSayfa
            {
                get
                {
                    return new RedirectToRouteResult(new System.Web.Routing.RouteValueDictionary(new { area = "Aday", controller = "Ozgecmis", action = "AnaSayfa" }));
                }
            }
        }

        public class Sirket
        {
            public static RedirectToRouteResult SirketGiris
            {
                get
                {
                    return new RedirectToRouteResult(new System.Web.Routing.RouteValueDictionary(new { area = "Sirket", controller = "Islem", action = "Giris" }));
                }
            }

            public static RedirectToRouteResult SirketAnaSayfa
            {
                get
                {
                    return new RedirectToRouteResult(new System.Web.Routing.RouteValueDictionary(new { area = "Sirket", controller = "Profil", action = "AnaSayfa" }));
                }
            }
        }
    }
}