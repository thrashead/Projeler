using System.Web.Mvc;
using Repository.UsersModel;
using Repository.GalleryTModel;

namespace AdminPanelAngular.Areas.Ajax.Controllers
{
    public class GalleryTController : Controller
    {
        GalleryT model = new GalleryT();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Gallery"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Insert(int? linkID)
        {
            if (!curUser.HasRight("Gallery", "i"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Insert(linkID), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] GalleryT galeri)
        {
            if (!curUser.HasRight("Gallery", "i"))
                return Json(null);

            if (galeri.GalID > 0)
            {
                bool result = model.Insert(galeri);

                if (result)
                {
                    curUser.Log(galeri, "i", "Galeriler (Dil)");

                    return Json(galeri);
                }
                else
                    galeri.Mesaj = "Kayýt eklenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                galeri.Mesaj = "Model uygun deðil.";

            galeri = (GalleryT)model.Insert(galeri.GalID, galeri.TransID, galeri);

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
        public JsonResult Update([System.Web.Http.FromBody] GalleryT galeri)
        {
            if (!curUser.HasRight("Gallery", "u"))
                return Json(null);

            bool result = model.Update(galeri);

            if (result)
            {
                curUser.Log(galeri, "u", "Galeriler (Dil)");

                return Json(galeri);
            }
            else
                galeri.Mesaj = "Kayýt düzenlenemedi veya ayný dilde zaten veri eklenmiþ.";

            galeri = (GalleryT)model.Update(galeri.ID, galeri);

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
                curUser.Log(id, "d", "Galeriler (Dil)");

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
                curUser.Log(id, "r", "Galeriler (Dil)");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }
    }
}
