using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.MetaTModel
{
    public interface IMetaT
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

        List<MetaT> List();
        IMetaT Select(int id);
        IMetaT Insert(int? metaID, int? transID, IMetaT meta);
        bool Insert(IMetaT meta);
        IMetaT Update(int id, IMetaT meta);
        bool Update(IMetaT meta);
        bool Delete(int id);
        bool Remove(int id);
    }
}
