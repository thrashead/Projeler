using System.Web.Mvc;
using TDLibrary;
using Repository.UsersModel;
using Repository.ContentModel;

namespace AdminPanelAngular.Areas.Ajax.Controllers
{
    public class ContentController : Controller
    {
        Content model = new Content();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Content"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] Content icerik)
        {
            if (!curUser.HasRight("Content", "i"))
                return Json(null);

            icerik.Url = icerik.Title.ToUrl();

            bool result = model.Insert(icerik);

            if (result)
            {
                curUser.Log(icerik, "i", "Ýçerikler");

                return Json(icerik);
            }
            else
                icerik.Mesaj = "Kayýt eklenemedi.";

            return Json(icerik);
        }

        [HttpGet]
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("Content", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Update(id), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] Content icerik)
        {
            if (!curUser.HasRight("Content", "u"))
                return Json(null);

            icerik.Url = icerik.Title.ToUrl();

            bool result = model.Update(icerik);

            if (result)
            {
                curUser.Log(icerik, "u", "Ýçerikler");

                return Json(icerik);
            }
            else
                icerik.Mesaj = "Kayýt düzenlenemedi.";

            icerik = (Content)model.Update(icerik.ID, icerik);

            return Json(icerik);
        }

        [HttpGet]
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("Content", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Delete(id);

            if (result)
            {
                curUser.Log(id, "d", "Ýçerikler");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Remove(int id)
        {
            if (!curUser.HasRight("Content", "r"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Remove(id);

            if (result)
            {
                curUser.Log(id, "r", "Ýçerikler");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Copy(int id)
        {
            if (!curUser.HasRight("Content", "c"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Copy(id);

            if (result)
            {
                curUser.Log(id, "c", "Ýçerikler");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }
    }
}
