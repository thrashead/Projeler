using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Admin.Controllers
{
    public class UrunDilController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Urun"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_ProductTLinkedSelect_Result> urun = entity.usp_ProductTLinkedSelect(null).ToList();

            curUser.Log<Urun>(null, "s", "Ürünler (Dil)");

            return View(urun);
        }

        public ActionResult Ekle(string prodID)
        {
            if (!curUser.HasRight("Urun", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            int linkID = prodID == null ? 0 : prodID.ToInteger();

            UrunDil urun = new UrunDil();

            List<usp_ProductSelect_Result> tableProduct = entity.usp_ProductSelect(null).ToList();
            urun.ProductList = tableProduct.ToSelectList("ID", "Title", linkID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            urun.TranslationList = tableTranslation.ToSelectList("ID", "TransName");

            return View(urun);
        }

        [HttpPost]
        public ActionResult Ekle(UrunDil urun)
        {
            if (!curUser.HasRight("Urun", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid && urun.ProdID > 0)
            {
                var result = entity.usp_ProductTCheckInsert(urun.ProdID, urun.TransID, urun.ProductName, urun.ShortText1, urun.ShortText2, urun.Description);

                if (result != null)
                {
                    curUser.Log(urun, "i", "Ürünler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    urun.Mesaj = "Kayýt eklenemedi veya ayný dilde zaten kayýt eklenmiþ.";
            }
            else
                urun.Mesaj = "Model uygun deðil.";

            List<usp_ProductSelect_Result> tableProduct = entity.usp_ProductSelect(null).ToList();
            urun.ProductList = tableProduct.ToSelectList("ID", "Title", urun.ProdID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            urun.TranslationList = tableTranslation.ToSelectList("ID", "TransName", urun.TransID);

            return View("Ekle", urun);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Urun", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            usp_ProductTSelectTop_Result table = entity.usp_ProductTSelectTop(id, 1).FirstOrDefault();

            UrunDil urun = table.ChangeModel<UrunDil>();

            List<usp_ProductSelect_Result> tableProduct = entity.usp_ProductSelect(null).ToList();
            urun.ProductList = tableProduct.ToSelectList("ID", "Title", urun.ProdID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            urun.TranslationList = tableTranslation.ToSelectList("ID", "TransName", urun.TransID);

            return View(urun);
        }

        [HttpPost]
        public ActionResult Duzenle(UrunDil urun)
        {
            if (!curUser.HasRight("Urun", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = entity.usp_ProductTCheckUpdate(urun.ID, urun.ProdID, urun.TransID, urun.ProductName, urun.ShortText1, urun.ShortText2, urun.Description);

                if (result != null)
                {
                    curUser.Log(urun, "u", "Ürünler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    urun.Mesaj = "Kayýt düzenlenemedi veya ayný dilde zaten kayýt eklenmiþ.";
            }
            else
                urun.Mesaj = "Model uygun deðil.";

            List<usp_ProductSelect_Result> tableProduct = entity.usp_ProductSelect(null).ToList();
            urun.ProductList = tableProduct.ToSelectList("ID", "Title", urun.ProdID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            urun.TranslationList = tableTranslation.ToSelectList("ID", "TransName", urun.TransID);

            return View("Duzenle", urun);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            try
            {
                if (curUser.HasRight("Urun", "d"))
                {
                    entity.usp_ProductTSetDeleted(id);

                    curUser.Log(id, "d", "Ürünler (Dil)");

                    return Json(true);
                }
            }
            catch
            {
                return Json(false);
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kaldir(int id)
        {
            try
            {
                if (curUser.HasRight("Urun", "rd"))
                {
                    entity.usp_ProductTDelete(id);

                    curUser.Log(id, "rd", "Ürünler (Dil)");

                    return Json(true);
                }
            }
            catch
            {
                return Json(false);
            }

            return Json(false);
        }
    }
}
