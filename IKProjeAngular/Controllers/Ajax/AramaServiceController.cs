using Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using TDLibrary;

namespace IKProjeAngular.Controllers.Ajax
{
    public class AramaServiceController : Controller
    {
        ikdbEntities entity = new ikdbEntities();

        [HttpGet]
        public JsonResult Calismalar(int[] kodlar, bool haric = false)
        {
            var calismalar = entity.CalismaTipi.Where(a => a.Aktif == true).OrderBy(a=> a.Kod).ToList();
            var calismalarTemp = new List<CalismaTipi>();

            if (haric)
            {
                calismalarTemp = calismalar;
            }

            if (kodlar != null)
            {
                for (int i = 0; i < kodlar.Length; i++)
                {
                    if (haric)
                    {
                        calismalarTemp = calismalarTemp.Where(a => a.Kod != kodlar[i]).ToList();
                    }
                    else
                    {
                        calismalarTemp = calismalar.Where(a => a.Kod == kodlar[i]).ToList();
                    }
                }

                calismalar = calismalarTemp;
            }

            return Json(calismalar, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Bolumler(int[] kodlar, bool haric = false)
        {
            var bolumler = entity.Bolum.Where(a => a.Aktif == true).OrderBy(a => a.Kod).ToList();
            var bolumlerTemp = new List<Bolum>();

            if (haric)
            {
                bolumlerTemp = bolumler;
            }

            if (kodlar != null)
            {
                for (int i = 0; i < kodlar.Length; i++)
                {
                    if (haric)
                    {
                        bolumlerTemp = bolumlerTemp.Where(a => a.Kod != kodlar[i]).ToList();
                    }
                    else
                    {
                        bolumlerTemp = bolumler.Where(a => a.Kod == kodlar[i]).ToList();
                    }
                }

                bolumler = bolumlerTemp;
            }

            List<BolumModel> liste = new List<BolumModel>();

            foreach (Bolum item in bolumler)
            {
                liste.Add(new BolumModel()
                {
                    Aktif = item.Aktif,
                    Baslik = item.Baslik,
                    Guid = item.Guid,
                    ID = item.ID,
                    Kod = item.Kod,
                });
            }

            return Json(liste, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Pozisyonlar(int[] kodlar, bool haric = false)
        {
            var pozisyonlar = entity.Pozisyon.Where(a => a.Aktif == true).OrderBy(a => a.Kod).ToList();
            var pozisyonlarTemp = new List<Pozisyon>();

            if (haric)
            {
                pozisyonlarTemp = pozisyonlar;
            }

            if (kodlar != null)
            {
                for (int i = 0; i < kodlar.Length; i++)
                {
                    if (haric)
                    {
                        pozisyonlarTemp = pozisyonlarTemp.Where(a => a.Kod != kodlar[i]).ToList();
                    }
                    else
                    {
                        pozisyonlarTemp = pozisyonlar.Where(a => a.Kod == kodlar[i]).ToList();
                    }
                }

                pozisyonlar = pozisyonlarTemp;
            }

            List<PozisyonModel> liste = new List<PozisyonModel>();

            foreach (Pozisyon item in pozisyonlar)
            {
                liste.Add(new PozisyonModel()
                {
                    Aktif = item.Aktif,
                    Baslik = item.Baslik,
                    Guid = item.Guid,
                    ID = item.ID,
                    Kod = item.Kod,
                });
            }

            return Json(liste, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Egitimler(int[] kodlar, bool haric = false)
        {
            var list = ((from a in entity.EgitimSeviye
                             join b in entity.OzgecmisGenel on a.ID equals b.Egitim
                             into temp
                             from b in temp.DefaultIfEmpty()
                              where a.Aktif == true
                             select new
                             {
                                 ID = a.ID == null ? 0 : a.ID,
                                 Aktif = a.Aktif == null ? false : a.Aktif,
                                 Baslik = a.Baslik == null ? "" : a.Baslik,
                                 Guid = a.Guid == null ? "" : a.Guid,
                                 Kod = a.Kod == null ? 0 : a.Kod
                             }).OrderBy(a => a.Kod).ToList());

            var egitimler = list.Select(a => new EgitimSeviye
            {
                ID = a.ID == null ? 0 : a.ID,
                Aktif = a.Aktif == null ? false : a.Aktif,
                Baslik = a.Baslik == null ? "" : a.Baslik,
                Guid = a.Guid == null ? "" : a.Guid,
                Kod = a.Kod == null ? 0 : a.Kod
            }).ToList();

            var egitimlerTemp = new List<EgitimSeviye>();

            if (haric)
            {
                egitimlerTemp = egitimler;
            }

            if (kodlar != null)
            {
                for (int i = 0; i < kodlar.Length; i++)
                {
                    if (haric)
                    {
                        egitimlerTemp = egitimlerTemp.Where(a => a.Kod != kodlar[i]).ToList();
                    }
                    else
                    {
                        egitimlerTemp = egitimler.Where(a => a.Kod == kodlar[i]).ToList();
                    }
                }

                egitimler = egitimlerTemp;
            }

            return Json(egitimler, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Sektorler(int[] kodlar, bool haric = false)
        {
            var sektorler = entity.Sektor.Where(a => a.Aktif == true).OrderBy(a => a.Kod).ToList();
            var sektorlerTemp = new List<Sektor>();

            if (haric)
            {
                sektorlerTemp = sektorler;
            }

            if (kodlar != null)
            {
                for (int i = 0; i < kodlar.Length; i++)
                {
                    if (haric)
                    {
                        sektorlerTemp = sektorlerTemp.Where(a => a.Kod != kodlar[i]).ToList();
                    }
                    else
                    {
                        sektorlerTemp = sektorler.Where(a => a.Kod == kodlar[i]).ToList();
                    }
                }

                sektorler = sektorlerTemp;
            }

            List<SektorModel> liste = new List<SektorModel>();

            foreach (Sektor item in sektorler)
            {
                liste.Add(new SektorModel()
                {
                    Aktif = item.Aktif,
                    Baslik = item.Baslik,
                    Guid = item.Guid,
                    ID = item.ID,
                    Kod = item.Kod,
                });
            }

            return Json(liste, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Tecrubeler(int[] kodlar, bool haric = false)
        {
            var tecrubeler = entity.Tecrube.Where(a => a.Aktif == true).OrderBy(a => a.Kod).ToList();
            var tecrubelerTemp = new List<Tecrube>();

            if (haric)
            {
                tecrubelerTemp = tecrubeler;
            }

            if (kodlar != null)
            {
                for (int i = 0; i < kodlar.Length; i++)
                {
                    if (haric)
                    {
                        tecrubelerTemp = tecrubelerTemp.Where(a => a.Kod != kodlar[i]).ToList();
                    }
                    else
                    {
                        tecrubelerTemp = tecrubeler.Where(a => a.Kod == kodlar[i]).ToList();
                    }
                }

                tecrubeler = tecrubelerTemp;
            }

            return Json(tecrubeler, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Guncellikler(int[] kodlar, bool haric = false)
        {
            var guncellik = entity.Guncellik.Where(a => a.Aktif == true).OrderBy(a => a.Kod).ToList();
            var guncellikTemp = new List<Guncellik>();

            if (haric)
            {
                guncellikTemp = guncellik;
            }

            if (kodlar != null)
            {
                for (int i = 0; i < kodlar.Length; i++)
                {
                    if (haric)
                    {
                        guncellikTemp = guncellikTemp.Where(a => a.Kod != kodlar[i]).ToList();
                    }
                    else
                    {
                        guncellikTemp = guncellik.Where(a => a.Kod == kodlar[i]).ToList();
                    }
                }

                guncellik = guncellikTemp;
            }

            return Json(guncellik, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult DigerSecenekler(int[] kodlar, bool haric = false)
        {
            var digersecenek = entity.DigerSecenek.Where(a => a.Aktif == true).OrderBy(a => a.Kod).ToList();
            var digersecenekTemp = new List<DigerSecenek>();

            if (haric)
            {
                digersecenekTemp = digersecenek;
            }

            if (kodlar != null)
            {
                for (int i = 0; i < kodlar.Length; i++)
                {
                    if (haric)
                    {
                        digersecenekTemp = digersecenekTemp.Where(a => a.Kod != kodlar[i]).ToList();
                    }
                    else
                    {
                        digersecenekTemp = digersecenek.Where(a => a.Kod == kodlar[i]).ToList();
                    }
                }

                digersecenek = digersecenekTemp;
            }

            return Json(digersecenek, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult SehirDon(string sehir)
        {
            switch (sehir)
            {
                case "Istanbul": sehir = "340"; break;
                case "Ankara": sehir = "6"; break;
                case "Izmir": sehir = "35"; break;
                case "Kocaeli": sehir = "41"; break;
                case "Antalya": sehir = "7"; break;
                case "Sivas": sehir = "58"; break;
                case "Kayseri": sehir = "38"; break;
                case "Konya": sehir = "42"; break;
                case "Trabzon": sehir = "61"; break;
                case "Bursa": sehir = "16"; break;
                case "Samsun": sehir = "55"; break;
                case "Manisa": sehir = "45"; break;
                case "Erzurum": sehir = "25"; break;
                case "Adana": sehir = "1"; break;
                case "Mersin": sehir = "33"; break;
                case "Diyarbakir": sehir = "21"; break;
                default: sehir = "340"; break;
            }

            return Json(sehir.ToInteger(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult CalismaDon(string tip)
        {
            switch (tip)
            {
                case "Tam-Zamanli": tip = "1"; break;
                case "Part-Time": tip = "4"; break;
                case "Freelance": tip = "3"; break;
                case "Donemsel": tip = "2"; break;
                case "Staj": tip = "5"; break;
                default: tip = "1"; break;
            }

            return Json(tip.ToInteger(), JsonRequestBehavior.AllowGet);
        }
    }
}