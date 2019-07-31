using System.Linq;
using System.Web.Mvc;
using AdminPanel.Data;
using TDLibrary;
using Repository.KullanicilarModel;
using Repository.ResimModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class ResimController : Controller
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();
        Resim table = new Resim();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Resim"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("Resim", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table);
        }

        [HttpPost]
        public ActionResult Ekle(Resim resim)
        {
            if (!curUser.HasRight("Resim", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

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

            return View("Ekle", resim);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Resim", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.Select(id));
        }

        [HttpPost]
        public ActionResult Duzenle(Resim resim)
        {
            if (!curUser.HasRight("Resim", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

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

            return View("Duzenle", resim);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            if (curUser.HasRight("Resim", "d"))
            {
                usp_PictureSelectTop_Result resim = entity.usp_PictureSelectTop(id, 1).FirstOrDefault();

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
        public JsonResult Kaldir(int id)
        {
            if (curUser.HasRight("Resim", "r"))
            {
                usp_PictureSelectTop_Result resim = entity.usp_PictureSelectTop(id, 1).FirstOrDefault();

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
