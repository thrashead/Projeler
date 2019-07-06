using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class EmlakDilController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Emlak"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_RealEstatesTLinkedSelect_Result> emlak = entity.usp_RealEstatesTLinkedSelect(null).ToList();

            return Json(emlak, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Ekle(string realID)
        {
            if (!curUser.HasRight("Emlak", "i"))
                return Json(null, JsonRequestBehavior.AllowGet);

            int linkID = realID == null ? 0 : realID.ToInteger();

            EmlakDil emlak = new EmlakDil();

            List<RealEstates> tableEmlak = entity.RealEstates.ToList();
            emlak.RealEstatesList = tableEmlak.ToSelectList("ID", "Baslik", linkID);

            List<Translation> tableTranslation = entity.Translation.ToList();
            emlak.TranslationList = tableTranslation.ToSelectList("ID", "TransName");

            return Json(emlak, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Ekle([System.Web.Http.FromBody] EmlakDil emlak)
        {
            if (!curUser.HasRight("Emlak", "i"))
                return Json(null);

            if (emlak.RealEsID > 0)
            {
                var result = entity.usp_RealEstatesTCheckInsert(emlak.RealEsID, emlak.TransID, emlak.Baslik, emlak.Code, emlak.Aciklama).FirstOrDefault();

                if (result != null)
                {
                    curUser.Log(emlak, "i", "Emlaklar (Dil)");

                    return Json(emlak);
                }
                else
                    emlak.Mesaj = "Kayýt eklenemedi veya ayný dilde zaten kayýt eklenmiþ.";
            }
            else
                emlak.Mesaj = "Model uygun deðil.";

            List<RealEstates> tableEmlak = entity.RealEstates.ToList();
            emlak.RealEstatesList = tableEmlak.ToSelectList("ID", "Baslik", emlak.RealEsID);

            List<Translation> tableTranslation = entity.Translation.ToList();
            emlak.TranslationList = tableTranslation.ToSelectList("ID", "TransName", emlak.TransID);

            return Json(emlak);
        }

        [HttpGet]
        public JsonResult Duzenle(int id)
        {
            if (!curUser.HasRight("Emlak", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_RealEstatesTSelectTop_Result table = entity.usp_RealEstatesTSelectTop(id, 1).FirstOrDefault();
            EmlakDil emlak = table.ChangeModel<EmlakDil>();

            List<RealEstates> tableEmlak = entity.RealEstates.ToList();
            emlak.RealEstatesList = tableEmlak.ToSelectList("ID", "Baslik", emlak.RealEsID);

            List<Translation> tableTranslation = entity.Translation.ToList();
            emlak.TranslationList = tableTranslation.ToSelectList("ID", "TransName", emlak.TransID);

            return Json(emlak, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Duzenle([System.Web.Http.FromBody] EmlakDil emlak)
        {
            if (!curUser.HasRight("Emlak", "u"))
                return Json(null);

            var result = entity.usp_RealEstatesTCheckUpdate(emlak.ID, emlak.RealEsID, emlak.TransID, emlak.Baslik, emlak.Code, emlak.Aciklama).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(emlak, "u", "Emlaklar (Dil)");

                return Json(emlak);
            }
            else
                emlak.Mesaj = "Kayýt düzenlenemedi veya ayný dilde zaten kayýt eklenmiþ.";

            List<RealEstates> tableEmlak = entity.RealEstates.ToList();
            emlak.RealEstatesList = tableEmlak.ToSelectList("ID", "Baslik", emlak.RealEsID);

            List<Translation> tableTranslation = entity.Translation.ToList();
            emlak.TranslationList = tableTranslation.ToSelectList("ID", "TransName", emlak.TransID);

            return Json(emlak);
        }

        [HttpGet]
        public JsonResult Sil(int id)
        {
            if (!curUser.HasRight("Emlak", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_RealEstatesTSetDeleted(id);

                curUser.Log(id, "d", "Emlaklar (Dil)");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult Kaldir(int id)
        {
            if (!curUser.HasRight("Emlak", "rd"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_RealEstatesTDelete(id);

                curUser.Log(id, "rd", "Emlaklar (Dil)");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
