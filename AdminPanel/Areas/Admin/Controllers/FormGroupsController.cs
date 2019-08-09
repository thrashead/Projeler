using System.Web.Mvc;
using Repository.FormGroupsModel;
using Repository.UsersModel;


namespace AdminPanel.Areas.Admin.Controllers
{
    public class FormGroupsController : Controller
    {
        FormGroups table = new FormGroups();
        Users curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("FormItems"))
                return RedirectToAction("Index", "Home");

            return View(table.List());
        }

        public ActionResult Insert()
        {
            if (!curUser.HasRight("FormItems", "i"))
                return RedirectToAction("Index", "Home");

            return View(table);
        }

        [HttpPost]
        public ActionResult Insert(FormGroups formeleman)
        {
            if (!curUser.HasRight("FormItems", "i"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                bool result = table.Insert(formeleman);

                if (result)
                {
                    curUser.Log(formeleman, "i", "Form Eleman Gruplarý");

                    return RedirectToAction("Index");
                }
                else
                    formeleman.Mesaj = "Kayýt eklenemedi.";
            }
            else
                formeleman.Mesaj = "Model uygun deðil.";

            return View("Insert", formeleman);
        }

        [HttpGet]
        public ActionResult Update(int id)
        {
            if (!curUser.HasRight("FormItems", "u"))
                return RedirectToAction("Index", "Home");

            return View(table.Update(id));
        }

        [HttpPost]
        public ActionResult Update(FormGroups formeleman)
        {
            if (!curUser.HasRight("FormItems", "u"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                bool result = table.Update(formeleman);

                if (result)
                {
                    curUser.Log(formeleman, "u", "Form Eleman Gruplarý");

                    return RedirectToAction("Index");
                }
                else
                    formeleman.Mesaj = "Kayýt düzenlenemedi.";
            }
            else
                formeleman.Mesaj = "Model uygun deðil.";

            formeleman = (FormGroups)table.Update(formeleman.ID, formeleman);

            return View("Update", formeleman);
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            if (curUser.HasRight("FormItems", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Form Eleman Gruplarý");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Copy(int id)
        {
            if (curUser.HasRight("FormItems", "c"))
            {
                bool result = table.Copy(id);

                if (result)
                {
                    curUser.Log(id, "c", "Form Eleman Gruplarý");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}