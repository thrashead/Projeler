using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Repository.KullanicilarModel;
using Repository.IcerikDilModel;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class IcerikDilController : Controller
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();
        IcerikDil table = new IcerikDil();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Icerik"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle(string contID)
        {
            if (!curUser.HasRight("Icerik", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            int linkID = contID == null ? 0 : contID.ToInteger();

            List<usp_ContentSelect_Result> tableIcerik = entity.usp_ContentSelect(null).ToList();
            table.ContentList = tableIcerik.ToSelectList<usp_ContentSelect_Result, SelectListItem>("ID", "Title", linkID);

            List<usp_TranslationSelect_Result> tableDil = entity.usp_TranslationSelect(null).ToList();
            table.TranslationList = tableDil.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName");

            return View(table);
        }

        [HttpPost]
        public ActionResult Ekle(IcerikDil icerik)
        {
            if (!curUser.HasRight("Icerik", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid && icerik.ContID > 0)
            {
                bool result = table.Insert(icerik);

                if (result)
                {
                    curUser.Log(icerik, "i", "Ýçerikler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    icerik.Mesaj = "Kayýt eklenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                icerik.Mesaj = "Model uygun deðil.";

            List<usp_ContentSelect_Result> tableIcerik = entity.usp_ContentSelect(null).ToList();
            icerik.ContentList = tableIcerik.ToSelectList<usp_ContentSelect_Result, SelectListItem>("ID", "Title", icerik.ContID);

            List<usp_TranslationSelect_Result> tableDil = entity.usp_TranslationSelect(null).ToList();
            icerik.TranslationList = tableDil.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", icerik.TransID);

            return View("Ekle", icerik);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Icerik", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            IIcerikDil icerik = table.Select(id);

            List<usp_ContentSelect_Result> tableIcerik = entity.usp_ContentSelect(null).ToList();
            icerik.ContentList = tableIcerik.ToSelectList<usp_ContentSelect_Result, SelectListItem>("ID", "Title", icerik.ContID);

            List<usp_TranslationSelect_Result> tableDil = entity.usp_TranslationSelect(null).ToList();
            icerik.TranslationList = tableDil.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", icerik.TransID);

            return View(icerik);
        }

        [HttpPost]
        public ActionResult Duzenle(IcerikDil icerik)
        {
            if (!curUser.HasRight("Icerik", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Update(icerik);

                if (result)
                {
                    curUser.Log(icerik, "u", "Ýçerikler (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    icerik.Mesaj = "Kayýt düzenlenemedi veya ayný dilde zaten veri eklenmiþ.";
            }
            else
                icerik.Mesaj = "Model uygun deðil.";

            List<usp_ContentSelect_Result> tableIcerik = entity.usp_ContentSelect(null).ToList();
            icerik.ContentList = tableIcerik.ToSelectList<usp_ContentSelect_Result, SelectListItem>("ID", "Title", icerik.ContID);

            List<usp_TranslationSelect_Result> tableDil = entity.usp_TranslationSelect(null).ToList();
            icerik.TranslationList = tableDil.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", icerik.TransID);

            return View("Duzenle", icerik);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            if (curUser.HasRight("Icerik", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Ýçerikler (Dil)");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kaldir(int id)
        {
            if (curUser.HasRight("Icerik", "r"))
            {
                bool result = table.Remove(id);

                if (result)
                {
                    curUser.Log(id, "r", "Ýçerikler (Dil)");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
