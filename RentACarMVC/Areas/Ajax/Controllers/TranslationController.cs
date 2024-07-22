using System.Web.Mvc;
using TDLibrary;
using Repository.UsersModel;
using Repository.TranslationModel;

namespace RentACarMVC.Areas.Ajax.Controllers
{
    public class TranslationController : Controller
    {
        Translation model = new Translation();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Translation"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] Translation ceviri)
        {
            if (!curUser.HasRight("Translation", "i"))
                return Json(null);

            bool result = model.Insert(ceviri);

            if (result)
            {
                curUser.Log(ceviri, "i", "Diller");

                return Json(ceviri);
            }
            else
                ceviri.Mesaj = "Kayýt eklenemedi.";

            return Json(ceviri);
        }

        [HttpGet]
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("Translation", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Select(id), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] Translation ceviri)
        {
            if (!curUser.HasRight("Translation", "u"))
                return Json(null);

            if (ceviri.HasFile == true)
            {
                try
                {
                    System.IO.File.Delete(Server.MapPath("~" + AppTools.UploadPath + "/" + ceviri.OldFlag));
                }
                catch
                {
                    ceviri.Mesaj = "Eski bayrak silinemedi.";

                    return Json(ceviri);
                }
            }

            bool result = model.Update(ceviri);

            if (result)
            {
                curUser.Log(ceviri, "u", "Diller");

                return Json(ceviri);
            }
            else
                ceviri.Mesaj = "Kayýt düzenlenemedi.";

            return Json(ceviri);
        }

        [HttpGet]
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("Translation", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                Translation table = (Translation)model.Select(id);

                System.IO.File.Delete(Server.MapPath("~" + AppTools.UploadPath + "/" + table.Flag));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }

            bool result = model.Delete(id);

            if (result)
            {
                curUser.Log(id, "d", "Diller");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Remove(int id)
        {
            if (!curUser.HasRight("Translation", "r"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                Translation table = (Translation)model.Select(id);

                System.IO.File.Move(Server.MapPath("~" + AppTools.UploadPath + "/" + table.Flag), Server.MapPath("~" + AppTools.UploadPath + "/Deleted/" + table.Flag));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }

            bool result = model.Remove(id);

            if (result)
            {
                curUser.Log(id, "r", "Diller");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InsertUpload([System.Web.Http.FromBody] Translation ceviri)
        {
            if (!curUser.HasRight("Translation", "i"))
                return Json(null);

            Uploader pic = Uploader.UploadPicture(true, null, false);

            if (pic.Control)
            {
                ceviri.Flag = pic.FileName;

                return Json(ceviri);
            }
            else
            {
                ceviri.Mesaj = pic.ErrorMessage;

                return Json(ceviri);
            }
        }

        [HttpPost]
        public JsonResult UpdateUpload([System.Web.Http.FromBody] Translation ceviri)
        {
            if (!curUser.HasRight("Translation", "u"))
                return Json(null);

            Uploader flag = Uploader.UploadPicture(true, null, false);

            ceviri.HasFile = flag.HasFile;

            if (flag.UploadError == null)
            {
                if (flag.HasFile == true)
                {
                    ceviri.Flag = flag.FileName;
                }

                return Json(ceviri);
            }
            else
            {
                ceviri.Mesaj = flag.ErrorMessage;

                return Json(ceviri);
            }
        }
    }
}
