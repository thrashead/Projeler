using System.Linq;
using System.Web.Mvc;
using Repository.Data;
using TDLibrary;
using Repository.UsersModel;
using Repository.FilesModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class FilesController : Controller
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();
        readonly Files table = new Files();
        readonly Users curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Files"))
                return RedirectToAction("Index", "Home");

            return View(table.List());
        }

        public ActionResult Insert()
        {
            if (!curUser.HasRight("Files", "i"))
                return RedirectToAction("Index", "Home");

            return View(table);
        }

        [HttpPost]
        public ActionResult Insert(Files dosya)
        {
            if (!curUser.HasRight("Files", "i"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                Uploader file = Uploader.UploadFile(true);

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

            return View("Insert", dosya);
        }

        [HttpGet]
        public ActionResult Update(int id)
        {
            if (!curUser.HasRight("Files", "u"))
                return RedirectToAction("Index", "Home");

            return View(table.Select(id));
        }

        [HttpPost]
        public ActionResult Update(Files dosya)
        {
            if (!curUser.HasRight("Files", "u"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                string oldFlag = dosya.FileUrl;

                Uploader file = Uploader.UploadFile(true);

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

            return View("Update", dosya);
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            if (curUser.HasRight("Files", "d"))
            {
                usp_FilesSelectTop_Result dosya = entity.usp_FilesSelectTop(id, 1).FirstOrDefault();

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
        public JsonResult Remove(int id)
        {
            if (curUser.HasRight("Files", "r"))
            {
                usp_FilesSelectTop_Result dosya = entity.usp_FilesSelectTop(id, 1).FirstOrDefault();

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
