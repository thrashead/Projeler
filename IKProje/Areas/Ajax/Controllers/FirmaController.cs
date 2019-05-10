using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Lib;
using TDLibrary;
using TDFramework;
using TDFramework.Common;
using Models.FirmaModel;
using System.IO;
using Newtonsoft.Json;
using Models.FirmaIlanModel;
using Models.FirmaIlanSartModel;
using Models.FirmaIlanSorularModel;

namespace IKProje.Areas.Ajax.Controllers
{
    public class FirmaController : Controller
    {
        public JsonResult ResimSil()
        {
            if (SabitDegerler.AktifFirma != null)
            {
                Firma firma = SabitDegerler.AktifFirma;

                if (firma.Logo != null)
                {
                    Table<Firma> tablo = new Table<Firma>();
                    tablo.Columns = FirmaColumns.Logo;
                    tablo.Values = new Firma() { Logo = null };
                    tablo.WhereList.Add(new Where() { Column = FirmaColumns.ID, Values = new List<dynamic>() { firma.ID } });
                    tablo.Update();

                    if (tablo.Error == null)
                    {
                        Metodlar.DosyaSil(Server.MapPath("~/Dosya/Sirket/" + firma.Guid + "/" + firma.Logo));

                        firma.Logo = null;
                        System.Web.HttpContext.Current.Session["Sirket"] = firma;

                        return Json(true);
                    }
                    else
                    {
                        return Json(false);
                    }
                }
                else
                {
                    return Json(false);
                }
            }
            else
            {
                return Json(false);
            }
        }

