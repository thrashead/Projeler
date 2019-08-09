using System.Web.Mvc;
using Repository.UsersModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class UsersController : Controller
    {
        Users table = new Users();
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

            return View(table.Insert());
        }

        [HttpPost]
        public ActionResult Insert(Users kullanici)
        {
            if (!curUser.HasRight("Users", "i"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                bool result = table.Insert(kullanici);

                if (result)
                {
                    curUser.Log(kullanici, "i", "Kullanýcýlar");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kayýt eklenemedi. Ayný isimde baþka bir kullanýcý olabilir.";
            }
            else
                kullanici.Mesaj = "Model uygun deðil.";

            kullanici = (Users)table.Insert(kullanici.GroupID, kullanici);

            return View("Insert", kullanici);
        }

        [HttpGet]
        public ActionResult Update(int id)
        {
            if (curUser?.ID != id)
                if (!curUser.HasRight("Users", "u"))
                    return RedirectToAction("Index", "Home");

            return View(table.Update(id));
        }

        [HttpPost]
        public ActionResult Update(Users kullanici)
        {
            if (curUser?.ID != kullanici.ID)
                if (!curUser.HasRight("Users", "u"))
                    return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                bool result = table.Update(kullanici);

                if (result)
                {
                    curUser.Log(kullanici, "u", "Kullanýcýlar");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kayýt düzenlenemedi. Ayný isimde baþka bir kullanýcý olabilir.";
            }
            else
                kullanici.Mesaj = "Model uygun deðil.";

            kullanici = (Users)table.Update(kullanici.ID, kullanici);

            return View("Update", kullanici);
        }

        [HttpGet]
        public ActionResult ChangeGroup(int id)
        {
            if (!curUser.HasRight("Users", "cg"))
                return RedirectToAction("Index", "Home");

            return View(table.ChangeGroup(id));
        }

        [HttpPost]
        public ActionResult ChangeGroup(Users kullanici)
        {
            if (!curUser.HasRight("Users", "cg"))
                return RedirectToAction("Index", "Home");

            try
            {
                bool result = table.ChangeGroup(kullanici);

                if (result)
                {
                    curUser.Log(kullanici, "cg", "Kullanýcýlar");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Grup deðiþtirilemedi.";
            }
            catch
            {
                kullanici.Mesaj = "Model uygun deðil.";
            }

            kullanici = (Users)table.ChangeGroup(kullanici.ID, kullanici);

            return View("GrupDegistir", kullanici);
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            if (curUser.HasRight("Users", "d"))
            {
                if (curUser?.ID != id)
                {
                    bool result = table.Delete(id);

                    if (result)
                    {
                        curUser.Log(id, "d", "Kullanýcýlar");

                        return Json(true);
                    }
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Remove(int id)
        {
            if (curUser.HasRight("Users", "r"))
            {
                if (curUser?.ID != id)
                {
                    bool result = table.Remove(id);

                    if (result)
                    {
                        curUser.Log(id, "r", "Kullanýcýlar");

                        return Json(true);
                    }
                }
            }

            return Json(false);
        }
    }
}
