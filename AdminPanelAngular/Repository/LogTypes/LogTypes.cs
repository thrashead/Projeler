using System.Collections.Generic;
using System.Linq;
using AdminPanelAngular.Data;
using TDLibrary;
using Repository.LogProcessModel;

namespace Repository.LogTypesModel
{
    public class LogTypes : ILogTypes
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public LogTypes()
        {
            LogProcessList = new List<LogProcess>();
        }

        public int ID { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public string Description { get; set; }

        public string Mesaj { get; set; }

        public List<LogProcess> LogProcessList { get; set; }


        public List<LogTypes> List()
        {
            return entity.usp_LogTypesSelect(null).ToList().ChangeModelList<LogTypes, usp_LogTypesSelect_Result>();
        }

        public ILogTypes Select(int id)
        {
            usp_LogTypesSelectTop_Result model = entity.usp_LogTypesSelectTop(id, 1).FirstOrDefault();
            ILogTypes table = model.ChangeModel<LogTypes>();

            return table;
        }

        public bool Insert(ILogTypes table)
        {
            var result = entity.usp_LogTypesInsert(table.Name, table.ShortName);

            if (result != null)
                return true;
            else
                return false;
        }

        public ILogTypes Update(int id, ILogTypes table = null)
        {
            if (table == null)
                table = Select(id);

            List<usp_LogProcessByLogTypeIDSelect_Result> tableLogProcess = entity.usp_LogProcessByLogTypeIDSelect(id).ToList();
            table.LogProcessList.AddRange(tableLogProcess.ChangeModelList<LogProcess, usp_LogProcessByLogTypeIDSelect_Result>());

            return table;
        }

        public bool Update(ILogTypes table)
        {
            var result = entity.usp_LogTypesUpdate(table.ID, table.Name, table.ShortName);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_LogTypesCheckDelete(id);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
