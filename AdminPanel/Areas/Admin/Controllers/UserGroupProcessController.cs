using System.Web.Mvc;
using Repository.UsersModel;
using Repository.UserGroupProcessModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class UserGroupProcessController : Controller
    {
        UserGroupProcess table = new UserGroupProcess();
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
        public ActionResult Insert(UserGroupProcess kullanici)
        {
            if (!curUser.HasRight("Users", "i"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                bool result = table.Insert(kullanici);

                if (result)
                {
                    curUser.Log(kullanici, "i", "Kullan�c� Grup ��lemleri");

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

            return View(table.Select(id));
        }

        [HttpPost]
        public ActionResult Update(UserGroupProcess kullanici)
        {
            if (!curUser.HasRight("Users", "u"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                bool result = table.Update(kullanici);

                if (result)
                {
                    curUser.Log(kullanici, "u", "Kullan�c� Grup ��lemleri");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kay�t d�zenlenemedi.";
            }
            else
                kullanici.Mesaj = "Model uygun de�il.";

            return View("Update", kullanici);
        }

        public JsonResult Delete(int id)
        {
            if (curUser.HasRight("Users", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Kullan�c� Grup ��lemleri");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