        [HttpPost]
        public JsonResult ResimDegistir()
        {
            if (SabitDegerler.AktifFirma != null)
            {
                var isim = Guider.GetGuid(5);
                var file = Request.Files[0];
                string fileextension = "." + file.FileName.Split('.')[1];

                if (fileextension.In(new string[] { ".jpg", ".jpeg", ".bmp", ".png", ".gif" }))
                {
                    Firma firma = SabitDegerler.AktifFirma;

                    Table<Firma> tablo = new Table<Firma>();
                    tablo.Columns = FirmaColumns.Logo;
                    tablo.Values = new Firma() { Logo = "logo" + isim + fileextension };
                    tablo.WhereList.Add(new Where() { Column = FirmaColumns.ID, Values = new List<dynamic>() { firma.ID } });
                    tablo.Update();

                    if (tablo.Error == null)
                    {
                        if (firma.Logo != null)
                        {
                            Metodlar.DosyaSil(Server.MapPath("~/Dosya/Sirket/" + firma.Guid + "/" + firma.Logo));
                        }

                        firma.Logo = "logo" + isim + fileextension;
                        System.Web.HttpContext.Current.Session["Sirket"] = firma;

                        var path = Path.Combine(Server.MapPath("~/Dosya/Sirket/" + SabitDegerler.AktifFirma.Guid + "/"), "logo" + isim + fileextension);
                        file.SaveAs(path);
                    }

                    return Json("logo" + isim + fileextension, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json("", JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json("", JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult BilgiGetir()
        {
            if (SabitDegerler.AktifFirma != null)
            {
                Firma firma = SabitDegerler.AktifFirma;

                return Json(firma, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult BilgiGuncelle(string firma)
        {
            if (SabitDegerler.AktifFirma != null)
            {
                Firma _firma = JsonConvert.DeserializeObject<Firma>(firma);

                if (!Metodlar.FirmaBilgiKontrol(_firma.KullaniciAdi, _firma.Eposta, _firma.Telefon, _firma.CepTelefon, _firma.TCKimlikNo, _firma.ID))
                {
                    Table<Firma> tablo = new Table<Firma>();

                    tablo.WhereList.Add(new Where(FirmaColumns.ID, _firma.ID));

                    List<FirmaColumns> kolonlar = new List<FirmaColumns>()
                    {
                        FirmaColumns.SirketAdi,
                        FirmaColumns.Ad,
                        FirmaColumns.Soyad,
                        FirmaColumns.KullaniciAdi,
                        FirmaColumns.Sektor,
                        FirmaColumns.Sehir,
                        FirmaColumns.TCKimlikNo,
                        FirmaColumns.Eposta,
                        FirmaColumns.Telefon,
                        FirmaColumns.CepTelefon,
                        FirmaColumns.Faks,
                        FirmaColumns.Website,
                        FirmaColumns.Hakkinda,
                        FirmaColumns.HaberUyelik
                    };

                    if (!String.IsNullOrEmpty(_firma.Sifre))
                    {
                        _firma.Sifre = _firma.Sifre.ToMD5();
                        kolonlar.Add(FirmaColumns.Sifre);
                    }

                    tablo.Columns = kolonlar;
                    tablo.Values = _firma;

                    tablo.Update();

                    if (tablo.Error == null)
                    {
                        SabitDegerler.AktifFirma.SirketAdi = _firma.SirketAdi;
                        SabitDegerler.AktifFirma.Ad = _firma.Ad;
                        SabitDegerler.AktifFirma.Soyad = _firma.Soyad;
                        SabitDegerler.AktifFirma.KullaniciAdi = _firma.KullaniciAdi;
                        SabitDegerler.AktifFirma.Sektor = _firma.Sektor;
                        SabitDegerler.AktifFirma.Sehir = _firma.Sehir;
                        SabitDegerler.AktifFirma.TCKimlikNo = _firma.TCKimlikNo;
                        SabitDegerler.AktifFirma.Eposta = _firma.Eposta;
                        SabitDegerler.AktifFirma.Telefon = _firma.Telefon;
                        SabitDegerler.AktifFirma.CepTelefon = _firma.CepTelefon;
                        SabitDegerler.AktifFirma.Faks = _firma.Faks;
                        SabitDegerler.AktifFirma.Website = _firma.Website;
                        SabitDegerler.AktifFirma.Hakkinda = _firma.Hakkinda;
                        SabitDegerler.AktifFirma.HaberUyelik = _firma.HaberUyelik;

                        if (!String.IsNullOrEmpty(_firma.Sifre))
                        {
                            SabitDegerler.AktifFirma.Sifre = _firma.Sifre;
                        }

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
            else
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult IlanIcerikKaydet(string ilanOzellik)
        {
            if (SabitDegerler.AktifFirma != null)
            {
                FirmaIlan _FirmaIlan = JsonConvert.DeserializeObject<FirmaIlan>(ilanOzellik);

                Table<FirmaIlan> tablo = new Table<FirmaIlan>();
                tablo.WhereList.Add(new Where(FirmaIlanColumns.IlanNo, _FirmaIlan.IlanNo));
                tablo.SelectSettings.Top = 1;
                tablo.Select();

                if (tablo.HasData == false)
                {
                    tablo = new Table<FirmaIlan>();

                    _FirmaIlan.FirmaID = SabitDegerler.AktifFirma.ID;
                    _FirmaIlan.Guid = Guider.GetGuid(25);

                    tablo.Values = _FirmaIlan;

                    tablo.Insert();

                    if (tablo.Error == null)
                    {
                        return Json(true, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json("bilgi", JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    tablo = new Table<FirmaIlan>();

                    tablo.Columns = new List<FirmaIlanColumns>()
                    {
                        FirmaIlanColumns.Baslik,
                        FirmaIlanColumns.BaslangicTarih,
                        FirmaIlanColumns.BitisTarih,
                        FirmaIlanColumns.Aciklama,
                        FirmaIlanColumns.Aktif
                    };

                    tablo.Values = _FirmaIlan;

                    tablo.Update();

                    if (tablo.Error == null)
                    {
                        return Json("guncel", JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json("bilgi", JsonRequestBehavior.AllowGet);
                    }
                }
            }
            else
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult IlanSartKaydet(string ilanSart)
        {
            if (SabitDegerler.AktifFirma != null)
            {
                FirmaIlanSart _IlanSart = JsonConvert.DeserializeObject<FirmaIlanSart>(ilanSart);

                _IlanSart.IlanID = Metodlar.IlanIDGetir(_IlanSart.IlanNo);

                Table<FirmaIlanSart> tablo = new Table<FirmaIlanSart>();
                tablo.WhereList.Add(new Where(FirmaIlanSartColumns.IlanID, _IlanSart.IlanID));
                tablo.SelectSettings.Top = 1;
                tablo.Select();

                if (tablo.HasData == false)
                {
                    tablo = new Table<FirmaIlanSart>();
                    tablo.Values = _IlanSart;

                    tablo.Insert();
                }
                else
                {
                    tablo = new Table<FirmaIlanSart>();
                    tablo.Values = _IlanSart;

                    tablo.Columns = new List<FirmaIlanSartColumns>()
                    {
                        FirmaIlanSartColumns.CalismaSekli,
                        FirmaIlanSartColumns.Cinsiyet,
                        FirmaIlanSartColumns.Deneyim,
                        FirmaIlanSartColumns.Departman,
                        FirmaIlanSartColumns.Egitim,
                        FirmaIlanSartColumns.Maas,
                        FirmaIlanSartColumns.Pozisyon,
                        FirmaIlanSartColumns.Sehir,
                        FirmaIlanSartColumns.SehirSor,
                        FirmaIlanSartColumns.Sektor
                    };

                    tablo.Update();
                }

                if (tablo.Error == null)
                {
                    return Json(true, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json("bilgi", JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult IlanSartGetir(string ilanNo)
        {
            if (SabitDegerler.AktifFirma != null)
            {
                Table<FirmaIlanSart> tablo = new Table<FirmaIlanSart>();
                tablo.WhereList.Add(new Where(FirmaIlanSartColumns.IlanID, Metodlar.IlanIDGetir(ilanNo)));
                tablo.SelectSettings.Top = 1;
                tablo.Select();

                if (tablo.HasData)
                {
                    return Json((tablo.Data as List<FirmaIlanSart>).FirstOrDefault(), JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult IlanSorularGetir(string ilanNo)
        {
            if (SabitDegerler.AktifFirma != null)
            {
                Table<FirmaIlanSorular> tablo = new Table<FirmaIlanSorular>();
                tablo.WhereList.Add(new Where(FirmaIlanSorularColumns.IlanID, Metodlar.IlanIDGetir(ilanNo)));
                tablo.Select();

                if (tablo.HasData)
                {
                    return Json(tablo.Data as List<FirmaIlanSorular>, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult IlanSoruIcerikKaydet(string ilanOzellik)
        {
            if (SabitDegerler.AktifFirma != null)
            {
                FirmaIlan _FirmaIlan = JsonConvert.DeserializeObject<FirmaIlan>(ilanOzellik);

                _FirmaIlan.ID = Metodlar.IlanIDGetir(_FirmaIlan.IlanNo);

                Table<FirmaIlan> tablo = new Table<FirmaIlan>();
                tablo.WhereList.Add(new Where(FirmaIlanColumns.ID, _FirmaIlan.ID));
                tablo.SelectSettings.Top = 1;
                tablo.Select();

                if (tablo.HasData == false)
                {
                    return Json("bilgi", JsonRequestBehavior.AllowGet);
                }
                else
                {
                    tablo = new Table<FirmaIlan>();
                    tablo.Values = _FirmaIlan;

                    tablo.Columns = new List<FirmaIlanColumns>()
                    {
                        FirmaIlanColumns.SoruAktifArac,
                        FirmaIlanColumns.SoruHaftaSonu
                    };

                    tablo.Update();
                }

                if (tablo.Error == null)
                {
                    return Json(true, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json("bilgi", JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult IlanSoruEkle(string ilanSoru)
        {
            if (SabitDegerler.AktifFirma != null)
            {
                FirmaIlanSorular _IlanSoru = JsonConvert.DeserializeObject<FirmaIlanSorular>(ilanSoru);

                _IlanSoru.IlanID = Metodlar.IlanIDGetir(_IlanSoru.IlanNo);

                Table <FirmaIlanSorular>  tablo = new Table<FirmaIlanSorular>();

                tablo.Values = _IlanSoru;

                tablo.Insert();

                if (tablo.Error == null)
                {
                    return Json(true, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json("bilgi", JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult IlanSoruSil(string ilanSoru)
        {
            if (SabitDegerler.AktifFirma != null)
            {
                FirmaIlanSorular _IlanSoru = JsonConvert.DeserializeObject<FirmaIlanSorular>(ilanSoru);

                Table<FirmaIlanSorular> tablo = new Table<FirmaIlanSorular>();
                tablo.WhereList.Add(new Where() { Column = FirmaIlanSorularColumns.Guid, Values = new List<dynamic>() { _IlanSoru.Guid } });

                tablo.Delete();

                if (tablo.Error == null)
                {
                    return Json(true, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json("bilgi", JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}