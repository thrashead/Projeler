using System.Collections.Generic;
using System.Linq;
using AdminPanelAngular.Data;
using TDLibrary;

namespace Repository.FormTypesModel
{
    public class FormTypes : IFormTypes
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public int ID { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string ShortName { get; set; }
        public bool HasValue { get; set; }

        public string Mesaj { get; set; }


        public List<FormTypes> List()
        {
            return entity.usp_FormTypesSelect(null).ToList().ChangeModelList<FormTypes, usp_FormTypesSelect_Result>();
        }

        public IFormTypes Select(int id)
        {
            usp_FormTypesSelectTop_Result model = entity.usp_FormTypesSelectTop(id, 1).FirstOrDefault();
            IFormTypes table = model.ChangeModel<FormTypes>();

            return table;
        }

        public bool Insert(IFormTypes table)
        {
            var result = entity.usp_FormTypesInsert(table.Name, table.Type, table.ShortName, table.HasValue);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Update(IFormTypes table)
        {
            var result = entity.usp_FormTypesUpdate(table.ID, table.Name, table.Type, table.ShortName, table.HasValue);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_FormTypesCheckDelete(id);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
