using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Lib;
using TDLibrary;
using TDFramework;
using TDFramework.Common;
using Models.KullaniciModel;
using System.IO;
using Newtonsoft.Json;
using Models.OnyaziModel;
using Models.OzgecmisGenelModel;
using Models.OzgecmisCalismaModel;
using Models.OzgecmisTercihModel;
using Models.OzgecmisDeneyimModel;
using Models.OzgecmisReferansModel;
using Models.OzgecmisEgitimModel;
using Models.OzgecmisSertifikaModel;
using Models.OzgecmisSinavModel;
using Models.OzgecmisDilModel;
using Models.OzgecmisBilgisayarModel;
using Models.OzgecmisDosyaModel;

namespace IKProje.Areas.Ajax.Controllers
{
    public class KullaniciController : Controller
    {
        public JsonResult OzgecmisAktif(bool aktif)
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                Kullanici kullanici = SabitDegerler.AktifKullanici;

                Table<Kullanici> tablo = new Table<Kullanici>();
                tablo.Columns = KullaniciColumns.OzgecmisAktif;
                tablo.Values = new Kullanici() { OzgecmisAktif = aktif };
                tablo.WhereList.Add(new Where() { Column = KullaniciColumns.ID, Values = new List<dynamic>() { kullanici.ID } });
                tablo.Update();

