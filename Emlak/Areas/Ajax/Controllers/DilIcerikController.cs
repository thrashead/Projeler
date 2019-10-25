using Emlak.Data;
using Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using TDLibrary;

namespace Emlak.Areas.Ajax.Controllers
{
    public class DilIcerikController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index(int? id)
        {
            if (!curUser.HasRight("Dil"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_LangContentSelect_Result> ceviri = entity.usp_LangContentSelect(null).ToList();

            return Json(ceviri, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Ekle([System.Web.Http.FromBody] DilIcerik ceviri)
        {
            if (!curUser.HasRight("Dil", "i"))
                return Json(null);

            var result = entity.usp_LangContentInsert(ceviri.Title, ceviri.Code).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(ceviri, "i", "Dil İçerik");

                return Json(ceviri);
            }
            else
                ceviri.Mesaj = "Kayıt eklenemedi veya aynı dilde zaten veri eklenmiş.";

            return Json(ceviri);
        }

        [HttpGet]
        public JsonResult Duzenle(int? id)
        {
            if (!curUser.HasRight("Dil", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_LangContentSelectTop_Result table = entity.usp_LangContentSelectTop(id, 1).FirstOrDefault();

            DilIcerik ceviri = table.ChangeModel<DilIcerik>();

            return Json(ceviri, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Duzenle([System.Web.Http.FromBody] DilIcerik ceviri)
        {
            if (!curUser.HasRight("Dil", "u"))
                return Json(null);

            var result = entity.usp_LangContentUpdate(ceviri.ID, ceviri.Title, ceviri.Code).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(ceviri, "u", "Dil İçerik");

                return Json(ceviri);
            }
            else
                ceviri.Mesaj = "Kayıt düzenlenemedi veya aynı dilde zaten veri eklenmiş.";

            return Json(ceviri);
        }

        [HttpGet]
        public JsonResult Kopyala(int id)
        {
            if (!curUser.HasRight("Dil", "c"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                var result = entity.usp_LangContentCopy(id);

                if (result != null)
                    curUser.Log(id, "c", "Dil İçerik");

                return Json(result == null ? false : true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult Sil(int? id)
        {
            if (!curUser.HasRight("Dil", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_LangContentDelete(id);

                curUser.Log(id, "d", "Dil İçerik");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
