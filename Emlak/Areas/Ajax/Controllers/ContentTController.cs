using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class ContentTController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Content"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_ContentTLinkedSelect_Result> icerik = entity.usp_ContentTLinkedSelect(null).ToList();

            return Json(icerik, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Insert(int? linkID)
        {
            if (!curUser.HasRight("Content", "i"))
                return Json(null, JsonRequestBehavior.AllowGet);

            IcerikDil icerik = new IcerikDil();

            List<usp_ContentSelect_Result> tableContent = entity.usp_ContentSelect(null).ToList();
            icerik.ContentList = tableContent.ToSelectList("ID", "Title", linkID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            icerik.TranslationList = tableTranslation.ToSelectList("ID", "TransName");

            return Json(icerik, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] IcerikDil icerik)
        {
            if (!curUser.HasRight("Content", "i"))
                return Json(null);

            if (icerik.ContID > 0)
            {
                var result = entity.usp_ContentTCheckInsert(icerik.ContID, icerik.TransID, icerik.ContentName, icerik.ShortText1, icerik.ShortText2, icerik.Description).FirstOrDefault();

                if (result != null)
                {
                    curUser.Log(icerik, "i", "Ýçerikler (Dil)");

                    return Json(icerik);
                }
                else
                    icerik.Mesaj = "Kayýt eklenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                icerik.Mesaj = "Model uygun deðil.";

            List<usp_ContentSelect_Result> tableContent = entity.usp_ContentSelect(null).ToList();
            icerik.ContentList = tableContent.ToSelectList("ID", "Title", icerik.ContID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            icerik.TranslationList = tableTranslation.ToSelectList("ID", "TransName", icerik.TransID);

            return Json(icerik);
        }

        [HttpGet]
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("Content", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_ContentTSelectTop_Result table = entity.usp_ContentTSelectTop(id, 1).FirstOrDefault();

            IcerikDil icerik = table.ChangeModel<IcerikDil>();

            List<usp_ContentSelect_Result> tableContent = entity.usp_ContentSelect(null).ToList();
            icerik.ContentList = tableContent.ToSelectList("ID", "Title", icerik.ContID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            icerik.TranslationList = tableTranslation.ToSelectList("ID", "TransName", icerik.TransID);

            return Json(icerik, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] IcerikDil icerik)
        {
            if (!curUser.HasRight("Content", "u"))
                return Json(null);

            var result = entity.usp_ContentTCheckUpdate(icerik.ID, icerik.ContID, icerik.TransID, icerik.ContentName, icerik.ShortText1, icerik.ShortText2, icerik.Description).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(icerik, "u", "Ýçerikler (Dil)");

                return Json(icerik);
            }
            else
                icerik.Mesaj = "Kayýt düzenlenemedi veya ayný dilde zaten veri eklenmiþ.";

            List<usp_ContentSelect_Result> tableContent = entity.usp_ContentSelect(null).ToList();
            icerik.ContentList = tableContent.ToSelectList("ID", "Title", icerik.ContID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            icerik.TranslationList = tableTranslation.ToSelectList("ID", "TransName", icerik.TransID);

            return Json(icerik);
        }

        [HttpGet]
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("Content", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_ContentTDelete(id);

                curUser.Log(id, "d", "Ýçerikler (Dil)");

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
            if (!curUser.HasRight("Content", "r"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_ContentTSetDeleted(id);

                curUser.Log(id, "r", "Ýçerikler (Dil)");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
