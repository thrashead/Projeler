using System;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IKProjeAngular;

namespace Library
{
    public class SabitDegerler
    {
        public static LoginMember AktifKullanici
        {
            get
            {
                if (HttpContext.Current.Session["Aday"] != null)
                {
                    Kullanici kullanici = HttpContext.Current.Session["Aday"] as Kullanici;
                    LoginMember loginMember = new LoginMember()
                    {
                        Ad = kullanici.Ad,
                        Soyad = kullanici.Soyad,
                        Guid = kullanici.Guid,
                        ID = kullanici.ID,
                        KullaniciAdi = kullanici.KullaniciAdi,
                        Sifre = kullanici.Sifre,
                        SonGiris = kullanici.SonGiris,
                        Tip = "Aday"
                    };


                    return loginMember;
                }
                else
                {
                    return null;
                }
            }
        }

        public static LoginMember AktifFirma
        {
            get
            {
                if (HttpContext.Current.Session["Sirket"] != null)
                {
                    Firma firma = HttpContext.Current.Session["Sirket"] as Firma;
                    LoginMember loginMember = new LoginMember()
                    {
                        SirketAdi = firma.SirketAdi,
                        Guid = firma.Guid,
                        ID = firma.ID,
                        KullaniciAdi = firma.KullaniciAdi,
                        Sifre = firma.Sifre,
                        SonGiris = firma.SonGiris,
                        Tip = "Sirket"
                    };
                    return loginMember;
                }
                else
                {
                    return null;
                }
            }
        }
    }

    public class LoginMember
    {
        public int ID { get; set; }
        public string Ad { get; set; }
        public string Soyad { get; set; }
        public string SirketAdi { get; set; }
        public string KullaniciAdi { get; set; }
        public string Sifre { get; set; }
        public DateTime SonGiris { get; set; }
        public string Guid { get; set; }
        public string Tip { get; set; }
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