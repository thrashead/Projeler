using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;
using Emlaklar = Models.Emlak;

namespace Emlak.Areas.Ajax.Controllers
{
    public class RealEstatesController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Website"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_RealEstatesSelect_Result> emlak = entity.usp_RealEstatesSelect(null).ToList();

            return Json(emlak, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] Emlaklar emlak)
        {
            if (!curUser.HasRight("Website", "i"))
                return Json(null);

            emlak.Url = emlak.Baslik.ToUrl();

            var result = entity.usp_RealEstatesInsert(emlak.Baslik, emlak.Code, emlak.Fiyat, emlak.Yeni, emlak.GununEmlagi,
                emlak.Sehir, emlak.Ilce, emlak.Semt, emlak.Sahibi, emlak.OdaSayisi, emlak.KatSayisi, emlak.IsinmaTipi,
                emlak.SalonSayisi, emlak.BulunduguKat, emlak.YakitTipi, emlak.Alan, emlak.Durum, emlak.BinaYasi,
                emlak.ArkaCephe, emlak.OnCephe, emlak.CaddeyeYakin, emlak.DenizeSifir, emlak.DenizeYakin, emlak.Manzara,
                emlak.Merkezde, emlak.Metro, emlak.Otoban, emlak.TopluUlasim, emlak.Asansor, emlak.Bahce, emlak.Guvenlik,
                emlak.Hidrofor, emlak.Mantolama, emlak.Jenerator, emlak.Kapici, emlak.Satilik, emlak.Otopark, emlak.OyunParki,
                emlak.PVCDograma, emlak.SiteIci, emlak.YanginMerdiveni, emlak.YuzmeHavuzu, emlak.Alarm, emlak.Balkon, emlak.CelikKapi,
                emlak.GoruntuluDiafon, emlak.Jakuzi, emlak.KabloTVUydu, emlak.Klima, emlak.Active, emlak.Url, emlak.Enlem, emlak.Boylam, false).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(emlak, "i", "Emlaklar");

                return Json(emlak);
            }
            else
                emlak.Mesaj = "Kayýt eklenemedi.";

            return Json(emlak);
        }

        [HttpGet]
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("Website", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_RealEstatesSelectTop_Result table = entity.usp_RealEstatesSelectTop(id, 1).FirstOrDefault();

            Emlaklar emlak = table.ChangeModel<Emlaklar>();

            List<usp_RealEstatesTByLinkedIDSelect_Result> emlakDilList = entity.usp_RealEstatesTByLinkedIDSelect(id).ToList();
            emlak.RealEstatesTList.AddRange(emlakDilList.ChangeModelList<EmlakDil, usp_RealEstatesTByLinkedIDSelect_Result>());

            return Json(emlak, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] Emlaklar emlak)
        {
            if (!curUser.HasRight("Website", "u"))
                return Json(null);

            emlak.Url = emlak.Baslik.ToUrl();

            var result = entity.usp_RealEstatesUpdate(emlak.ID, emlak.Baslik, emlak.Code, emlak.Fiyat, emlak.Yeni, emlak.GununEmlagi,
                emlak.Sehir, emlak.Ilce, emlak.Semt, emlak.Sahibi, emlak.OdaSayisi, emlak.KatSayisi, emlak.IsinmaTipi,
                emlak.SalonSayisi, emlak.BulunduguKat, emlak.YakitTipi, emlak.Alan, emlak.Durum, emlak.BinaYasi,
                emlak.ArkaCephe, emlak.OnCephe, emlak.CaddeyeYakin, emlak.DenizeSifir, emlak.DenizeYakin, emlak.Manzara,
                emlak.Merkezde, emlak.Metro, emlak.Otoban, emlak.TopluUlasim, emlak.Asansor, emlak.Bahce, emlak.Guvenlik,
                emlak.Hidrofor, emlak.Mantolama, emlak.Jenerator, emlak.Kapici, emlak.Satilik, emlak.Otopark, emlak.OyunParki,
                emlak.PVCDograma, emlak.SiteIci, emlak.YanginMerdiveni, emlak.YuzmeHavuzu, emlak.Alarm, emlak.Balkon, emlak.CelikKapi,
                emlak.GoruntuluDiafon, emlak.Jakuzi, emlak.KabloTVUydu, emlak.Klima, emlak.Active, emlak.Url, emlak.Enlem, emlak.Boylam, false).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(emlak, "u", "Emlaklar");

                return Json(emlak);
            }
            else
                emlak.Mesaj = "Kayýt düzenlenemedi.";

            List<usp_RealEstatesTByLinkedIDSelect_Result> emlakDilList = entity.usp_RealEstatesTByLinkedIDSelect(emlak.ID).ToList();
            emlak.RealEstatesTList.AddRange(emlakDilList.ChangeModelList<EmlakDil, usp_RealEstatesTByLinkedIDSelect_Result>());

            return Json(emlak);
        }

        [HttpGet]
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("Website", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_RealEstatesCheckDelete(id);

                curUser.Log(id, "d", "Emlaklar");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult Remove(int id)
        {
            if (!curUser.HasRight("Website", "r"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_RealEstatesCheckSetDeleted(id);

                curUser.Log(id, "r", "Emlaklar");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult Copy(int id)
        {
            if (!curUser.HasRight("Website", "c"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                var result = entity.usp_RealEstatesCopy(id);

                if (result != null)
                    curUser.Log(id, "c", "Emlaklar");

                return Json(result == null ? false : true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
