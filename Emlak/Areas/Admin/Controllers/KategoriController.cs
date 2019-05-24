using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Admin.Controllers
{
    public class KategoriController : Controller
    {
        readonly EmlakEntities _entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Kategori"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_CategorySelect_Result> kategori = _entity.usp_CategorySelect(null).ToList();

            curUser.Log<Kategori>(null, "s", "Kategoriler");

            return View(kategori);
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("Kategori", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            Kategori kategori = new Kategori();

            List<usp_CategoryParentSelect_Result> parentList = _entity.usp_CategoryParentSelect(null).ToList();
            kategori.ParentCategories = parentList.ToSelectList("ID", "Title", null, true);

            return View(kategori);
        }

        [HttpPost]
        public ActionResult Ekle(Kategori kategori)
        {
            if (!curUser.HasRight("Kategori", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                kategori.Url = kategori.Title.ToHyperLinkText();

                var result = _entity.usp_CategoryInsert(kategori.ParentID, kategori.Title, kategori.Url, kategori.Code, kategori.Active);

                if (result != null)
                {
                    curUser.Log(kategori, "i", "Kategoriler");

                    return RedirectToAction("Index");
                }
                else
                    kategori.Mesaj = "Kayýt eklenemedi.";
            }
            else
                kategori.Mesaj = "Model uygun deðil.";

            List<usp_CategoryParentSelect_Result> parentList = _entity.usp_CategoryParentSelect(null).ToList();
            kategori.ParentCategories = parentList.ToSelectList("ID", "Title", kategori.ParentID, true);

            return View("Ekle", kategori);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Kategori", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            usp_CategorySelectTop_Result table = _entity.usp_CategorySelectTop(id, 1).FirstOrDefault();
            Kategori kategori = table.ChangeModel<Kategori>();

            List<usp_CategoryTByLinkedIDSelect_Result> kategoriDilList = _entity.usp_CategoryTByLinkedIDSelect(id).ToList();
            kategori.CategoryTList.AddRange(kategoriDilList.ChangeModelList<KategoriDil, usp_CategoryTByLinkedIDSelect_Result>());

            List<usp_CategoryParentSelect_Result> parentList = _entity.usp_CategoryParentSelect(id).ToList();
            kategori.ParentCategories = parentList.ToSelectList("ID", "Title", kategori.ParentID, true);

            return View(kategori);
        }

        [HttpPost]
        public ActionResult Duzenle(Kategori kategori)
        {
            if (!curUser.HasRight("Kategori", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                kategori.Url = kategori.Title.ToHyperLinkText();

                var result = _entity.usp_CategoryUpdate(kategori.ID, kategori.ParentID, kategori.Title, kategori.Url, kategori.Code, kategori.Active);

                if (result != null)
                {
                    curUser.Log(kategori, "u", "Kategoriler");

                    return RedirectToAction("Index");
                }
                else
                    kategori.Mesaj = "Kayýt düzenlenemedi.";
            }
            else
                kategori.Mesaj = "Model uygun deðil.";

            List<usp_CategoryTByLinkedIDSelect_Result> kategoriDilList = _entity.usp_CategoryTByLinkedIDSelect(kategori.ID).ToList();
            kategori.CategoryTList.AddRange(kategoriDilList.ChangeModelList<KategoriDil, usp_CategoryTByLinkedIDSelect_Result>());

            List<usp_CategoryParentSelect_Result> parentList = _entity.usp_CategoryParentSelect(kategori.ID).ToList();
            kategori.ParentCategories = parentList.ToSelectList("ID", "Title", kategori.ParentID, true);

            return View("Duzenle", kategori);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            try
            {
                if (curUser.HasRight("Kategori", "d"))
                {
                    _entity.usp_CategoryCheckSetDeleted(id);

                    curUser.Log(id, "d", "Kategoriler");

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
                    _entity.usp_CategoryCheckDelete(id);

                    curUser.Log(id, "rd", "Kategoriler");

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
        public JsonResult Kopyala(int id)
        {
            try
            {
                if (curUser.HasRight("Kategori", "c"))
                {
                    var result = _entity.usp_CategoryCopy(id);

                    if (result != null)
                        curUser.Log(id, "c", "Kategoriler");

                    return Json(result == null ? false : true);
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
