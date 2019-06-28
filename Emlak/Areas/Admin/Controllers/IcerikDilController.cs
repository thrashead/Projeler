using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Admin.Controllers
{
    public class IcerikDilController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Icerik"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_ContentTLinkedSelect_Result> icerik = entity.usp_ContentTLinkedSelect(null).ToList();

            curUser.Log<IcerikDil>(null, "s", "��erikler (Dil)");

            return View(icerik);
        }

        public ActionResult Ekle(string contID)
        {
            if (!curUser.HasRight("Icerik", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            int linkID = contID == null ? 0 : contID.ToInteger();

            IcerikDil icerik = new IcerikDil();

            List<usp_ContentSelect_Result> tableContent = entity.usp_ContentSelect(null).ToList();
            icerik.ContentList = tableContent.ToSelectList("ID", "Title", linkID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            icerik.TranslationList = tableTranslation.ToSelectList("ID", "TransName");

            return View(icerik);
        }

        [HttpPost]
        public ActionResult Ekle(IcerikDil icerik)
        {
            if (!curUser.HasRight("Icerik", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid && icerik.ContID > 0)
            {
                var result = entity.usp_ContentTCheckInsert(icerik.ContID, icerik.TransID, icerik.ContentName, icerik.ShortText1, icerik.ShortText2, icerik.Description);

                if (result != null)
                {
                    curUser.Log(icerik, "i", "��erikler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    icerik.Mesaj = "Kay�t eklenemedi veya ayn� dilde zaten kay�t eklenmi�.";
            }
            else
                icerik.Mesaj = "Model uygun de�il.";

            List<usp_ContentSelect_Result> tableContent = entity.usp_ContentSelect(null).ToList();
            icerik.ContentList = tableContent.ToSelectList("ID", "Title", icerik.ContID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            icerik.TranslationList = tableTranslation.ToSelectList("ID", "TransName", icerik.TransID);

            return View("Ekle", icerik);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Icerik", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            usp_ContentTSelectTop_Result table = entity.usp_ContentTSelectTop(id, 1).FirstOrDefault();

            IcerikDil icerik = table.ChangeModel<IcerikDil>();

            List<usp_ContentSelect_Result> tableContent = entity.usp_ContentSelect(null).ToList();
            icerik.ContentList = tableContent.ToSelectList("ID", "Title", icerik.ContID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            icerik.TranslationList = tableTranslation.ToSelectList("ID", "TransName", icerik.TransID);

            return View(icerik);
        }

        [HttpPost]
        public ActionResult Duzenle(IcerikDil icerik)
        {
            if (!curUser.HasRight("Icerik", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = entity.usp_ContentTCheckUpdate(icerik.ID, icerik.ContID, icerik.TransID, icerik.ContentName, icerik.ShortText1, icerik.ShortText2, icerik.Description);

                if (result != null)
                {
                    curUser.Log(icerik, "u", "��erikler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    icerik.Mesaj = "Kay�t d�zenlenemedi veya ayn� dilde zaten kay�t eklenmi�.";
            }
            else
                icerik.Mesaj = "Model uygun de�il.";

            List<usp_ContentSelect_Result> tableContent = entity.usp_ContentSelect(null).ToList();
            icerik.ContentList = tableContent.ToSelectList("ID", "Title", icerik.ContID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            icerik.TranslationList = tableTranslation.ToSelectList("ID", "TransName", icerik.TransID);

            return View("Duzenle", icerik);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            try
            {
                if (curUser.HasRight("Icerik", "d"))
                {
                    entity.usp_ContentTSetDeleted(id);

                    curUser.Log(id, "d", "��erikler (Dil)");

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
                if (curUser.HasRight("Icerik", "rd"))
                {
                    entity.usp_ContentTDelete(id);

                    curUser.Log(id, "rd", "��erikler (Dil)");

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
