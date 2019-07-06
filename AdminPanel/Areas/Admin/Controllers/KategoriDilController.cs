using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Models;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class KategoriDilController : Controller
    {
        readonly AdminPanelEntities _entity = new AdminPanelEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Kategori"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_CategoryTLinkedSelect_Result> kategori = _entity.usp_CategoryTLinkedSelect(null).ToList();

            return View(kategori);
        }

        public ActionResult Ekle(string catID)
        {
            if (!curUser.HasRight("Kategori", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            int linkID = catID == null ? 0 : catID.ToInteger();

            KategoriDil kategori = new KategoriDil();

            List<Category> tableCategory = _entity.Category.ToList();
            kategori.CategoryList = tableCategory.ToSelectList("ID", "Title", linkID);

            List<Translation> tableTranslation = _entity.Translation.ToList();
            kategori.TranslationList = tableTranslation.ToSelectList("ID", "TransName");

            return View(kategori);
        }

        [HttpPost]
        public ActionResult Ekle(KategoriDil kategori)
        {
            if (!curUser.HasRight("Kategori", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid && kategori.CatID > 0)
            {
                var result = _entity.usp_CategoryTCheckInsert(kategori.CatID, kategori.TransID, kategori.CategoryName, kategori.ShortText1, kategori.ShortText2, kategori.Description);

                if (result != null)
                {
                    curUser.Log(kategori, "i", "Kategoriler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    kategori.Mesaj = "Kayýt eklenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                kategori.Mesaj = "Model uygun deðil.";

            List<Category> tableCategory = _entity.Category.ToList();
            kategori.CategoryList = tableCategory.ToSelectList("ID", "Title", kategori.CatID);

            List<Translation> tableTranslation = _entity.Translation.ToList();
            kategori.TranslationList = tableTranslation.ToSelectList("ID", "TransName", kategori.TransID);

            return View("Ekle", kategori);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Kategori", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            usp_CategoryTSelectTop_Result table = _entity.usp_CategoryTSelectTop(id, 1).FirstOrDefault();

            KategoriDil kategori = table.ChangeModel<KategoriDil>();

            List<Category> tableCategory = _entity.Category.ToList();
            kategori.CategoryList = tableCategory.ToSelectList("ID", "Title", kategori.CatID);

            List<Translation> tableTranslation = _entity.Translation.ToList();
            kategori.TranslationList = tableTranslation.ToSelectList("ID", "TransName", kategori.TransID);

            return View(kategori);
        }

        [HttpPost]
        public ActionResult Duzenle(KategoriDil kategori)
        {
            if (!curUser.HasRight("Kategori", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = _entity.usp_CategoryTCheckUpdate(kategori.ID, kategori.CatID, kategori.TransID, kategori.CategoryName, kategori.ShortText1, kategori.ShortText2, kategori.Description);

                if (result != null)
                {
                    curUser.Log(kategori, "u", "Kategoriler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    kategori.Mesaj = "Kayýt düzenlenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                kategori.Mesaj = "Model uygun deðil.";

            List<Category> tableCategory = _entity.Category.ToList();
            kategori.CategoryList = tableCategory.ToSelectList("ID", "Title", kategori.CatID);

            List<Translation> tableTranslation = _entity.Translation.ToList();
            kategori.TranslationList = tableTranslation.ToSelectList("ID", "TransName", kategori.TransID);

            return View("Duzenle", kategori);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            try
            {
                if (curUser.HasRight("Kategori", "d"))
                {
                    _entity.usp_CategoryTSetDeleted(id);

                    curUser.Log(id, "d", "Kategoriler (Dil)");

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
                if (curUser.HasRight("Kategori", "rd"))
                {
                    _entity.usp_CategoryTDelete(id);

                    curUser.Log(id, "rd", "Kategoriler (Dil)");

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
