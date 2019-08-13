using System.Linq;
using System.Web.Mvc;
using Repository.Data;
using TDLibrary;
using Repository.UsersModel;
using Repository.PicturesModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class PicturesController : Controller
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();
        readonly Pictures table = new Pictures();
        readonly Users curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Pictures"))
                return RedirectToAction("Index", "Home");

            return View(table.List());
        }

        public ActionResult Insert()
        {
            if (!curUser.HasRight("Pictures", "i"))
                return RedirectToAction("Index", "Home");

            return View(table);
        }

        [HttpPost]
        public ActionResult Insert(Pictures resim)
        {
            if (!curUser.HasRight("Pictures", "i"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                Uploader pic = Uploader.UploadPicture();

                if (pic.Control)
                {
                    resim.PictureUrl = pic.FileName;
                    resim.ThumbUrl = pic.ThumbName;

                    bool result = table.Insert(resim);

                    if (result)
                    {
                        curUser.Log(resim, "i", "Resimler");

                        return RedirectToAction("Index");
                    }
                    else
                        resim.Mesaj = "Kayýt eklenemedi.";
                }
                else
                    resim.Mesaj = pic.ErrorMessage;
            }
            else
                resim.Mesaj = "Model uygun deðil.";

            return View("Insert", resim);
        }

        [HttpGet]
        public ActionResult Update(int id)
        {
            if (!curUser.HasRight("Pictures", "u"))
                return RedirectToAction("Index", "Home");

            return View(table.Select(id));
        }

        [HttpPost]
        public ActionResult Update(Pictures resim)
        {
            if (!curUser.HasRight("Pictures", "u"))
                return RedirectToAction("Index", "Home");

            if (ModelState.IsValid)
            {
                string oldPicture = resim.PictureUrl;
                string oldThumb = resim.ThumbUrl;

                Uploader pic = Uploader.UploadPicture();

                if (pic.UploadError == null)
                {
                    if (pic.HasFile == true)
                    {
                        resim.PictureUrl = pic.FileName;
                        resim.ThumbUrl = pic.ThumbName;

                        try
                        {
                            System.IO.File.Delete(Server.MapPath("~" + AppTools.UploadPath + "/" + oldPicture));
                            System.IO.File.Delete(Server.MapPath("~" + AppTools.UploadPath + "/" + oldThumb));
                        }
                        catch
                        {
                            resim.Mesaj = "Eski resimler silinemedi.";
                        }
                    }

                    bool result = table.Update(resim);

                    if (result)
                    {
                        curUser.Log(resim, "u", "Resimler");

                        return RedirectToAction("Index");
                    }
                    else
                        resim.Mesaj = "Kayýt düzenlenemedi.";
                }
                else
                    resim.Mesaj = pic.ErrorMessage;
            }
            else
                resim.Mesaj = "Model uygun deðil.";

            return View("Update", resim);
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            if (curUser.HasRight("Pictures", "d"))
            {
                usp_PicturesSelectTop_Result resim = entity.usp_PicturesSelectTop(id, 1).FirstOrDefault();

                bool result = table.Delete(id);

                if (result)
                {
                    try
                    {
                        System.IO.File.Delete(Server.MapPath("~" + AppTools.UploadPath + "/" + resim.PictureUrl));
                        System.IO.File.Delete(Server.MapPath("~" + AppTools.UploadPath + "/" + resim.ThumbUrl));
                    }
                    catch
                    {
                        return Json(false);
                    }

                    curUser.Log(id, "d", "Resimler");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Remove(int id)
        {
            if (curUser.HasRight("Pictures", "r"))
            {
                usp_PicturesSelectTop_Result resim = entity.usp_PicturesSelectTop(id, 1).FirstOrDefault();

                bool result = table.Remove(id);

                if (result)
                {
                    try
                    {
                        System.IO.File.Move(Server.MapPath("~" + AppTools.UploadPath + "/" + resim.PictureUrl), Server.MapPath("~" + AppTools.UploadPath + "/Deleted/" + resim.PictureUrl));
                        System.IO.File.Move(Server.MapPath("~" + AppTools.UploadPath + "/" + resim.ThumbUrl), Server.MapPath("~" + AppTools.UploadPath + "/Deleted/" + resim.ThumbUrl));
                    }
                    catch
                    {
                        return Json(false);
                    }

                    curUser.Log(id, "r", "Resimler");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
