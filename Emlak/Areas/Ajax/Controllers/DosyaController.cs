using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class DosyaController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Dosya"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_FileSelect_Result> dosya = entity.usp_FileSelect(null).ToList();

            return Json(dosya, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Ekle([System.Web.Http.FromBody] Dosya dosya)
        {
            if (!curUser.HasRight("Dosya", "i"))
                return Json(null);

            var result = entity.usp_FileInsert(dosya.Title, dosya.Description, dosya.FileUrl, dosya.Code, dosya.Active).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(dosya, "i", "Dosya");

                return Json(dosya);
            }
            else
                dosya.Mesaj = "Kayýt eklenemedi.";

            return Json(dosya);
        }

        [HttpGet]
        public JsonResult Duzenle(int id)
        {
            if (!curUser.HasRight("Dosya", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_FileSelectTop_Result table = entity.usp_FileSelectTop(id, 1).FirstOrDefault();

            Dosya dosya = table.ChangeModel<Dosya>();

            return Json(dosya, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Duzenle([System.Web.Http.FromBody] Dosya dosya)
        {
            if (!curUser.HasRight("Dosya", "u"))
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

            var result = entity.usp_FileUpdate(dosya.ID, dosya.Title, dosya.Description, dosya.FileUrl, dosya.Code, dosya.Active).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(dosya, "u", "Dosya");

                return Json(dosya);
            }
            else
                dosya.Mesaj = "Kayýt düzenlenemedi.";

            return Json(dosya);
        }

        [HttpGet]
        public JsonResult Sil(int id)
        {
            if (!curUser.HasRight("Dosya", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                usp_FileSelectTop_Result table = entity.usp_FileSelectTop(id, 1).FirstOrDefault();

                entity.usp_FileCheckSetDeleted(id);

                System.IO.File.Move(Server.MapPath("~" + AppTools.UploadPath + "/" + table.FileUrl), Server.MapPath("~" + AppTools.UploadPath + "/Deleted/" + table.FileUrl + ".bak"));

                curUser.Log(id, "d", "Dosya");

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
            if (!curUser.HasRight("Dosya", "rd"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                usp_FileSelectTop_Result table = entity.usp_FileSelectTop(id, 1).FirstOrDefault();

                entity.usp_FileCheckDelete(id);

                System.IO.File.Delete(Server.MapPath("~" + AppTools.UploadPath + "/" + table.FileUrl));

                curUser.Log(id, "rd", "Dosya");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult EkleYukle([System.Web.Http.FromBody] Dosya dosya)
        {
            if (!curUser.HasRight("Dosya", "i"))
                return Json(null);

            Uploader file = Uploader.UploadFile();

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
        public JsonResult DuzenleYukle([System.Web.Http.FromBody] Dosya dosya)
        {
            if (!curUser.HasRight("Dosya", "u"))
                return Json(null);

            Uploader file = Uploader.UploadFile();

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
