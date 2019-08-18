using System.Collections.Generic;
using System.Linq;
using AdminPanelAngular.Data;
using TDLibrary;

namespace Repository.LogsModel
{
    public class Logs : ILogs
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public int ID { get; set; }
        public int UserID { get; set; }
        public int LogProcessID { get; set; }
        public string ProcessTime { get; set; }
        public string Description { get; set; }
        public string UsersAdi { get; set; }
        public string LogTypesAdi { get; set; }
        public string LogProcessAdi { get; set; }
        public string LogProcessKisaAdi { get; set; }

        public List<Logs> List()
        {
            return entity.usp_LogsDetailSelect(null).ToList().ChangeModelList<Logs, usp_LogsDetailSelect_Result>();
        }

        public bool Clear()
        {
            try
            {
                entity.usp_LogsClear();

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
