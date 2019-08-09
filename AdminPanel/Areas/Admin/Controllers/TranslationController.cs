using System.Linq;
using System.Web.Mvc;
using AdminPanel.Data;
using TDLibrary;
using Repository.UsersModel;
using Repository.TranslationModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class TranslationController : Controller
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();
        Translation table = new Translation();
        Users curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Translation"))
                return RedirectToAction("Index", "Home");

            return View(table.List());
        }

        public ActionResult Insert()
        {
            if (!curUser.HasRight("Translation", "i"))
                return RedirectToAction("Index", "Home");

            return View(table);
        }

        [HttpPost]
        public ActionResult Insert(Translation ceviri)
        {
            if (!curUser.HasRight("Translation", "i"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                Uploader flag = Uploader.UploadPicture(true, null, false);

                if (flag.Control)
                {
                    ceviri.Flag = flag.FileName;

                    bool result = table.Insert(ceviri);

                    if (result)
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

            return View("Insert", ceviri);
        }

        [HttpGet]
        public ActionResult Update(int id)
        {
            if (!curUser.HasRight("Translation", "u"))
                return RedirectToAction("Index", "Home");

            return View(table.Select(id));
        }

        [HttpPost]
        public ActionResult Update(Translation ceviri)
        {
            if (!curUser.HasRight("Translation", "u"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                string oldFlag = ceviri.Flag;

                Uploader flag = Uploader.UploadPicture(true, null, false);

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

                    bool result = table.Update(ceviri);

                    if (result)
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

            return View("Update", ceviri);
        }

        [HttpPost]
        public JsonResult Remove(int id)
        {
            if (curUser.HasRight("Translation", "r"))
            {
                usp_TranslationSelectTop_Result link = entity.usp_TranslationSelectTop(id, 1).FirstOrDefault();

                bool result = table.Remove(id);

                if (result)
                {
                    try
                    {
                        System.IO.File.Move(Server.MapPath("~" + AppTools.UploadPath + "/" + link.Flag), Server.MapPath("~" + AppTools.UploadPath + "/Deleted/" + link.Flag));
                    }
                    catch
                    {
                        return Json(false);
                    }

                    curUser.Log(id, "r", "Diller");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            if (curUser.HasRight("Translation", "d"))
            {
                usp_TranslationSelectTop_Result link = entity.usp_TranslationSelectTop(id, 1).FirstOrDefault();

                bool result = table.Delete(id);

                if (result)
                {
                    try
                    {
                        System.IO.File.Delete(Server.MapPath("~" + AppTools.UploadPath + "/" + link.Flag));
                    }
                    catch
                    {
                        return Json(false);
                    }

                    curUser.Log(id, "d", "Diller");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
