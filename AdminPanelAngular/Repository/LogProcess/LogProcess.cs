using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using AdminPanelAngular.Data;
using TDLibrary;

namespace Repository.LogProcessModel
{
    public class LogProcess : ILogProcess
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public LogProcess()
        {
            LogTypesList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        public int LogTypeID { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public string Description { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> LogTypesList { get; set; }
        public string LogTypesAdi { get; set; }
        public string LogTypesKisaAdi { get; set; }


        public List<LogProcess> List()
        {
            return entity.usp_LogProcessDetailSelect(null).ToList().ChangeModelList<LogProcess, usp_LogProcessDetailSelect_Result>();
        }

        public ILogProcess Select(int id)
        {
            usp_LogProcessSelectTop_Result model = entity.usp_LogProcessSelectTop(id, 1).FirstOrDefault();
            ILogProcess table = model.ChangeModel<LogProcess>();

            return table;
        }

        public ILogProcess Insert(int? tableID = null, ILogProcess table = null)
        {
            if (table == null)
                table = new LogProcess();

            List<usp_LogTypesSelect_Result> tableLogTypes = entity.usp_LogTypesSelect(null).ToList();
            table.LogTypesList = tableLogTypes.ToSelectList<usp_LogTypesSelect_Result, SelectListItem>("ID", "Name", tableID);

            return table;
        }

        public bool Insert(ILogProcess table)
        {
            var result = entity.usp_LogProcessInsert(table.LogTypeID, table.Name, table.ShortName, table.Description);

            if (result != null)
                return true;
            else
                return false;
        }

        public ILogProcess Update(int id, ILogProcess table = null)
        {
            if (table == null)
                table = Select(id);

            List<usp_LogTypesSelect_Result> tableLogTypes = entity.usp_LogTypesSelect(null).ToList();
            table.LogTypesList = tableLogTypes.ToSelectList<usp_LogTypesSelect_Result, SelectListItem>("ID", "Name", table.LogTypeID);

            return table;
        }

        public bool Update(ILogProcess table)
        {
            var result = entity.usp_LogProcessUpdate(table.ID, table.LogTypeID, table.Name, table.ShortName, table.Description);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_LogProcessDelete(id);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
