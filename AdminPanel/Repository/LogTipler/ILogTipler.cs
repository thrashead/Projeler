using Repository.LogIslemModel;
using System.Collections.Generic;

namespace Repository.LogTiplerModel
{
    public interface ILogTipler
    {
        int ID { get; set; }
        string Name { get; set; }
        string ShortName { get; set; }
        string Description { get; set; }

        string Mesaj { get; set; }

        List<LogIslem> LogProcessList { get; set; }

        List<LogTipler> List();
        ILogTipler Select(int id);
        bool Insert(ILogTipler log);
        bool Update(ILogTipler log);
        bool Delete(int id);
    }
}
