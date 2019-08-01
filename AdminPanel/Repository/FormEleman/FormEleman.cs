using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using Repository.FormElemanDegerModel;
using Repository.FormElemanOzellikModel;
using System.Linq;
using AdminPanel.Data;
using TDLibrary;

namespace Repository.FormElemanModel
{
    public class FormEleman : IFormEleman
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();
        public FormEleman()
        {
            PropertyTypesList = new List<SelectListItem>();
            PropertyGroupList = new List<SelectListItem>();

            PropertyAttributesList = new List<FormElemanOzellik>();
            PropertyValuesList = new List<FormElemanDeger>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "Özellik Tipi alanı boş olamaz.")]
        public int PropTypeID { get; set; }
        public int? GroupID { get; set; }
        [Required(ErrorMessage = "Başlık alanı boş olamaz ve en fazla 50 karakter olmalıdır.")]
        [StringLength(50)]
        public string Title { get; set; }
        public string Description { get; set; }
        public string ErrorMessage { get; set; }
        public string Code { get; set; }
        public int? OrderNumber { get; set; }

        public string Mesaj { get; set; }

        public bool? HasValue { get; set; }

        public List<SelectListItem> PropertyTypesList { get; set; }
        public List<SelectListItem> PropertyGroupList { get; set; }

        public string GroupAdi { get; set; }
        public string TypeAdi { get; set; }

        public List<FormElemanOzellik> PropertyAttributesList { get; set; }
        public List<FormElemanDeger> PropertyValuesList { get; set; }


        public List<FormEleman> List()
        {
            return entity.usp_PropertyWithTypeNameSelect(null).ToList().ChangeModelList<FormEleman, usp_PropertyWithTypeNameSelect_Result>();
        }

        public IFormEleman Select(int id)
        {
            usp_PropertySelectTop_Result table = entity.usp_PropertySelectTop(id, 1).FirstOrDefault();
            IFormEleman formeleman = table.ChangeModel<FormEleman>();

            return formeleman;
        }

        public IFormEleman Insert(int? groupID = null, int? propTypeID = null, IFormEleman formeleman = null)
        {
            if (formeleman == null)
                formeleman = new FormEleman();

            List<usp_PropertyGroupSelect_Result> tableFormElemanGrup = entity.usp_PropertyGroupSelect(null).ToList();
            formeleman.PropertyGroupList.AddRange(tableFormElemanGrup.ToSelectList<usp_PropertyGroupSelect_Result, SelectListItem>("ID", "Title", groupID, true));

            List<usp_PropertyTypesSelect_Result> tableFormTipler = entity.usp_PropertyTypesSelect(null).ToList();
            formeleman.PropertyTypesList.AddRange(tableFormTipler.ToSelectList<usp_PropertyTypesSelect_Result, SelectListItem>("ID", "Name", propTypeID));

            return formeleman;
        }

        public bool Insert(IFormEleman formeleman)
        {
            var result = entity.usp_PropertyInsert(formeleman.PropTypeID, formeleman.GroupID, formeleman.Title, formeleman.Description, formeleman.ErrorMessage, formeleman.Code, formeleman.OrderNumber);

            if (result != null)
                return true;
            else
                return false;
        }

        public IFormEleman Update(int id, IFormEleman formeleman = null)
        {
            if (formeleman == null)
                formeleman = Select(id);

            List<usp_PropertyAttributesByPropIDSelect_Result> formelemanTanimlariList = entity.usp_PropertyAttributesByPropIDSelect(id).ToList();
            formeleman.PropertyAttributesList.AddRange(formelemanTanimlariList.ChangeModelList<FormElemanOzellik, usp_PropertyAttributesByPropIDSelect_Result>());

            formeleman.HasValue = entity.usp_PropertyHasValueCheck(id).FirstOrDefault();

            List<usp_PropertyValuesByPropIDSelect_Result> formelemanDegerleriList = entity.usp_PropertyValuesByPropIDSelect(id).ToList();
            formeleman.PropertyValuesList.AddRange(formelemanDegerleriList.ChangeModelList<FormElemanDeger, usp_PropertyValuesByPropIDSelect_Result>());

            List<usp_PropertyGroupSelect_Result> tableFormElemanGrup = entity.usp_PropertyGroupSelect(null).ToList();
            formeleman.PropertyGroupList.AddRange(tableFormElemanGrup.ToSelectList<usp_PropertyGroupSelect_Result, SelectListItem>("ID", "Title", formeleman.GroupID, true));

            List<usp_PropertyTypesSelect_Result> tableFormTipler = entity.usp_PropertyTypesSelect(null).ToList();
            formeleman.PropertyTypesList.AddRange(tableFormTipler.ToSelectList<usp_PropertyTypesSelect_Result, SelectListItem>("ID", "Name", formeleman.PropTypeID));

            return formeleman;
        }

        public bool Update(IFormEleman formeleman)
        {
            var result = entity.usp_PropertyUpdate(formeleman.ID, formeleman.PropTypeID, formeleman.GroupID, formeleman.Title, formeleman.Description, formeleman.ErrorMessage, formeleman.Code, formeleman.OrderNumber);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_PropertyCheckDelete(id);

                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool Copy(int id)
        {
            try
            {
                var result = entity.usp_PropertyCopy(id);

                return result == null ? false : true;
            }
            catch
            {
                return false;
            }
        }
    }
}
