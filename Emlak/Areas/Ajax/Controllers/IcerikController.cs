using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class IcerikController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Icerik"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_ContentSelect_Result> icerik = entity.usp_ContentSelect(null).ToList();

            curUser.Log<Icerik>(null, "s", "Ýçerikler");

            return Json(icerik, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Ekle([System.Web.Http.FromBody] Icerik icerik)
        {
            if (!curUser.HasRight("Icerik", "i"))
                return Json(null);

            icerik.Url = icerik.Title.ToHyperLinkText();

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
        public JsonResult Duzenle(int id)
        {
            if (!curUser.HasRight("Icerik", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_ContentSelectTop_Result table = entity.usp_ContentSelectTop(id, 1).FirstOrDefault();
            Icerik icerik = table.ChangeModel<Icerik>();

            List<usp_ContentTByLinkedIDSelect_Result> icerikDilList = entity.usp_ContentTByLinkedIDSelect(id).ToList();
            icerik.ContentTList.AddRange(icerikDilList.ChangeModelList<IcerikDil, usp_ContentTByLinkedIDSelect_Result>());

            return Json(icerik, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Duzenle([System.Web.Http.FromBody] Icerik icerik)
        {
            if (!curUser.HasRight("Icerik", "u"))
                return Json(null);

            icerik.Url = icerik.Title.ToHyperLinkText();

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
        public JsonResult Sil(int id)
        {
            if (!curUser.HasRight("Icerik", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_ContentCheckSetDeleted(id);

                curUser.Log(id, "d", "Ýçerikler");

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
                entity.usp_ContentCheckDelete(id);

                curUser.Log(id, "rd", "Ýçerikler");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult Kopyala(int id)
        {
            if (!curUser.HasRight("Icerik", "c"))
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
