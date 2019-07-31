using System.Linq;
using System.Web.Mvc;
using AdminPanel.Data;
using TDLibrary;
using Repository.KullanicilarModel;
using Repository.DosyaModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class DosyaController : Controller
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();
        Dosya table = new Dosya();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Dosya"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("Dosya", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table);
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

                    bool result = table.Insert(dosya);

                    if (result)
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

            return View(table.Select(id));
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

                    bool result = table.Update(dosya);

                    if (result)
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
            if (curUser.HasRight("Dosya", "d"))
            {
                usp_FileSelectTop_Result dosya = entity.usp_FileSelectTop(id, 1).FirstOrDefault();

                bool result = table.Delete(id);

                if (result)
                {
                    try
                    {
                        System.IO.File.Delete(Server.MapPath("~" + AppTools.UploadPath + "/" + dosya.FileUrl));
                    }
                    catch
                    {
                        return Json(false);
                    }

                    curUser.Log(id, "d", "Dosya");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kaldir(int id)
        {
            if (curUser.HasRight("Dosya", "r"))
            {
                usp_FileSelectTop_Result dosya = entity.usp_FileSelectTop(id, 1).FirstOrDefault();

                bool result = table.Remove(id);

                if (result)
                {
                    try
                    {
                        System.IO.File.Move(Server.MapPath("~" + AppTools.UploadPath + "/" + dosya.FileUrl), Server.MapPath("~" + AppTools.UploadPath + "/Deleted/" + dosya.FileUrl));
                    }
                    catch
                    {
                        return Json(false);
                    }

                    curUser.Log(id, "r", "Dosya");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
