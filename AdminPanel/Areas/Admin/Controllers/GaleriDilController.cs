using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Models;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class GaleriDilController : Controller
    {
        readonly AdminPanelEntities _entity = new AdminPanelEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Galeri"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_GalleryTLinkedSelect_Result> galeri = _entity.usp_GalleryTLinkedSelect(null).ToList();

            curUser.Log<GaleriDil>(null, "s", "Galeriler (Dil)");

            return View(galeri);
        }

        public ActionResult Ekle(string galID)
        {
            if (!curUser.HasRight("Galeri", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            int linkID = galID == null ? 0 : galID.ToInteger();

            GaleriDil galeri = new GaleriDil();

            List<Gallery> tableGallery = _entity.Gallery.ToList();
            galeri.GalleryList = tableGallery.ToSelectList("ID", "Title", linkID);

            List<Translation> tableTranslation = _entity.Translation.ToList();
            galeri.TranslationList = tableTranslation.ToSelectList("ID", "TransName");

            return View(galeri);
        }

        [HttpPost]
        public ActionResult Ekle(GaleriDil galeri)
        {
            if (!curUser.HasRight("Galeri", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid && galeri.GalID > 0)
            {
                var result = _entity.usp_GalleryTCheckInsert(galeri.GalID, galeri.TransID, galeri.GalleryName, galeri.ShortText1, galeri.ShortText2, galeri.Description);

                if (result != null)
                {
                    curUser.Log(galeri, "i", "Galeriler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    galeri.Mesaj = "Kayýt eklenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                galeri.Mesaj = "Model uygun deðil.";

            List<Gallery> tableGallery = _entity.Gallery.ToList();
            galeri.GalleryList = tableGallery.ToSelectList("ID", "Title", galeri.GalID);

            List<Translation> tableTranslation = _entity.Translation.ToList();
            galeri.TranslationList = tableTranslation.ToSelectList("ID", "TransName", galeri.TransID);

            return View("Ekle", galeri);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Galeri", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            usp_GalleryTSelectTop_Result table = _entity.usp_GalleryTSelectTop(id, 1).FirstOrDefault();
            GaleriDil galeri = table.ChangeModel<GaleriDil>();

            List<Gallery> tableGallery = _entity.Gallery.ToList();
            galeri.GalleryList = tableGallery.ToSelectList("ID", "Title", galeri.GalID);

            List<Translation> tableTranslation = _entity.Translation.ToList();
            galeri.TranslationList = tableTranslation.ToSelectList("ID", "TransName", galeri.TransID);

            return View(galeri);
        }

        [HttpPost]
        public ActionResult Duzenle(GaleriDil galeri)
        {
            if (!curUser.HasRight("Galeri", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = _entity.usp_GalleryTCheckUpdate(galeri.ID, galeri.GalID, galeri.TransID, galeri.GalleryName, galeri.ShortText1, galeri.ShortText2, galeri.Description);

                if (result != null)
                {
                    curUser.Log(galeri, "u", "Galeriler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    galeri.Mesaj = "Kayýt düzenlenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                galeri.Mesaj = "Model uygun deðil.";

            List<Gallery> tableGallery = _entity.Gallery.ToList();
            galeri.GalleryList = tableGallery.ToSelectList("ID", "Title", galeri.GalID);

            List<Translation> tableTranslation = _entity.Translation.ToList();
            galeri.TranslationList = tableTranslation.ToSelectList("ID", "TransName", galeri.TransID);

            return View("Duzenle", galeri);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            try
            {
                if (curUser.HasRight("Galeri", "d"))
                {
                    _entity.usp_GalleryTSetDeleted(id);

                    curUser.Log(id, "d", "Galeriler (Dil)");

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
                if (curUser.HasRight("Galeri", "rd"))
                {
                    _entity.usp_GalleryTDelete(id);

                    curUser.Log(id, "rd", "Galeriler (Dil)");

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
