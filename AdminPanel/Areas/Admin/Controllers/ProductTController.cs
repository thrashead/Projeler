using System.Web.Mvc;
using TDLibrary;
using Repository.UsersModel;
using Repository.ProductTModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class ProductTController : Controller
    {
        readonly ProductT table = new ProductT();
        readonly Users curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Product"))
                return RedirectToAction("Index", "Home");

            return View(table.List());
        }

        public ActionResult Insert(string prodID)
        {
            if (!curUser.HasRight("Product", "i"))
                return RedirectToAction("Index", "Home");

            int linkID = prodID == null ? 0 : prodID.ToInteger();

            return View(table.Insert(linkID));
        }

        [HttpPost]
        public ActionResult Insert(ProductT urun)
        {
            if (!curUser.HasRight("Product", "i"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid && urun.ProdID > 0)
            {
                bool result = table.Insert(urun);

                if (result)
                {
                    curUser.Log(urun, "i", "�r�nler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    urun.Mesaj = "Kay�t eklenemedi veya ayn� dilde zaten veri eklenmi�.";
            }
            else
                urun.Mesaj = "Model uygun de�il.";

            urun = (ProductT)table.Insert(urun.ProdID, urun.TransID, urun);

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
        public ActionResult Update(ProductT urun)
        {
            if (!curUser.HasRight("Product", "u"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                bool result = table.Update(urun);

                if (result)
                {
                    curUser.Log(urun, "u", "�r�nler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    urun.Mesaj = "Kay�t d�zenlenemedi veya ayn� dilde zaten veri eklenmi�.";
            }
            else
                urun.Mesaj = "Model uygun de�il.";

            urun = (ProductT)table.Update(urun.ID, urun);

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
                    curUser.Log(id, "d", "�r�nler (Dil)");

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
                    curUser.Log(id, "r", "�r�nler (Dil)");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
