using System.Web.Mvc;
using TDLibrary;
using Repository.LinksModel;
using Repository.UsersModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class LinksController : Controller
    {
        readonly Links table = new Links();
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
        public ActionResult Insert(Links link)
        {
            if (!curUser.HasRight("LinkTypes", "i"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid && link.LinkID > 0 && link.LinkTypeID > 0)
            {
                bool result = table.Insert(link);

                if (result)
                {
                    curUser.Log(link, "i", "Bağlantılar");

                    return RedirectToAction("Index");
                }
                else
                    link.Mesaj = "Kayıt eklenemedi yada zaten daha önce eklenmiş.";
            }
            else
                link.Mesaj = "Model uygun değil.";

            link = (Links)table.Insert(link.LinkID, link.LinkTypeID, link);

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
        public ActionResult Update(Links link)
        {
            if (!curUser.HasRight("LinkTypes", "u"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                bool result = table.Update(link);

                if (result)
                {
                    curUser.Log(link, "u", "Bağlantılar");

                    return RedirectToAction("Index");
                }
                else
                    link.Mesaj = "Kayıt düzenlenemedi yada zaten daha önce eklenmiş.";
            }
            else
                link.Mesaj = "Model uygun değil.";

            link = (Links)table.Update(link.ID, link);

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
                    curUser.Log(id, "d", "Bağlantılar");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpGet]
        public JsonResult FillObject(string linkTypeID)
        {
            return Json(Links.ReturnList(null, null, linkTypeID.ToInteger()), JsonRequestBehavior.AllowGet);
        }
    }
}