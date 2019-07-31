using System.Linq;
using System.Web.Mvc;
using AdminPanel.Data;
using TDLibrary;
using Repository.KullanicilarModel;
using Repository.DilModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class DilController : Controller
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();
        Dil table = new Dil();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Dil"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("Dil", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table);
        }

        [HttpPost]
        public ActionResult Ekle(Dil ceviri)
        {
            if (!curUser.HasRight("Dil", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

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

            return View("Ekle", ceviri);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Dil", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.Select(id));
        }

        [HttpPost]
        public ActionResult Duzenle(Dil ceviri)
        {
            if (!curUser.HasRight("Dil", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

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

            return View("Duzenle", ceviri);
        }

        [HttpPost]
        public JsonResult Kaldir(int id)
        {
            if (curUser.HasRight("Dil", "r"))
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
        public JsonResult Sil(int id)
        {
            if (curUser.HasRight("Dil", "d"))
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
