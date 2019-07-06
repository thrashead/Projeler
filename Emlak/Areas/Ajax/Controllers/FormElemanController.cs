using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Emlak.Data;
using TDLibrary;
using Models;


namespace Emlak.Areas.Ajax.Controllers
{
    public class FormElemanController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("FormEleman"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_PropertyWithTypeNameSelect_Result> formeleman = entity.usp_PropertyWithTypeNameSelect(null).ToList();

            return Json(formeleman, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Ekle(int? linkID)
        {
            if (!curUser.HasRight("FormEleman", "i"))
                return Json(null, JsonRequestBehavior.AllowGet);

            FormEleman formeleman = new FormEleman();

            List<PropertyGroup> tablePropertyGroups = entity.PropertyGroup.ToList();
            formeleman.PropertyGroupList.AddRange(tablePropertyGroups.ToSelectList("ID", "Title", linkID, true));

            List<PropertyTypes> tablePropertyTypes = entity.PropertyTypes.ToList();
            formeleman.PropertyTypesList.AddRange(tablePropertyTypes.ToSelectList("ID", "Name"));

            return Json(formeleman, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Ekle([System.Web.Http.FromBody] FormEleman formeleman)
        {
            if (!curUser.HasRight("FormEleman", "i"))
                return Json(null);

            var result = entity.usp_PropertyInsert(formeleman.PropTypeID, formeleman.GroupID, formeleman.Title, formeleman.Description, formeleman.ErrorMessage, formeleman.Code, formeleman.OrderNumber).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(formeleman, "i", "Form Elemanları");

                return Json(formeleman);
            }
            else
                formeleman.Mesaj = "Kayıt eklenemedi.";

            List<PropertyGroup> tablePropertyGroups = entity.PropertyGroup.ToList();
            formeleman.PropertyGroupList.AddRange(tablePropertyGroups.ToSelectList("ID", "Title", formeleman.GroupID, true));

            List<PropertyTypes> tablePropertyTypes = entity.PropertyTypes.ToList();
            formeleman.PropertyTypesList.AddRange(tablePropertyTypes.ToSelectList("ID", "Name", formeleman.PropTypeID));

            return Json(formeleman);
        }

        [HttpGet]
        public JsonResult Duzenle(int id)
        {
            if (!curUser.HasRight("FormEleman", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_PropertySelectTop_Result table = entity.usp_PropertySelectTop(id, 1).FirstOrDefault();
            FormEleman formeleman = table.ChangeModel<FormEleman>();

            List<usp_PropertyAttributesByPropIDSelect_Result> formelemanTanimlariList = entity.usp_PropertyAttributesByPropIDSelect(id).ToList();
            formeleman.PropertyAttributesList.AddRange(formelemanTanimlariList.ChangeModelList<FormElemanOzellik, usp_PropertyAttributesByPropIDSelect_Result>());

            formeleman.HasValue = entity.usp_PropertyHasValueCheck(id).FirstOrDefault();

            List<usp_PropertyValuesByPropIDSelect_Result> formelemanDegerleriList = entity.usp_PropertyValuesByPropIDSelect(id).ToList();
            formeleman.PropertyValuesList.AddRange(formelemanDegerleriList.ChangeModelList<FormElemanDeger, usp_PropertyValuesByPropIDSelect_Result>());

            List<PropertyGroup> tablePropertyGroups = entity.PropertyGroup.ToList();
            formeleman.PropertyGroupList.AddRange(tablePropertyGroups.ToSelectList("ID", "Title", formeleman.GroupID, true));

            List<PropertyTypes> tablePropertyTypes = entity.PropertyTypes.ToList();
            formeleman.PropertyTypesList.AddRange(tablePropertyTypes.ToSelectList("ID", "Name", formeleman.PropTypeID));

            return Json(formeleman, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Duzenle([System.Web.Http.FromBody] FormEleman formeleman)
        {
            if (!curUser.HasRight("FormEleman", "u"))
                return Json(null);

            var result = entity.usp_PropertyUpdate(formeleman.ID, formeleman.PropTypeID, formeleman.GroupID, formeleman.Title, formeleman.Description, formeleman.ErrorMessage, formeleman.Code, formeleman.OrderNumber).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(formeleman, "u", "Form Elemanları");

                return Json(formeleman);
            }
            else
                formeleman.Mesaj = "Kayıt düzenlenemedi.";

            List<usp_PropertyAttributesByPropIDSelect_Result> formelemanTanimlariList = entity.usp_PropertyAttributesByPropIDSelect(formeleman.ID).ToList();
            formeleman.PropertyAttributesList.AddRange(formelemanTanimlariList.ChangeModelList<FormElemanOzellik, usp_PropertyAttributesByPropIDSelect_Result>());

            List<usp_PropertyValuesByPropIDSelect_Result> formelemanDegerleriList = entity.usp_PropertyValuesByPropIDSelect(formeleman.ID).ToList();
            formeleman.PropertyValuesList.AddRange(formelemanDegerleriList.ChangeModelList<FormElemanDeger, usp_PropertyValuesByPropIDSelect_Result>());

            List<PropertyGroup> tablePropertyGroups = entity.PropertyGroup.ToList();
            formeleman.PropertyGroupList.AddRange(tablePropertyGroups.ToSelectList("ID", "Title", formeleman.GroupID, true));

            List<PropertyTypes> tablePropertyTypes = entity.PropertyTypes.ToList();
            formeleman.PropertyTypesList.AddRange(tablePropertyTypes.ToSelectList("ID", "Name", formeleman.PropTypeID));

            return Json(formeleman);
        }

        [HttpGet]
        public JsonResult Sil(int id)
        {
            if (!curUser.HasRight("FormEleman", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_PropertyCheckDelete(id);

                curUser.Log(id, "rd", "Form Elemanları");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult Kopyala(int id)
        {
            if (!curUser.HasRight("FormEleman", "c"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                var result = entity.usp_PropertyCopy(id);

                if (result != null)
                    curUser.Log(id, "c", "Form Elemanları");

                return Json(result == null ? false : true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
