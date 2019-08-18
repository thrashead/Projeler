
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using AdminPanelAngular.Data;
using TDLibrary;

namespace Repository.FormValuesModel
{
    public class FormValues : IFormValues
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public FormValues()
        {
            FormItemsList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        public int FormItemID { get; set; }
        public string Text { get; set; }
        public string Value { get; set; }
        public string Code { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> FormItemsList { get; set; }
        public string FormItemsAdi { get; set; }


        public List<FormValues> List()
        {
            return entity.usp_FormValuesWithFormItemNameSelect(null).ToList().ChangeModelList<FormValues, usp_FormValuesWithFormItemNameSelect_Result>();
        }

        public IFormValues Select(int id)
        {
            usp_FormValuesSelectTop_Result model = entity.usp_FormValuesSelectTop(id, 1).FirstOrDefault();
            IFormValues table = model.ChangeModel<FormValues>();

            return table;
        }

        public IFormValues Insert(int? propID = null, IFormValues table = null)
        {
            if (table == null)
                table = new FormValues();

            List<usp_FormItemsHasValueSelect_Result> tableFormItemsHasValue = entity.usp_FormItemsHasValueSelect(null).ToList();
            table.FormItemsList = tableFormItemsHasValue.ToSelectList<usp_FormItemsHasValueSelect_Result, SelectListItem>("ID", "Title", propID);

            return table;
        }

        public bool Insert(IFormValues table)
        {
            var result = entity.usp_FormValuesInsert(table.FormItemID, table.Text, table.Value, table.Code);

            if (result != null)
                return true;
            else
                return false;
        }

        public IFormValues Update(int id, IFormValues table = null)
        {
            if (table == null)
                table = Select(id);

            List<usp_FormItemsHasValueSelect_Result> tableFormItemsHasValue = entity.usp_FormItemsHasValueSelect(null).ToList();
            table.FormItemsList = tableFormItemsHasValue.ToSelectList<usp_FormItemsHasValueSelect_Result, SelectListItem>("ID", "Title", table.FormItemID);

            return table;
        }

        public bool Update(IFormValues table)
        {
            var result = entity.usp_FormValuesUpdate(table.ID, table.FormItemID, table.Text, table.Value, table.Code);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_FormValuesDelete(id);

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
                var result = entity.usp_FormValuesCopy(id);

                return result == null ? false : true;
            }
            catch
            {
                return false;
            }
        }
    }
}
