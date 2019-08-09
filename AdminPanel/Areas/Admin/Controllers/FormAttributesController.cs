using System.Web.Mvc;
using Repository.FormAttributesModel;
using Repository.UsersModel;
using TDLibrary;


namespace AdminPanel.Areas.Admin.Controllers
{
    public class FormAttributesController : Controller
    {
        FormAttributes table = new FormAttributes();
        Users curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("FormItems"))
                return RedirectToAction("Index", "Home");

            return View(table.List());
        }

        public ActionResult Insert(string propID)
        {
            if (!curUser.HasRight("FormItems", "i"))
                return RedirectToAction("Index", "Home");

            int linkID = propID == null ? 0 : propID.ToInteger();

            return View(table.Insert(linkID));
        }

        [HttpPost]
        public ActionResult Insert(FormAttributes formeleman)
        {
            if (!curUser.HasRight("FormItems", "i"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid && formeleman.FormItemID > 0)
            {
                bool result = table.Insert(formeleman);

                if (result)
                {
                    curUser.Log(formeleman, "i", "Form Eleman Özellikleri");

                    return RedirectToAction("Index");
                }
                else
                    formeleman.Mesaj = "Kayıt eklenemedi.";
            }
            else
                formeleman.Mesaj = "Model uygun değil.";

            formeleman = (FormAttributes)table.Insert(formeleman.FormItemID, formeleman);

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
        public ActionResult Update(FormAttributes formeleman)
        {
            if (!curUser.HasRight("FormItems", "u"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                bool result = table.Update(formeleman);

                if (result)
                {
                    curUser.Log(formeleman, "u", "Form Eleman Özellikleri");

                    return RedirectToAction("Index");
                }
                else
                    formeleman.Mesaj = "Kayıt düzenlenemedi.";
            }
            else
                formeleman.Mesaj = "Model uygun değil.";

            formeleman = (FormAttributes)table.Update(formeleman.ID, formeleman);

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
                    curUser.Log(id, "d", "Form Eleman Özellikleri");

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
                    curUser.Log(id, "c", "Form Eleman Özellikleri");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
