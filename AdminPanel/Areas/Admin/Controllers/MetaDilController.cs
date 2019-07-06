using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Models;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class MetaDilController : Controller
    {
        readonly AdminPanelEntities _entity = new AdminPanelEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Meta"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_MetaTLinkedSelect_Result> meta = _entity.usp_MetaTLinkedSelect(null).ToList();

            return View(meta);
        }

        public ActionResult Ekle(string metaID)
        {
            if (!curUser.HasRight("Meta", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            int linkID = metaID == null ? 0 : metaID.ToInteger();

            MetalarDil meta = new MetalarDil();

            List<Meta> tableMeta = _entity.Meta.ToList();
            meta.MetaList = tableMeta.ToSelectList("ID", "Title", linkID);

            List<Translation> tableTranslation = _entity.Translation.ToList();
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
                var result = _entity.usp_MetaTCheckInsert(meta.MetaID, meta.TransID, meta.Name, meta.Content);

                if (result != null)
                {
                    curUser.Log(meta, "i", "Metalar (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    meta.Mesaj = "Kayýt eklenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                meta.Mesaj = "Model uygun deðil.";

            List<Meta> tableMeta = _entity.Meta.ToList();
            meta.MetaList = tableMeta.ToSelectList("ID", "Title", meta.MetaID);

            List<Translation> tableTranslation = _entity.Translation.ToList();
            meta.TranslationList = tableTranslation.ToSelectList("ID", "TransName", meta.TransID);

            return View("Ekle", meta);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Meta", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            usp_MetaTSelectTop_Result table = _entity.usp_MetaTSelectTop(id, 1).FirstOrDefault();

            MetalarDil meta = table.ChangeModel<MetalarDil>();

            List<Meta> tableMeta = _entity.Meta.ToList();
            meta.MetaList = tableMeta.ToSelectList("ID", "Title", meta.MetaID);

            List<Translation> tableTranslation = _entity.Translation.ToList();
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
                var result = _entity.usp_MetaTCheckUpdate(meta.ID, meta.MetaID, meta.TransID, meta.Name, meta.Content);

                if (result != null)
                {
                    curUser.Log(meta, "u", "Metalar (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    meta.Mesaj = "Kayýt düzenlenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                meta.Mesaj = "Model uygun deðil.";

            List<Meta> tableMeta = _entity.Meta.ToList();
            meta.MetaList = tableMeta.ToSelectList("ID", "Title", meta.MetaID);

            List<Translation> tableTranslation = _entity.Translation.ToList();
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
                    _entity.usp_MetaTSetDeleted(id);

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
                    _entity.usp_MetaTDelete(id);

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
