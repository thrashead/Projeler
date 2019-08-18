using System.Collections.Generic;
using System.Web.Mvc;
using Repository.FormValuesModel;
using Repository.FormAttributesModel;
using System.Linq;
using AdminPanelAngular.Data;
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
        public int FormTypeID { get; set; }
        public int? GroupID { get; set; }
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
        public string FormTypesAdi { get; set; }

        public List<FormAttributes> FormAttributesList { get; set; }
        public List<FormValues> FormValuesList { get; set; }


        public List<FormItems> List()
        {
            return entity.usp_FormItemsWithTypeNameSelect(null).ToList().ChangeModelList<FormItems, usp_FormItemsWithTypeNameSelect_Result>();
        }

        public IFormItems Select(int id)
        {
            usp_FormItemsSelectTop_Result model = entity.usp_FormItemsSelectTop(id, 1).FirstOrDefault();
            IFormItems table = model.ChangeModel<FormItems>();

            return table;
        }

        public IFormItems Insert(int? groupID = null, int? formTypeID = null, IFormItems table = null)
        {
            if (table == null)
                table = new FormItems();

            List<usp_FormGroupsSelect_Result> tableFormGroups = entity.usp_FormGroupsSelect(null).ToList();
            table.FormGroupsList.AddRange(tableFormGroups.ToSelectList<usp_FormGroupsSelect_Result, SelectListItem>("ID", "Title", groupID, true));

            List<usp_FormTypesSelect_Result> tableFormTypes = entity.usp_FormTypesSelect(null).ToList();
            table.FormTypesList.AddRange(tableFormTypes.ToSelectList<usp_FormTypesSelect_Result, SelectListItem>("ID", "Name", formTypeID));

            return table;
        }

        public bool Insert(IFormItems table)
        {
            var result = entity.usp_FormItemsInsert(table.FormTypeID, table.GroupID, table.Title, table.Description, table.ErrorMessage, table.Code, table.OrderNumber);

            if (result != null)
                return true;
            else
                return false;
        }

        public IFormItems Update(int id, IFormItems table = null)
        {
            if (table == null)
                table = Select(id);

            List<usp_FormAttributesByFormItemIDSelect_Result> tableFormAttributes = entity.usp_FormAttributesByFormItemIDSelect(id).ToList();
            table.FormAttributesList.AddRange(tableFormAttributes.ChangeModelList<FormAttributes, usp_FormAttributesByFormItemIDSelect_Result>());

            table.HasValue = entity.usp_FormItemsHasValueCheck(id).FirstOrDefault();

            List<usp_FormValuesByFormItemIDSelect_Result> tableFormValues = entity.usp_FormValuesByFormItemIDSelect(id).ToList();
            table.FormValuesList.AddRange(tableFormValues.ChangeModelList<FormValues, usp_FormValuesByFormItemIDSelect_Result>());

            List<usp_FormGroupsSelect_Result> tableFormGroups = entity.usp_FormGroupsSelect(null).ToList();
            table.FormGroupsList.AddRange(tableFormGroups.ToSelectList<usp_FormGroupsSelect_Result, SelectListItem>("ID", "Title", table.GroupID, true));

            List<usp_FormTypesSelect_Result> tableFormTypes = entity.usp_FormTypesSelect(null).ToList();
            table.FormTypesList.AddRange(tableFormTypes.ToSelectList<usp_FormTypesSelect_Result, SelectListItem>("ID", "Name", table.FormTypeID));

            return table;
        }

        public bool Update(IFormItems table)
        {
            var result = entity.usp_FormItemsUpdate(table.ID, table.FormTypeID, table.GroupID, table.Title, table.Description, table.ErrorMessage, table.Code, table.OrderNumber);

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
