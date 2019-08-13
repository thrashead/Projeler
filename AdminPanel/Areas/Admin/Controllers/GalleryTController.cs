using System.Web.Mvc;
using TDLibrary;
using Repository.UsersModel;
using Repository.GalleryTModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class GalleryTController : Controller
    {
        readonly GalleryT table = new GalleryT();
        readonly Users curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Gallery"))
                return RedirectToAction("Index", "Home");

            return View(table.List());
        }

        public ActionResult Insert(string galID)
        {
            if (!curUser.HasRight("Gallery", "i"))
                return RedirectToAction("Index", "Home");

            int linkID = galID == null ? 0 : galID.ToInteger();

            return View(table.Insert(linkID));
        }

        [HttpPost]
        public ActionResult Insert(GalleryT galeri)
        {
            if (!curUser.HasRight("Gallery", "i"))
                return RedirectToAction("Index", "Home");

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

            galeri = (GalleryT)table.Insert(galeri.GalID, galeri.TransID, galeri);

            return View("Insert", galeri);
        }

        [HttpGet]
        public ActionResult Update(int id)
        {
            if (!curUser.HasRight("Gallery", "u"))
                return RedirectToAction("Index", "Home");

            return View(table.Update(id));
        }

        [HttpPost]
        public ActionResult Update(GalleryT galeri)
        {
            if (!curUser.HasRight("Gallery", "u"))
                return RedirectToAction("Index", "Home");

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

            galeri = (GalleryT)table.Update(galeri.ID, galeri);

            return View("Update", galeri);
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            if (curUser.HasRight("Gallery", "d"))
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
        public JsonResult Remove(int id)
        {
            if (curUser.HasRight("Gallery", "r"))
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
