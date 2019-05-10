using Library;
using Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace IKProjeAngular.Controllers.Ajax
{
    public class IKServiceController : Controller
    {
        ikdbEntities entity = new ikdbEntities();

        [HttpGet]
        public JsonResult SirketLogolar()
        {
            var firmalar = entity.Firma.Where(a => a.Aktif == true && a.KullaniciAdi != "yonet").Take(18).ToList();

            return Json(firmalar, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult AktifKullanici()
        {
            return Json(SabitDegerler.AktifKullanici, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult AktifFirma()
        {
            return Json(SabitDegerler.AktifFirma, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GirisYontemi()
        {
            return Json(GirisYonetimi.Tip.ToString(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GirisDurum()
        {
            return Json(GirisYonetimi.Durum, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Sehirler(int[] kodlar, bool haric = false)
        {
            var sehirler = entity.Sehir.Where(a=> a.Aktif == true).OrderBy(a => a.Sira).ToList();
            var sehirlerTemp = new List<Sehir>();


            if (haric)
            {
                sehirlerTemp = sehirler;
            }

            if (kodlar != null)
            {
                for (int i = 0; i < kodlar.Length; i++)
                {
                    if (haric)
                    {
                        sehirlerTemp = sehirlerTemp.Where(a => a.Kod != kodlar[i]).ToList();
                    }
                    else
                    {
                        sehirlerTemp = sehirler.Where(a => a.Kod == kodlar[i]).ToList();
                    }
                }

                sehirler = sehirlerTemp;
            }

            sehirler = sehirlerTemp;

            List<SehirModel> liste = new List<SehirModel>();

            foreach (Sehir item in sehirler)
            {
                liste.Add(new SehirModel()
                {
                    Aktif = item.Aktif,
                    Goster = item.Goster,
                    Guid = item.Guid,
                    ID = item.ID,
                    Kod = item.Kod,
                    Sehir1 = item.Sehir1,
                    Sira = item.Sira,
                });
            }

            return Json(liste, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Sektorler(int[] kodlar, bool haric = false)
        {
            var sektorler = entity.Sektor.Where(a => a.Aktif == true).ToList();
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
        public JsonResult Cinsiyetler(int[] kodlar, bool haric = false)
        {
            var cinsiyetler = entity.Cinsiyet.Where(a => a.Aktif == true).ToList();
            var cinsiyetlerTemp = new List<Cinsiyet>();

            if (haric)
            {
                cinsiyetlerTemp = cinsiyetler;
            }

            if (kodlar != null)
            {
                for (int i = 0; i < kodlar.Length; i++)
                {
                    if (haric)
                    {
                        cinsiyetlerTemp = cinsiyetlerTemp.Where(a => a.Kod != kodlar[i]).ToList();
                    }
                    else
                    {
                        cinsiyetlerTemp = cinsiyetler.Where(a => a.Kod == kodlar[i]).ToList();
                    }
                }

                cinsiyetler = cinsiyetlerTemp;
            }

            List<CinsiyetModel> liste = new List<CinsiyetModel>();

            foreach (Cinsiyet item in cinsiyetler)
            {
                liste.Add(new CinsiyetModel()
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
    }
}