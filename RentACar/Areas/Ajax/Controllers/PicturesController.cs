using System.Web.Mvc;
using TDLibrary;
using Repository.UsersModel;
using Repository.PicturesModel;

namespace RentACar.Areas.Ajax.Controllers
{
    public class PicturesController : Controller
    {
        Pictures model = new Pictures();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Pictures"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] Pictures resim)
        {
            if (!curUser.HasRight("Pictures", "i"))
                return Json(null);

            bool result = model.Insert(resim);

            if (result)
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
            if (!curUser.HasRight("Pictures", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Select(id), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] Pictures resim)
        {
            if (!curUser.HasRight("Pictures", "u"))
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

            bool result = model.Update(resim);

            if (result)
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
            if (!curUser.HasRight("Pictures", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                Pictures table = (Pictures)model.Select(id);

                System.IO.File.Delete(Server.MapPath("~" + AppTools.UploadPath + "/" + table.PictureUrl));
                System.IO.File.Delete(Server.MapPath("~" + AppTools.UploadPath + "/" + table.ThumbUrl));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }

            bool result = model.Delete(id);

            if (result)
            {
                curUser.Log(id, "d", "Resimler");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Remove(int id)
        {
            if (!curUser.HasRight("Pictures", "r"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                Pictures table = (Pictures)model.Select(id);

                System.IO.File.Move(Server.MapPath("~" + AppTools.UploadPath + "/" + table.PictureUrl), Server.MapPath("~" + AppTools.UploadPath + "/Deleted/" + table.PictureUrl));
                System.IO.File.Move(Server.MapPath("~" + AppTools.UploadPath + "/" + table.ThumbUrl), Server.MapPath("~" + AppTools.UploadPath + "/Deleted/" + table.ThumbUrl));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }

            bool result = model.Remove(id);

            if (result)
            {
                curUser.Log(id, "r", "Resimler");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InsertUpload([System.Web.Http.FromBody] Pictures resim)
        {
            if (!curUser.HasRight("Pictures", "i"))
                return Json(null);

            Uploader pic = Uploader.UploadPicture(true);

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
        public JsonResult UpdateUpload([System.Web.Http.FromBody] Pictures resim)
        {
            if (!curUser.HasRight("Pictures", "u"))
                return Json(null);

            Uploader pic = Uploader.UploadPicture(true);

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
