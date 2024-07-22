using Repository.LogProcessModel;
using System.Collections.Generic;

namespace Repository.LogTypesModel
{
    public interface ILogTypes
    {
        int ID { get; set; }
        string Name { get; set; }
        string ShortName { get; set; }
        string Description { get; set; }

        string Mesaj { get; set; }

        List<LogProcess> LogProcessList { get; set; }

        List<LogTypes> List();
        ILogTypes Select(int id);
        bool Insert(ILogTypes log);
        ILogTypes Update(int id, ILogTypes log);
        bool Update(ILogTypes log);
        bool Delete(int id);
    }
}
