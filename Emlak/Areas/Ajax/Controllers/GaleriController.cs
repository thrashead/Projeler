using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class GaleriController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Galeri"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_GallerySelect_Result> galeri = entity.usp_GallerySelect(null).ToList();

            return Json(galeri, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Ekle([System.Web.Http.FromBody] Galeri galeri)
        {
            if (!curUser.HasRight("Galeri", "i"))
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
        public JsonResult Duzenle(int id)
        {
            if (!curUser.HasRight("Galeri", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_GallerySelectTop_Result table = entity.usp_GallerySelectTop(id, 1).FirstOrDefault();

            Galeri galeri = table.ChangeModel<Galeri>();

            List<usp_GalleryTByLinkedIDSelect_Result> galeriDilList = entity.usp_GalleryTByLinkedIDSelect(id).ToList();
            galeri.GalleryTList.AddRange(galeriDilList.ChangeModelList<GaleriDil, usp_GalleryTByLinkedIDSelect_Result>());

            return Json(galeri, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Duzenle([System.Web.Http.FromBody] Galeri galeri)
        {
            if (!curUser.HasRight("Galeri", "u"))
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
        public JsonResult Sil(int id)
        {
            if (!curUser.HasRight("Galeri", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_GalleryCheckSetDeleted(id);

                curUser.Log(id, "d", "Galeriler");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult Kaldir(int id)
        {
            if (!curUser.HasRight("Galeri", "rd"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_GalleryCheckDelete(id);

                curUser.Log(id, "rd", "Galeriler");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult Kopyala(int id)
        {
            if (!curUser.HasRight("Galeri", "c"))
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
