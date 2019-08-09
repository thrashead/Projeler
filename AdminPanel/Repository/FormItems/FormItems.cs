using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using Repository.FormValuesModel;
using Repository.FormAttributesModel;
using System.Linq;
using AdminPanel.Data;
using TDLibrary;

namespace Repository.FormItemsModel
{
    public class FormItems : IFormItems
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();
        public FormItems()
        {
            FormTypesList = new List<SelectListItem>();
            FormGroupsList = new List<SelectListItem>();

            FormAttributesList = new List<FormAttributes>();
            FormValuesList = new List<FormValues>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "Özellik Tipi alanı boş olamaz.")]
        public int FormTypeID { get; set; }
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

        public List<SelectListItem> FormTypesList { get; set; }
        public List<SelectListItem> FormGroupsList { get; set; }

        public string FormGroupsAdi { get; set; }
        public string TypesAdi { get; set; }

        public List<FormAttributes> FormAttributesList { get; set; }
        public List<FormValues> FormValuesList { get; set; }


        public List<FormItems> List()
        {
            return entity.usp_FormItemsWithTypeNameSelect(null).ToList().ChangeModelList<FormItems, usp_FormItemsWithTypeNameSelect_Result>();
        }

        public IFormItems Select(int id)
        {
            usp_FormItemsSelectTop_Result table = entity.usp_FormItemsSelectTop(id, 1).FirstOrDefault();
            IFormItems formeleman = table.ChangeModel<FormItems>();

            return formeleman;
        }

        public IFormItems Insert(int? groupID = null, int? formTypeID = null, IFormItems formeleman = null)
        {
            if (formeleman == null)
                formeleman = new FormItems();

            List<usp_FormGroupsSelect_Result> tableFormElemanGrup = entity.usp_FormGroupsSelect(null).ToList();
            formeleman.FormGroupsList.AddRange(tableFormElemanGrup.ToSelectList<usp_FormGroupsSelect_Result, SelectListItem>("ID", "Title", groupID, true));

            List<usp_FormTypesSelect_Result> tableFormTipler = entity.usp_FormTypesSelect(null).ToList();
            formeleman.FormTypesList.AddRange(tableFormTipler.ToSelectList<usp_FormTypesSelect_Result, SelectListItem>("ID", "Name", formTypeID));

            return formeleman;
        }

        public bool Insert(IFormItems formeleman)
        {
            var result = entity.usp_FormItemsInsert(formeleman.FormTypeID, formeleman.GroupID, formeleman.Title, formeleman.Description, formeleman.ErrorMessage, formeleman.Code, formeleman.OrderNumber);

            if (result != null)
                return true;
            else
                return false;
        }

        public IFormItems Update(int id, IFormItems formeleman = null)
        {
            if (formeleman == null)
                formeleman = Select(id);

            List<usp_FormAttributesByFormItemIDSelect_Result> formelemanTanimlariList = entity.usp_FormAttributesByFormItemIDSelect(id).ToList();
            formeleman.FormAttributesList.AddRange(formelemanTanimlariList.ChangeModelList<FormAttributes, usp_FormAttributesByFormItemIDSelect_Result>());

            formeleman.HasValue = entity.usp_FormItemsHasValueCheck(id).FirstOrDefault();

            List<usp_FormValuesByFormItemIDSelect_Result> formelemanDegerleriList = entity.usp_FormValuesByFormItemIDSelect(id).ToList();
            formeleman.FormValuesList.AddRange(formelemanDegerleriList.ChangeModelList<FormValues, usp_FormValuesByFormItemIDSelect_Result>());

            List<usp_FormGroupsSelect_Result> tableFormElemanGrup = entity.usp_FormGroupsSelect(null).ToList();
            formeleman.FormGroupsList.AddRange(tableFormElemanGrup.ToSelectList<usp_FormGroupsSelect_Result, SelectListItem>("ID", "Title", formeleman.GroupID, true));

            List<usp_FormTypesSelect_Result> tableFormTipler = entity.usp_FormTypesSelect(null).ToList();
            formeleman.FormTypesList.AddRange(tableFormTipler.ToSelectList<usp_FormTypesSelect_Result, SelectListItem>("ID", "Name", formeleman.FormTypeID));

            return formeleman;
        }

        public bool Update(IFormItems formeleman)
        {
            var result = entity.usp_FormItemsUpdate(formeleman.ID, formeleman.FormTypeID, formeleman.GroupID, formeleman.Title, formeleman.Description, formeleman.ErrorMessage, formeleman.Code, formeleman.OrderNumber);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_FormItemsCheckDelete(id);

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
                var result = entity.usp_FormItemsCopy(id);

                return result == null ? false : true;
            }
            catch
            {
                return false;
            }
        }
    }
}
