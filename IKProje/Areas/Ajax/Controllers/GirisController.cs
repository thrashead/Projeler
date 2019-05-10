using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Lib;
using TDLibrary;
using Newtonsoft.Json;
using Models.KullaniciModel;
using TDFramework;
using TDFramework.Common;
using Models.FirmaModel;

namespace IKProje.Areas.Ajax.Controllers
{
    public class GirisController : Controller
    {
        public JsonResult GirisYap(string loginObject)
        {
            LoginJson user = JsonConvert.DeserializeObject<LoginJson>(loginObject);

            switch (user.Type)
            {
                case "Aday":
                    Table<Kullanici> tabloAday = new Table<Kullanici>();
                    tabloAday.WhereList.Add(new Where(KullaniciColumns.Aktif, true));
                    tabloAday.WhereList.Add(new Where(KullaniciColumns.KullaniciAdi, user.Username));
                    tabloAday.WhereList.Add(new Where(KullaniciColumns.Sifre, user.Password.ToMD5()));
                    tabloAday.Select();

                    if (tabloAday.HasData)
                    {
                        Session["Aday"] = (tabloAday.Data as List<Kullanici>).FirstOrDefault();

                        DateTime zaman = DateTime.Now;

                        tabloAday = new Table<Kullanici>();
                        tabloAday.Columns = KullaniciColumns.SonGiris;
                        tabloAday.Values = new Kullanici() { SonGiris = zaman };
                        tabloAday.Update();

                        if (tabloAday.Error == null)
                        {
                            Kullanici kullanici = (System.Web.HttpContext.Current.Session["Aday"] as Kullanici);
                            kullanici.SonGiris = zaman;
                            System.Web.HttpContext.Current.Session["Aday"] = kullanici;
                        }
                    }
                    else
                    {
                        return Json(false);
                    }
                    break;
                case "Sirket":
                    Table<Firma> tabloFirma = new Table<Firma>();
                    tabloFirma.WhereList.Add(new Where(FirmaColumns.Aktif, true));
                    tabloFirma.WhereList.Add(new Where(FirmaColumns.KullaniciAdi, user.Username));
                    tabloFirma.WhereList.Add(new Where(FirmaColumns.Sifre, user.Password.ToMD5()));
                    tabloFirma.Select();

                    if (tabloFirma.HasData)
                    {
                        Session["Sirket"] = (tabloFirma.Data as List<Firma>).FirstOrDefault();

                        DateTime zaman = DateTime.Now;

                        tabloFirma = new Table<Firma>();
                        tabloFirma.Columns = FirmaColumns.SonGiris;
                        tabloFirma.Values = new Firma() { SonGiris = zaman };
                        tabloFirma.Update();

                        if (tabloFirma.Error == null)
                        {
                            Firma firma = (System.Web.HttpContext.Current.Session["Sirket"] as Firma);
                            firma.SonGiris = zaman;
                            System.Web.HttpContext.Current.Session["Sirket"] = firma;
                        }
                    }
                    else
                    {
                        return Json(false);
                    }
                    break;
                default:
                    return Json(false);
            }

            return Json(true);
        }

        public class LoginJson
        {
            public string Username { get; set; }
            public string Password { get; set; }
            public string Type { get; set; }
        }

        public JsonResult CikisYap()
        {
            GirisYonetimi.CikisYap();

            return Json(true);
        }
    }
}
