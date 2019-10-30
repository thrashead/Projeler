using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class GalleryController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Gallery"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_GallerySelect_Result> galeri = entity.usp_GallerySelect(null).ToList();

            return Json(galeri, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] Galeri galeri)
        {
            if (!curUser.HasRight("Gallery", "i"))
                return Json(null);

            galeri.Url = galeri.Title.ToUrl();

            var result = entity.usp_GalleryInsert(galeri.Title, galeri.Url, galeri.Code, galeri.Active).FirstOrDefault();

            if (result != null)
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

            usp_GallerySelectTop_Result table = entity.usp_GallerySelectTop(id, 1).FirstOrDefault();

            Galeri galeri = table.ChangeModel<Galeri>();

            List<usp_GalleryTByLinkedIDSelect_Result> galeriDilList = entity.usp_GalleryTByLinkedIDSelect(id).ToList();
            galeri.GalleryTList.AddRange(galeriDilList.ChangeModelList<GaleriDil, usp_GalleryTByLinkedIDSelect_Result>());

            return Json(galeri, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] Galeri galeri)
        {
            if (!curUser.HasRight("Gallery", "u"))
                return Json(null);

            galeri.Url = galeri.Title.ToUrl();

            var result = entity.usp_GalleryUpdate(galeri.ID, galeri.Title, galeri.Url, galeri.Code, galeri.Active).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(galeri, "u", "Galeriler");

                return Json(galeri);
            }
            else
                galeri.Mesaj = "Kayýt düzenlenemedi.";

            List<usp_GalleryTByLinkedIDSelect_Result> galeriDilList = entity.usp_GalleryTByLinkedIDSelect(galeri.ID).ToList();
            galeri.GalleryTList.AddRange(galeriDilList.ChangeModelList<GaleriDil, usp_GalleryTByLinkedIDSelect_Result>());

            return Json(galeri);
        }

        [HttpGet]
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("Gallery", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_GalleryCheckDelete(id);

                curUser.Log(id, "d", "Galeriler");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult Remove(int id)
        {
            if (!curUser.HasRight("Gallery", "r"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_GalleryCheckSetDeleted(id);

                curUser.Log(id, "r", "Galeriler");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult Copy(int id)
        {
            if (!curUser.HasRight("Gallery", "c"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                var result = entity.usp_GalleryCopy(id);

                if (result != null)
                    curUser.Log(id, "c", "Galeriler");

                return Json(result == null ? false : true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
