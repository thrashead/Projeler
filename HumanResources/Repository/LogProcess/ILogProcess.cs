using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.LogProcessModel
{
    public interface ILogProcess
    {
        int ID { get; set; }
        int LogTypeID { get; set; }
        string Name { get; set; }
        string ShortName { get; set; }
        string Description { get; set; }

        string Mesaj { get; set; }

        List<SelectListItem> LogTypesList { get; set; }
        string LogTypesAdi { get; set; }
        string LogTypesKisaAdi { get; set; }

        List<LogProcess> List();
        ILogProcess Select(int id);
        ILogProcess Insert(int? logID, ILogProcess log);
        bool Insert(ILogProcess log);
        ILogProcess Update(int id, ILogProcess log);
        bool Update(ILogProcess log);
        bool Delete(int id);
    }
}
