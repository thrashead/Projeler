using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Repository.KullanicilarModel;
using Repository.MetalarDilModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class MetalarDilController : Controller
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();
        MetalarDil table = new MetalarDil();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Meta"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle(string metaID)
        {
            if (!curUser.HasRight("Meta", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            int linkID = metaID == null ? 0 : metaID.ToInteger();

            List<usp_MetaSelect_Result> tableMetalar = entity.usp_MetaSelect(null).ToList();
            table.MetaList = tableMetalar.ToSelectList<usp_MetaSelect_Result, SelectListItem>("ID", "Title", linkID);

            List<usp_TranslationSelect_Result> tableDil = entity.usp_TranslationSelect(null).ToList();
            table.TranslationList = tableDil.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName");

            return View(table);
        }

        [HttpPost]
        public ActionResult Ekle(MetalarDil meta)
        {
            if (!curUser.HasRight("Meta", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid && meta.MetaID > 0)
            {
                bool result = table.Insert(meta);

                if (result)
                {
                    curUser.Log(meta, "i", "Metalar (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    meta.Mesaj = "Kayýt eklenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                meta.Mesaj = "Model uygun deðil.";

            List<usp_MetaSelect_Result> tableMetalar = entity.usp_MetaSelect(null).ToList();
            meta.MetaList = tableMetalar.ToSelectList<usp_MetaSelect_Result, SelectListItem>("ID", "Title", meta.MetaID);

            List<usp_TranslationSelect_Result> tableDil = entity.usp_TranslationSelect(null).ToList();
            meta.TranslationList = tableDil.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", meta.TransID);

            return View("Ekle", meta);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Meta", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            IMetalarDil meta = table.Select(id);

            List<usp_MetaSelect_Result> tableMetalar = entity.usp_MetaSelect(null).ToList();
            meta.MetaList = tableMetalar.ToSelectList<usp_MetaSelect_Result, SelectListItem>("ID", "Title", meta.MetaID);

            List<usp_TranslationSelect_Result> tableDil = entity.usp_TranslationSelect(null).ToList();
            meta.TranslationList = tableDil.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", meta.TransID);

            return View(meta);
        }

        [HttpPost]
        public ActionResult Duzenle(MetalarDil meta)
        {
            if (!curUser.HasRight("Meta", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Update(meta);

                if (result)
                {
                    curUser.Log(meta, "u", "Metalar (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    meta.Mesaj = "Kayýt düzenlenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                meta.Mesaj = "Model uygun deðil.";

            List<usp_MetaSelect_Result> tableMetalar = entity.usp_MetaSelect(null).ToList();
            meta.MetaList = tableMetalar.ToSelectList<usp_MetaSelect_Result, SelectListItem>("ID", "Title", meta.MetaID);

            List<usp_TranslationSelect_Result> tableDil = entity.usp_TranslationSelect(null).ToList();
            meta.TranslationList = tableDil.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", meta.TransID);

            return View("Duzenle", meta);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            if (curUser.HasRight("Meta", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Metalar (Dil)");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kaldir(int id)
        {
            if (curUser.HasRight("Meta", "r"))
            {
                bool result = table.Remove(id);

                if (result)
                {
                    curUser.Log(id, "r", "Metalar (Dil)");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
