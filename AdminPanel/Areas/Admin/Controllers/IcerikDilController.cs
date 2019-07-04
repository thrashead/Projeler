using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Models;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class IcerikDilController : Controller
    {
        readonly EmlakEntities _entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Icerik"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_ContentTLinkedSelect_Result> icerik = _entity.usp_ContentTLinkedSelect(null).ToList();

            curUser.Log<IcerikDil>(null, "s", "Ýçerikler (Dil)");

            return View(icerik);
        }

        public ActionResult Ekle(string contID)
        {
            if (!curUser.HasRight("Icerik", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            int linkID = contID == null ? 0 : contID.ToInteger();

            IcerikDil icerik = new IcerikDil();

            List<Content> tableContent = _entity.Content.ToList();
            icerik.ContentList = tableContent.ToSelectList("ID", "Title", linkID);

            List<Translation> tableTranslation = _entity.Translation.ToList();
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
                var result = _entity.usp_ContentTCheckInsert(icerik.ContID, icerik.TransID, icerik.ContentName, icerik.ShortText1, icerik.ShortText2, icerik.Description);

                if (result != null)
                {
                    curUser.Log(icerik, "i", "Ýçerikler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    icerik.Mesaj = "Kayýt eklenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                icerik.Mesaj = "Model uygun deðil.";

            List<Content> tableContent = _entity.Content.ToList();
            icerik.ContentList = tableContent.ToSelectList("ID", "Title", icerik.ContID);

            List<Translation> tableTranslation = _entity.Translation.ToList();
            icerik.TranslationList = tableTranslation.ToSelectList("ID", "TransName", icerik.TransID);

            return View("Ekle", icerik);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Icerik", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            usp_ContentTSelectTop_Result table = _entity.usp_ContentTSelectTop(id, 1).FirstOrDefault();

            IcerikDil icerik = table.ChangeModel<IcerikDil>();

            List<Content> tableContent = _entity.Content.ToList();
            icerik.ContentList = tableContent.ToSelectList("ID", "Title", icerik.ContID);

            List<Translation> tableTranslation = _entity.Translation.ToList();
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
                var result = _entity.usp_ContentTCheckUpdate(icerik.ID, icerik.ContID, icerik.TransID, icerik.ContentName, icerik.ShortText1, icerik.ShortText2, icerik.Description);

                if (result != null)
                {
                    curUser.Log(icerik, "u", "Ýçerikler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    icerik.Mesaj = "Kayýt düzenlenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                icerik.Mesaj = "Model uygun deðil.";

            List<Content> tableContent = _entity.Content.ToList();
            icerik.ContentList = tableContent.ToSelectList("ID", "Title", icerik.ContID);

            List<Translation> tableTranslation = _entity.Translation.ToList();
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
                    _entity.usp_ContentTSetDeleted(id);

                    curUser.Log(id, "d", "Ýçerikler (Dil)");

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
                    _entity.usp_ContentTDelete(id);

                    curUser.Log(id, "rd", "Ýçerikler (Dil)");

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
