using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Admin.Controllers
{
    public class DilController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Dil"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_TranslationSelect_Result> ceviri = entity.usp_TranslationSelect(null).ToList();

            curUser.Log<Dil>(null, "s", "Diller");

            return View(ceviri);
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("Dil", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            Dil ceviri = new Dil();

            return View(ceviri);
        }

        [HttpPost]
        public ActionResult Ekle(Dil ceviri)
        {
            if (!curUser.HasRight("Dil", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                Uploader flag = Uploader.UploadPicture(null, false);

                if (flag.Control)
                {
                    ceviri.Flag = flag.FileName;

                    var result = entity.usp_TranslationInsert(ceviri.TransName, ceviri.ShortName, ceviri.Flag, ceviri.Active);

                    if (result != null)
                    {
                        curUser.Log(ceviri, "i", "Diller");

                        return RedirectToAction("Index");
                    }
                    else
                        ceviri.Mesaj = "Kayýt eklenemedi.";
                }
                else
                    ceviri.Mesaj = flag.ErrorMessage;
            }
            else
                ceviri.Mesaj = "Model uygun deðil.";

            return View("Ekle", ceviri);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Dil", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            usp_TranslationSelectTop_Result table = entity.usp_TranslationSelectTop(id, 1).FirstOrDefault();

            Dil ceviri = table.ChangeModel<Dil>();

            return View(ceviri);
        }

        [HttpPost]
        public ActionResult Duzenle(Dil ceviri)
        {
            if (!curUser.HasRight("Dil", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                string oldFlag = ceviri.Flag;

                Uploader flag = Uploader.UploadPicture(null, false);

                if (flag.UploadError == null)
                {
                    if (flag.HasFile == true)
                    {
                        ceviri.Flag = flag.FileName;

                        try
                        {
                            System.IO.File.Delete(Server.MapPath("~" + AppTools.UploadPath + "/" + oldFlag));
                        }
                        catch
                        {
                            ceviri.Mesaj = "Eski bayrak silinemedi.";
                        }
                    }

                    var result = entity.usp_TranslationUpdate(ceviri.ID, ceviri.TransName, ceviri.ShortName, ceviri.Flag, ceviri.Active);

                    if (result != null)
                    {
                        curUser.Log(ceviri, "u", "Diller");

                        return RedirectToAction("Index");
                    }
                    else
                        ceviri.Mesaj = "Kayýt düzenlenemedi.";
                }
                else
                    ceviri.Mesaj = flag.ErrorMessage;
            }
            else
                ceviri.Mesaj = "Model uygun deðil.";

            return View("Duzenle", ceviri);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            try
            {
                if (curUser.HasRight("Dil", "d"))
                {
                    usp_TranslationSelectTop_Result table = entity.usp_TranslationSelectTop(id, 1).FirstOrDefault();

                    entity.usp_TranslationSetDeleted(id);

                    System.IO.File.Move(Server.MapPath("~" + AppTools.UploadPath + "/" + table.Flag), Server.MapPath("~" + AppTools.UploadPath + "/Deleted/" + table.Flag + ".bak"));

                    curUser.Log(id, "d", "Diller");

                    return Json(true);
                }
            }
            catch
            {
                return Json(false);
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kaldir(int id)
        {
            try
            {
                if (curUser.HasRight("Dil", "rd"))
                {
                    usp_TranslationSelectTop_Result table = entity.usp_TranslationSelectTop(id, 1).FirstOrDefault();

                    entity.usp_TranslationDelete(id);

                    System.IO.File.Delete(Server.MapPath("~" + AppTools.UploadPath + "/" + table.Flag));

                    curUser.Log(id, "rd", "Diller");

                    return Json(true);
                }
            }
            catch
            {
                return Json(false);
            }

            return Json(false);
        }
    }
}
