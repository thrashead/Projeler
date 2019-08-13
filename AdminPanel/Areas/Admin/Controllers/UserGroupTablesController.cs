using System.Web.Mvc;
using TDLibrary;
using Repository.UsersModel;
using Repository.UserGroupTablesModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class UserGroupTablesController : Controller
    {
        readonly UserGroupTables table = new UserGroupTables();
        readonly Users curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Users"))
                return RedirectToAction("Index", "Home");

            return View(table.List());
        }

        public ActionResult Insert(string groupID)
        {
            if (!curUser.HasRight("Users", "i"))
                return RedirectToAction("Index", "Home");

            int linkID = groupID == null ? 0 : groupID.ToInteger();

            return View(table.Insert(linkID));
        }

        [HttpPost]
        public ActionResult Insert(UserGroupTables kullanici)
        {
            if (!curUser.HasRight("Users", "i"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                bool result = table.Insert(kullanici);

                if (result)
                {
                    curUser.Log(kullanici, "i", "Kullan�c� Grup Tablolar�");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kay�t eklenemedi veya bu �ekilde bir Kullan�c� Grup Tablosu zaten eklenmi�.";
            }
            else
                kullanici.Mesaj = "Model uygun de�il.";

            kullanici = (UserGroupTables)table.Insert(kullanici.UserGroupID, kullanici.TypeID, kullanici);

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
        public ActionResult Update(UserGroupTables kullanici)
        {
            if (!curUser.HasRight("Users", "u"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                bool result = table.Update(kullanici);

                if (result)
                {
                    curUser.Log(kullanici, "u", "Kullan�c� Grup Tablolar�");

                    return RedirectToAction("Index");
                }
                else
                    kullanici.Mesaj = "Kay�t d�zenlenemedi veya bu �ekilde bir Kullan�c� Grup Tablosu zaten eklenmi�.";
            }
            else
                kullanici.Mesaj = "Model uygun de�il.";

            kullanici = (UserGroupTables)table.Update(kullanici.ID, kullanici);

            return View("Update", kullanici);
        }

        public JsonResult Delete(int id)
        {
            if (curUser.HasRight("Users", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Kullan�c� Grup Tablolar�");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
