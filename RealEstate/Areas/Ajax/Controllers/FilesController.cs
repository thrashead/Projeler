using System.Web.Mvc;
using TDLibrary;
using Repository.UsersModel;
using Repository.FilesModel;

namespace RealEstate.Areas.Ajax.Controllers
{
    public class FilesController : Controller
    {
        Files model = new Files();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Files"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] Files dosya)
        {
            if (!curUser.HasRight("Files", "i"))
                return Json(null);

            bool result = model.Insert(dosya);

            if (result)
            {
                curUser.Log(dosya, "i", "Dosya");

                return Json(dosya);
            }
            else
                dosya.Mesaj = "Kayýt eklenemedi.";

            return Json(dosya);
        }

        [HttpGet]
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("Files", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Select(id), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] Files dosya)
        {
            if (!curUser.HasRight("Files", "u"))
                return Json(null);

            if (dosya.HasFile == true)
            {
                try
                {
                    System.IO.File.Delete(Server.MapPath("~" + AppTools.UploadPath + "/" + dosya.OldFileUrl));
                }
                catch
                {
                    dosya.Mesaj = "Eski dosya silinemedi.";
                }
            }

            bool result = model.Update(dosya);

            if (result)
            {
                curUser.Log(dosya, "u", "Dosya");

                return Json(dosya);
            }
            else
                dosya.Mesaj = "Kayýt düzenlenemedi.";

            return Json(dosya);
        }

        [HttpGet]
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("Files", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                Files table = (Files)model.Select(id);

                System.IO.File.Delete(Server.MapPath("~" + AppTools.UploadPath + "/" + table.FileUrl));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }

            bool result = model.Delete(id);

            if (result)
            {
                curUser.Log(id, "d", "Dosya");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Remove(int id)
        {
            if (!curUser.HasRight("Files", "r"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                Files table = (Files)model.Select(id);

                System.IO.File.Move(Server.MapPath("~" + AppTools.UploadPath + "/" + table.FileUrl), Server.MapPath("~" + AppTools.UploadPath + "/Deleted/" + table.FileUrl));
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }

            bool result = model.Remove(id);

            if (result)
            {
                curUser.Log(id, "r", "Dosya");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InsertUpload([System.Web.Http.FromBody] Files dosya)
        {
            if (!curUser.HasRight("Files", "i"))
                return Json(null);

            Uploader file = Uploader.UploadFile(true);

            if (file.Control)
            {
                dosya.FileUrl = file.FileName;

                return Json(dosya);
            }
            else
            {
                dosya.Mesaj = file.ErrorMessage;

                return Json(dosya);
            }
        }

        [HttpPost]
        public JsonResult UpdateUpload([System.Web.Http.FromBody] Files dosya)
        {
            if (!curUser.HasRight("Files", "u"))
                return Json(null);

            Uploader file = Uploader.UploadFile(true);

            dosya.HasFile = file.HasFile;

            if (file.UploadError == null)
            {
                if (file.HasFile == true)
                {
                    dosya.FileUrl = file.FileName;
                }

                return Json(dosya);
            }
            else
            {
                dosya.Mesaj = file.ErrorMessage;

                return Json(dosya);
            }
        }
    }
}
