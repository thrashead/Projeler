using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Admin.Controllers
{
    public class FormElemanOzellikController : Controller
    {
        readonly EmlakEntities _entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("FormEleman"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_PropertyAttributesWithPropertyNameSelect_Result> formeleman = _entity.usp_PropertyAttributesWithPropertyNameSelect(null).ToList();

            curUser.Log<FormElemanOzellik>(null, "s", "Form Eleman Özellikleri");

            return View(formeleman);
        }

        public ActionResult Ekle(string propID)
        {
            if (!curUser.HasRight("FormEleman", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            int linkID = propID == null ? 0 : propID.ToInteger();

            FormElemanOzellik formeleman = new FormElemanOzellik();

            List<Property> tableProperties = _entity.Property.ToList();
            formeleman.PropertyList = tableProperties.ToSelectList("ID", "Title", linkID);

            return View(formeleman);
        }

        [HttpPost]
        public ActionResult Ekle(FormElemanOzellik formeleman)
        {
            if (!curUser.HasRight("FormEleman", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid && formeleman.PropID > 0)
            {
                var result = _entity.usp_PropertyAttributesInsert(formeleman.PropID, formeleman.Name, formeleman.Value);

                if (result != null)
                {
                    curUser.Log(formeleman, "i", "Form Eleman Özellikleri");

                    return RedirectToAction("Index");
                }
                else
                    formeleman.Mesaj = "Kayıt eklenemedi.";
            }
            else
                formeleman.Mesaj = "Model uygun değil.";

            List<Property> tableProperties = _entity.Property.ToList();
            formeleman.PropertyList = tableProperties.ToSelectList("ID", "Title", formeleman.PropID);

            return View("Ekle", formeleman);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("FormEleman", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            usp_PropertyAttributesSelectTop_Result table = _entity.usp_PropertyAttributesSelectTop(id, 1).FirstOrDefault();

            FormElemanOzellik formeleman = table.ChangeModel<FormElemanOzellik>();

            List<Property> tableProperties = _entity.Property.ToList();
            formeleman.PropertyList = tableProperties.ToSelectList("ID", "Title", formeleman.PropID);

            return View(formeleman);
        }

        [HttpPost]
        public ActionResult Duzenle(FormElemanOzellik formeleman)
        {
            if (!curUser.HasRight("FormEleman", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = _entity.usp_PropertyAttributesUpdate(formeleman.ID, formeleman.PropID, formeleman.Name, formeleman.Value);

                if (result != null)
                {
                    curUser.Log(formeleman, "u", "Form Eleman Özellikleri");

                    return RedirectToAction("Index");
                }
                else
                    formeleman.Mesaj = "Kayıt düzenlenemedi.";
            }
            else
                formeleman.Mesaj = "Model uygun değil.";

            List<Property> tableProperties = _entity.Property.ToList();
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
                    _entity.usp_PropertyAttributesDelete(id);

                    curUser.Log(id, "rd", "Form Eleman Özellikleri");

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
                    var result = _entity.usp_PropertyAttributesCopy(id);

                    if (result != null)
                        curUser.Log(id, "c", "Form Eleman Özellikleri");

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
