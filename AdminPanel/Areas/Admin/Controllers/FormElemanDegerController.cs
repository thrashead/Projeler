using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using AdminPanel.Data;
using Repository.FormElemanDegerModel;
using Repository.KullanicilarModel;
using TDLibrary;


namespace AdminPanel.Areas.Admin.Controllers
{
    public class FormElemanDegerController : Controller
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();
        FormElemanDeger table = new FormElemanDeger();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("FormEleman"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle(string propID)
        {
            if (!curUser.HasRight("FormEleman", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            int linkID = propID == null ? 0 : propID.ToInteger();

            List<usp_PropertyHasValueSelect_Result> tableProperties = entity.usp_PropertyHasValueSelect(null).ToList();
            table.PropertyList = tableProperties.ToSelectList<usp_PropertyHasValueSelect_Result, SelectListItem>("ID", "Title", linkID);

            return View(table);
        }

        [HttpPost]
        public ActionResult Ekle(FormElemanDeger formeleman)
        {
            if (!curUser.HasRight("FormEleman", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid && formeleman.PropID > 0)
            {
                bool result = table.Insert(formeleman);

                if (result)
                {
                    curUser.Log(formeleman, "i", "Form Eleman Değerleri");

                    return RedirectToAction("Index");
                }
                else
                    formeleman.Mesaj = "Kayıt eklenemedi.";
            }
            else
            {
                formeleman.Mesaj = "Model uygun değil.";
            }

            List<usp_PropertyHasValueSelect_Result> tableProperties = entity.usp_PropertyHasValueSelect(null).ToList();
            formeleman.PropertyList = tableProperties.ToSelectList<usp_PropertyHasValueSelect_Result, SelectListItem>("ID", "Title", formeleman.PropID);

            return View("Ekle", formeleman);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("FormEleman", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            IFormElemanDeger formeleman = table.Select(id);

            List<usp_PropertyHasValueSelect_Result> tableProperties = entity.usp_PropertyHasValueSelect(null).ToList();
            formeleman.PropertyList = tableProperties.ToSelectList<usp_PropertyHasValueSelect_Result, SelectListItem>("ID", "Title", formeleman.PropID);

            return View(formeleman);
        }

        [HttpPost]
        public ActionResult Duzenle(FormElemanDeger formeleman)
        {
            if (!curUser.HasRight("FormEleman", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Update(formeleman);

                if (result)
                {
                    curUser.Log(formeleman, "u", "Form Eleman Değerleri");

                    return RedirectToAction("Index");
                }
                else
                    formeleman.Mesaj = "Kayıt düzenlenemedi.";
            }
            else
            {
                formeleman.Mesaj = "Model uygun değil.";
            }

            List<usp_PropertyHasValueSelect_Result> tableProperties = entity.usp_PropertyHasValueSelect(null).ToList();
            formeleman.PropertyList = tableProperties.ToSelectList<usp_PropertyHasValueSelect_Result, SelectListItem>("ID", "Title", formeleman.PropID);

            return View("Duzenle", formeleman);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            if (curUser.HasRight("FormEleman", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Form Eleman Değerleri");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kopyala(int id)
        {
            if (curUser.HasRight("FormEleman", "c"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "c", "Form Eleman Değerleri");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}