using System.Web.Mvc;
using TDLibrary;
using Repository.UsersModel;
using Repository.ContentTModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class ContentTController : Controller
    {
        readonly ContentT table = new ContentT();
        readonly Users curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Content"))
                return RedirectToAction("Index", "Home");

            return View(table.List());
        }

        public ActionResult Insert(string contID)
        {
            if (!curUser.HasRight("Content", "i"))
                return RedirectToAction("Index", "Home");

            int linkID = contID == null ? 0 : contID.ToInteger();
            
            return View(table.Insert(linkID));
        }

        [HttpPost]
        public ActionResult Insert(ContentT icerik)
        {
            if (!curUser.HasRight("Content", "i"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid && icerik.ContID > 0)
            {
                bool result = table.Insert(icerik);

                if (result)
                {
                    curUser.Log(icerik, "i", "Ýçerikler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    icerik.Mesaj = "Kayýt eklenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                icerik.Mesaj = "Model uygun deðil.";

            icerik = (ContentT)table.Insert(icerik.ContID, icerik.TransID, icerik);

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
        public ActionResult Update(ContentT icerik)
        {
            if (!curUser.HasRight("Content", "u"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                bool result = table.Update(icerik);

                if (result)
                {
                    curUser.Log(icerik, "u", "Ýçerikler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    icerik.Mesaj = "Kayýt düzenlenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                icerik.Mesaj = "Model uygun deðil.";

            icerik = (ContentT)table.Update(icerik.ID, icerik);

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
                    curUser.Log(id, "d", "Ýçerikler (Dil)");

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
                    curUser.Log(id, "r", "Ýçerikler (Dil)");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
