using Repository.MetalarDilModel;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.MetalarModel
{
    public interface IMetalar
    {
        int ID { get; set; }
        string Title { get; set; }
        string Code { get; set; }
        bool Active { get; set; }
        bool Deleted { get; set; }

        string Mesaj { get; set; }

        List<MetalarDil> MetaTList { get; set; }
        List<SelectListItem> TypesList { get; set; }

        List<Metalar> List();
        IMetalar Select(int id);
        bool Insert(IMetalar meta);
        IMetalar Update(int id, IMetalar meta);
        bool Update(IMetalar meta);
        bool Delete(int id);
        bool Remove(int id);
        bool Copy(int id);
    }
}
