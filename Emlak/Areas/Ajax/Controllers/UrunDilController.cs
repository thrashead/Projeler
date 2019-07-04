using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class UrunDilController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Urun"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_ProductTLinkedSelect_Result> urun = entity.usp_ProductTLinkedSelect(null).ToList();

            curUser.Log<Urun>(null, "s", "Ürünler (Dil)");

            return Json(urun, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Ekle(int? linkID)
        {
            if (!curUser.HasRight("Urun", "i"))
                return Json(null, JsonRequestBehavior.AllowGet);

            UrunDil urun = new UrunDil();

            List<usp_ProductSelect_Result> tableProduct = entity.usp_ProductSelect(null).ToList();
            urun.ProductList = tableProduct.ToSelectList("ID", "Title", linkID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            urun.TranslationList = tableTranslation.ToSelectList("ID", "TransName");

            return Json(urun, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Ekle([System.Web.Http.FromBody] UrunDil urun)
        {
            if (!curUser.HasRight("Urun", "i"))
                return Json(null);

            if (urun.ProdID > 0)
            {
                var result = entity.usp_ProductTCheckInsert(urun.ProdID, urun.TransID, urun.ProductName, urun.ShortText1, urun.ShortText2, urun.Description).FirstOrDefault();

                if (result != null)
                {
                    curUser.Log(urun, "i", "Ürünler (Dil)");

                    return Json(urun);
                }
                else
                    urun.Mesaj = "Kayýt eklenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                urun.Mesaj = "Model uygun deðil.";

            List<usp_ProductSelect_Result> tableProduct = entity.usp_ProductSelect(null).ToList();
            urun.ProductList = tableProduct.ToSelectList("ID", "Title", urun.ProdID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            urun.TranslationList = tableTranslation.ToSelectList("ID", "TransName", urun.TransID);

            return Json(urun);
        }

        [HttpGet]
        public JsonResult Duzenle(int id)
        {
            if (!curUser.HasRight("Urun", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_ProductTSelectTop_Result table = entity.usp_ProductTSelectTop(id, 1).FirstOrDefault();

            UrunDil urun = table.ChangeModel<UrunDil>();

            List<usp_ProductSelect_Result> tableProduct = entity.usp_ProductSelect(null).ToList();
            urun.ProductList = tableProduct.ToSelectList("ID", "Title", urun.ProdID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            urun.TranslationList = tableTranslation.ToSelectList("ID", "TransName", urun.TransID);

            return Json(urun, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Duzenle([System.Web.Http.FromBody] UrunDil urun)
        {
            if (!curUser.HasRight("Urun", "u"))
                return Json(null);

            var result = entity.usp_ProductTCheckUpdate(urun.ID, urun.ProdID, urun.TransID, urun.ProductName, urun.ShortText1, urun.ShortText2, urun.Description).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(urun, "u", "Ürünler (Dil)");

                return Json(urun);
            }
            else
                urun.Mesaj = "Kayýt düzenlenemedi veya ayný dilde zaten veri eklenmiþ.";

            List<usp_ProductSelect_Result> tableProduct = entity.usp_ProductSelect(null).ToList();
            urun.ProductList = tableProduct.ToSelectList("ID", "Title", urun.ProdID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            urun.TranslationList = tableTranslation.ToSelectList("ID", "TransName", urun.TransID);

            return Json(urun);
        }

        [HttpGet]
        public JsonResult Sil(int id)
        {
            if (!curUser.HasRight("Urun", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_ProductTSetDeleted(id);

                curUser.Log(id, "d", "Ürünler (Dil)");

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
                entity.usp_ProductTDelete(id);

                curUser.Log(id, "rd", "Ürünler (Dil)");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
