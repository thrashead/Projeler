using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class CategoryTController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        readonly Kullanicilar curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Category"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_CategoryTLinkedSelect_Result> kategori = entity.usp_CategoryTLinkedSelect(null).ToList();

            return Json(kategori, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Insert(int? linkID)
        {
            if (!curUser.HasRight("Category", "i"))
                return Json(null, JsonRequestBehavior.AllowGet);

            KategoriDil kategori = new KategoriDil();

            List<usp_CategorySelect_Result> tableCategory = entity.usp_CategorySelect(null).ToList();
            kategori.CategoryList = tableCategory.ToSelectList("ID", "Title", linkID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            kategori.TranslationList = tableTranslation.ToSelectList("ID", "TransName");

            return Json(kategori, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] KategoriDil kategori)
        {
            if (!curUser.HasRight("Category", "i"))
                return Json(null);

            if (kategori.CatID > 0)
            {
                var result = entity.usp_CategoryTCheckInsert(kategori.CatID, kategori.TransID, kategori.CategoryName, kategori.ShortText1, kategori.ShortText2, kategori.Description).FirstOrDefault();

                if (result != null)
                {
                    curUser.Log(kategori, "i", "Kategoriler (Dil)");

                    return Json(kategori);
                }
                else
                    kategori.Mesaj = "Kayýt eklenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                kategori.Mesaj = "Model uygun deðil.";

            List<usp_CategorySelect_Result> tableCategory = entity.usp_CategorySelect(null).ToList();
            kategori.CategoryList = tableCategory.ToSelectList("ID", "Title", kategori.CatID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            kategori.TranslationList = tableTranslation.ToSelectList("ID", "TransName", kategori.TransID);

            return Json(kategori);
        }

        [HttpGet]
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("Category", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_CategoryTSelectTop_Result table = entity.usp_CategoryTSelectTop(id, 1).FirstOrDefault();

            KategoriDil kategori = table.ChangeModel<KategoriDil>();

            List<usp_CategorySelect_Result> tableCategory = entity.usp_CategorySelect(null).ToList();
            kategori.CategoryList = tableCategory.ToSelectList("ID", "Title", kategori.CatID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            kategori.TranslationList = tableTranslation.ToSelectList("ID", "TransName", kategori.TransID);

            return Json(kategori, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] KategoriDil kategori)
        {
            if (!curUser.HasRight("Category", "u"))
                return Json(null);

            var result = entity.usp_CategoryTCheckUpdate(kategori.ID, kategori.CatID, kategori.TransID, kategori.CategoryName, kategori.ShortText1, kategori.ShortText2, kategori.Description).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(kategori, "u", "Kategoriler (Dil)");

                return Json(kategori);
            }
            else
                kategori.Mesaj = "Kayýt düzenlenemedi veya ayný dilde zaten veri eklenmiþ.";

            List<usp_CategorySelect_Result> tableCategory = entity.usp_CategorySelect(null).ToList();
            kategori.CategoryList = tableCategory.ToSelectList("ID", "Title", kategori.CatID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            kategori.TranslationList = tableTranslation.ToSelectList("ID", "TransName", kategori.TransID);

            return Json(kategori);
        }

        [HttpGet]
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("Category", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_CategoryTDelete(id);

                curUser.Log(id, "d", "Kategoriler (Dil)");

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
            if (!curUser.HasRight("Category", "r"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_CategoryTSetDeleted(id);

                curUser.Log(id, "r", "Kategoriler (Dil)");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
