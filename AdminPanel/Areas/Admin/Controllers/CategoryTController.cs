using System.Web.Mvc;
using TDLibrary;
using Repository.UsersModel;
using Repository.CategoryTModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class CategoryTController : Controller
    {
        CategoryT table = new CategoryT();
        Users curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Category"))
                return RedirectToAction("Index", "Home");

            return View(table.List());
        }

        public ActionResult Insert(string catID)
        {
            if (!curUser.HasRight("Category", "i"))
                return RedirectToAction("Index", "Home");

            int linkID = catID == null ? 0 : catID.ToInteger();

            return View(table.Insert(linkID));
        }

        [HttpPost]
        public ActionResult Insert(CategoryT kategori)
        {
            if (!curUser.HasRight("Category", "i"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid && kategori.CatID > 0)
            {
                bool result = table.Insert(kategori);

                if (result)
                {
                    curUser.Log(kategori, "i", "Kategoriler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    kategori.Mesaj = "Kayýt eklenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                kategori.Mesaj = "Model uygun deðil.";

            kategori = (CategoryT)table.Insert(kategori.CatID, kategori.TransID, kategori);

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
        public ActionResult Update(CategoryT kategori)
        {
            if (!curUser.HasRight("Category", "u"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                bool result = table.Update(kategori);

                if (result)
                {
                    curUser.Log(kategori, "u", "Kategoriler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    kategori.Mesaj = "Kayýt düzenlenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                kategori.Mesaj = "Model uygun deðil.";

            kategori = (CategoryT)table.Update(kategori.ID, kategori);

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
                    curUser.Log(id, "d", "Kategoriler (Dil)");

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
                    curUser.Log(id, "r", "Kategoriler (Dil)");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
