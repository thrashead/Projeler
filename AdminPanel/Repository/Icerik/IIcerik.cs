using Repository.IcerikDilModel;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.IcerikModel
{
    public interface IIcerik
    {
        int ID { get; set; }
        string Title { get; set; }
        string Url { get; set; }
        string Code { get; set; }
        bool Active { get; set; }
        bool Deleted { get; set; }

        string Mesaj { get; set; }

        List<IcerikDil> ContentTList { get; set; }
        List<SelectListItem> TypesList { get; set; }

        List<Icerik> List();
        IIcerik Select(int id);
        bool Insert(IIcerik icerik);
        IIcerik Update(int id, IIcerik icerik);
        bool Update(IIcerik icerik);
        bool Delete(int id);
        bool Remove(int id);
        bool Copy(int id);
    }
}
