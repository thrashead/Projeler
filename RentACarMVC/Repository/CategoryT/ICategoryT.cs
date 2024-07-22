using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.CategoryTModel
{
    public interface ICategoryT
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

        List<CategoryT> List();
        ICategoryT Select(int id);
        ICategoryT Insert(int? catID, int? transID, ICategoryT kategori);
        bool Insert(ICategoryT kategori);
        ICategoryT Update(int id, ICategoryT kategori);
        bool Update(ICategoryT kategori);
        bool Delete(int id);
        bool Remove(int id);
    }
}
