using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Repository.KullanicilarModel;
using Repository.KategoriDilModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class KategoriDilController : Controller
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();
        KategoriDil table = new KategoriDil();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Kategori"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle(string catID)
        {
            if (!curUser.HasRight("Kategori", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            int linkID = catID == null ? 0 : catID.ToInteger();

            List<usp_CategorySelect_Result> tableKategori = entity.usp_CategorySelect(null).ToList();
            table.CategoryList = tableKategori.ToSelectList<usp_CategorySelect_Result, SelectListItem>("ID", "Title", linkID);

            List<usp_TranslationSelect_Result> tableDil = entity.usp_TranslationSelect(null).ToList();
            table.TranslationList = tableDil.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName");

            return View(table);
        }

        [HttpPost]
        public ActionResult Ekle(KategoriDil kategori)
        {
            if (!curUser.HasRight("Kategori", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid && kategori.CatID > 0)
            {
                bool result = table.Insert(kategori);

                if (result)
                {
                    curUser.Log(kategori, "i", "Kategoriler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    kategori.Mesaj = "Kayýt eklenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                kategori.Mesaj = "Model uygun deðil.";

            List<usp_CategorySelect_Result> tableKategori = entity.usp_CategorySelect(null).ToList();
            kategori.CategoryList = tableKategori.ToSelectList<usp_CategorySelect_Result, SelectListItem>("ID", "Title", kategori.CatID);

            List<usp_TranslationSelect_Result> tableDil = entity.usp_TranslationSelect(null).ToList();
            kategori.TranslationList = tableDil.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", kategori.TransID);

            return View("Ekle", kategori);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Kategori", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            IKategoriDil kategori = table.Select(id);

            List<usp_CategorySelect_Result> tableKategori = entity.usp_CategorySelect(null).ToList();
            kategori.CategoryList = tableKategori.ToSelectList<usp_CategorySelect_Result, SelectListItem>("ID", "Title", kategori.CatID);

            List<usp_TranslationSelect_Result> tableDil = entity.usp_TranslationSelect(null).ToList();
            kategori.TranslationList = tableDil.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", kategori.TransID);

            return View(kategori);
        }

        [HttpPost]
        public ActionResult Duzenle(KategoriDil kategori)
        {
            if (!curUser.HasRight("Kategori", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Update(kategori);

                if (result)
                {
                    curUser.Log(kategori, "u", "Kategoriler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    kategori.Mesaj = "Kayýt düzenlenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                kategori.Mesaj = "Model uygun deðil.";

            List<usp_CategorySelect_Result> tableKategori = entity.usp_CategorySelect(null).ToList();
            kategori.CategoryList = tableKategori.ToSelectList<usp_CategorySelect_Result, SelectListItem>("ID", "Title", kategori.CatID);

            List<usp_TranslationSelect_Result> tableDil = entity.usp_TranslationSelect(null).ToList();
            kategori.TranslationList = tableDil.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", kategori.TransID);

            return View("Duzenle", kategori);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            if (curUser.HasRight("Kategori", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Kategoriler (Dil)");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kaldir(int id)
        {
            if (curUser.HasRight("Kategori", "r"))
            {
                bool result = table.Remove(id);

                if (result)
                {
                    curUser.Log(id, "r", "Kategoriler (Dil)");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
