using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.ContentTModel
{
    public interface IContentT
    {
        int ID { get; set; }
        int ContID { get; set; }
        int TransID { get; set; }
        string ContentName { get; set; }
        string ShortText1 { get; set; }
        string ShortText2 { get; set; }
        string Description { get; set; }
        bool Deleted { get; set; }

        string Mesaj { get; set; }

        List<SelectListItem> ContentList { get; set; }
        List<SelectListItem> TranslationList { get; set; }
        string ContentAdi { get; set; }
        string TranslationAdi { get; set; }

        List<ContentT> List();
        IContentT Select(int id);
        IContentT Insert(int? contID, int? transID, IContentT icerik);
        bool Insert(IContentT icerik);
        IContentT Update(int id, IContentT icerik);
        bool Update(IContentT icerik);
        bool Delete(int id);
        bool Remove(int id);
    }
}
