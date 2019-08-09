using System.Web.Mvc;
using TDLibrary;
using Repository.FormItemsModel;
using Repository.UsersModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class FormItemsController : Controller
    {
        FormItems table = new FormItems();
        Users curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("FormItems"))
                return RedirectToAction("Index", "Home");

            return View(table.List());
        }

        public ActionResult Insert(string groupID)
        {
            if (!curUser.HasRight("FormItems", "i"))
                return RedirectToAction("Index", "Home");

            int linkID = groupID == null ? 0 : groupID.ToInteger();
            
            return View(table.Insert(linkID));
        }

        [HttpPost]
        public ActionResult Insert(FormItems formeleman)
        {
            if (!curUser.HasRight("FormItems", "i"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                bool result = table.Insert(formeleman);

                if (result)
                {
                    curUser.Log(formeleman, "i", "Form Elemanları");

                    return RedirectToAction("Index");
                }
                else
                    formeleman.Mesaj = "Kayıt eklenemedi.";
            }
            else
                formeleman.Mesaj = "Model uygun değil.";

            formeleman = (FormItems)table.Insert(formeleman.GroupID, formeleman.FormTypeID, formeleman);

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
        public ActionResult Update(FormItems formeleman)
        {
            if (!curUser.HasRight("FormItems", "u"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                bool result = table.Update(formeleman);

                if (result)
                {
                    curUser.Log(formeleman, "u", "Form Elemanları");

                    return RedirectToAction("Index");
                }
                else
                    formeleman.Mesaj = "Kayıt düzenlenemedi.";
            }
            else
                formeleman.Mesaj = "Model uygun değil.";

            formeleman = (FormItems)table.Update(formeleman.ID, formeleman);

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
                    curUser.Log(id, "d", "Form Elemanları");

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
                    curUser.Log(id, "c", "Form Elemanları");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
