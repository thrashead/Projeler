using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using AdminPanel.Data;
using Repository.FormElemanDegerModel;
using Repository.FormElemanModel;
using Repository.FormElemanOzellikModel;
using Repository.KullanicilarModel;
using TDLibrary;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class FormElemanController : Controller
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();
        FormEleman table = new FormEleman();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("FormEleman"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle(string groupID)
        {
            if (!curUser.HasRight("FormEleman", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            int linkID = groupID == null ? 0 : groupID.ToInteger();

            List<usp_PropertyGroupSelect_Result> tableFormElemanGrup = entity.usp_PropertyGroupSelect(null).ToList();
            table.PropertyGroupList.AddRange(tableFormElemanGrup.ToSelectList<usp_PropertyGroupSelect_Result, SelectListItem>("ID", "Title", linkID, true));

            List<usp_PropertyTypesSelect_Result> tableFormTipler = entity.usp_PropertyTypesSelect(null).ToList();
            table.PropertyTypesList.AddRange(tableFormTipler.ToSelectList<usp_PropertyTypesSelect_Result, SelectListItem>("ID", "Name"));

            return View(table);
        }

        [HttpPost]
        public ActionResult Ekle(FormEleman formeleman)
        {
            if (!curUser.HasRight("FormEleman", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Insert(formeleman);

                if (result)
                {
                    curUser.Log(formeleman, "i", "Form Elemanları");

                    return RedirectToAction("Index");
                }
                else
                    formeleman.Mesaj = "Kayıt eklenemedi.";
            }
            else
                formeleman.Mesaj = "Model uygun değil.";

            List<usp_PropertyGroupSelect_Result> tableFormElemanGrup = entity.usp_PropertyGroupSelect(null).ToList();
            formeleman.PropertyGroupList.AddRange(tableFormElemanGrup.ToSelectList<usp_PropertyGroupSelect_Result, SelectListItem>("ID", "Title", formeleman.GroupID, true));

            List<usp_PropertyTypesSelect_Result> tableFormTipler = entity.usp_PropertyTypesSelect(null).ToList();
            formeleman.PropertyTypesList.AddRange(tableFormTipler.ToSelectList<usp_PropertyTypesSelect_Result, SelectListItem>("ID", "Name", formeleman.PropTypeID));

            return View("Ekle", formeleman);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("FormEleman", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            IFormEleman formeleman = table.Select(id);

            List<usp_PropertyAttributesByPropIDSelect_Result> formelemanTanimlariList = entity.usp_PropertyAttributesByPropIDSelect(id).ToList();
            formeleman.PropertyAttributesList.AddRange(formelemanTanimlariList.ChangeModelList<FormElemanOzellik, usp_PropertyAttributesByPropIDSelect_Result>());

            formeleman.HasValue = entity.usp_PropertyHasValueCheck(id).FirstOrDefault();

            List<usp_PropertyValuesByPropIDSelect_Result> formelemanDegerleriList = entity.usp_PropertyValuesByPropIDSelect(id).ToList();
            formeleman.PropertyValuesList.AddRange(formelemanDegerleriList.ChangeModelList<FormElemanDeger, usp_PropertyValuesByPropIDSelect_Result>());

            List<usp_PropertyGroupSelect_Result> tableFormElemanGrup = entity.usp_PropertyGroupSelect(null).ToList();
            formeleman.PropertyGroupList.AddRange(tableFormElemanGrup.ToSelectList<usp_PropertyGroupSelect_Result, SelectListItem>("ID", "Title", formeleman.GroupID, true));

            List<usp_PropertyTypesSelect_Result> tableFormTipler = entity.usp_PropertyTypesSelect(null).ToList();
            formeleman.PropertyTypesList.AddRange(tableFormTipler.ToSelectList<usp_PropertyTypesSelect_Result, SelectListItem>("ID", "Name", formeleman.PropTypeID));

            return View(formeleman);
        }

        [HttpPost]
        public ActionResult Duzenle(FormEleman formeleman)
        {
            if (!curUser.HasRight("FormEleman", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Update(formeleman);

                if (result)
                {
                    curUser.Log(formeleman, "u", "Form Elemanları");

                    return RedirectToAction("Index");
                }
                else
                    formeleman.Mesaj = "Kayıt düzenlenemedi.";
            }
            else
                formeleman.Mesaj = "Model uygun değil.";

            List<usp_PropertyAttributesByPropIDSelect_Result> formelemanTanimlariList = entity.usp_PropertyAttributesByPropIDSelect(formeleman.ID).ToList();
            formeleman.PropertyAttributesList.AddRange(formelemanTanimlariList.ChangeModelList<FormElemanOzellik, usp_PropertyAttributesByPropIDSelect_Result>());

            List<usp_PropertyValuesByPropIDSelect_Result> formelemanDegerleriList = entity.usp_PropertyValuesByPropIDSelect(formeleman.ID).ToList();
            formeleman.PropertyValuesList.AddRange(formelemanDegerleriList.ChangeModelList<FormElemanDeger, usp_PropertyValuesByPropIDSelect_Result>());

            List<usp_PropertyGroupSelect_Result> tableFormElemanGrup = entity.usp_PropertyGroupSelect(null).ToList();
            formeleman.PropertyGroupList.AddRange(tableFormElemanGrup.ToSelectList<usp_PropertyGroupSelect_Result, SelectListItem>("ID", "Title", formeleman.GroupID, true));

            List<usp_PropertyTypesSelect_Result> tableFormTipler = entity.usp_PropertyTypesSelect(null).ToList();
            formeleman.PropertyTypesList.AddRange(tableFormTipler.ToSelectList<usp_PropertyTypesSelect_Result, SelectListItem>("ID", "Name", formeleman.PropTypeID));

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
                    curUser.Log(id, "d", "Form Elemanları");

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
                    curUser.Log(id, "c", "Form Elemanları");

                    return Json(true);
                }
            }

            return Json(false);
        }
    }
}
