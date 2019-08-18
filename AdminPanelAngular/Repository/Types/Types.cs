using System.Collections.Generic;
using System.Linq;
using AdminPanelAngular.Data;
using TDLibrary;

namespace Repository.TypesModel
{
    public class Types : ITypes
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public int ID { get; set; }
        public string TypeName { get; set; }
        public string Url { get; set; }
        public string TableName { get; set; }
        public bool Linkable { get; set; }
        public bool Show { get; set; }

        public string Mesaj { get; set; }


        public List<Types> List()
        {
            return entity.usp_TypesSelect(null).ToList().ChangeModelList<Types, usp_TypesSelect_Result>();
        }

        public ITypes Select(int id)
        {
            usp_TypesSelectTop_Result model = entity.usp_TypesSelectTop(id, 1).FirstOrDefault();
            ITypes table = model.ChangeModel<Types>();

            return table;
        }

        public bool Insert(ITypes table)
        {
            var result = entity.usp_TypesInsert(table.TypeName, table.Url, table.TableName, table.Linkable, table.Show);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Update(ITypes table)
        {
            var result = entity.usp_TypesUpdate(table.ID, table.TypeName, table.Url, table.TableName, table.Linkable, table.Show);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_TypesCheckDelete(id);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
