using System.Web.Mvc;
using Repository.UsersModel;
using Repository.UserGroupRightsModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class UserGroupRightsController : Controller
    {
        UserGroupRights table = new UserGroupRights();
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
        public ActionResult Insert(UserGroupRights kullanici)
        {
            if (!curUser.HasRight("Users", "i"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                bool result = table.Insert(kullanici);

                if (result)
                {
                    curUser.Log(kullanici, "i", "Kullanýcý Grup Haklarý");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kayýt eklenemedi veya bu þekilde bir Kullanýcý Hakký zaten eklenmiþ.";
            }
            else
                kullanici.Mesaj = "Model uygun deðil.";

            kullanici = (UserGroupRights)table.Insert(kullanici.UserGroupTableID, kullanici.UserGroupProcessID, kullanici);

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
        public ActionResult Update(UserGroupRights kullanici)
        {
            if (!curUser.HasRight("Users", "u"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                bool result = table.Update(kullanici);

                if (result)
                {
                    curUser.Log(kullanici, "u", "Kullanýcý Grup Haklarý");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kayýt düzenlenemedi veya bu þekilde bir Kullanýcý Hakký zaten eklenmiþ.";
            }
            else
                kullanici.Mesaj = "Model uygun deðil.";

            kullanici = (UserGroupRights)table.Update(kullanici.ID, kullanici);

            return View("Update", kullanici);
        }

        public JsonResult Delete(int id)
        {
            if (curUser.HasRight("Users", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Kullanýcý Grup Haklarý");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
