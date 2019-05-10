using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Lib;
using TDLibrary;
using Models.KullaniciModel;
using Models.FirmaModel;
using Newtonsoft.Json;
using TDFramework;
using TDFramework.Common;

namespace IKProje.Areas.Ajax.Controllers
{
    public class KayitController : Controller
    {
        public JsonResult AdayKayit(string kullanici)
        {
            Kullanici _kullanici = JsonConvert.DeserializeObject<Kullanici>(kullanici);

            if (!Metodlar.KullaniciBilgiKontrol(_kullanici.KullaniciAdi, _kullanici.Eposta, _kullanici.Telefon))
            {
                _kullanici.Aktif = true;
                _kullanici.OzgecmisAktif = true;
                _kullanici.Guid = Guider.GetGuid(25);
                _kullanici.Sifre = _kullanici.Sifre.ToMD5();
                _kullanici.SonGiris = DateTime.Now;

                Table<Kullanici> tablo = new Table<Kullanici>();
                tablo.Values = _kullanici;
                tablo.Insert();

                if (tablo.Error == null)
                {
                    Directory.CreateDirectory(Server.MapPath("~/Dosya/Aday/" + _kullanici.Guid));

                    return Json(true, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json("bilgi", JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult SirketKayit(string firma)
        {
            Firma _firma = JsonConvert.DeserializeObject<Firma>(firma);

            if (!Metodlar.FirmaBilgiKontrol(_firma.KullaniciAdi, _firma.Eposta, _firma.Telefon, _firma.CepTelefon, _firma.TCKimlikNo))
            {
                _firma.Aktif = true;
                _firma.Guid = Guider.GetGuid(25);
                _firma.Sifre = _firma.Sifre.ToMD5();
                _firma.SonGiris = DateTime.Now;

                Table<Models.FirmaModel.Firma> tablo = new Table<Models.FirmaModel.Firma>();
                tablo.Values = _firma;
                tablo.Insert();

                if (tablo.Error == null)
                {
                    Directory.CreateDirectory(Server.MapPath("~/Dosya/Sirket/" + _firma.Guid));

                    return Json(true, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json("bilgi", JsonRequestBehavior.AllowGet);
            }
        }
    }
}
