using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.LogIslemModel
{
    public interface ILogIslem
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

        List<LogIslem> List();
        ILogIslem Select(int id);
        bool Insert(ILogIslem log);
        bool Update(ILogIslem log);
        bool Delete(int id);
    }
}
