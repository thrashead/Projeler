using System.Web.Mvc;
using Repository.UsersModel;
using Repository.MetaModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class MetaController : Controller
    {
        Meta table = new Meta();
        Users curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Meta"))
                return RedirectToAction("Index", "Home");

            return View(table.List());
        }

        public ActionResult Insert()
        {
            if (!curUser.HasRight("Meta", "i"))
                return RedirectToAction("Index", "Home");

            return View(table);
        }

        [HttpPost]
        public ActionResult Insert(Meta meta)
        {
            if (!curUser.HasRight("Meta", "i"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                bool result = table.Insert(meta);

                if (result)
                {
                    curUser.Log(meta, "i", "Metalar");

                    return RedirectToAction("Index");
                }
                else
                    meta.Mesaj = "Kayýt eklenemedi.";
            }
            else
                meta.Mesaj = "Model uygun deðil.";

            return View("Insert", meta);
        }

        [HttpGet]
        public ActionResult Update(int id)
        {
            if (!curUser.HasRight("Meta", "u"))
                return RedirectToAction("Index", "Home");

            return View(table.Update(id));
        }

        [HttpPost]
        public ActionResult Update(Meta meta)
        {
            if (!curUser.HasRight("Meta", "u"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                bool result = table.Update(meta);

                if (result)
                {
                    curUser.Log(meta, "u", "Metalar");

                    return RedirectToAction("Index");
                }
                else
                    meta.Mesaj = "Kayýt düzenlenemedi.";
            }
            else
                meta.Mesaj = "Model uygun deðil.";

            meta = (Meta)table.Update(meta.ID, meta);

            return View("Update", meta);
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            if (curUser.HasRight("Meta", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Metalar");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Remove(int id)
        {
            if (curUser.HasRight("Meta", "r"))
            {
                bool result = table.Remove(id);

                if (result)
                {
                    curUser.Log(id, "r", "Metalar");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Copy(int id)
        {
            if (curUser.HasRight("Meta", "c"))
            {
                bool result = table.Copy(id);

                if (result)
                {
                    curUser.Log(id, "c", "Metalar");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
