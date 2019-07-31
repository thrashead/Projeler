using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Repository.KullanicilarModel;
using Repository.UrunDilModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class UrunDilController : Controller
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();
        UrunDil table = new UrunDil();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Urun"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle(string prodID)
        {
            if (!curUser.HasRight("Urun", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            int linkID = prodID == null ? 0 : prodID.ToInteger();

            List<usp_ProductSelect_Result> tableUrun = entity.usp_ProductSelect(null).ToList();
            table.ProductList = tableUrun.ToSelectList<usp_ProductSelect_Result, SelectListItem>("ID", "Title", linkID);

            List<usp_TranslationSelect_Result> tableDil = entity.usp_TranslationSelect(null).ToList();
            table.TranslationList = tableDil.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName");

            return View(table);
        }

        [HttpPost]
        public ActionResult Ekle(UrunDil urun)
        {
            if (!curUser.HasRight("Urun", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid && urun.ProdID > 0)
            {
                bool result = table.Insert(urun);

                if (result)
                {
                    curUser.Log(urun, "i", "Urunler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    urun.Mesaj = "Kayýt eklenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                urun.Mesaj = "Model uygun deðil.";

            List<usp_ProductSelect_Result> tableUrun = entity.usp_ProductSelect(null).ToList();
            urun.ProductList = tableUrun.ToSelectList<usp_ProductSelect_Result, SelectListItem>("ID", "Title", urun.ProdID);

            List<usp_TranslationSelect_Result> tableDil = entity.usp_TranslationSelect(null).ToList();
            urun.TranslationList = tableDil.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", urun.TransID);

            return View("Ekle", urun);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Urun", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            IUrunDil urun = table.Select(id);

            List<usp_ProductSelect_Result> tableUrun = entity.usp_ProductSelect(null).ToList();
            urun.ProductList = tableUrun.ToSelectList<usp_ProductSelect_Result, SelectListItem>("ID", "Title", urun.ProdID);

            List<usp_TranslationSelect_Result> tableDil = entity.usp_TranslationSelect(null).ToList();
            urun.TranslationList = tableDil.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", urun.TransID);

            return View(urun);
        }

        [HttpPost]
        public ActionResult Duzenle(UrunDil urun)
        {
            if (!curUser.HasRight("Urun", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Update(urun);

                if (result)
                {
                    curUser.Log(urun, "u", "Urunler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    urun.Mesaj = "Kayýt düzenlenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                urun.Mesaj = "Model uygun deðil.";

            List<usp_ProductSelect_Result> tableUrun = entity.usp_ProductSelect(null).ToList();
            urun.ProductList = tableUrun.ToSelectList<usp_ProductSelect_Result, SelectListItem>("ID", "Title", urun.ProdID);

            List<usp_TranslationSelect_Result> tableDil = entity.usp_TranslationSelect(null).ToList();
            urun.TranslationList = tableDil.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", urun.TransID);

            return View("Duzenle", urun);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            if (curUser.HasRight("Urun", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Urunler (Dil)");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kaldir(int id)
        {
            if (curUser.HasRight("Urun", "r"))
            {
                bool result = table.Remove(id);

                if (result)
                {
                    curUser.Log(id, "r", "Urunler (Dil)");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
