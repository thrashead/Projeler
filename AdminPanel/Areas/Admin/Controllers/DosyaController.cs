using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Models;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class DosyaController : Controller
    {
        readonly AdminPanelEntities _entity = new AdminPanelEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Dosya"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_FileSelect_Result> dosya = _entity.usp_FileSelect(null).ToList();

            curUser.Log<Dosya>(null, "s", "Dosya");

            return View(dosya);
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("Dosya", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            Dosya dosya = new Dosya();

            return View(dosya);
        }

        [HttpPost]
        public ActionResult Ekle(Dosya dosya)
        {
            if (!curUser.HasRight("Dosya", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                Uploader file = Uploader.UploadFile();

                if (file.Control)
                {
                    dosya.FileUrl = file.FileName;

                    var result = _entity.usp_FileInsert(dosya.Title, dosya.Description, dosya.FileUrl, dosya.Code, dosya.Active);

                    if (result != null)
                    {
                        curUser.Log(dosya, "i", "Dosya");

                        return RedirectToAction("Index");
                    }
                    else
                        dosya.Mesaj = "Kayýt eklenemedi.";
                }
                else
                    dosya.Mesaj = file.ErrorMessage;
            }
            else
                dosya.Mesaj = "Model uygun deðil.";

            return View("Ekle", dosya);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Dosya", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            usp_FileSelectTop_Result table = _entity.usp_FileSelectTop(id, 1).FirstOrDefault();

            Dosya dosya = table.ChangeModel<Dosya>();

            return View(dosya);
        }

        [HttpPost]
        public ActionResult Duzenle(Dosya dosya)
        {
            if (!curUser.HasRight("Dosya", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                string oldFlag = dosya.FileUrl;

                Uploader file = Uploader.UploadFile();

                if (file.UploadError == null)
                {
                    if (file.HasFile == true)
                    {
                        dosya.FileUrl = file.FileName;

                        try
                        {
                            System.IO.File.Delete(Server.MapPath("~" + AppTools.UploadPath + "/" + oldFlag));
                        }
                        catch
                        {
                            dosya.Mesaj = "Eski dosya silinemedi.";
                        }
                    }

                    var result = _entity.usp_FileUpdate(dosya.ID, dosya.Title, dosya.Description, dosya.FileUrl, dosya.Code, dosya.Active);

                    if (result != null)
                    {
                        curUser.Log(dosya, "u", "Dosya");

                        return RedirectToAction("Index");
                    }
                    else
                        dosya.Mesaj = "Kayýt düzenlenemedi.";
                }
                else
                    dosya.Mesaj = file.ErrorMessage;
            }
            else
            {
                dosya.Mesaj = "Model uygun deðil.";
            }

            return View("Duzenle", dosya);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            try
            {
                if (curUser.HasRight("Dosya", "d"))
                {
                    usp_FileSelectTop_Result table = _entity.usp_FileSelectTop(id, 1).FirstOrDefault();

                    _entity.usp_FileCheckSetDeleted(id);

                    System.IO.File.Move(Server.MapPath("~" + AppTools.UploadPath + "/" + table.FileUrl), Server.MapPath("~" + AppTools.UploadPath + "/Deleted/" + table.FileUrl + ".bak"));

                    curUser.Log(id, "d", "Dosya");

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
                if (curUser.HasRight("Dosya", "rd"))
                {
                    usp_FileSelectTop_Result table = _entity.usp_FileSelectTop(id, 1).FirstOrDefault();

                    _entity.usp_FileCheckDelete(id);

                    System.IO.File.Delete(Server.MapPath("~" + AppTools.UploadPath + "/" + table.FileUrl));

                    curUser.Log(id, "rd", "Dosya");

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
