using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.MetalarDilModel
{
    public interface IMetalarDil
    {
        int ID { get; set; }
        int MetaID { get; set; }
        int TransID { get; set; }
        string Name { get; set; }
        string Content { get; set; }
        bool Deleted { get; set; }

        string Mesaj { get; set; }

        List<SelectListItem> TranslationList { get; set; }
        List<SelectListItem> MetaList { get; set; }

        string MetaAdi { get; set; }
        string TranslationAdi { get; set; }

        List<MetalarDil> List();
        IMetalarDil Select(int id);
        bool Insert(IMetalarDil meta);
        bool Update(IMetalarDil meta);
        bool Delete(int id);
        bool Remove(int id);
    }
}
