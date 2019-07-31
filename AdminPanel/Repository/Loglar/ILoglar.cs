using System.Collections.Generic;

namespace Repository.LoglarModel
{
    public interface ILoglar
    {
        int ID { get; set; }
        int UserID { get; set; }
        int LogProcessID { get; set; }
        string ProcessTime { get; set; }
        string Description { get; set; }
        string UsersAdi { get; set; }
        string LogTypesAdi { get; set; }
        string LogProcessAdi { get; set; }
        string LogProcessKisaAdi { get; set; }

        List<Loglar> List();
        bool Clear();
    }
}
