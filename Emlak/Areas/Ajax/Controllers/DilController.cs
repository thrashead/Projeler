using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class DilController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Dil"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_TranslationSelect_Result> ceviri = entity.usp_TranslationSelect(null).ToList();

            curUser.Log<Dil>(null, "s", "Diller");

            return Json(ceviri, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Ekle([System.Web.Http.FromBody] Dil ceviri)
        {
            if (!curUser.HasRight("Dil", "i"))
                return Json(null);

            var result = entity.usp_TranslationInsert(ceviri.TransName, ceviri.ShortName, ceviri.Flag, ceviri.Active).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(ceviri, "i", "Diller");

                return Json(ceviri);
            }
            else
                ceviri.Mesaj = "Kayýt eklenemedi.";

            return Json(ceviri);
        }

        [HttpGet]
        public JsonResult Duzenle(int id)
        {
            if (!curUser.HasRight("Dil", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_TranslationSelectTop_Result table = entity.usp_TranslationSelectTop(id, 1).FirstOrDefault();

            Dil ceviri = table.ChangeModel<Dil>();

            return Json(ceviri, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Duzenle([System.Web.Http.FromBody] Dil ceviri)
        {
            if (!curUser.HasRight("Dil", "u"))
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

            var result = entity.usp_TranslationUpdate(ceviri.ID, ceviri.TransName, ceviri.ShortName, ceviri.Flag, ceviri.Active).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(ceviri, "u", "Diller");

                return Json(ceviri);
            }
            else
                ceviri.Mesaj = "Kayýt düzenlenemedi.";

            return Json(ceviri);
        }

        [HttpGet]
        public JsonResult Sil(int id)
        {
            if (!curUser.HasRight("Dil", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                usp_TranslationSelectTop_Result table = entity.usp_TranslationSelectTop(id, 1).FirstOrDefault();

                entity.usp_TranslationSetDeleted(id);

                System.IO.File.Move(Server.MapPath("~" + AppTools.UploadPath + "/" + table.Flag), Server.MapPath("~" + AppTools.UploadPath + "/Deleted/" + table.Flag + ".bak"));

                curUser.Log(id, "d", "Diller");

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
            if (!curUser.HasRight("Dil", "rd"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                usp_TranslationSelectTop_Result table = entity.usp_TranslationSelectTop(id, 1).FirstOrDefault();

                entity.usp_TranslationDelete(id);

                System.IO.File.Delete(Server.MapPath("~" + AppTools.UploadPath + "/" + table.Flag));

                curUser.Log(id, "rd", "Diller");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult EkleYukle([System.Web.Http.FromBody] Dil ceviri)
        {
            if (!curUser.HasRight("Dil", "i"))
                return Json(null);

            Uploader pic = Uploader.UploadPicture(null, false);

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
        public JsonResult DuzenleYukle([System.Web.Http.FromBody] Dil ceviri)
        {
            if (!curUser.HasRight("Dil", "u"))
                return Json(null);

            Uploader flag = Uploader.UploadPicture(null, false);

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
