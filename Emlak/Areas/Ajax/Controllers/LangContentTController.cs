using System.Linq;
using System.Collections.Generic;
using System.Web.Mvc;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class LangContentTController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Translation"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_LangContentTLinkedSelect_Result> ceviri = entity.usp_LangContentTLinkedSelect(null).ToList();

            return Json(ceviri, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Insert(int? linkID)
        {
            if (!curUser.HasRight("Translation", "i"))
                return Json(null, JsonRequestBehavior.AllowGet);

            DilIcerikDil ceviri = new DilIcerikDil();

            List<usp_LangContentSelect_Result> tableLangContent = entity.usp_LangContentSelect(null).ToList();
            ceviri.LangContentList = tableLangContent.ToSelectList("ID", "Title", linkID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            ceviri.TranslationList = tableTranslation.ToSelectList("ID", "TransName");

            return Json(ceviri, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] DilIcerikDil ceviri)
        {
            if (!curUser.HasRight("Translation", "i"))
                return Json(null);

            if (ceviri.LangContID > 0)
            {
                var result = entity.usp_LangContentTInsert(ceviri.LangContID, ceviri.TransID, ceviri.Text).FirstOrDefault();

                if (result != null)
                {
                    curUser.Log(ceviri, "i", "Dil İçerik (Dil)");

                    return Json(ceviri);
                }
                else
                    ceviri.Mesaj = "Kayıt eklenemedi veya aynı dilde zaten veri eklenmiş.";
            }
            else
                ceviri.Mesaj = "Model uygun değil.";

            return Json(ceviri);
        }

        [HttpGet]
        public JsonResult Update(int? id)
        {
            if (!curUser.HasRight("Translation", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_LangContentTSelectTop_Result table = entity.usp_LangContentTSelectTop(id, 1).FirstOrDefault();

            DilIcerikDil ceviri = table.ChangeModel<DilIcerikDil>();

            List<usp_LangContentSelect_Result> tableLangContent = entity.usp_LangContentSelect(null).ToList();
            ceviri.LangContentList = tableLangContent.ToSelectList("ID", "Title", ceviri.LangContID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            ceviri.TranslationList = tableTranslation.ToSelectList("ID", "TransName", ceviri.TransID);

            return Json(ceviri, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] DilIcerikDil ceviri)
        {
            if (!curUser.HasRight("Translation", "u"))
                return Json(null);

            var result = entity.usp_LangContentTUpdate(ceviri.ID, ceviri.LangContID, ceviri.TransID, ceviri.Text).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(ceviri, "u", "Dil İçerik (Dil)");

                return Json(ceviri);
            }
            else
                ceviri.Mesaj = "Kayıt düzenlenemedi veya aynı dilde zaten veri eklenmiş.";

            List<usp_LangContentSelect_Result> tableLangContent = entity.usp_LangContentSelect(null).ToList();
            ceviri.LangContentList = tableLangContent.ToSelectList("ID", "Title", ceviri.LangContID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            ceviri.TranslationList = tableTranslation.ToSelectList("ID", "TransName", ceviri.TransID);

            return Json(ceviri);
        }

        [HttpGet]
        public JsonResult Copy(int id)
        {
            if (!curUser.HasRight("Translation", "c"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                var result = entity.usp_LangContentTCopy(id);

                if (result != null)
                    curUser.Log(id, "c", "Dil İçerik (Dil)");

                return Json(result == null ? false : true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult Delete(int? id)
        {
            if (!curUser.HasRight("Translation", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_LangContentDelete(id);

                curUser.Log(id, "d", "Dil İçerik (Dil)");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
