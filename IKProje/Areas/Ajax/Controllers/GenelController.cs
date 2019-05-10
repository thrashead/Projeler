using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using Lib;
using TDLibrary;
using Models.SehirModel;
using Models.SektorModel;
using Newtonsoft.Json;
using TDFramework;
using TDFramework.Common;

namespace IKProje.Areas.Ajax.Controllers
{
    public class GenelController : Controller
    {
        public JsonResult Sehirler(string sartlar)
        {
            SehirJson _sartlar = JsonConvert.DeserializeObject<SehirJson>(sartlar);
            List<string> sehirler = new List<string>();

            Table<Sehir> tablo = new Table<Sehir>();

            tablo.SelectSettings = new Select();

            if (_sartlar.IDyeGoreSirala == false)
            {
                tablo.SelectSettings.OrderColumn = SehirColumns.Sira;
            }

            if (_sartlar.SehirGetir != null)
            {
                if (_sartlar.SehirGetir.Length > 0)
                {
                    foreach (int item in _sartlar.SehirGetir)
                    {
                        tablo.WhereList.Add(new Where(SehirColumns.Kod, item));
                    }
                }
            }

            if (_sartlar.SehirGetirme != null)
            {
                if (_sartlar.SehirGetirme.Length > 0)
                {
                    foreach (int item in _sartlar.SehirGetirme)
                    {
                        tablo.WhereList.Add(new Where(SehirColumns.Kod, item, true));
                    }
                }
            }

            tablo.Select();

            if (tablo.HasData)
            {
                foreach (Sehir item in tablo.Data as List<Sehir>)
                {
                    sehirler.Add(item.SehirAdi + "," + item.Kod);
                }
            }

            return Json(sehirler);
        }
        public class SehirJson
        {
            public int[] SehirGetir { get; set; }
            public int[] SehirGetirme { get; set; }
            public bool IDyeGoreSirala { get; set; }
        }

        public JsonResult Sektorler()
        {
            List<string> sektorler = new List<string>();

            Table<Sektor> tablo = new Table<Sektor>();

            tablo.SelectSettings = new Select();

            tablo.Select();

            if (tablo.HasData)
            {
                foreach (Sektor item in tablo.Data as List<Sektor>)
                {
                    sektorler.Add(item.Baslik + "," + item.Kod);
                }
            }

            return Json(sektorler);
        }

        [HttpGet]
        public JsonResult SehirGetir(int sehirID)
        {
            return Json(Metodlar.SehirGetir(sehirID), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult SektorGetir(int sektorID)
        {
            return Json(Metodlar.SektorGetir(sektorID), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult BolumGetir(int bolumID)
        {
            return Json(Metodlar.BolumGetir(bolumID), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult PozisyonGetir(int pozisyonID)
        {
            return Json(Metodlar.PozisyonGetir(pozisyonID), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult SeviyeGetir(int seviyeID)
        {
            return Json(Metodlar.SeviyeGetir(seviyeID), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult BursGetir(int bursID)
        {
            return Json(Metodlar.BursGetir(bursID), JsonRequestBehavior.AllowGet);
        }
    }
}
