using System.Web.Mvc;
using Repository.UsersModel;
using Repository.LinkTypesModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class LinkTypesController : Controller
    {
        readonly LinkTypes table = new LinkTypes();
        readonly Users curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("LinkTypes"))
                return RedirectToAction("Index", "Home");

            return View(table.List());
        }

        public ActionResult Insert()
        {
            if (!curUser.HasRight("LinkTypes", "i"))
                return RedirectToAction("Index", "Home");

            return View(table.Insert());
        }

        [HttpPost]
        public ActionResult Insert(LinkTypes link)
        {
            if (!curUser.HasRight("LinkTypes", "i"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                bool result = table.Insert(link);

                if (result)
                {
                    curUser.Log(link, "i", "Baðlý Tipler");

                    return RedirectToAction("Index");
                }
                else
                    link.Mesaj = "Kayýt eklenemedi.";
            }
            else
                link.Mesaj = "Model uygun deðil.";

            link = (LinkTypes)table.Insert(link, null);

            return View("Insert", link);
        }

        [HttpGet]
        public ActionResult Update(int id)
        {
            if (!curUser.HasRight("LinkTypes", "u"))
                return RedirectToAction("Index", "Home");

            return View(table.Update(id));
        }

        [HttpPost]
        public ActionResult Update(LinkTypes link)
        {
            if (!curUser.HasRight("LinkTypes", "u"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                bool result = table.Update(link);

                if (result)
                {
                    curUser.Log(link, "u", "Baðlý Tipler");

                    return RedirectToAction("Index");
                }
                else
                    link.Mesaj = "Kayýt düzenlenemedi.";
            }
            else
                link.Mesaj = "Model uygun deðil.";

            link = (LinkTypes)table.Update(link.ID, link);

            return View("Update", link);
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            if (curUser.HasRight("LinkTypes", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Baðlý Tipler");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Copy(int id)
        {
            if (curUser.HasRight("LinkTypes", "c"))
            {
                bool result = table.Copy(id);

                if (result)
                {
                    curUser.Log(id, "c", "Baðlý Tipler");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpGet]
        public JsonResult FillTypes(int? typeID)
        {
            return Json(LinkTypes.ReturnList(typeID), JsonRequestBehavior.AllowGet);
        }
    }
}
