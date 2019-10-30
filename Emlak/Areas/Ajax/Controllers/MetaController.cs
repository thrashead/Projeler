using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class MetaController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Meta"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_MetaSelect_Result> meta = entity.usp_MetaSelect(null).ToList();

            return Json(meta, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] Metalar meta)
        {
            if (!curUser.HasRight("Meta", "i"))
                return Json(null);

            var result = entity.usp_MetaInsert(meta.Title, meta.Code, meta.Active).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(meta, "i", "Metalar");

                return Json(meta);
            }
            else
                meta.Mesaj = "Kayýt eklenemedi.";

            return Json(meta);
        }

        [HttpGet]
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("Meta", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_MetaSelectTop_Result table = entity.usp_MetaSelectTop(id, 1).FirstOrDefault();

            Metalar meta = table.ChangeModel<Metalar>();

            List<usp_MetaTByLinkedIDSelect_Result> metaDilList = entity.usp_MetaTByLinkedIDSelect(id).ToList();
            meta.MetaTList.AddRange(metaDilList.ChangeModelList<MetalarDil, usp_MetaTByLinkedIDSelect_Result>());

            return Json(meta, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] Metalar meta)
        {
            if (!curUser.HasRight("Meta", "u"))
                return Json(null);

            var result = entity.usp_MetaUpdate(meta.ID, meta.Title, meta.Code, meta.Active).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(meta, "u", "Metalar");

                return Json(meta);
            }
            else
                meta.Mesaj = "Kayýt düzenlenemedi.";

            List<usp_MetaTByLinkedIDSelect_Result> metaDilList = entity.usp_MetaTByLinkedIDSelect(meta.ID).ToList();
            meta.MetaTList.AddRange(metaDilList.ChangeModelList<MetalarDil, usp_MetaTByLinkedIDSelect_Result>());

            return Json(meta);
        }

        [HttpGet]
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("Meta", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_MetaCheckDelete(id);

                curUser.Log(id, "d", "Metalar");

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
                entity.usp_MetaCheckSetDeleted(id);

                curUser.Log(id, "r", "Metalar");

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
            if (!curUser.HasRight("Meta", "c"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                var result = entity.usp_MetaCopy(id);

                if (result != null)
                    curUser.Log(id, "c", "Metalar");

                return Json(result == null ? false : true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
