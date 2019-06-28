using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Admin.Controllers
{
    public class FormTiplerController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("FormEleman"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_PropertyTypesSelect_Result> formeleman = entity.usp_PropertyTypesSelect(null).ToList();

            curUser.Log<FormTipler>(null, "s", "Form Tipleri");

            return View(formeleman);
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("FormEleman", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            FormTipler formeleman = new FormTipler();

            return View(formeleman);
        }

        [HttpPost]
        public ActionResult Ekle(FormTipler formeleman)
        {
            if (!curUser.HasRight("FormEleman", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = entity.usp_PropertyTypesInsert(formeleman.Name, formeleman.Type, formeleman.ShortName, formeleman.HasValue);

                if (result != null)
                {
                    curUser.Log(formeleman, "i", "Form Tipleri");

                    return RedirectToAction("Index");
                }
                else
                    formeleman.Mesaj = "Kayýt eklenemedi.";
            }
            else
                formeleman.Mesaj = "Model uygun deðil.";

            return View("Ekle", formeleman);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("FormEleman", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            usp_PropertyTypesSelectTop_Result table = entity.usp_PropertyTypesSelectTop(id, 1).FirstOrDefault();

            FormTipler formeleman = table.ChangeModel<FormTipler>();

            return View(formeleman);
        }

        [HttpPost]
        public ActionResult Duzenle(FormTipler formeleman)
        {
            if (!curUser.HasRight("FormEleman", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = entity.usp_PropertyTypesUpdate(formeleman.ID, formeleman.Name, formeleman.Type, formeleman.ShortName, formeleman.HasValue);

                if (result != null)
                {
                    curUser.Log(formeleman, "u", "Form Tipleri");

                    return RedirectToAction("Index");
                }
                else
                    formeleman.Mesaj = "Kayýt düzenlenemedi.";
            }
            else
                formeleman.Mesaj = "Model uygun deðil.";

            return View("Duzenle", formeleman);
        }

        public JsonResult Sil(int id)
        {
            try
            {
                if (curUser.HasRight("FormEleman", "d"))
                {
                    entity.usp_PropertyTypesCheckDelete(id);

                    curUser.Log(id, "rd", "Form Tipleri");

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
