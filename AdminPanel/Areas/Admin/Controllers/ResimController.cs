using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Models;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class ResimController : Controller
    {
        readonly EmlakEntities _entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Resim"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_PictureSelect_Result> resim = _entity.usp_PictureSelect(null).ToList();

            curUser.Log<Resim>(null, "s", "Resimler");

            return View(resim);
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("Resim", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            Resim resim = new Resim();

            return View(resim);
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

                    var result = _entity.usp_PictureInsert(resim.Title, resim.Description, resim.PictureUrl, resim.ThumbUrl, resim.Code, resim.Active);

                    if (result != null)
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

            usp_PictureSelectTop_Result table = _entity.usp_PictureSelectTop(id, 1).FirstOrDefault();

            Resim resim = table.ChangeModel<Resim>();

            return View(resim);
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

                    var result = _entity.usp_PictureUpdate(resim.ID, resim.Title, resim.Description, resim.PictureUrl, resim.ThumbUrl, resim.Code, resim.Active);

                    if (result != null)
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
            try
            {
                if (curUser.HasRight("Resim", "d"))
                {
                    usp_PictureSelectTop_Result table = _entity.usp_PictureSelectTop(id, 1).FirstOrDefault();

                    _entity.usp_PictureCheckSetDeleted(id);

                    System.IO.File.Move(Server.MapPath("~" + AppTools.UploadPath + "/" + table.PictureUrl), Server.MapPath("~" + AppTools.UploadPath + "/Deleted/" + table.PictureUrl + ".bak"));
                    System.IO.File.Move(Server.MapPath("~" + AppTools.UploadPath + "/" + table.ThumbUrl), Server.MapPath("~" + AppTools.UploadPath + "/Deleted/" + table.ThumbUrl + ".bak"));

                    curUser.Log(id, "d", "Resimler");

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
                if (curUser.HasRight("Resim", "rd"))
                {
                    usp_PictureSelectTop_Result table = _entity.usp_PictureSelectTop(id, 1).FirstOrDefault();

                    _entity.usp_PictureCheckDelete(id);

                    System.IO.File.Delete(Server.MapPath("~" + AppTools.UploadPath + "/" + table.PictureUrl));
                    System.IO.File.Delete(Server.MapPath("~" + AppTools.UploadPath + "/" + table.ThumbUrl));

                    curUser.Log(id, "rd", "Resimler");

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
