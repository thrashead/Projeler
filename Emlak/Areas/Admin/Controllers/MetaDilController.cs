using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Admin.Controllers
{
    public class MetaDilController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Meta"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_MetaTLinkedSelect_Result> meta = entity.usp_MetaTLinkedSelect(null).ToList();

            curUser.Log<MetalarDil>(null, "s", "Metalar (Dil)");

            return View(meta);
        }

        public ActionResult Ekle(string metaID)
        {
            if (!curUser.HasRight("Meta", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            int linkID = metaID == null ? 0 : metaID.ToInteger();

            MetalarDil meta = new MetalarDil();

            List<usp_MetaSelect_Result> tableMeta = entity.usp_MetaSelect(null).ToList();
            meta.MetaList = tableMeta.ToSelectList("ID", "Title", linkID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            meta.TranslationList = tableTranslation.ToSelectList("ID", "TransName");

            return View(meta);
        }

        [HttpPost]
        public ActionResult Ekle(MetalarDil meta)
        {
            if (!curUser.HasRight("Meta", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid && meta.MetaID > 0)
            {
                var result = entity.usp_MetaTCheckInsert(meta.MetaID, meta.TransID, meta.Name, meta.Content);

                if (result != null)
                {
                    curUser.Log(meta, "i", "Metalar (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    meta.Mesaj = "Kayýt eklenemedi veya ayný dilde zaten kayýt eklenmiþ.";
            }
            else
                meta.Mesaj = "Model uygun deðil.";

            List<usp_MetaSelect_Result> tableMeta = entity.usp_MetaSelect(null).ToList();
            meta.MetaList = tableMeta.ToSelectList("ID", "Title", meta.MetaID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            meta.TranslationList = tableTranslation.ToSelectList("ID", "TransName", meta.TransID);

            return View("Ekle", meta);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Meta", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            usp_MetaTSelectTop_Result table = entity.usp_MetaTSelectTop(id, 1).FirstOrDefault();

            MetalarDil meta = table.ChangeModel<MetalarDil>();

            List<usp_MetaSelect_Result> tableMeta = entity.usp_MetaSelect(null).ToList();
            meta.MetaList = tableMeta.ToSelectList("ID", "Title", meta.MetaID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            meta.TranslationList = tableTranslation.ToSelectList("ID", "TransName", meta.TransID);

            return View(meta);
        }

        [HttpPost]
        public ActionResult Duzenle(MetalarDil meta)
        {
            if (!curUser.HasRight("Meta", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = entity.usp_MetaTCheckUpdate(meta.ID, meta.MetaID, meta.TransID, meta.Name, meta.Content);

                if (result != null)
                {
                    curUser.Log(meta, "u", "Metalar (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    meta.Mesaj = "Kayýt düzenlenemedi veya ayný dilde zaten kayýt eklenmiþ.";
            }
            else
                meta.Mesaj = "Model uygun deðil.";

            List<usp_MetaSelect_Result> tableMeta = entity.usp_MetaSelect(null).ToList();
            meta.MetaList = tableMeta.ToSelectList("ID", "Title", meta.MetaID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            meta.TranslationList = tableTranslation.ToSelectList("ID", "TransName", meta.TransID);

            return View("Duzenle", meta);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            try
            {
                if (curUser.HasRight("Meta", "d"))
                {
                    entity.usp_MetaTSetDeleted(id);

                    curUser.Log(id, "d", "Metalar (Dil)");

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
                if (curUser.HasRight("Meta", "rd"))
                {
                    entity.usp_MetaTDelete(id);

                    curUser.Log(id, "rd", "Metalar (Dil)");

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
