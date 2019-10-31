using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.CategoryModel
{
    public interface ICategory
    {
        int ID { get; set; }
        int ParentID { get; set; }
        string Title { get; set; }
        string Url { get; set; }
        string Code { get; set; }
        bool Active { get; set; }
        bool Deleted { get; set; }

        string Mesaj { get; set; }
        List<SelectListItem> ParentCategories { get; set; }
        List<SelectListItem> TypesList { get; set; }

        List<Category> List();
        ICategory Select(int id);
        ICategory Insert(ICategory kategori, bool? none);
        bool Insert(ICategory kategori);
        ICategory Update(int id, ICategory kategori);
        bool Update(ICategory kategori);
        bool Copy(int id);
        bool Delete(int id);
        bool Remove(int id);
    }
}
