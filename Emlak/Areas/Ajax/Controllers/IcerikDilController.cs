using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class IcerikDilController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Icerik"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_ContentTLinkedSelect_Result> icerik = entity.usp_ContentTLinkedSelect(null).ToList();

            curUser.Log<IcerikDil>(null, "s", "��erikler (Dil)");

            return Json(icerik, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Ekle(int? linkID)
        {
            if (!curUser.HasRight("Icerik", "i"))
                return Json(null, JsonRequestBehavior.AllowGet);

            IcerikDil icerik = new IcerikDil();

            List<usp_ContentSelect_Result> tableContent = entity.usp_ContentSelect(null).ToList();
            icerik.ContentList = tableContent.ToSelectList("ID", "Title", linkID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            icerik.TranslationList = tableTranslation.ToSelectList("ID", "TransName");

            return Json(icerik, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Ekle([System.Web.Http.FromBody] IcerikDil icerik)
        {
            if (!curUser.HasRight("Icerik", "i"))
                return Json(null);

            if (icerik.ContID > 0)
            {
                var result = entity.usp_ContentTCheckInsert(icerik.ContID, icerik.TransID, icerik.ContentName, icerik.ShortText1, icerik.ShortText2, icerik.Description).FirstOrDefault();

                if (result != null)
                {
                    curUser.Log(icerik, "i", "��erikler (Dil)");

                    return Json(icerik);
                }
                else
                    icerik.Mesaj = "Kay�t eklenemedi veya ayn� dilde zaten veri eklenmi�.";
            }
            else
                icerik.Mesaj = "Model uygun de�il.";

            List<usp_ContentSelect_Result> tableContent = entity.usp_ContentSelect(null).ToList();
            icerik.ContentList = tableContent.ToSelectList("ID", "Title", icerik.ContID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            icerik.TranslationList = tableTranslation.ToSelectList("ID", "TransName", icerik.TransID);

            return Json(icerik);
        }

        [HttpGet]
        public JsonResult Duzenle(int id)
        {
            if (!curUser.HasRight("Icerik", "u"))
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
        public JsonResult Duzenle([System.Web.Http.FromBody] IcerikDil icerik)
        {
            if (!curUser.HasRight("Icerik", "u"))
                return Json(null);

            var result = entity.usp_ContentTCheckUpdate(icerik.ID, icerik.ContID, icerik.TransID, icerik.ContentName, icerik.ShortText1, icerik.ShortText2, icerik.Description).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(icerik, "u", "��erikler (Dil)");

                return Json(icerik);
            }
            else
                icerik.Mesaj = "Kay�t d�zenlenemedi veya ayn� dilde zaten veri eklenmi�.";

            List<usp_ContentSelect_Result> tableContent = entity.usp_ContentSelect(null).ToList();
            icerik.ContentList = tableContent.ToSelectList("ID", "Title", icerik.ContID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            icerik.TranslationList = tableTranslation.ToSelectList("ID", "TransName", icerik.TransID);

            return Json(icerik);
        }

        [HttpGet]
        public JsonResult Sil(int id)
        {
            if (!curUser.HasRight("Icerik", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_ContentTSetDeleted(id);

                curUser.Log(id, "d", "��erikler (Dil)");

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
            if (!curUser.HasRight("Icerik", "rd"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_ContentTDelete(id);

                curUser.Log(id, "rd", "��erikler (Dil)");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
