using Newtonsoft.Json;
using System;
using System.Linq;
using System.Web.Mvc;
using TDLibrary;

namespace IKProjeAngular.Controllers.Ajax
{
    public class SirketServiceController : Controller
    {
        ikdbEntities entity = new ikdbEntities();

        [HttpGet]
        public JsonResult GirisYap(string sirket)
        {
            Firma _sirket = JsonConvert.DeserializeObject<Firma>(sirket);

            string sifre = _sirket.Sifre.ToMD5();

            var firma = entity.Firma.Where(a => a.KullaniciAdi == _sirket.KullaniciAdi && a.Sifre == sifre).FirstOrDefault();

            if (firma != null)
            {
                DateTime zaman = DateTime.Now;

                var updFirma = entity.Firma.Find(firma.ID);
                updFirma.SonGiris = zaman;
                entity.SaveChanges();

                System.Web.HttpContext.Current.Session["Sirket"] = firma;

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }
    }
}