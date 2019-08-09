using System.Web.Mvc;
using TDLibrary;
using Repository.UsersModel;
using Repository.GalleryModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class GalleryController : Controller
    {
        Gallery table = new Gallery();
        Users curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Gallery"))
                return RedirectToAction("Index", "Home");

            return View(table.List());
        }

        public ActionResult Insert()
        {
            if (!curUser.HasRight("Gallery", "i"))
                return RedirectToAction("Index", "Home");

            return View(table);
        }

        [HttpPost]
        public ActionResult Insert(Gallery galeri)
        {
            if (!curUser.HasRight("Gallery", "i"))
                return RedirectToAction("Index", "Home");

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
        public ActionResult Update(Gallery galeri)
        {
            if (!curUser.HasRight("Gallery", "u"))
                return RedirectToAction("Index", "Home");

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

            galeri = (Gallery)table.Update(galeri.ID, galeri);

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
                    curUser.Log(id, "d", "Galeriler");

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
                    curUser.Log(id, "r", "Galeriler");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Copy(int id)
        {
            if (curUser.HasRight("Gallery", "c"))
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
