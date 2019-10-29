using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class PictureController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Picture"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_PictureSelect_Result> resim = entity.usp_PictureSelect(null).ToList();

            return Json(resim, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] Resim resim)
        {
            if (!curUser.HasRight("Picture", "i"))
                return Json(null);

            var result = entity.usp_PictureInsert(resim.Title, resim.Description, resim.PictureUrl, resim.ThumbUrl, resim.Code, resim.Active).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(resim, "i", "Resimler");

                return Json(resim);
            }
            else
                resim.Mesaj = "Kayýt eklenemedi.";

            return Json(resim);
        }

        [HttpGet]
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("Picture", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_PictureSelectTop_Result table = entity.usp_PictureSelectTop(id, 1).FirstOrDefault();

            Resim resim = table.ChangeModel<Resim>();

            return Json(resim, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] Resim resim)
        {
            if (!curUser.HasRight("Picture", "u"))
                return Json(null);

            if (resim.HasFile == true)
            {
                try
                {
                    System.IO.File.Delete(Server.MapPath("~" + AppTools.UploadPath + "/" + resim.OldPictureUrl));
                    System.IO.File.Delete(Server.MapPath("~" + AppTools.UploadPath + "/" + resim.OldThumbUrl));
                }
                catch
                {
                    resim.Mesaj = "Eski resimler silinemedi.";

                    return Json(resim);
                }
            }

            var result = entity.usp_PictureUpdate(resim.ID, resim.Title, resim.Description, resim.PictureUrl, resim.ThumbUrl, resim.Code, resim.Active).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(resim, "u", "Resimler");

                return Json(resim);
            }
            else
                resim.Mesaj = "Kayýt düzenlenemedi.";

            return Json(resim);
        }

        [HttpGet]
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("Picture", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                usp_PictureSelectTop_Result table = entity.usp_PictureSelectTop(id, 1).FirstOrDefault();

                entity.usp_PictureCheckDelete(id);

                System.IO.File.Delete(Server.MapPath("~" + AppTools.UploadPath + "/" + table.PictureUrl));
                System.IO.File.Delete(Server.MapPath("~" + AppTools.UploadPath + "/" + table.ThumbUrl));

                curUser.Log(id, "d", "Resimler");

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
            if (!curUser.HasRight("Picture", "r"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                usp_PictureSelectTop_Result table = entity.usp_PictureSelectTop(id, 1).FirstOrDefault();

                entity.usp_PictureCheckSetDeleted(id);

                System.IO.File.Move(Server.MapPath("~" + AppTools.UploadPath + "/" + table.PictureUrl), Server.MapPath("~" + AppTools.UploadPath + "/Deleted/" + table.PictureUrl + ".bak"));
                System.IO.File.Move(Server.MapPath("~" + AppTools.UploadPath + "/" + table.ThumbUrl), Server.MapPath("~" + AppTools.UploadPath + "/Deleted/" + table.ThumbUrl + ".bak"));

                curUser.Log(id, "r", "Resimler");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult EkleYukle([System.Web.Http.FromBody] Resim resim)
        {
            if (!curUser.HasRight("Picture", "i"))
                return Json(null);

            Uploader pic = Uploader.UploadPicture();

            if (pic.Control)
            {
                resim.HasFile = true;
                resim.PictureUrl = pic.FileName;
                resim.ThumbUrl = pic.ThumbName;

                return Json(resim);
            }
            else
            {
                resim.HasFile = false;
                resim.Mesaj = pic.ErrorMessage;

                return Json(resim);
            }
        }

        [HttpPost]
        public JsonResult DuzenleYukle([System.Web.Http.FromBody] Resim resim)
        {
            if (!curUser.HasRight("Picture", "u"))
                return Json(null);

            Uploader pic = Uploader.UploadPicture();

            resim.HasFile = pic.HasFile;

            if (pic.UploadError == null)
            {
                if (pic.HasFile == true)
                {
                    resim.PictureUrl = pic.FileName;
                    resim.ThumbUrl = pic.ThumbName;
                }

                return Json(resim);
            }
            else
            {
                resim.Mesaj = pic.ErrorMessage;

                return Json(resim);
            }
        }
    }
}
