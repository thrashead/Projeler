using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using AdminPanel.Data;
using TDLibrary;
using Models;


namespace AdminPanel.Areas.Admin.Controllers
{
    public class FormElemanController : Controller
    {
        readonly EmlakEntities _entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("FormEleman"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_PropertyWithTypeNameSelect_Result> formeleman = _entity.usp_PropertyWithTypeNameSelect(null).ToList();

            curUser.Log<FormEleman>(null, "s", "Form Elemanları");

            return View(formeleman);
        }

        public ActionResult Ekle(string groupID)
        {
            if (!curUser.HasRight("FormEleman", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            int linkID = groupID == null ? 0 : groupID.ToInteger();

            FormEleman formeleman = new FormEleman();

            List<PropertyGroup> tablePropertyGroups = _entity.PropertyGroup.ToList();
            formeleman.PropertyGroupList.AddRange(tablePropertyGroups.ToSelectList("ID", "Title", linkID, true));

            List<PropertyTypes> tablePropertyTypes = _entity.PropertyTypes.ToList();
            formeleman.PropertyTypesList.AddRange(tablePropertyTypes.ToSelectList("ID", "Name"));

            return View(formeleman);
        }

        [HttpPost]
        public ActionResult Ekle(FormEleman formeleman)
        {
            if (!curUser.HasRight("FormEleman", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = _entity.usp_PropertyInsert(formeleman.PropTypeID, formeleman.GroupID, formeleman.Title, formeleman.Description, formeleman.ErrorMessage, formeleman.Code, formeleman.OrderNumber);

                if (result != null)
                {
                    curUser.Log(formeleman, "i", "Form Elemanları");

                    return RedirectToAction("Index");
                }
                else
                    formeleman.Mesaj = "Kayıt eklenemedi.";
            }
            else
                formeleman.Mesaj = "Model uygun değil.";

            List<PropertyGroup> tablePropertyGroups = _entity.PropertyGroup.ToList();
            formeleman.PropertyGroupList.AddRange(tablePropertyGroups.ToSelectList("ID", "Title", formeleman.GroupID, true));

            List<PropertyTypes> tablePropertyTypes = _entity.PropertyTypes.ToList();
            formeleman.PropertyTypesList.AddRange(tablePropertyTypes.ToSelectList("ID", "Name", formeleman.PropTypeID));

            return View("Ekle", formeleman);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("FormEleman", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            usp_PropertySelectTop_Result table = _entity.usp_PropertySelectTop(id, 1).FirstOrDefault();
            FormEleman formeleman = table.ChangeModel<FormEleman>();

            List<usp_PropertyAttributesByPropIDSelect_Result> formelemanTanimlariList = _entity.usp_PropertyAttributesByPropIDSelect(id).ToList();
            formeleman.PropertyAttributesList.AddRange(formelemanTanimlariList.ChangeModelList<FormElemanOzellik, usp_PropertyAttributesByPropIDSelect_Result>());

            formeleman.HasValue = _entity.usp_PropertyHasValueCheck(id).FirstOrDefault();

            List<usp_PropertyValuesByPropIDSelect_Result> formelemanDegerleriList = _entity.usp_PropertyValuesByPropIDSelect(id).ToList();
            formeleman.PropertyValuesList.AddRange(formelemanDegerleriList.ChangeModelList<FormElemanDeger, usp_PropertyValuesByPropIDSelect_Result>());

            List<PropertyGroup> tablePropertyGroups = _entity.PropertyGroup.ToList();
            formeleman.PropertyGroupList.AddRange(tablePropertyGroups.ToSelectList("ID", "Title", formeleman.GroupID, true));

            List<PropertyTypes> tablePropertyTypes = _entity.PropertyTypes.ToList();
            formeleman.PropertyTypesList.AddRange(tablePropertyTypes.ToSelectList("ID", "Name", formeleman.PropTypeID));

            return View(formeleman);
        }

        [HttpPost]
        public ActionResult Duzenle(FormEleman formeleman)
        {
            if (!curUser.HasRight("FormEleman", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = _entity.usp_PropertyUpdate(formeleman.ID, formeleman.PropTypeID, formeleman.GroupID, formeleman.Title, formeleman.Description, formeleman.ErrorMessage, formeleman.Code, formeleman.OrderNumber);

                if (result != null)
                {
                    curUser.Log(formeleman, "u", "Form Elemanları");

                    return RedirectToAction("Index");
                }
                else
                    formeleman.Mesaj = "Kayıt düzenlenemedi.";
            }
            else
                formeleman.Mesaj = "Model uygun değil.";

            List<usp_PropertyAttributesByPropIDSelect_Result> formelemanTanimlariList = _entity.usp_PropertyAttributesByPropIDSelect(formeleman.ID).ToList();
            formeleman.PropertyAttributesList.AddRange(formelemanTanimlariList.ChangeModelList<FormElemanOzellik, usp_PropertyAttributesByPropIDSelect_Result>());

            List<usp_PropertyValuesByPropIDSelect_Result> formelemanDegerleriList = _entity.usp_PropertyValuesByPropIDSelect(formeleman.ID).ToList();
            formeleman.PropertyValuesList.AddRange(formelemanDegerleriList.ChangeModelList<FormElemanDeger, usp_PropertyValuesByPropIDSelect_Result>());

            List<PropertyGroup> tablePropertyGroups = _entity.PropertyGroup.ToList();
            formeleman.PropertyGroupList.AddRange(tablePropertyGroups.ToSelectList("ID", "Title", formeleman.GroupID, true));

            List<PropertyTypes> tablePropertyTypes = _entity.PropertyTypes.ToList();
            formeleman.PropertyTypesList.AddRange(tablePropertyTypes.ToSelectList("ID", "Name", formeleman.PropTypeID));

            return View("Duzenle", formeleman);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            try
            {
                if (curUser.HasRight("FormEleman", "d"))
                {
                    _entity.usp_PropertyCheckDelete(id);

                    curUser.Log(id, "rd", "Form Elemanları");

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
                    var result = _entity.usp_PropertyCopy(id);

                    if (result != null)
                        curUser.Log(id, "c", "Form Elemanları");

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
