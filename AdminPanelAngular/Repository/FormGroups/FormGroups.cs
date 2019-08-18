using System.Collections.Generic;
using System.Linq;
using Repository.FormItemsModel;
using AdminPanelAngular.Data;
using TDLibrary;

namespace Repository.FormGroupsModel
{
    public class FormGroups : IFormGroups
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public FormGroups()
        {
            FormItemsList = new List<FormItems>();
        }

        public int ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public bool Active { get; set; }

        public string Mesaj { get; set; }

        public List<FormItems> FormItemsList { get; set; }


        public List<FormGroups> List()
        {
            return entity.usp_FormGroupsSelect(null).ToList().ChangeModelList<FormGroups, usp_FormGroupsSelect_Result>();
        }

        public IFormGroups Select(int id)
        {
            usp_FormGroupsSelectTop_Result model = entity.usp_FormGroupsSelectTop(id, 1).FirstOrDefault();
            IFormGroups table = model.ChangeModel<FormGroups>();

            return table;
        }

        public bool Insert(IFormGroups table)
        {
            var result = entity.usp_FormGroupsInsert(table.Title, table.Description, table.Code, table.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public IFormGroups Update(int id, IFormGroups table = null)
        {
            if (table == null)
                table = Select(id);

            List<usp_FormItemsByGroupIDSelect_Result> tableFormItems = entity.usp_FormItemsByGroupIDSelect(id).ToList();
            table.FormItemsList.AddRange(tableFormItems.ChangeModelList<FormItems, usp_FormItemsByGroupIDSelect_Result>());

            return table;
        }

        public bool Update(IFormGroups table)
        {
            var result = entity.usp_FormGroupsUpdate(table.ID, table.Title, table.Description, table.Code, table.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_FormGroupsCheckDelete(id);

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
                var result = entity.usp_FormGroupsCopy(id);

                return result == null ? false : true;
            }
            catch
            {
                return false;
            }
        }
    }
}
