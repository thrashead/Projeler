using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using AdminPanel.Data;
using Repository.FormElemanGrupModel;
using Repository.FormElemanModel;
using Repository.KullanicilarModel;
using TDLibrary;


namespace AdminPanel.Areas.Admin.Controllers
{
    public class FormElemanGrupController : Controller
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();
        FormElemanGrup table = new FormElemanGrup();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("FormEleman"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("FormEleman", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table);
        }

        [HttpPost]
        public ActionResult Ekle(FormElemanGrup formeleman)
        {
            if (!curUser.HasRight("FormEleman", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Insert(formeleman);

                if (result)
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

            IFormElemanGrup formeleman = table.Select(id);

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
                bool result = table.Update(formeleman);

                if (result)
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
            if (curUser.HasRight("FormEleman", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Form Eleman Gruplarý");

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
                bool result = table.Copy(id);

                if (result)
                {
                    curUser.Log(id, "c", "Form Eleman Gruplarý");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}