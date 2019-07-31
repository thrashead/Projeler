using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Repository.KullanicilarModel;
using Repository.KategoriModel;
using Repository.KategoriDilModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class KategoriController : Controller
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();
        Kategori table = new Kategori();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Kategori"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("Kategori", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_CategoryParentSelect_Result> parentList = entity.usp_CategoryParentSelect(null).ToList();
            table.ParentCategories = parentList.ToSelectList<usp_CategoryParentSelect_Result, SelectListItem>("ID", "Title", null, true);

            return View(table);
        }

        [HttpPost]
        public ActionResult Ekle(Kategori kategori)
        {
            if (!curUser.HasRight("Kategori", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                kategori.Url = kategori.Title.ToUrl();

                bool result = table.Insert(kategori);

                if (result)
                {
                    curUser.Log(kategori, "i", "Kategoriler");

                    return RedirectToAction("Index");
                }
                else
                    kategori.Mesaj = "Kayýt eklenemedi.";
            }
            else
                kategori.Mesaj = "Model uygun deðil.";

            List<usp_CategoryParentSelect_Result> parentList = entity.usp_CategoryParentSelect(kategori.ID).ToList();
            kategori.ParentCategories = parentList.ToSelectList<usp_CategoryParentSelect_Result, SelectListItem>("ID", "Title", kategori.ParentID, true);

            return View("Ekle", kategori);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Kategori", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            IKategori kategori = table.Select(id);

            List<usp_CategoryTByLinkedIDSelect_Result> kategoriDilList = entity.usp_CategoryTByLinkedIDSelect(id).ToList();
            kategori.CategoryTList.AddRange(kategoriDilList.ChangeModelList<KategoriDil, usp_CategoryTByLinkedIDSelect_Result>());

            List<usp_CategoryParentSelect_Result> parentList = entity.usp_CategoryParentSelect(null).ToList();
            kategori.ParentCategories = parentList.ToSelectList<usp_CategoryParentSelect_Result, SelectListItem>("ID", "Title", kategori.ParentID, true);

            return View(kategori);
        }

        [HttpPost]
        public ActionResult Duzenle(Kategori kategori)
        {
            if (!curUser.HasRight("Kategori", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                kategori.Url = kategori.Title.ToUrl();

                bool result = table.Update(kategori);

                if (result)
                {
                    curUser.Log(kategori, "u", "Kategoriler");

                    return RedirectToAction("Index");
                }
                else
                    kategori.Mesaj = "Kayýt düzenlenemedi.";
            }
            else
                kategori.Mesaj = "Model uygun deðil.";

            List<usp_CategoryTByLinkedIDSelect_Result> kategoriDilList = entity.usp_CategoryTByLinkedIDSelect(kategori.ID).ToList();
            kategori.CategoryTList.AddRange(kategoriDilList.ChangeModelList<KategoriDil, usp_CategoryTByLinkedIDSelect_Result>());

            List<usp_CategoryParentSelect_Result> parentList = entity.usp_CategoryParentSelect(kategori.ID).ToList();
            kategori.ParentCategories = parentList.ToSelectList<usp_CategoryParentSelect_Result, SelectListItem>("ID", "Title", kategori.ParentID, true);

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
                    curUser.Log(id, "d", "Kategoriler");

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
                    curUser.Log(id, "r", "Kategoriler");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kopyala(int id)
        {
            if (curUser.HasRight("Kategori", "c"))
            {
                bool result = table.Copy(id);

                if (result)
                {
                    curUser.Log(id, "c", "Kategoriler");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
