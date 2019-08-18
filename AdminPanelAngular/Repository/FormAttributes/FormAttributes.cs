using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using AdminPanelAngular.Data;
using TDLibrary;

namespace Repository.FormAttributesModel
{
	public class FormAttributes : IFormAttributes
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public FormAttributes()
        {
            FormItemsList = new List<SelectListItem>();
        }

        public int ID { get; set; }
		public int FormItemID { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> FormItemsList { get; set; }

        public string FormItemsAdi { get; set; }


        public List<FormAttributes> List()
        {
            return entity.usp_FormAttributesWithFormItemNameSelect(null).ToList().ChangeModelList<FormAttributes, usp_FormAttributesWithFormItemNameSelect_Result>();
        }

        public IFormAttributes Select(int id)
        {
            usp_FormAttributesSelectTop_Result model = entity.usp_FormAttributesSelectTop(id, 1).FirstOrDefault();
            IFormAttributes table = model.ChangeModel<FormAttributes>();

            return table;
        }

        public IFormAttributes Insert(int? propID = null, IFormAttributes table = null)
        {
            if (table == null)
                table = new FormAttributes();

            List<usp_FormItemsSelect_Result> tableFormItems = entity.usp_FormItemsSelect(null).ToList();
            table.FormItemsList = tableFormItems.ToSelectList<usp_FormItemsSelect_Result, SelectListItem>("ID", "Title", propID);

            return table;
        }

        public bool Insert(IFormAttributes table)
        {
            var result = entity.usp_FormAttributesInsert(table.FormItemID, table.Name, table.Value);

            if (result != null)
                return true;
            else
                return false;
        }

        public IFormAttributes Update(int id, IFormAttributes table = null)
        {
            if (table == null)
                table = Select(id);

            List<usp_FormItemsSelect_Result> tableFormItems = entity.usp_FormItemsSelect(null).ToList();
            table.FormItemsList = tableFormItems.ToSelectList<usp_FormItemsSelect_Result, SelectListItem>("ID", "Title", table.FormItemID);

            return table;
        }

        public bool Update(IFormAttributes table)
        {
            var result = entity.usp_FormAttributesUpdate(table.ID, table.FormItemID, table.Name, table.Value);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_FormAttributesDelete(id);

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
                var result = entity.usp_FormAttributesCopy(id);

                return result == null ? false : true;
            }
            catch
            {
                return false;
            }
        }
    }
}
