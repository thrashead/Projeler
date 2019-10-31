using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.ContentModel
{
    public interface IContent
    {
        int ID { get; set; }
        string Title { get; set; }
        string Url { get; set; }
        string Code { get; set; }
        bool Active { get; set; }
        bool Deleted { get; set; }

        string Mesaj { get; set; }

        List<SelectListItem> TypesList { get; set; }

        List<Content> List();
        IContent Select(int id);
        bool Insert(IContent icerik);
        IContent Update(int id, IContent icerik);
        bool Update(IContent icerik);
        bool Delete(int id);
        bool Remove(int id);
        bool Copy(int id);
    }
}
