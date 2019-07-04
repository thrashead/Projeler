using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using AdminPanel.Data;
using TDLibrary;
using Models;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class FormElemanDegerController : Controller
    {
        readonly EmlakEntities _entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("FormEleman"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_PropertyValuesWithPropertyNameSelect_Result> formeleman = _entity.usp_PropertyValuesWithPropertyNameSelect(null).ToList();

            curUser.Log<FormElemanDeger>(null, "s", "Form Eleman Değerleri");

            return View(formeleman);
        }

        public ActionResult Ekle(string propID)
        {
            if (!curUser.HasRight("FormEleman", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            int linkID = propID == null ? 0 : propID.ToInteger();

            FormElemanDeger formeleman = new FormElemanDeger();

            List<usp_PropertyHasValueSelect_Result> tableProperties = _entity.usp_PropertyHasValueSelect(null).ToList();
            formeleman.PropertyList = tableProperties.ToSelectList("ID", "Title", linkID);

            return View(formeleman);
        }

        [HttpPost]
        public ActionResult Ekle(FormElemanDeger formeleman)
        {
            if (!curUser.HasRight("FormEleman", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid && formeleman.PropID > 0)
            {
                var result = _entity.usp_PropertyValuesInsert(formeleman.PropID, formeleman.Text, formeleman.Value, formeleman.Code);

                if (result != null)
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

            List<usp_PropertyHasValueSelect_Result> tableProperties = _entity.usp_PropertyHasValueSelect(null).ToList();
            formeleman.PropertyList = tableProperties.ToSelectList("ID", "Title", formeleman.PropID);

            return View("Ekle", formeleman);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("FormEleman", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            usp_PropertyValuesSelectTop_Result table = _entity.usp_PropertyValuesSelectTop(id, 1).FirstOrDefault();

            FormElemanDeger formeleman = table.ChangeModel<FormElemanDeger>();

            List<usp_PropertyHasValueSelect_Result> tableProperties = _entity.usp_PropertyHasValueSelect(null).ToList();
            formeleman.PropertyList = tableProperties.ToSelectList("ID", "Title", formeleman.PropID);

            return View(formeleman);
        }

        [HttpPost]
        public ActionResult Duzenle(FormElemanDeger formeleman)
        {
            if (!curUser.HasRight("FormEleman", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = _entity.usp_PropertyValuesUpdate(formeleman.ID, formeleman.PropID, formeleman.Text, formeleman.Value, formeleman.Code);

                if (result != null)
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

            List<usp_PropertyHasValueSelect_Result> tableProperties = _entity.usp_PropertyHasValueSelect(null).ToList();
            formeleman.PropertyList = tableProperties.ToSelectList("ID", "Title", formeleman.PropID);

            return View("Duzenle", formeleman);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            try
            {
                if (curUser.HasRight("FormEleman", "d"))
                {
                    _entity.usp_PropertyValuesDelete(id);

                    curUser.Log(id, "rd", "Form Eleman Değerleri");

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
        public JsonResult Kopyala(int id)
        {
            try
            {
                if (curUser.HasRight("FormEleman", "c"))
                {
                    var result = _entity.usp_PropertyValuesCopy(id);

                    if (result != null)
                        curUser.Log(id, "c", "Form Eleman Değerleri");

                    return Json(result == null ? false : true);
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