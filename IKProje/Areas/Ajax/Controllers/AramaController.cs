using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using TDFramework;
using TDFramework.Common;
using Models.AramaKayitModel;
using TDLibrary;
using Lib;

namespace IKProje.Areas.Ajax.Controllers
{
    public class AramaController : Controller
    {
        public JsonResult Kayit(string arama)
        {
            AramaKayit _arama = JsonConvert.DeserializeObject<AramaKayit>(arama);

            Table<AramaKayit> tablo = new Table<AramaKayit>();

            tablo.Values = new AramaKayit()
            {
                Aktif = true,
                Baslik = _arama.Baslik,
                CalismaTipi = _arama.CalismaTipi,
                Cinsiyet = _arama.Cinsiyet,
                Departman = _arama.Departman,
                Diger = _arama.Diger,
                Egitim = _arama.Egitim,
                Guid = Guider.GetGuid(25),
                KullaniciID = SabitDegerler.AktifKullanici.ID,
                Pozisyon = _arama.Pozisyon,
                Sehir = _arama.Sehir,
                Sektor = _arama.Sektor,
                Sozcuk = _arama.Sozcuk,
                SozcukTumu = _arama.SozcukTumu,
                Tarih = _arama.Tarih,
                Tecrube = _arama.Tecrube
            };

            tablo.Insert(true);

            if (tablo.Error == null)
            {
                return Json(tablo.Data.ToString());
            }
            else
            {
                return Json(false);
            }
        }

        public JsonResult Getir(int searchID)
        {
            Table<AramaKayit> tablo = new Table<AramaKayit>();

            tablo.WhereList.Add(new Where() { Column = AramaKayitColumns.ID, Values = new List<dynamic>() { searchID } });
            tablo.WhereList.Add(new Where() { Column = AramaKayitColumns.Aktif, Values = new List<dynamic>() { true } });
            tablo.WhereList.Add(new Where() { Column = AramaKayitColumns.KullaniciID, Values = new List<dynamic>() { SabitDegerler.AktifKullanici.ID } });

            tablo.SelectSettings.Top = 1;

            tablo.Select();

            if (tablo.HasData)
            {
                return Json(((List<AramaKayit>)tablo.Data).FirstOrDefault() as AramaKayit);
            }
            else
            {
                return Json(null);
            }
        }

        public JsonResult Sil(int searchID)
        {
            Table<AramaKayit> tablo = new Table<AramaKayit>();

            tablo.WhereList.Add(new Where() { Column = AramaKayitColumns.ID, Values = new List<dynamic>() { searchID } });
            tablo.WhereList.Add(new Where() { Column = AramaKayitColumns.KullaniciID, Values = new List<dynamic>() { SabitDegerler.AktifKullanici.ID } });

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
    }
}
