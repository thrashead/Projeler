using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;
using Emlaklar = Models.Emlak;

namespace Emlak.Areas.Admin.Controllers
{
    public class EmlakController : Controller
    {
        readonly EmlakEntities _entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Emlak"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_RealEstatesSelect_Result> emlak = _entity.usp_RealEstatesSelect(null).ToList();

            curUser.Log<Emlaklar>(null, "s", "Emlaklar");

            return View(emlak);
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("Emlak", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            Emlaklar emlak = new Emlaklar();

            return View(emlak);
        }

        [HttpPost]
        public ActionResult Ekle(Emlaklar emlak)
        {
            if (!curUser.HasRight("Emlak", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                emlak.Url = emlak.Baslik.ToHyperLinkText();

                var result = _entity.usp_RealEstatesInsert(emlak.Baslik, emlak.Code, emlak.Fiyat, emlak.Yeni, emlak.GununEmlagi,
                    emlak.Sehir, emlak.Ilce, emlak.Semt, emlak.Sahibi, emlak.OdaSayisi, emlak.KatSayisi, emlak.IsinmaTipi, 
                    emlak.SalonSayisi, emlak.BulunduguKat, emlak.YakitTipi, emlak.Alan, emlak.Durum, emlak.BinaYasi,
                    emlak.ArkaCephe, emlak.OnCephe, emlak.CaddeyeYakin, emlak.DenizeSifir, emlak.DenizeYakin, emlak.Manzara,
                    emlak.Merkezde, emlak.Metro, emlak.Otoban, emlak.TopluUlasim, emlak.Asansor, emlak.Bahce, emlak.Guvenlik,
                    emlak.Hidrofor, emlak.Mantolama, emlak.Jenerator, emlak.Kapici, emlak.Satilik, emlak.Otopark, emlak.OyunParki,
                    emlak.PVCDograma, emlak.SiteIci, emlak.YanginMerdiveni, emlak.YuzmeHavuzu, emlak.Alarm, emlak.Balkon, emlak.CelikKapi,
                    emlak.GoruntuluDiafon, emlak.Jakuzi, emlak.KabloTVUydu, emlak.Klima, emlak.Active, emlak.Url, emlak.Enlem, emlak.Boylam, false);

                if (result != null)
                {
                    curUser.Log(emlak, "i", "Emlaklar");

                    return RedirectToAction("Index");
                }
                else
                    emlak.Mesaj = "Kayýt eklenemedi.";
            }
            else
                emlak.Mesaj = "Model uygun deðil.";

            return View("Ekle", emlak);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Emlak", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            usp_RealEstatesSelectTop_Result table = _entity.usp_RealEstatesSelectTop(id, 1).FirstOrDefault();
            Emlaklar emlak = table.ChangeModel<Emlaklar>();

            List<usp_RealEstatesTByLinkedIDSelect_Result> emlakDilList = _entity.usp_RealEstatesTByLinkedIDSelect(id).ToList();
            emlak.RealEstatesTList.AddRange(emlakDilList.ChangeModelList<EmlakDil, usp_RealEstatesTByLinkedIDSelect_Result>());

            return View(emlak);
        }

        [HttpPost]
        public ActionResult Duzenle(Emlaklar emlak)
        {
            if (!curUser.HasRight("Emlak", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                emlak.Url = emlak.Baslik.ToHyperLinkText();

                var result = _entity.usp_RealEstatesUpdate(emlak.ID, emlak.Baslik, emlak.Code, emlak.Fiyat, emlak.Yeni, emlak.GununEmlagi,
                    emlak.Sehir, emlak.Ilce, emlak.Semt, emlak.Sahibi, emlak.OdaSayisi, emlak.KatSayisi, emlak.IsinmaTipi,
                    emlak.SalonSayisi, emlak.BulunduguKat, emlak.YakitTipi, emlak.Alan, emlak.Durum, emlak.BinaYasi,
                    emlak.ArkaCephe, emlak.OnCephe, emlak.CaddeyeYakin, emlak.DenizeSifir, emlak.DenizeYakin, emlak.Manzara,
                    emlak.Merkezde, emlak.Metro, emlak.Otoban, emlak.TopluUlasim, emlak.Asansor, emlak.Bahce, emlak.Guvenlik,
                    emlak.Hidrofor, emlak.Mantolama, emlak.Jenerator, emlak.Kapici, emlak.Satilik, emlak.Otopark, emlak.OyunParki,
                    emlak.PVCDograma, emlak.SiteIci, emlak.YanginMerdiveni, emlak.YuzmeHavuzu, emlak.Alarm, emlak.Balkon, emlak.CelikKapi,
                    emlak.GoruntuluDiafon, emlak.Jakuzi, emlak.KabloTVUydu, emlak.Klima, emlak.Active, emlak.Url, emlak.Enlem, emlak.Boylam, false);

                if (result != null)
                {
                    curUser.Log(emlak, "u", "Emlaklar");

                    return RedirectToAction("Index");
                }
                else
                    emlak.Mesaj = "Kayýt düzenlenemedi.";
            }
            else
                emlak.Mesaj = "Model uygun deðil.";

            List<usp_RealEstatesTByLinkedIDSelect_Result> emlakDilList = _entity.usp_RealEstatesTByLinkedIDSelect(emlak.ID).ToList();
            emlak.RealEstatesTList.AddRange(emlakDilList.ChangeModelList<EmlakDil, usp_RealEstatesTByLinkedIDSelect_Result>());

            return View("Duzenle", emlak);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            try
            {
                if (curUser.HasRight("Emlak", "d"))
                {
                    _entity.usp_RealEstatesCheckSetDeleted(id);

                    curUser.Log(id, "d", "Emlaklar");

                    return Json(true);
                }
            }
            catch
            {
                return Json(false);
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kaldir(int id)
        {
            try
            {
                if (curUser.HasRight("Emlak", "rd"))
                {
                    _entity.usp_RealEstatesCheckDelete(id);

                    curUser.Log(id, "rd", "Emlaklar");

                    return Json(true);
                }
            }
            catch
            {
                return Json(false);
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kopyala(int id)
        {
            try
            {
                if (curUser.HasRight("Emlak", "c"))
                {
                    var result = _entity.usp_RealEstatesCopy(id);

                    if (result != null)
                        curUser.Log(id, "c", "Emlaklar");

                    return Json(result == null ? false : true);
                }
            }
            catch
            {
                return Json(false);
            }

            return Json(false);
        }
    }
}
