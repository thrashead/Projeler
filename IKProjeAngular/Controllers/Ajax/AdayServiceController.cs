using Library;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Web.Mvc;
using TDLibrary;

namespace IKProjeAngular.Controllers.Ajax
{
    public class AdayServiceController : Controller
    {
        ikdbEntities entity = new ikdbEntities();

        [HttpGet]
        public JsonResult GirisYap(string aday)
        {
            Kullanici _aday = JsonConvert.DeserializeObject<Kullanici>(aday);

            string sifre = _aday.Sifre.ToMD5();

            var kullanici = entity.Kullanici.Where(a => a.KullaniciAdi == _aday.KullaniciAdi && a.Sifre == sifre).FirstOrDefault();

            if (kullanici != null)
            {
                DateTime zaman = DateTime.Now;

                var updKullanici = entity.Kullanici.Find(kullanici.ID);
                updKullanici.SonGiris = zaman;
                entity.SaveChanges();

                System.Web.HttpContext.Current.Session["Aday"] = kullanici;

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult KayitliAramalar()
        {
            var aramalar = entity.AramaKayit.Where(a => a.Aktif == true && a.KullaniciID == SabitDegerler.AktifKullanici.ID).ToList();

            return Json(aramalar, JsonRequestBehavior.AllowGet);
        }
    }
}