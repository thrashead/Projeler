using System.Web.Mvc;
using TDLibrary;
using Repository.UsersModel;
using Repository.ContentModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class ContentController : Controller
    {
        Content table = new Content();
        Users curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Content"))
                return RedirectToAction("Index", "Home");

            return View(table.List());
        }

        public ActionResult Insert()
        {
            if (!curUser.HasRight("Content", "i"))
                return RedirectToAction("Index", "Home");

            return View(table);
        }

        [HttpPost]
        public ActionResult Insert(Content icerik)
        {
            if (!curUser.HasRight("Content", "i"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                icerik.Url = icerik.Title.ToUrl();

                bool result = table.Insert(icerik);

                if (result)
                {
                    curUser.Log(icerik, "i", "Ýçerikler");

                    return RedirectToAction("Index");
                }
                else
                    icerik.Mesaj = "Kayýt eklenemedi.";
            }
            else
                icerik.Mesaj = "Model uygun deðil.";

            return View("Insert", icerik);
        }

        [HttpGet]
        public ActionResult Update(int id)
        {
            if (!curUser.HasRight("Content", "u"))
                return RedirectToAction("Index", "Home");

            return View(table.Update(id));
        }

        [HttpPost]
        public ActionResult Update(Content icerik)
        {
            if (!curUser.HasRight("Content", "u"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                icerik.Url = icerik.Title.ToUrl();

                bool result = table.Update(icerik);

                if (result)
                {
                    curUser.Log(icerik, "u", "Ýçerikler");

                    return RedirectToAction("Index");
                }
                else
                    icerik.Mesaj = "Kayýt düzenlenemedi.";
            }
            else
                icerik.Mesaj = "Model uygun deðil.";

            icerik = (Content)table.Update(icerik.ID, icerik);

            return View("Update", icerik);
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            if (curUser.HasRight("Content", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Ýçerikler");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Remove(int id)
        {
            if (curUser.HasRight("Content", "r"))
            {
                bool result = table.Remove(id);

                if (result)
                {
                    curUser.Log(id, "r", "Ýçerikler");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Copy(int id)
        {
            if (curUser.HasRight("Content", "c"))
            {
                bool result = table.Copy(id);

                if (result)
                {
                    curUser.Log(id, "c", "Ýçerikler");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
