using Repository.GaleriDilModel;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.GaleriModel
{
    public interface IGaleri
    {
        int ID { get; set; }
        string Title { get; set; }
        string Url { get; set; }
        string Code { get; set; }
        bool Active { get; set; }
        bool Deleted { get; set; }

        string Mesaj { get; set; }

        List<GaleriDil> GalleryTList { get; set; }
        List<SelectListItem> TypesList { get; set; }

        List<Galeri> List();
        IGaleri Select(int id);
        bool Insert(IGaleri galeri);
        bool Update(IGaleri galeri);
        bool Delete(int id);
        bool Remove(int id);
        bool Copy(int id);
    }
}
