using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Admin.Controllers
{
    public class EmlakDilController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("Emlak"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_RealEstatesTLinkedSelect_Result> emlak = entity.usp_RealEstatesTLinkedSelect(null).ToList();

            curUser.Log<EmlakDil>(null, "s", "Emlaklar (Dil)");

            return View(emlak);
        }

        public ActionResult Ekle(string realID)
        {
            if (!curUser.HasRight("Emlak", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            int linkID = realID == null ? 0 : realID.ToInteger();

            EmlakDil emlak = new EmlakDil();

            List<RealEstates> tableEmlak = entity.RealEstates.ToList();
            emlak.RealEstatesList = tableEmlak.ToSelectList("ID", "Baslik", linkID);

            List<Translation> tableTranslation = entity.Translation.ToList();
            emlak.TranslationList = tableTranslation.ToSelectList("ID", "TransName");

            return View(emlak);
        }

        [HttpPost]
        public ActionResult Ekle(EmlakDil emlak)
        {
            if (!curUser.HasRight("Emlak", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid && emlak.RealEsID > 0)
            {
                var result = entity.usp_RealEstatesTCheckInsert(emlak.RealEsID, emlak.TransID, emlak.Baslik, emlak.Code, emlak.Aciklama);

                if (result != null)
                {
                    curUser.Log(emlak, "i", "Emlaklar (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    emlak.Mesaj = "Kayýt eklenemedi veya ayný dilde zaten kayýt eklenmiþ.";
            }
            else
                emlak.Mesaj = "Model uygun deðil.";

            List<RealEstates> tableEmlak = entity.RealEstates.ToList();
            emlak.RealEstatesList = tableEmlak.ToSelectList("ID", "Baslik", emlak.RealEsID);

            List<Translation> tableTranslation = entity.Translation.ToList();
            emlak.TranslationList = tableTranslation.ToSelectList("ID", "TransName", emlak.TransID);

            return View("Ekle", emlak);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("Emlak", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            usp_RealEstatesSelectTop_Result table = entity.usp_RealEstatesSelectTop(id, 1).FirstOrDefault();
            EmlakDil emlak = table.ChangeModel<EmlakDil>();

            List<RealEstates> tableEmlak = entity.RealEstates.ToList();
            emlak.RealEstatesList = tableEmlak.ToSelectList("ID", "Baslik", emlak.RealEsID);

            List<Translation> tableTranslation = entity.Translation.ToList();
            emlak.TranslationList = tableTranslation.ToSelectList("ID", "TransName", emlak.TransID);

            return View(emlak);
        }

        [HttpPost]
        public ActionResult Duzenle(EmlakDil emlak)
        {
            if (!curUser.HasRight("Emlak", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = entity.usp_RealEstatesTCheckUpdate(emlak.ID, emlak.RealEsID, emlak.TransID, emlak.Baslik, emlak.Code, emlak.Aciklama);

                if (result != null)
                {
                    curUser.Log(emlak, "u", "Emlaklar (Dil)");

                    return RedirectToAction("Index");
                }
                else
                    emlak.Mesaj = "Kayýt düzenlenemedi veya ayný dilde zaten kayýt eklenmiþ.";
            }
            else
                emlak.Mesaj = "Model uygun deðil.";

            List<RealEstates> tableEmlak = entity.RealEstates.ToList();
            emlak.RealEstatesList = tableEmlak.ToSelectList("ID", "Baslik", emlak.RealEsID);

            List<Translation> tableTranslation = entity.Translation.ToList();
            emlak.TranslationList = tableTranslation.ToSelectList("ID", "TransName", emlak.TransID);

            return View("Duzenle", emlak);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            try
            {
                if (curUser.HasRight("Emlak", "d"))
                {
                    entity.usp_RealEstatesTSetDeleted(id);

                    curUser.Log(id, "d", "Emlaklar (Dil)");

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
                if (curUser.HasRight("Emlak", "rd"))
                {
                    entity.usp_RealEstatesTDelete(id);

                    curUser.Log(id, "rd", "Emlaklar (Dil)");

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
