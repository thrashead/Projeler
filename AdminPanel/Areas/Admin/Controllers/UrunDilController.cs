using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Models;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class UrunDilController : Controller
    {
        readonly EmlakEntities _entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Urun"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_ProductTLinkedSelect_Result> urun = _entity.usp_ProductTLinkedSelect(null).ToList();

            curUser.Log<Urun>(null, "s", "Ürünler (Dil)");

            return View(urun);
        }

        public ActionResult Ekle(string prodID)
        {
            if (!curUser.HasRight("Urun", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            int linkID = prodID == null ? 0 : prodID.ToInteger();

            UrunDil urun = new UrunDil();

            List<Product> tableProduct = _entity.Product.ToList();
            urun.ProductList = tableProduct.ToSelectList("ID", "Title", linkID);

            List<Translation> tableTranslation = _entity.Translation.ToList();
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
                var result = _entity.usp_ProductTCheckInsert(urun.ProdID, urun.TransID, urun.ProductName, urun.ShortText1, urun.ShortText2, urun.Description);

                if (result != null)
                {
                    curUser.Log(urun, "i", "Ürünler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    urun.Mesaj = "Kayýt eklenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                urun.Mesaj = "Model uygun deðil.";

            List<Product> tableProduct = _entity.Product.ToList();
            urun.ProductList = tableProduct.ToSelectList("ID", "Title", urun.ProdID);

            List<Translation> tableTranslation = _entity.Translation.ToList();
            urun.TranslationList = tableTranslation.ToSelectList("ID", "TransName", urun.TransID);

            return View("Ekle", urun);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Urun", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            usp_ProductTSelectTop_Result table = _entity.usp_ProductTSelectTop(id, 1).FirstOrDefault();

            UrunDil urun = table.ChangeModel<UrunDil>();

            List<Product> tableProduct = _entity.Product.ToList();
            urun.ProductList = tableProduct.ToSelectList("ID", "Title", urun.ProdID);

            List<Translation> tableTranslation = _entity.Translation.ToList();
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
                var result = _entity.usp_ProductTCheckUpdate(urun.ID, urun.ProdID, urun.TransID, urun.ProductName, urun.ShortText1, urun.ShortText2, urun.Description);

                if (result != null)
                {
                    curUser.Log(urun, "u", "Ürünler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    urun.Mesaj = "Kayýt düzenlenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                urun.Mesaj = "Model uygun deðil.";

            List<Product> tableProduct = _entity.Product.ToList();
            urun.ProductList = tableProduct.ToSelectList("ID", "Title", urun.ProdID);

            List<Translation> tableTranslation = _entity.Translation.ToList();
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
                    _entity.usp_ProductTSetDeleted(id);

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
                    _entity.usp_ProductTDelete(id);

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
