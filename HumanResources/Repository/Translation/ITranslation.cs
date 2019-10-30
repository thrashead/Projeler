using Repository.ContentTModel;
using Repository.CategoryTModel;
using Repository.MetaTModel;
using System.Collections.Generic;

namespace Repository.TranslationModel
{
    public interface ITranslation
    {
        int ID { get; set; }
        string TransName { get; set; }
        string ShortName { get; set; }
        string Flag { get; set; }
        bool Active { get; set; }
        bool Deleted { get; set; }

        string Mesaj { get; set; }

        List<MetaT> MetaTList { get; set; }
        List<ContentT> ContentTList { get; set; }
        List<CategoryT> CategoryTList { get; set; }

        List<Translation> List();
        ITranslation Select(int id);
        ITranslation Insert(ITranslation ceviri, bool? none);
        bool Insert(ITranslation ceviri);
        ITranslation Update(int id, ITranslation ceviri);
        bool Update(ITranslation ceviri);
        bool Delete(int id);
        bool Remove(int id);
    }
}
