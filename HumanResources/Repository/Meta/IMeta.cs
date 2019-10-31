using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.MetaModel
{
    public interface IMeta
    {
        int ID { get; set; }
        string Title { get; set; }
        string Code { get; set; }
        bool Active { get; set; }
        bool Deleted { get; set; }

        string Mesaj { get; set; }

        List<SelectListItem> TypesList { get; set; }

        List<Meta> List();
        IMeta Select(int id);
        bool Insert(IMeta meta);
        IMeta Update(int id, IMeta meta);
        bool Update(IMeta meta);
        bool Delete(int id);
        bool Remove(int id);
        bool Copy(int id);
    }
}
