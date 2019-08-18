using System.Web.Mvc;
using Repository.UsersModel;
using Repository.GalleryModel;

namespace RentACar.Areas.Ajax.Controllers
{
    public class GalleryController : Controller
    {
        Gallery model = new Gallery();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Gallery"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] Gallery galeri)
        {
            if (!curUser.HasRight("Gallery", "i"))
                return Json(null);

            bool result = model.Insert(galeri);

            if (result)
            {
                curUser.Log(galeri, "i", "Galeriler");

                return Json(galeri);
            }
            else
                galeri.Mesaj = "Kayýt eklenemedi.";

            return Json(galeri);
        }

        [HttpGet]
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("Gallery", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Update(id), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] Gallery galeri)
        {
            if (!curUser.HasRight("Gallery", "u"))
                return Json(null);

            bool result = model.Update(galeri);

            if (result)
            {
                curUser.Log(galeri, "u", "Galeriler");

                return Json(galeri);
            }
            else
                galeri.Mesaj = "Kayýt düzenlenemedi.";

            galeri = (Gallery)model.Update(galeri.ID, galeri);

            return Json(galeri);
        }

        [HttpGet]
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("Gallery", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Delete(id);

            if (result)
            {
                curUser.Log(id, "d", "Galeriler");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Remove(int id)
        {
            if (!curUser.HasRight("Gallery", "r"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Remove(id);

            if (result)
            {
                curUser.Log(id, "r", "Galeriler");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Copy(int id)
        {
            if (!curUser.HasRight("Gallery", "c"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Copy(id);

            if (result)
            {
                curUser.Log(id, "c", "Galeriler");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }
    }
}
