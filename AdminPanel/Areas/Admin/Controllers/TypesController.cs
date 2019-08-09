using System.Web.Mvc;
using Repository.UsersModel;
using Repository.TypesModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class TypesController : Controller
    {
        Types table = new Types();
        Users curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Types"))
                return RedirectToAction("Index", "Home");

            return View(table.List());
        }

        public ActionResult Insert()
        {
            if (!curUser.HasRight("Types", "i"))
                return RedirectToAction("Index", "Home");

            return View(table);
        }

        [HttpPost]
        public ActionResult Insert(Types tip)
        {
            if (!curUser.HasRight("Types", "i"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                bool result = table.Insert(tip);

                if (result)
                {
                    curUser.Log(tip, "i", "Tipler");

                    return RedirectToAction("Index");
                }
                else
                    tip.Mesaj = "Kayýt eklenemedi.";
            }
            else
                tip.Mesaj = "Model uygun deðil.";

            return View("Insert", tip);
        }

        [HttpGet]
        public ActionResult Update(int id)
        {
            if (!curUser.HasRight("Types", "u"))
                return RedirectToAction("Index", "Home");

            return View(table.Select(id));
        }

        [HttpPost]
        public ActionResult Update(Types tip)
        {
            if (!curUser.HasRight("Types", "u"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                bool result = table.Update(tip);

                if (result)
                {
                    curUser.Log(tip, "u", "Tipler");

                    return RedirectToAction("Index");
                }
                else
                    tip.Mesaj = "Kayýt düzenlenemedi.";
            }
            else
                tip.Mesaj = "Model uygun deðil.";

            return View("Update", tip);
        }

        public JsonResult Delete(int id)
        {
            if (curUser.HasRight("Types", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Tipler");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
