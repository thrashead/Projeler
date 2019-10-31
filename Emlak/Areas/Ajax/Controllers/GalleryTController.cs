using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class GalleryTController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        readonly Kullanicilar curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Gallery"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_GalleryTLinkedSelect_Result> galeri = entity.usp_GalleryTLinkedSelect(null).ToList();

            return Json(galeri, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Insert(int? linkID)
        {
            if (!curUser.HasRight("Gallery", "i"))
                return Json(null, JsonRequestBehavior.AllowGet);

            GaleriDil galeri = new GaleriDil();

            List<usp_GallerySelect_Result> tableGallery = entity.usp_GallerySelect(null).ToList();
            galeri.GalleryList = tableGallery.ToSelectList("ID", "Title", linkID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            galeri.TranslationList = tableTranslation.ToSelectList("ID", "TransName");

            return Json(galeri, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] GaleriDil galeri)
        {
            if (!curUser.HasRight("Gallery", "i"))
                return Json(null);

            if (galeri.GalID > 0)
            {
                var result = entity.usp_GalleryTCheckInsert(galeri.GalID, galeri.TransID, galeri.GalleryName, galeri.ShortText1, galeri.ShortText2, galeri.Description).FirstOrDefault();

                if (result != null)
                {
                    curUser.Log(galeri, "i", "Galeriler (Dil)");

                    return Json(galeri);
                }
                else
                    galeri.Mesaj = "Kayýt eklenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                galeri.Mesaj = "Model uygun deðil.";

            List<usp_GallerySelect_Result> tableGallery = entity.usp_GallerySelect(null).ToList();
            galeri.GalleryList = tableGallery.ToSelectList("ID", "Title", galeri.GalID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            galeri.TranslationList = tableTranslation.ToSelectList("ID", "TransName", galeri.TransID);

            return Json(galeri);
        }

        [HttpGet]
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("Gallery", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_GalleryTSelectTop_Result table = entity.usp_GalleryTSelectTop(id, 1).FirstOrDefault();
            GaleriDil galeri = table.ChangeModel<GaleriDil>();

            List<usp_GallerySelect_Result> tableGallery = entity.usp_GallerySelect(null).ToList();
            galeri.GalleryList = tableGallery.ToSelectList("ID", "Title", galeri.GalID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            galeri.TranslationList = tableTranslation.ToSelectList("ID", "TransName", galeri.TransID);

            return Json(galeri, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] GaleriDil galeri)
        {
            if (!curUser.HasRight("Gallery", "u"))
                return Json(null);

            var result = entity.usp_GalleryTCheckUpdate(galeri.ID, galeri.GalID, galeri.TransID, galeri.GalleryName, galeri.ShortText1, galeri.ShortText2, galeri.Description).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(galeri, "u", "Galeriler (Dil)");

                return Json(galeri);
            }
            else
                galeri.Mesaj = "Kayýt düzenlenemedi veya ayný dilde zaten veri eklenmiþ.";

            List<usp_GallerySelect_Result> tableGallery = entity.usp_GallerySelect(null).ToList();
            galeri.GalleryList = tableGallery.ToSelectList("ID", "Title", galeri.GalID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            galeri.TranslationList = tableTranslation.ToSelectList("ID", "TransName", galeri.TransID);

            return Json(galeri);
        }

        [HttpGet]
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("Gallery", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_GalleryTDelete(id);

                curUser.Log(id, "d", "Galeriler (Dil)");

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
            if (!curUser.HasRight("Gallery", "r"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_GalleryTSetDeleted(id);

                curUser.Log(id, "r", "Galeriler (Dil)");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
