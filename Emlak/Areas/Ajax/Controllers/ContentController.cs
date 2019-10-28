using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class ContentController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Content"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_ContentSelect_Result> icerik = entity.usp_ContentSelect(null).ToList();

            return Json(icerik, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] Icerik icerik)
        {
            if (!curUser.HasRight("Content", "i"))
                return Json(null);

            icerik.Url = icerik.Title.ToUrl();

            var result = entity.usp_ContentInsert(icerik.Title, icerik.Url, icerik.Code, icerik.Active).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(icerik, "i", "Ýçerikler");

                return Json(icerik);
            }
            else
                icerik.Mesaj = "Kayýt eklenemedi.";

            return Json(icerik);
        }

        [HttpGet]
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("Content", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_ContentSelectTop_Result table = entity.usp_ContentSelectTop(id, 1).FirstOrDefault();
            Icerik icerik = table.ChangeModel<Icerik>();

            List<usp_ContentTByLinkedIDSelect_Result> icerikDilList = entity.usp_ContentTByLinkedIDSelect(id).ToList();
            icerik.ContentTList.AddRange(icerikDilList.ChangeModelList<IcerikDil, usp_ContentTByLinkedIDSelect_Result>());

            return Json(icerik, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] Icerik icerik)
        {
            if (!curUser.HasRight("Content", "u"))
                return Json(null);

            icerik.Url = icerik.Title.ToUrl();

            var result = entity.usp_ContentUpdate(icerik.ID, icerik.Title, icerik.Url, icerik.Code, icerik.Active).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(icerik, "u", "Ýçerikler");

                return Json(icerik);
            }
            else
                icerik.Mesaj = "Kayýt düzenlenemedi.";

            List<usp_ContentTByLinkedIDSelect_Result> icerikDilList = entity.usp_ContentTByLinkedIDSelect(icerik.ID).ToList();
            icerik.ContentTList.AddRange(icerikDilList.ChangeModelList<IcerikDil, usp_ContentTByLinkedIDSelect_Result>());

            return Json(icerik);
        }

        [HttpGet]
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("Content", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_ContentCheckDelete(id);

                curUser.Log(id, "d", "Ýçerikler");

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
                entity.usp_ContentCheckSetDeleted(id);

                curUser.Log(id, "r", "Ýçerikler");

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
            if (!curUser.HasRight("Content", "c"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                var result = entity.usp_ContentCopy(id);

                if (result != null)
                    curUser.Log(id, "c", "Ýçerikler");

                return Json(result == null ? false : true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
