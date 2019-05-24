using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Admin.Controllers
{
    public class GaleriController : Controller
    {
        readonly EmlakEntities _entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Galeri"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_GallerySelect_Result> galeri = _entity.usp_GallerySelect(null).ToList();

            curUser.Log<Galeri>(null, "s", "Galeriler");

            return View(galeri);
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("Galeri", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            Galeri galeri = new Galeri();

            return View(galeri);
        }

        [HttpPost]
        public ActionResult Ekle(Galeri galeri)
        {
            if (!curUser.HasRight("Galeri", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                galeri.Url = galeri.Title.ToHyperLinkText();

                var result = _entity.usp_GalleryInsert(galeri.Title, galeri.Url, galeri.Code, galeri.Active);

                if (result != null)
                {
                    curUser.Log(galeri, "i", "Galeriler");

                    return RedirectToAction("Index");
                }
                else
                    galeri.Mesaj = "Kayýt eklenemedi.";
            }
            else
                galeri.Mesaj = "Model uygun deðil.";

            return View("Ekle", galeri);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Galeri", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            usp_GallerySelectTop_Result table = _entity.usp_GallerySelectTop(id, 1).FirstOrDefault();

            Galeri galeri = table.ChangeModel<Galeri>();

            List<usp_GalleryTByLinkedIDSelect_Result> galeriDilList = _entity.usp_GalleryTByLinkedIDSelect(id).ToList();
            galeri.GalleryTList.AddRange(galeriDilList.ChangeModelList<GaleriDil, usp_GalleryTByLinkedIDSelect_Result>());

            return View(galeri);
        }

        [HttpPost]
        public ActionResult Duzenle(Galeri galeri)
        {
            if (!curUser.HasRight("Galeri", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                galeri.Url = galeri.Title.ToHyperLinkText();

                var result = _entity.usp_GalleryUpdate(galeri.ID, galeri.Title, galeri.Url, galeri.Code, galeri.Active);

                if (result != null)
                {
                    curUser.Log(galeri, "u", "Galeriler");

                    return RedirectToAction("Index");
                }
                else
                    galeri.Mesaj = "Kayýt düzenlenemedi.";
            }
            else
                galeri.Mesaj = "Model uygun deðil.";

            List<usp_GalleryTByLinkedIDSelect_Result> galeriDilList = _entity.usp_GalleryTByLinkedIDSelect(galeri.ID).ToList();
            galeri.GalleryTList.AddRange(galeriDilList.ChangeModelList<GaleriDil, usp_GalleryTByLinkedIDSelect_Result>());

            return View("Duzenle", galeri);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            try
            {
                if (curUser.HasRight("Galeri", "d"))
                {
                    _entity.usp_GalleryCheckSetDeleted(id);

                    curUser.Log(id, "d", "Galeriler");

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
                    _entity.usp_GalleryCheckDelete(id);

                    curUser.Log(id, "rd", "Galeriler");

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
                if (curUser.HasRight("Galeri", "c"))
                {
                    var result = _entity.usp_GalleryCopy(id);

                    if (result != null)
                        curUser.Log(id, "c", "Galeriler");

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
