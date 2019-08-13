using System.Web.Mvc;
using TDLibrary;
using Repository.UsersModel;
using Repository.CategoryModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class CategoryController : Controller
    {
        readonly Category table = new Category();
        readonly Users curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Category"))
                return RedirectToAction("Index", "Home");

            return View(table.List());
        }

        public ActionResult Insert()
        {
            if (!curUser.HasRight("Category", "i"))
                return RedirectToAction("Index", "Home");

            return View(table.Insert());
        }

        [HttpPost]
        public ActionResult Insert(Category kategori)
        {
            if (!curUser.HasRight("Category", "i"))
                return RedirectToAction("Index", "Home");

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

            kategori = (Category)table.Insert(kategori, null);

            return View("Insert", kategori);
        }

        [HttpGet]
        public ActionResult Update(int id)
        {
            if (!curUser.HasRight("Category", "u"))
                return RedirectToAction("Index", "Home");
            
            return View(table.Update(id));
        }

        [HttpPost]
        public ActionResult Update(Category kategori)
        {
            if (!curUser.HasRight("Category", "u"))
                return RedirectToAction("Index", "Home");

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

            kategori = (Category)table.Update(kategori.ID, kategori);

            return View("Update", kategori);
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            if (curUser.HasRight("Category", "d"))
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
        public JsonResult Remove(int id)
        {
            if (curUser.HasRight("Category", "r"))
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
        public JsonResult Copy(int id)
        {
            if (curUser.HasRight("Category", "c"))
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
