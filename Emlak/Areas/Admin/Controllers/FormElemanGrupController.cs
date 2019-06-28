using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Admin.Controllers
{
    public class FormElemanGrupController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("FormEleman"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_PropertyGroupSelect_Result> formeleman = entity.usp_PropertyGroupSelect(null).ToList();

            curUser.Log<FormElemanGrup>(null, "s", "Form Eleman Gruplarý");

            return View(formeleman);
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("FormEleman", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            FormElemanGrup formeleman = new FormElemanGrup();

            return View(formeleman);
        }

        [HttpPost]
        public ActionResult Ekle(FormElemanGrup formeleman)
        {
            if (!curUser.HasRight("FormEleman", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = entity.usp_PropertyGroupInsert(formeleman.Title, formeleman.Description, formeleman.Code, formeleman.Active);

                if (result != null)
                {
                    curUser.Log(formeleman, "i", "Form Eleman Gruplarý");

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

            usp_PropertyGroupSelectTop_Result table = entity.usp_PropertyGroupSelectTop(id, 1).FirstOrDefault();
            FormElemanGrup formeleman = table.ChangeModel<FormElemanGrup>();

            List<usp_PropertyByGroupIDSelect_Result> formelemanGrupList = entity.usp_PropertyByGroupIDSelect(id).ToList();
            formeleman.PropertyList.AddRange(formelemanGrupList.ChangeModelList<FormEleman, usp_PropertyByGroupIDSelect_Result>());

            return View(formeleman);
        }

        [HttpPost]
        public ActionResult Duzenle(FormElemanGrup formeleman)
        {
            if (!curUser.HasRight("FormEleman", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = entity.usp_PropertyGroupUpdate(formeleman.ID, formeleman.Title, formeleman.Description, formeleman.Code, formeleman.Active);

                if (result != null)
                {
                    curUser.Log(formeleman, "u", "Form Eleman Gruplarý");

                    return RedirectToAction("Index");
                }
                else
                    formeleman.Mesaj = "Kayýt düzenlenemedi.";
            }
            else
                formeleman.Mesaj = "Model uygun deðil.";

            List<usp_PropertyByGroupIDSelect_Result> formelemanGrupList = entity.usp_PropertyByGroupIDSelect(formeleman.ID).ToList();
            formeleman.PropertyList.AddRange(formelemanGrupList.ChangeModelList<FormEleman, usp_PropertyByGroupIDSelect_Result>());

            return View("Duzenle", formeleman);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            try
            {
                if (curUser.HasRight("FormEleman", "d"))
                {
                    entity.usp_PropertyGroupCheckDelete(id);

                    curUser.Log(id, "rd", "Form Eleman Gruplarý");

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
                    var result = entity.usp_PropertyGroupCopy(id);

                    if (result != null)
                        curUser.Log(id, "c", "Form Eleman Gruplarý");

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