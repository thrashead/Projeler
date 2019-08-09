using System.Web.Mvc;
using Repository.UsersModel;
using Repository.UserGroupsModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class UserGroupsController : Controller
    {
        UserGroups table = new UserGroups();
        Users curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Users"))
                return RedirectToAction("Index", "Home");

            return View(table.List());
        }

        public ActionResult Insert()
        {
            if (!curUser.HasRight("Users", "i"))
                return RedirectToAction("Index", "Home");

            return View(table);
        }

        [HttpPost]
        public ActionResult Insert(UserGroups kullanici)
        {
            if (!curUser.HasRight("Users", "i"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                bool result = table.Insert(kullanici);

                if (result)
                {
                    curUser.Log(kullanici, "i", "Kullan�c� Gruplar�");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kay�t eklenemedi.";
            }
            else
                kullanici.Mesaj = "Model uygun de�il.";

            return View("Insert", kullanici);
        }

        [HttpGet]
        public ActionResult Update(int id)
        {
            if (!curUser.HasRight("Users", "u"))
                return RedirectToAction("Index", "Home");

            return View(table.Update(id));
        }

        [HttpPost]
        public ActionResult Update(UserGroups kullanici)
        {
            if (!curUser.HasRight("Users", "u"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                bool result = table.Update(kullanici);

                if (result)
                {
                    curUser.Log(kullanici, "u", "Kullan�c� Gruplar�");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kay�t d�zenlenemedi.";
            }
            kullanici.Mesaj = "Model uygun de�il.";

            kullanici = (UserGroups)table.Update(kullanici.ID, kullanici);

            return View("Update", kullanici);
        }

        public JsonResult Delete(int id)
        {
            if (curUser.HasRight("Users", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Kullan�c� Gruplar�");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
