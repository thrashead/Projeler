using System.Web.Mvc;
using TDLibrary;
using Repository.UsersModel;
using Repository.MetaTModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class MetaTController : Controller
    {
        MetaT table = new MetaT();
        Users curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Meta"))
                return RedirectToAction("Index", "Home");

            return View(table.List());
        }

        public ActionResult Insert(string metaID)
        {
            if (!curUser.HasRight("Meta", "i"))
                return RedirectToAction("Index", "Home");

            int linkID = metaID == null ? 0 : metaID.ToInteger();

            return View(table.Insert(linkID));
        }

        [HttpPost]
        public ActionResult Insert(MetaT meta)
        {
            if (!curUser.HasRight("Meta", "i"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid && meta.MetaID > 0)
            {
                bool result = table.Insert(meta);

                if (result)
                {
                    curUser.Log(meta, "i", "Metalar (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    meta.Mesaj = "Kayýt eklenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                meta.Mesaj = "Model uygun deðil.";

            meta = (MetaT)table.Insert(meta.MetaID, meta.TransID, meta);

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
        public ActionResult Update(MetaT meta)
        {
            if (!curUser.HasRight("Meta", "u"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                bool result = table.Update(meta);

                if (result)
                {
                    curUser.Log(meta, "u", "Metalar (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    meta.Mesaj = "Kayýt düzenlenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                meta.Mesaj = "Model uygun deðil.";

            meta = (MetaT)table.Update(meta.ID, meta);

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
                    curUser.Log(id, "d", "Metalar (Dil)");

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
                    curUser.Log(id, "r", "Metalar (Dil)");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
