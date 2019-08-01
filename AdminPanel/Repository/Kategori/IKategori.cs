using Repository.KategoriDilModel;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.KategoriModel
{
    public interface IKategori
    {
        int ID { get; set; }
        int ParentID { get; set; }
        string Title { get; set; }
        string Url { get; set; }
        string Code { get; set; }
        bool Active { get; set; }
        bool Deleted { get; set; }

        string Mesaj { get; set; }

        List<KategoriDil> CategoryTList { get; set; }
        List<SelectListItem> ParentCategories { get; set; }
        List<SelectListItem> TypesList { get; set; }

        List<Kategori> List();
        IKategori Select(int id);
        IKategori Insert(IKategori kategori, bool? none);
        bool Insert(IKategori kategori);
        IKategori Update(int id, IKategori kategori);
        bool Update(IKategori kategori);
        bool Delete(int id);
        bool Remove(int id);
        bool Copy(int id);
    }
}
