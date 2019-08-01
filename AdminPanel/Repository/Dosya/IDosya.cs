using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.DosyaModel
{
    public interface IDosya
    {
        int ID { get; set; }
        string Title { get; set; }
        string Description { get; set; }
        string FileUrl { get; set; }
        string Code { get; set; }
        bool Active { get; set; }
        bool Deleted { get; set; }

        string Mesaj { get; set; }

        List<SelectListItem> TypesList { get; set; }

        List<Dosya> List();
        IDosya Select(int id);
        bool Insert(IDosya dosya);
        bool Update(IDosya dosya);
        bool Delete(int id);
        bool Remove(int id);
    }
}
