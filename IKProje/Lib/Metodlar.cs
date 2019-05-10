using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Lib;
using TDLibrary;
using TDFramework;
using TDFramework.Common;
using Models.KullaniciModel;
using Models.FirmaModel;
using Models.SehirModel;
using Models.SektorModel;
using Models.DepartmanModel;
using Models.PozisyonModel;
using Models.OzgecmisGenelModel;
using Models.EgitimSeviyeModel;
using Models.EgitimBursModel;
using Models.MaasModel;
using Models.FirmaIlanModel;

namespace Lib
{
    public class Metodlar
    {
        public static void DosyaSil(string yol)
        {
            File.Delete(yol);
        }

        public static bool KullaniciBilgiKontrol(string kullaniciadi, string eposta, string telefon, int? id = null)
        {
            Table<Kullanici> tablo = new Table<Kullanici>();
            tablo.WhereList.Add(new Where(KullaniciColumns.KullaniciAdi, kullaniciadi, new Parantheses() { OpenCount = 1 }));
            tablo.WhereList.Add(new Where(KullaniciColumns.Eposta, eposta, Knots.OR));
            tablo.WhereList.Add(new Where(KullaniciColumns.Telefon, telefon, Knots.OR, new Parantheses() { ClosedCount = 1 }));

            if (id != null)
            {
                tablo.WhereList.Add(new Where(KullaniciColumns.ID, id, true));
            }

            tablo.Select();

            if (tablo.HasData)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public static bool FirmaBilgiKontrol(string kullaniciadi, string eposta, string telefon, string ceptel, long tckimlikno, int? id = null)
        {
            Table<Firma> tablo = new Table<Firma>();
            tablo.WhereList.Add(new Where(FirmaColumns.KullaniciAdi, kullaniciadi, new Parantheses() { OpenCount = 1 }));
            tablo.WhereList.Add(new Where(FirmaColumns.Eposta, eposta, Knots.OR));
            tablo.WhereList.Add(new Where(FirmaColumns.Telefon, telefon, Knots.OR));
            tablo.WhereList.Add(new Where(FirmaColumns.CepTelefon, ceptel, Knots.OR));
            tablo.WhereList.Add(new Where(FirmaColumns.TCKimlikNo, tckimlikno, Knots.OR, new Parantheses() { ClosedCount = 1 }));

            if (id != null)
            {
                tablo.WhereList.Add(new Where(FirmaColumns.ID, id, true));
            }

            tablo.Select();

            if (tablo.HasData)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public static string SehirGetir(int sehirID)
        {
            Table<Sehir> tablo = new Table<Sehir>();
            tablo.WhereList.Add(new Where(SehirColumns.Kod, sehirID));
            tablo.SelectSettings.Top = 1;
            tablo.Columns = SehirColumns.SehirAdi;
            tablo.Select();

            if (tablo.HasData)
            {
                return (tablo.Data as List<Sehir>).FirstOrDefault().SehirAdi;
            }
            else
            {
                return null;
            }
        }

        public static string SektorGetir(int sektorID)
        {
            Table<Sektor> tablo = new Table<Sektor>();
            tablo.WhereList.Add(new Where(SektorColumns.Kod, sektorID));
            tablo.SelectSettings.Top = 1;
            tablo.Columns = SektorColumns.Baslik;
            tablo.Select();

            if (tablo.HasData)
            {
                return (tablo.Data as List<Sektor>).FirstOrDefault().Baslik;
            }
            else
            {
                return null;
            }
        }

        public static string BolumGetir(int bolumID)
        {
            Table<Departman> tablo = new Table<Departman>();
            tablo.WhereList.Add(new Where(DepartmanColumns.Kod, bolumID));
            tablo.SelectSettings.Top = 1;
            tablo.Columns = DepartmanColumns.Baslik;
            tablo.Select();

            if (tablo.HasData)
            {
                return (tablo.Data as List<Departman>).FirstOrDefault().Baslik;
            }
            else
            {
                return null;
            }
        }

        public static string PozisyonGetir(int pozisyonID)
        {
            Table<Pozisyon> tablo = new Table<Pozisyon>();
            tablo.WhereList.Add(new Where(PozisyonColumns.Kod, pozisyonID));
            tablo.SelectSettings.Top = 1;
            tablo.Columns = PozisyonColumns.Baslik;
            tablo.Select();

            if (tablo.HasData)
            {
                return (tablo.Data as List<Pozisyon>).FirstOrDefault().Baslik;
            }
            else
            {
                return null;
            }
        }

        public static string SeviyeGetir(int seviyeID)
        {
            Table<EgitimSeviye> tablo = new Table<EgitimSeviye>();
            tablo.WhereList.Add(new Where(EgitimSeviyeColumns.ID, seviyeID));
            tablo.SelectSettings.Top = 1;
            tablo.Columns = EgitimSeviyeColumns.Baslik;
            tablo.Select();

            if (tablo.HasData)
            {
                return (tablo.Data as List<EgitimSeviye>).FirstOrDefault().Baslik;
            }
            else
            {
                return null;
            }
        }

        public static string BursGetir(int bursID)
        {
            Table<EgitimBurs> tablo = new Table<EgitimBurs>();
            tablo.WhereList.Add(new Where(EgitimBursColumns.ID, bursID));
            tablo.SelectSettings.Top = 1;
            tablo.Columns = EgitimBursColumns.Baslik;
            tablo.Select();

            if (tablo.HasData)
            {
                return (tablo.Data as List<EgitimBurs>).FirstOrDefault().Baslik;
            }
            else
            {
                return null;
            }
        }

        public static int EgitimSeviyeGetir()
        {
            Table<OzgecmisGenel> tablo = new Table<OzgecmisGenel>();
            tablo.WhereList.Add(new Where(OzgecmisGenelColumns.KullaniciID, SabitDegerler.AktifKullanici.ID));
            tablo.SelectSettings.Top = 1;
            tablo.Columns = OzgecmisGenelColumns.Egitim;
            tablo.Select();

            if (tablo.HasData)
            {
                return (tablo.Data as List<OzgecmisGenel>).FirstOrDefault().Egitim;
            }
            else
            {
                return 0;
            }
        }

        //Statikler

        public static string CinsiyetGetir(int cinsID)
        {
            if (cinsID == 1)
            {
                return "Bay";
            }
            else if (cinsID == 2)
            {
                return "Bayan";
            }
            else
            {
                return null;
            }
        }

        public static string MedeniHalGetir(int mhID)
        {
            if (mhID == 1)
            {
                return "Bekar";
            }
            else if (mhID == 2)
            {
                return "Evli";
            }
            else
            {
                return null;
            }
        }

        public static string AskerlikGetir(int askerID)
        {
            if (askerID == 1)
            {
                return "Yapılmadı";
            }
            else if (askerID == 2)
            {
                return "Muaf";
            }
            else if (askerID == 3)
            {
                return "Yapıldı";
            }
            else
            {
                return null;
            }
        }

        public static string CalismaDurumuGetir(int calisID)
        {
            if (calisID == 1)
            {
                return "Çalışmıyor";
            }
            else if (calisID == 2)
            {
                return "Çalışıyor";
            }
            else
            {
                return null;
            }
        }

        public static string ToplamDeneyimGetir(int tdID)
        {
            if (tdID == 1)
            {
                return "0-1 Yıl";
            }
            else if (tdID == 2)
            {
                return "1-3 Yıl";
            }
            else if (tdID == 3)
            {
                return "3-5 Yıl";
            }
            else if (tdID == 4)
            {
                return "5-10 Yıl";
            }
            else if (tdID == 5)
            {
                return "10+ Yıl";
            }
            else
            {
                return null;
            }
        }

        public static string MaasGetir(int maasKod)
        {
            Table<Maas> tabloMaas = new Table<Maas>();
            tabloMaas.WhereList.Add(new Where() { Column = MaasColumns.Kod, Values = new List<dynamic>() { maasKod } });
            tabloMaas.SelectSettings.Top = 1;
            tabloMaas.Select();

            if(tabloMaas.HasData)
            {
                return (tabloMaas.Data as List<Maas>).FirstOrDefault().Baslik;
            }
            else
            {
                return null;
            }
        }

        public static int IlanIDGetir(string ilanNo)
        {
            Table<FirmaIlan> tablo = new Table<FirmaIlan>();
            tablo.WhereList.Add(new Where(FirmaIlanColumns.IlanNo, ilanNo));
            tablo.SelectSettings.Top = 1;
            tablo.Columns = FirmaIlanColumns.ID;
            tablo.Select();

            if (tablo.HasData)
            {
                return (tablo.Data as List<FirmaIlan>).FirstOrDefault().ID;
            }
            else
            {
                return 0;
            }
        }
    }
}