                if (tablo.Error == null)
                {
                    kullanici.OzgecmisAktif = aktif;
                    System.Web.HttpContext.Current.Session["Aday"] = kullanici;

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

        public JsonResult ResimSil()
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                Kullanici kullanici = SabitDegerler.AktifKullanici;

                if (kullanici.Resim != null)
                {
                    Table<Kullanici> tablo = new Table<Kullanici>();
                    tablo.Columns = KullaniciColumns.Resim;
                    tablo.Values = new Kullanici() { Resim = null };
                    tablo.WhereList.Add(new Where() { Column = KullaniciColumns.ID, Values = new List<dynamic>() { kullanici.ID } });
                    tablo.Update();

                    if (tablo.Error == null)
                    {
                        Metodlar.DosyaSil(Server.MapPath("~/Dosya/Aday/" + kullanici.Guid + "/" + kullanici.Resim));

                        kullanici.Resim = null;
                        System.Web.HttpContext.Current.Session["Aday"] = kullanici;

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

        public JsonResult OnyaziGetir(int onyaziID)
        {
            Table<Onyazi> tablo = new Table<Onyazi>();
            tablo.Columns = new List<OnyaziColumns>()
            {
                OnyaziColumns.Baslik,
                OnyaziColumns.Aciklama
            };

            tablo.WhereList.Add(new Where() { Column = OnyaziColumns.ID, Values = new List<dynamic>() { onyaziID } });
            tablo.WhereList.Add(new Where() { Column = OnyaziColumns.Aktif, Values = new List<dynamic>() { true } });
            tablo.WhereList.Add(new Where() { Column = OnyaziColumns.KullaniciID, Values = new List<dynamic>() { SabitDegerler.AktifKullanici.ID } });

            tablo.SelectSettings.Top = 1;

            tablo.Select();

            if (tablo.HasData)
            {
                return Json(((List<Onyazi>)tablo.Data).FirstOrDefault() as Onyazi);
            }
            else
            {
                return Json(null);
            }
        }

        public JsonResult OnyaziKaydet(string onyazi)
        {
            Onyazi _onyazi = JsonConvert.DeserializeObject<Onyazi>(onyazi);

            Table<Onyazi> tablo = new Table<Onyazi>();

            tablo.Values = new Onyazi()
            {
                Baslik = _onyazi.Baslik,
                Aciklama = _onyazi.Aciklama,
                Aktif = true,
                Guid = Guider.GetGuid(25),
                KullaniciID = SabitDegerler.AktifKullanici.ID
            };

            tablo.Insert(true);

            if (tablo.Error == null)
            {
                return Json(tablo.Data);
            }
            else
            {
                return Json(false);
            }
        }

        public JsonResult OnyaziGuncelle(string onyazi)
        {
            Onyazi _onyazi = JsonConvert.DeserializeObject<Onyazi>(onyazi);

            Table<Onyazi> tablo = new Table<Onyazi>();
            tablo.Columns = new List<OnyaziColumns>()
            {
                OnyaziColumns.Baslik,
                OnyaziColumns.Aciklama
            };

            tablo.Values = new Onyazi() { Baslik = _onyazi.Baslik, Aciklama = _onyazi.Aciklama };

            tablo.WhereList.Add(new Where() { Column = OnyaziColumns.ID, Values = new List<dynamic>() { _onyazi.ID } });
            tablo.WhereList.Add(new Where() { Column = OnyaziColumns.Aktif, Values = new List<dynamic>() { true } });
            tablo.WhereList.Add(new Where() { Column = OnyaziColumns.KullaniciID, Values = new List<dynamic>() { SabitDegerler.AktifKullanici.ID } });

            tablo.Update();

            if (tablo.Error == null)
            {
                return Json(true);
            }
            else
            {
                return Json(false);
            }
        }

        public JsonResult OnyaziSil(int onyaziID)
        {
            Table<Onyazi> tablo = new Table<Onyazi>();

            tablo.WhereList.Add(new Where() { Column = OnyaziColumns.ID, Values = new List<dynamic>() { onyaziID } });
            tablo.WhereList.Add(new Where() { Column = OnyaziColumns.Aktif, Values = new List<dynamic>() { true } });
            tablo.WhereList.Add(new Where() { Column = OnyaziColumns.KullaniciID, Values = new List<dynamic>() { SabitDegerler.AktifKullanici.ID } });

            tablo.Delete();

            if (tablo.Error == null)
            {
                return Json(true);
            }
            else
            {
                return Json(false);
            }
        }

        [HttpPost]
        public JsonResult ResimDegistir()
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                var isim = Guider.GetGuid(5);
                var file = Request.Files[0];
                string fileextension = "." + file.FileName.Split('.')[1];

                if (fileextension.In(new string[] { ".jpg", ".jpeg", ".bmp", ".png", ".gif" }))
                {
                    Kullanici kullanici = SabitDegerler.AktifKullanici;

                    Table<Kullanici> tablo = new Table<Kullanici>();
                    tablo.Columns = KullaniciColumns.Resim;
                    tablo.Values = new Kullanici() { Resim = "resim" + isim + fileextension };
                    tablo.WhereList.Add(new Where() { Column = KullaniciColumns.ID, Values = new List<dynamic>() { kullanici.ID } });
                    tablo.Update();

                    if (tablo.Error == null)
                    {
                        if (kullanici.Resim != null)
                        {
                            Metodlar.DosyaSil(Server.MapPath("~/Dosya/Aday/" + kullanici.Guid + "/" + kullanici.Resim));
                        }

                        kullanici.Resim = "resim" + isim + fileextension;
                        System.Web.HttpContext.Current.Session["Aday"] = kullanici;

                        var path = Path.Combine(Server.MapPath("~/Dosya/Aday/" + SabitDegerler.AktifKullanici.Guid + "/"), "resim" + isim + fileextension);
                        file.SaveAs(path);
                    }

                    return Json("resim" + isim + fileextension, JsonRequestBehavior.AllowGet);
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
            if (SabitDegerler.AktifKullanici != null)
            {
                Kullanici kullanici = SabitDegerler.AktifKullanici;

                return Json(kullanici, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult BilgiGuncelle(string kullanici)
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                Kullanici _kullanici = JsonConvert.DeserializeObject<Kullanici>(kullanici);

                if (!Metodlar.KullaniciBilgiKontrol(_kullanici.KullaniciAdi, _kullanici.Eposta, _kullanici.Telefon, _kullanici.ID))
                {
                    Table<Kullanici> tablo = new Table<Kullanici>();

                    tablo.WhereList.Add(new Where(KullaniciColumns.ID, _kullanici.ID));

                    List<KullaniciColumns> kolonlar = new List<KullaniciColumns>()
                    {
                        KullaniciColumns.Ad,
                        KullaniciColumns.Soyad,
                        KullaniciColumns.KullaniciAdi,
                        KullaniciColumns.Eposta,
                        KullaniciColumns.Telefon,
                        KullaniciColumns.Sehir,
                        KullaniciColumns.Cinsiyet,
                        KullaniciColumns.Hakkinda,
                        KullaniciColumns.HaberUyelik
                    };

                    if (!String.IsNullOrEmpty(_kullanici.Sifre))
                    {
                        _kullanici.Sifre = _kullanici.Sifre.ToMD5();
                        kolonlar.Add(KullaniciColumns.Sifre);
                    }

                    tablo.Columns = kolonlar;
                    tablo.Values = _kullanici;

                    tablo.Update();

                    if (tablo.Error == null)
                    {
                        SabitDegerler.AktifKullanici.Ad = _kullanici.Ad;
                        SabitDegerler.AktifKullanici.Soyad = _kullanici.Soyad;
                        SabitDegerler.AktifKullanici.KullaniciAdi = _kullanici.KullaniciAdi;
                        SabitDegerler.AktifKullanici.Eposta = _kullanici.Eposta;
                        SabitDegerler.AktifKullanici.Telefon = _kullanici.Telefon;
                        SabitDegerler.AktifKullanici.Sehir = _kullanici.Sehir;
                        SabitDegerler.AktifKullanici.Cinsiyet = _kullanici.Cinsiyet;
                        SabitDegerler.AktifKullanici.Hakkinda = _kullanici.Hakkinda;
                        SabitDegerler.AktifKullanici.HaberUyelik = _kullanici.HaberUyelik;

                        if (!String.IsNullOrEmpty(_kullanici.Sifre))
                        {
                            SabitDegerler.AktifKullanici.Sifre = _kullanici.Sifre;
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
        public JsonResult OzgecmisGenelGuncelle(string ozgecmisGenel)
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                Table<OzgecmisGenel> tablo = new Table<OzgecmisGenel>();
                tablo.WhereList.Add(new Where(OzgecmisGenelColumns.KullaniciID, SabitDegerler.AktifKullanici.ID));
                tablo.Select();

                if (tablo.HasData == false)
                {
                    tablo = new Table<OzgecmisGenel>();

                    tablo.Values = new OzgecmisGenel()
                    {
                        Askerlik = 1,
                        AskerlikTarih = null,
                        Cinsiyet = 1,
                        DogumTarih = DateTime.Now.ToShortDateString(),
                        Ehliyet = false,
                        EhliyetSinif = null,
                        KullaniciID = SabitDegerler.AktifKullanici.ID,
                        Mail = "-",
                        MedeniHal = 1,
                        Sehir = 0,
                        Sigara = false,
                        Telefon = "9999999999",
                        Egitim = 3425
                    };

                    tablo.Insert();
                }

                OzgecmisGenel _ozgecmisGenel = JsonConvert.DeserializeObject<OzgecmisGenel>(ozgecmisGenel);

                tablo = new Table<OzgecmisGenel>();
                tablo.WhereList.Add(new Where(OzgecmisGenelColumns.KullaniciID, SabitDegerler.AktifKullanici.ID));
                List<OzgecmisGenelColumns> kolonlar = new List<OzgecmisGenelColumns>()
                {
                    OzgecmisGenelColumns.Askerlik,
                    OzgecmisGenelColumns.AskerlikTarih,
                    OzgecmisGenelColumns.Cinsiyet,
                    OzgecmisGenelColumns.DogumTarih,
                    OzgecmisGenelColumns.Ehliyet,
                    OzgecmisGenelColumns.EhliyetSinif,
                    OzgecmisGenelColumns.Mail,
                    OzgecmisGenelColumns.MedeniHal,
                    OzgecmisGenelColumns.Sehir,
                    OzgecmisGenelColumns.Sigara,
                    OzgecmisGenelColumns.Telefon,
                    OzgecmisGenelColumns.Egitim
                };

                _ozgecmisGenel.Egitim = 3425;

                tablo.Columns = kolonlar;
                tablo.Values = _ozgecmisGenel;

                tablo.Update();

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
        public JsonResult OzgecmisGenelGetir()
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                Table<OzgecmisGenel> tablo = new Table<OzgecmisGenel>();
                tablo.WhereList.Add(new Where(OzgecmisGenelColumns.KullaniciID, SabitDegerler.AktifKullanici.ID));
                tablo.Select();

                if (tablo.HasData)
                {
                    return Json((tablo.Data as List<OzgecmisGenel>).FirstOrDefault(), JsonRequestBehavior.AllowGet);
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
        public JsonResult OzgecmisCalismaGuncelle(string ozgecmisCalisma)
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                Table<OzgecmisCalisma> tablo = new Table<OzgecmisCalisma>();
                tablo.WhereList.Add(new Where(OzgecmisCalismaColumns.KullaniciID, SabitDegerler.AktifKullanici.ID));
                tablo.Select();

                if (tablo.HasData == false)
                {
                    tablo = new Table<OzgecmisCalisma>();

                    tablo.Values = new OzgecmisCalisma()
                    {
                        CalismaDurumu = 1,
                        KisiselBilgi = null,
                        KullaniciID = SabitDegerler.AktifKullanici.ID,
                        MeslekUnvan = null,
                        ToplamDeneyim = 1
                    };

                    tablo.Insert();
                }

                OzgecmisCalisma _ozgecmisCalisma = JsonConvert.DeserializeObject<OzgecmisCalisma>(ozgecmisCalisma);

                tablo = new Table<OzgecmisCalisma>();
                tablo.WhereList.Add(new Where(OzgecmisCalismaColumns.KullaniciID, SabitDegerler.AktifKullanici.ID));
                List<OzgecmisCalismaColumns> kolonlar = new List<OzgecmisCalismaColumns>()
                {
                    OzgecmisCalismaColumns.CalismaDurumu,
                    OzgecmisCalismaColumns.KisiselBilgi,
                    OzgecmisCalismaColumns.MeslekUnvan,
                    OzgecmisCalismaColumns.ToplamDeneyim
                };

                tablo.Columns = kolonlar;
                tablo.Values = _ozgecmisCalisma;

                tablo.Update();

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
        public JsonResult OzgecmisCalismaGetir()
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                Table<OzgecmisCalisma> tablo = new Table<OzgecmisCalisma>();
                tablo.WhereList.Add(new Where(OzgecmisCalismaColumns.KullaniciID, SabitDegerler.AktifKullanici.ID));
                tablo.Select();

                if (tablo.HasData)
                {
                    return Json((tablo.Data as List<OzgecmisCalisma>).FirstOrDefault(), JsonRequestBehavior.AllowGet);
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
        public JsonResult OzgecmisTercihGuncelle(string ozgecmisTercih)
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                Table<OzgecmisTercih> tablo = new Table<OzgecmisTercih>();
                tablo.WhereList.Add(new Where(OzgecmisTercihColumns.KullaniciID, SabitDegerler.AktifKullanici.ID));
                tablo.Select();

                if (tablo.HasData == false)
                {
                    tablo = new Table<OzgecmisTercih>();

                    tablo.Values = new OzgecmisTercih()
                    {
                        Bolum = "0",
                        KullaniciID = SabitDegerler.AktifKullanici.ID,
                        Maas = 0,
                        Pozisyon = "0",
                        Sektor = "0"
                    };

                    tablo.Insert();
                }

                OzgecmisTercih _ozgecmisTercih = JsonConvert.DeserializeObject<OzgecmisTercih>(ozgecmisTercih);

                tablo = new Table<OzgecmisTercih>();
                tablo.WhereList.Add(new Where(OzgecmisTercihColumns.KullaniciID, SabitDegerler.AktifKullanici.ID));
                List<OzgecmisTercihColumns> kolonlar = new List<OzgecmisTercihColumns>()
                {
                    OzgecmisTercihColumns.Bolum,
                    OzgecmisTercihColumns.Maas,
                    OzgecmisTercihColumns.Pozisyon,
                    OzgecmisTercihColumns.Sektor
                };

                tablo.Columns = kolonlar;
                tablo.Values = _ozgecmisTercih;

                tablo.Update();

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
        public JsonResult OzgecmisTercihGetir()
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                Table<OzgecmisTercih> tablo = new Table<OzgecmisTercih>();
                tablo.WhereList.Add(new Where(OzgecmisTercihColumns.KullaniciID, SabitDegerler.AktifKullanici.ID));
                tablo.Select();

                if (tablo.HasData)
                {
                    return Json((tablo.Data as List<OzgecmisTercih>).FirstOrDefault(), JsonRequestBehavior.AllowGet);
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
        public JsonResult OzgecmisDeneyimEkle(string ozgecmisDeneyim)
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                OzgecmisDeneyim _ozgecmisDeneyim = JsonConvert.DeserializeObject<OzgecmisDeneyim>(ozgecmisDeneyim);

                Table<OzgecmisDeneyim> tablo = new Table<OzgecmisDeneyim>();

                _ozgecmisDeneyim.KullaniciID = SabitDegerler.AktifKullanici.ID;

                tablo.Values = _ozgecmisDeneyim;

                if (_ozgecmisDeneyim.Guncelle == true)
                {
                    tablo.WhereList.Add(new Where(OzgecmisDeneyimColumns.Guid, _ozgecmisDeneyim.Guid));

                    tablo.Update();
                }
                else
                {
                    tablo.Insert();
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
        public JsonResult OzgecmisDeneyimGetir(string ozgecmisDeneyim)
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                OzgecmisDeneyim _ozgecmisDeneyim = JsonConvert.DeserializeObject<OzgecmisDeneyim>(ozgecmisDeneyim);

                Table<OzgecmisDeneyim> tablo = new Table<OzgecmisDeneyim>();
                tablo.WhereList.Add(new Where(OzgecmisDeneyimColumns.KullaniciID, SabitDegerler.AktifKullanici.ID));
                tablo.WhereList.Add(new Where(OzgecmisDeneyimColumns.Guid, _ozgecmisDeneyim.Guid));

                tablo.Select();

                if (tablo.HasData)
                {
                    return Json((tablo.Data as List<OzgecmisDeneyim>).FirstOrDefault(), JsonRequestBehavior.AllowGet);
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
        public JsonResult OzgecmisDeneyimSil(string ozgecmisDeneyim)
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                OzgecmisDeneyim _ozgecmisDeneyim = JsonConvert.DeserializeObject<OzgecmisDeneyim>(ozgecmisDeneyim);

                Table<OzgecmisDeneyim> tablo = new Table<OzgecmisDeneyim>();
                tablo.WhereList.Add(new Where(OzgecmisDeneyimColumns.KullaniciID, SabitDegerler.AktifKullanici.ID));
                tablo.WhereList.Add(new Where(OzgecmisDeneyimColumns.Guid, _ozgecmisDeneyim.Guid));

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

        [HttpPost]
        public JsonResult OzgecmisReferansEkle(string ozgecmisReferans)
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                if (SabitDegerler.AktifKullanici != null)
                {
                    OzgecmisReferans _ozgecmisReferans = JsonConvert.DeserializeObject<OzgecmisReferans>(ozgecmisReferans);

                    Table<OzgecmisReferans> tablo = new Table<OzgecmisReferans>();

                    _ozgecmisReferans.KullaniciID = SabitDegerler.AktifKullanici.ID;

                    tablo.Values = _ozgecmisReferans;

                    if (_ozgecmisReferans.Guncelle == true)
                    {
                        tablo.WhereList.Add(new Where(OzgecmisReferansColumns.Guid, _ozgecmisReferans.Guid));

                        tablo.Update();
                    }
                    else
                    {
                        tablo.Insert();
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
            else
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult OzgecmisReferansGetir(string ozgecmisReferans)
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                OzgecmisReferans _ozgecmisReferans = JsonConvert.DeserializeObject<OzgecmisReferans>(ozgecmisReferans);

                Table<OzgecmisReferans> tablo = new Table<OzgecmisReferans>();
                tablo.WhereList.Add(new Where(OzgecmisReferansColumns.KullaniciID, SabitDegerler.AktifKullanici.ID));
                tablo.WhereList.Add(new Where(OzgecmisReferansColumns.Guid, _ozgecmisReferans.Guid));

                tablo.Select();

                if (tablo.HasData)
                {
                    return Json((tablo.Data as List<OzgecmisReferans>).FirstOrDefault(), JsonRequestBehavior.AllowGet);
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
        public JsonResult OzgecmisReferansSil(string ozgecmisReferans)
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                OzgecmisReferans _ozgecmisReferans = JsonConvert.DeserializeObject<OzgecmisReferans>(ozgecmisReferans);

                Table<OzgecmisReferans> tablo = new Table<OzgecmisReferans>();
                tablo.WhereList.Add(new Where(OzgecmisReferansColumns.KullaniciID, SabitDegerler.AktifKullanici.ID));
                tablo.WhereList.Add(new Where(OzgecmisReferansColumns.Guid, _ozgecmisReferans.Guid));

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
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult OzgecmisEgitimEkle(string ozgecmisEgitim)
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                OzgecmisEgitim _ozgecmisEgitim = JsonConvert.DeserializeObject<OzgecmisEgitim>(ozgecmisEgitim);

                Table<OzgecmisEgitim> tablo = new Table<OzgecmisEgitim>();

                _ozgecmisEgitim.KullaniciID = SabitDegerler.AktifKullanici.ID;

                tablo.Values = _ozgecmisEgitim;

                if (_ozgecmisEgitim.Guncelle == true)
                {
                    tablo.WhereList.Add(new Where(OzgecmisEgitimColumns.Guid, _ozgecmisEgitim.Guid));

                    tablo.Update();
                }
                else
                {
                    tablo.Insert();
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
        public JsonResult OzgecmisEgitimGetir(string ozgecmisEgitim)
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                OzgecmisEgitim _ozgecmisEgitim = JsonConvert.DeserializeObject<OzgecmisEgitim>(ozgecmisEgitim);

                Table<OzgecmisEgitim> tablo = new Table<OzgecmisEgitim>();
                tablo.WhereList.Add(new Where(OzgecmisEgitimColumns.KullaniciID, SabitDegerler.AktifKullanici.ID));
                tablo.WhereList.Add(new Where(OzgecmisEgitimColumns.Guid, _ozgecmisEgitim.Guid));

                tablo.Select();

                if (tablo.HasData)
                {
                    return Json((tablo.Data as List<OzgecmisEgitim>).FirstOrDefault(), JsonRequestBehavior.AllowGet);
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
        public JsonResult OzgecmisEgitimSil(string ozgecmisEgitim)
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                OzgecmisEgitim _ozgecmisEgitim = JsonConvert.DeserializeObject<OzgecmisEgitim>(ozgecmisEgitim);

                Table<OzgecmisEgitim> tablo = new Table<OzgecmisEgitim>();
                tablo.WhereList.Add(new Where(OzgecmisEgitimColumns.KullaniciID, SabitDegerler.AktifKullanici.ID));
                tablo.WhereList.Add(new Where(OzgecmisEgitimColumns.Guid, _ozgecmisEgitim.Guid));

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

        [HttpPost]
        public JsonResult OzgecmisSertifikaEkle(string ozgecmisSertifika)
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                if (SabitDegerler.AktifKullanici != null)
                {
                    OzgecmisSertifika _ozgecmisSertifika = JsonConvert.DeserializeObject<OzgecmisSertifika>(ozgecmisSertifika);

                    Table<OzgecmisSertifika> tablo = new Table<OzgecmisSertifika>();

                    _ozgecmisSertifika.KullaniciID = SabitDegerler.AktifKullanici.ID;

                    tablo.Values = _ozgecmisSertifika;

                    if (_ozgecmisSertifika.Guncelle == true)
                    {
                        tablo.WhereList.Add(new Where(OzgecmisSertifikaColumns.Guid, _ozgecmisSertifika.Guid));

                        tablo.Update();
                    }
                    else
                    {
                        tablo.Insert();
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
            else
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult OzgecmisSertifikaGetir(string ozgecmisSertifika)
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                OzgecmisSertifika _ozgecmisSertifika = JsonConvert.DeserializeObject<OzgecmisSertifika>(ozgecmisSertifika);

                Table<OzgecmisSertifika> tablo = new Table<OzgecmisSertifika>();
                tablo.WhereList.Add(new Where(OzgecmisSertifikaColumns.KullaniciID, SabitDegerler.AktifKullanici.ID));
                tablo.WhereList.Add(new Where(OzgecmisSertifikaColumns.Guid, _ozgecmisSertifika.Guid));

                tablo.Select();

                if (tablo.HasData)
                {
                    return Json((tablo.Data as List<OzgecmisSertifika>).FirstOrDefault(), JsonRequestBehavior.AllowGet);
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
        public JsonResult OzgecmisSertifikaSil(string ozgecmisSertifika)
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                OzgecmisSertifika _ozgecmisSertifika = JsonConvert.DeserializeObject<OzgecmisSertifika>(ozgecmisSertifika);

                Table<OzgecmisSertifika> tablo = new Table<OzgecmisSertifika>();
                tablo.WhereList.Add(new Where(OzgecmisSertifikaColumns.KullaniciID, SabitDegerler.AktifKullanici.ID));
                tablo.WhereList.Add(new Where(OzgecmisSertifikaColumns.Guid, _ozgecmisSertifika.Guid));

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
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult OzgecmisSinavEkle(string ozgecmisSinav)
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                if (SabitDegerler.AktifKullanici != null)
                {
                    OzgecmisSinav _ozgecmisSinav = JsonConvert.DeserializeObject<OzgecmisSinav>(ozgecmisSinav);

                    Table<OzgecmisSinav> tablo = new Table<OzgecmisSinav>();

                    _ozgecmisSinav.KullaniciID = SabitDegerler.AktifKullanici.ID;

                    tablo.Values = _ozgecmisSinav;

                    if (_ozgecmisSinav.Guncelle == true)
                    {
                        tablo.WhereList.Add(new Where(OzgecmisSinavColumns.Guid, _ozgecmisSinav.Guid));

                        tablo.Update();
                    }
                    else
                    {
                        tablo.Insert();
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
            else
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult OzgecmisSinavGetir(string ozgecmisSinav)
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                OzgecmisSinav _ozgecmisSinav = JsonConvert.DeserializeObject<OzgecmisSinav>(ozgecmisSinav);

                Table<OzgecmisSinav> tablo = new Table<OzgecmisSinav>();
                tablo.WhereList.Add(new Where(OzgecmisSinavColumns.KullaniciID, SabitDegerler.AktifKullanici.ID));
                tablo.WhereList.Add(new Where(OzgecmisSinavColumns.Guid, _ozgecmisSinav.Guid));

                tablo.Select();

                if (tablo.HasData)
                {
                    return Json((tablo.Data as List<OzgecmisSinav>).FirstOrDefault(), JsonRequestBehavior.AllowGet);
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
        public JsonResult OzgecmisSinavSil(string ozgecmisSinav)
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                OzgecmisSinav _ozgecmisSinav = JsonConvert.DeserializeObject<OzgecmisSinav>(ozgecmisSinav);

                Table<OzgecmisSinav> tablo = new Table<OzgecmisSinav>();
                tablo.WhereList.Add(new Where(OzgecmisSinavColumns.KullaniciID, SabitDegerler.AktifKullanici.ID));
                tablo.WhereList.Add(new Where(OzgecmisSinavColumns.Guid, _ozgecmisSinav.Guid));

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
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult OzgecmisDilEkle(string ozgecmisDil)
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                if (SabitDegerler.AktifKullanici != null)
                {
                    OzgecmisDil _ozgecmisDil = JsonConvert.DeserializeObject<OzgecmisDil>(ozgecmisDil);

                    Table<OzgecmisDil> tablo = new Table<OzgecmisDil>();

                    _ozgecmisDil.KullaniciID = SabitDegerler.AktifKullanici.ID;

                    tablo.Values = _ozgecmisDil;

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
            else
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult OzgecmisDilSil(string ozgecmisDil)
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                OzgecmisDil _ozgecmisDil = JsonConvert.DeserializeObject<OzgecmisDil>(ozgecmisDil);

                Table<OzgecmisDil> tablo = new Table<OzgecmisDil>();
                tablo.WhereList.Add(new Where(OzgecmisDilColumns.KullaniciID, SabitDegerler.AktifKullanici.ID));
                tablo.WhereList.Add(new Where(OzgecmisDilColumns.Guid, _ozgecmisDil.Guid));

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
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult OzgecmisBilgisayarEkle(string ozgecmisBilgisayar)
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                if (SabitDegerler.AktifKullanici != null)
                {
                    OzgecmisBilgisayar _ozgecmisBilgisayar = JsonConvert.DeserializeObject<OzgecmisBilgisayar>(ozgecmisBilgisayar);

                    Table<OzgecmisBilgisayar> tablo = new Table<OzgecmisBilgisayar>();

                    _ozgecmisBilgisayar.KullaniciID = SabitDegerler.AktifKullanici.ID;

                    tablo.Values = _ozgecmisBilgisayar;

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
            else
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult OzgecmisBilgisayarSil(string ozgecmisBilgisayar)
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                OzgecmisBilgisayar _ozgecmisBilgisayar = JsonConvert.DeserializeObject<OzgecmisBilgisayar>(ozgecmisBilgisayar);

                Table<OzgecmisBilgisayar> tablo = new Table<OzgecmisBilgisayar>();
                tablo.WhereList.Add(new Where(OzgecmisBilgisayarColumns.KullaniciID, SabitDegerler.AktifKullanici.ID));
                tablo.WhereList.Add(new Where(OzgecmisBilgisayarColumns.Guid, _ozgecmisBilgisayar.Guid));

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
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult OzgecmisDosyaEkle(string ozgecmisDosya)
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                if (SabitDegerler.AktifKullanici != null)
                {
                    OzgecmisDosya _ozgecmisDosya = JsonConvert.DeserializeObject<OzgecmisDosya>(ozgecmisDosya);

                    Table<OzgecmisDosya> tablo = new Table<OzgecmisDosya>();

                    _ozgecmisDosya.KullaniciID = SabitDegerler.AktifKullanici.ID;

                    tablo.Values = _ozgecmisDosya;

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
            else
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult OzgecmisDosyaSil(string ozgecmisDosya)
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                OzgecmisDosya _ozgecmisDosya = JsonConvert.DeserializeObject<OzgecmisDosya>(ozgecmisDosya);

                if (DosyaSil(_ozgecmisDosya.Guid) == true)
                {
                    Table<OzgecmisDosya> tablo = new Table<OzgecmisDosya>();
                    tablo.WhereList.Add(new Where(OzgecmisDosyaColumns.KullaniciID, SabitDegerler.AktifKullanici.ID));
                    tablo.WhereList.Add(new Where(OzgecmisDosyaColumns.Guid, _ozgecmisDosya.Guid));

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
                    return Json("dosya", JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult DosyaGonder()
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                var isim = Guider.GetGuid(5);
                var file = Request.Files[0];
                string fileextension = "." + file.FileName.Split('.')[1];
                string[] slist = new string[9] { ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".pps", ".ppsx" };

                if (slist.Contains(fileextension))
                {
                    var path = Path.Combine(Server.MapPath("~/Dosya/Aday/" + SabitDegerler.AktifKullanici.Guid + "/"), "dosya" + isim + fileextension);
                    file.SaveAs(path);

                    return Json("dosya" + isim + fileextension, JsonRequestBehavior.AllowGet);
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

        public bool DosyaSil(string kod)
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                Table<OzgecmisDosya> tablo = new Table<OzgecmisDosya>();
                tablo.WhereList.Add(new Where(OzgecmisDosyaColumns.KullaniciID, SabitDegerler.AktifKullanici.ID));
                tablo.WhereList.Add(new Where(OzgecmisDosyaColumns.Guid, kod));
                tablo.Select();

                if (tablo.HasData)
                {
                    string dosya = (tablo.Data as List<OzgecmisDosya>).FirstOrDefault().Dosya;

                    Metodlar.DosyaSil(Server.MapPath("~/Dosya/Aday/" + SabitDegerler.AktifKullanici.Guid + "/" + dosya));

                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }
    }
}
