using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.KategoriDilModel
{
    public interface IKategoriDil
    {
        int ID { get; set; }
        int CatID { get; set; }
        int TransID { get; set; }
        string CategoryName { get; set; }
        string ShortText1 { get; set; }
        string ShortText2 { get; set; }
        string Description { get; set; }
        bool Deleted { get; set; }

        string Mesaj { get; set; }

        List<SelectListItem> TranslationList { get; set; }
        List<SelectListItem> CategoryList { get; set; }
        string CategoryAdi { get; set; }
        string TranslationAdi { get; set; }

        List<KategoriDil> List();
        IKategoriDil Select(int id);
        bool Insert(IKategoriDil kategori);
        bool Update(IKategoriDil kategori);
        bool Delete(int id);
        bool Remove(int id);
    }
}
