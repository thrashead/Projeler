using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class MetaTController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Meta"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_MetaTLinkedSelect_Result> meta = entity.usp_MetaTLinkedSelect(null).ToList();

            return Json(meta, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Insert(int? linkID)
        {
            if (!curUser.HasRight("Meta", "i"))
                return Json(null, JsonRequestBehavior.AllowGet);

            MetalarDil meta = new MetalarDil();

            List<usp_MetaSelect_Result> tableMeta = entity.usp_MetaSelect(null).ToList();
            meta.MetaList = tableMeta.ToSelectList("ID", "Title", linkID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            meta.TranslationList = tableTranslation.ToSelectList("ID", "TransName");

            return Json(meta, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] MetalarDil meta)
        {
            if (!curUser.HasRight("Meta", "i"))
                return Json(null);

            if (meta.MetaID > 0)
            {
                var result = entity.usp_MetaTCheckInsert(meta.MetaID, meta.TransID, meta.Name, meta.Content).FirstOrDefault();

                if (result != null)
                {
                    curUser.Log(meta, "i", "Metalar (Dil)");

                    return Json(meta);
                }
                else
                    meta.Mesaj = "Kayýt eklenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                meta.Mesaj = "Model uygun deðil.";

            List<usp_MetaSelect_Result> tableMeta = entity.usp_MetaSelect(null).ToList();
            meta.MetaList = tableMeta.ToSelectList("ID", "Title", meta.MetaID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            meta.TranslationList = tableTranslation.ToSelectList("ID", "TransName", meta.TransID);

            return Json(meta);
        }

        [HttpGet]
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("Meta", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_MetaTSelectTop_Result table = entity.usp_MetaTSelectTop(id, 1).FirstOrDefault();

            MetalarDil meta = table.ChangeModel<MetalarDil>();

            List<usp_MetaSelect_Result> tableMeta = entity.usp_MetaSelect(null).ToList();
            meta.MetaList = tableMeta.ToSelectList("ID", "Title", meta.MetaID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            meta.TranslationList = tableTranslation.ToSelectList("ID", "TransName", meta.TransID);

            return Json(meta, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] MetalarDil meta)
        {
            if (!curUser.HasRight("Meta", "u"))
                return Json(null);

            var result = entity.usp_MetaTCheckUpdate(meta.ID, meta.MetaID, meta.TransID, meta.Name, meta.Content).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(meta, "u", "Metalar (Dil)");

                return Json(meta);
            }
            else
                meta.Mesaj = "Kayýt düzenlenemedi veya ayný dilde zaten veri eklenmiþ.";

            List<usp_MetaSelect_Result> tableMeta = entity.usp_MetaSelect(null).ToList();
            meta.MetaList = tableMeta.ToSelectList("ID", "Title", meta.MetaID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            meta.TranslationList = tableTranslation.ToSelectList("ID", "TransName", meta.TransID);

            return Json(meta);
        }

        [HttpGet]
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("Meta", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_MetaTDelete(id);

                curUser.Log(id, "d", "Metalar (Dil)");

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
            if (!curUser.HasRight("Meta", "r"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_MetaTSetDeleted(id);

                curUser.Log(id, "r", "Metalar (Dil)");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
