using System.Web.Mvc;
using TDLibrary;
using Repository.UsersModel;
using Repository.ProductModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class ProductController : Controller
    {
        readonly Product table = new Product();
        readonly Users curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Product"))
                return RedirectToAction("Index", "Home");

            return View(table.List());
        }

        public ActionResult Insert()
        {
            if (!curUser.HasRight("Product", "i"))
                return RedirectToAction("Index", "Home");

            return View(table);
        }

        [HttpPost]
        public ActionResult Insert(Product urun)
        {
            if (!curUser.HasRight("Product", "i"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                urun.Url = urun.Title.ToUrl();

                bool result = table.Insert(urun);

                if (result)
                {
                    curUser.Log(urun, "i", "�r�nler");

                    return RedirectToAction("Index");
                }
                else
                    urun.Mesaj = "Kay�t eklenemedi.";
            }
            else
                urun.Mesaj = "Model uygun de�il.";

            return View("Insert", urun);
        }

        [HttpGet]
        public ActionResult Update(int id)
        {
            if (!curUser.HasRight("Product", "u"))
                return RedirectToAction("Index", "Home");

            return View(table.Update(id));
        }

        [HttpPost]
        public ActionResult Update(Product urun)
        {
            if (!curUser.HasRight("Product", "u"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                urun.Url = urun.Title.ToUrl();

                bool result = table.Update(urun);

                if (result)
                {
                    curUser.Log(urun, "u", "�r�nler");

                    return RedirectToAction("Index");
                }
                else
                    urun.Mesaj = "Kay�t d�zenlenemedi.";
            }
            else
                urun.Mesaj = "Model uygun de�il.";

            urun = (Product)table.Update(urun.ID, urun);

            return View("Update", urun);
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            if (curUser.HasRight("Product", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "�r�nler");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Remove(int id)
        {
            if (curUser.HasRight("Product", "r"))
            {
                bool result = table.Remove(id);

                if (result)
                {
                    curUser.Log(id, "r", "�r�nler");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Copy(int id)
        {
            if (curUser.HasRight("Product", "c"))
            {
                bool result = table.Copy(id);

                if (result)
                {
                    curUser.Log(id, "c", "�r�nler");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
