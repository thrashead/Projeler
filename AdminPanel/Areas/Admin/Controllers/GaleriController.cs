using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Repository.KullanicilarModel;
using Repository.GaleriModel;
using Repository.GaleriDilModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class GaleriController : Controller
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();
        Galeri table = new Galeri();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Galeri"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("Galeri", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table);
        }

        [HttpPost]
        public ActionResult Ekle(Galeri galeri)
        {
            if (!curUser.HasRight("Galeri", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                galeri.Url = galeri.Title.ToUrl();

                bool result = table.Insert(galeri);

                if (result)
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

            IGaleri galeri = table.Select(id);

            List<usp_GalleryTByLinkedIDSelect_Result> galeriDilList = entity.usp_GalleryTByLinkedIDSelect(id).ToList();
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
                galeri.Url = galeri.Title.ToUrl();

                bool result = table.Update(galeri);

                if (result)
                {
                    curUser.Log(galeri, "u", "Galeriler");

                    return RedirectToAction("Index");
                }
                else
                    galeri.Mesaj = "Kayýt düzenlenemedi.";
            }
            else
                galeri.Mesaj = "Model uygun deðil.";

            List<usp_GalleryTByLinkedIDSelect_Result> galeriDilList = entity.usp_GalleryTByLinkedIDSelect(galeri.ID).ToList();
            galeri.GalleryTList.AddRange(galeriDilList.ChangeModelList<GaleriDil, usp_GalleryTByLinkedIDSelect_Result>());

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
                    curUser.Log(id, "d", "Galeriler");

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
                    curUser.Log(id, "r", "Galeriler");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kopyala(int id)
        {
            if (curUser.HasRight("Galeri", "c"))
            {
                bool result = table.Copy(id);

                if (result)
                {
                    curUser.Log(id, "c", "Galeriler");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
