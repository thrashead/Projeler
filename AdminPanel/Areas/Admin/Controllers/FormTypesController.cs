using System.Web.Mvc;
using Repository.UsersModel;
using Repository.FormTypesModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class FormTypesController : Controller
    {
        FormTypes table = new FormTypes();
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
        public ActionResult Insert(FormTypes formeleman)
        {
            if (!curUser.HasRight("FormItems", "i"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                bool result = table.Insert(formeleman);

                if (result)
                {
                    curUser.Log(formeleman, "i", "Form Tipleri");

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

            return View(table.Select(id));
        }

        [HttpPost]
        public ActionResult Update(FormTypes formeleman)
        {
            if (!curUser.HasRight("FormItems", "u"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                bool result = table.Update(formeleman);

                if (result)
                {
                    curUser.Log(formeleman, "u", "Form Tipleri");

                    return RedirectToAction("Index");
                }
                else
                    formeleman.Mesaj = "Kayýt düzenlenemedi.";
            }
            else
                formeleman.Mesaj = "Model uygun deðil.";

            return View("Update", formeleman);
        }

        public JsonResult Delete(int id)
        {
            if (curUser.HasRight("FormItems", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Form Tipleri");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
