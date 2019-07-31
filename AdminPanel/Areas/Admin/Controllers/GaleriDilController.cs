using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Repository.KullanicilarModel;
using Repository.GaleriDilModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class GaleriDilController : Controller
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();
        GaleriDil table = new GaleriDil();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Galeri"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle(string galID)
        {
            if (!curUser.HasRight("Galeri", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            int linkID = galID == null ? 0 : galID.ToInteger();

            List<usp_GallerySelect_Result> tableGaleri = entity.usp_GallerySelect(null).ToList();
            table.GalleryList = tableGaleri.ToSelectList<usp_GallerySelect_Result, SelectListItem>("ID", "Title", linkID);

            List<usp_TranslationSelect_Result> tableDil = entity.usp_TranslationSelect(null).ToList();
            table.TranslationList = tableDil.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName");

            return View(table);
        }

        [HttpPost]
        public ActionResult Ekle(GaleriDil galeri)
        {
            if (!curUser.HasRight("Galeri", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid && galeri.GalID > 0)
            {
                bool result = table.Insert(galeri);

                if (result)
                {
                    curUser.Log(galeri, "i", "Galeriler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    galeri.Mesaj = "Kayýt eklenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                galeri.Mesaj = "Model uygun deðil.";

            List<usp_GallerySelect_Result> tableGaleri = entity.usp_GallerySelect(null).ToList();
            galeri.GalleryList = tableGaleri.ToSelectList<usp_GallerySelect_Result, SelectListItem>("ID", "Title", galeri.GalID);

            List<usp_TranslationSelect_Result> tableDil = entity.usp_TranslationSelect(null).ToList();
            galeri.TranslationList = tableDil.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", galeri.TransID);

            return View("Ekle", galeri);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Galeri", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            IGaleriDil galeri = table.Select(id);

            List<usp_GallerySelect_Result> tableGaleri = entity.usp_GallerySelect(null).ToList();
            galeri.GalleryList = tableGaleri.ToSelectList<usp_GallerySelect_Result, SelectListItem>("ID", "Title", galeri.GalID);

            List<usp_TranslationSelect_Result> tableDil = entity.usp_TranslationSelect(null).ToList();
            galeri.TranslationList = tableDil.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", galeri.TransID);

            return View(galeri);
        }

        [HttpPost]
        public ActionResult Duzenle(GaleriDil galeri)
        {
            if (!curUser.HasRight("Galeri", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Update(galeri);

                if (result)
                {
                    curUser.Log(galeri, "u", "Galeriler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    galeri.Mesaj = "Kayýt düzenlenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                galeri.Mesaj = "Model uygun deðil.";

            List<usp_GallerySelect_Result> tableGaleri = entity.usp_GallerySelect(null).ToList();
            galeri.GalleryList = tableGaleri.ToSelectList<usp_GallerySelect_Result, SelectListItem>("ID", "Title", galeri.GalID);

            List<usp_TranslationSelect_Result> tableDil = entity.usp_TranslationSelect(null).ToList();
            galeri.TranslationList = tableDil.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", galeri.TransID);

            return View("Duzenle", galeri);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            if (curUser.HasRight("Galeri", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Galeriler (Dil)");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kaldir(int id)
        {
            if (curUser.HasRight("Galeri", "r"))
            {
                bool result = table.Remove(id);

                if (result)
                {
                    curUser.Log(id, "r", "Galeriler (Dil)");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
