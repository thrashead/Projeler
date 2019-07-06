using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class UrunController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Urun"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_ProductSelect_Result> urun = entity.usp_ProductSelect(null).ToList();

            return Json(urun, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Ekle([System.Web.Http.FromBody] Urun urun)
        {
            if (!curUser.HasRight("Urun", "i"))
                return Json(null);

            urun.Url = urun.Title.ToHyperLinkText();

            var result = entity.usp_ProductInsert(urun.Title, urun.Url, urun.Code, urun.Active).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(urun, "i", "Ürünler");

                return Json(urun);
            }
            else
                urun.Mesaj = "Kayýt eklenemedi.";

            return Json(urun);
        }

        [HttpGet]
        public JsonResult Duzenle(int id)
        {
            if (!curUser.HasRight("Urun", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_ProductSelectTop_Result table = entity.usp_ProductSelectTop(id, 1).FirstOrDefault();

            Urun urun = table.ChangeModel<Urun>();

            List<usp_ProductTByLinkedIDSelect_Result> urunDilList = entity.usp_ProductTByLinkedIDSelect(id).ToList();
            urun.ProductTList.AddRange(urunDilList.ChangeModelList<UrunDil, usp_ProductTByLinkedIDSelect_Result>());

            return Json(urun, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Duzenle([System.Web.Http.FromBody] Urun urun)
        {
            if (!curUser.HasRight("Urun", "u"))
                return Json(null);

            urun.Url = urun.Title.ToHyperLinkText();

            var result = entity.usp_ProductUpdate(urun.ID, urun.Title, urun.Url, urun.Code, urun.Active).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(urun, "u", "Ürünler");

                return Json(urun);
            }
            else
                urun.Mesaj = "Kayýt düzenlenemedi.";

            List<usp_ProductTByLinkedIDSelect_Result> urunDilList = entity.usp_ProductTByLinkedIDSelect(urun.ID).ToList();
            urun.ProductTList.AddRange(urunDilList.ChangeModelList<UrunDil, usp_ProductTByLinkedIDSelect_Result>());

            return Json(urun);
        }

        [HttpGet]
        public JsonResult Sil(int id)
        {
            if (!curUser.HasRight("Urun", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_ProductCheckSetDeleted(id);

                curUser.Log(id, "d", "Ürünler");

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
            if (!curUser.HasRight("Urun", "rd"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_ProductCheckDelete(id);

                curUser.Log(id, "rd", "Ürünler");

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
            if (!curUser.HasRight("Urun", "c"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                var result = entity.usp_ProductCopy(id);

                if (result != null)
                    curUser.Log(id, "c", "Ürünler");

                return Json(result == null ? false : true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
