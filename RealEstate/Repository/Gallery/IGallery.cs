using Repository.GalleryTModel;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.GalleryModel
{
    public interface IGallery
    {
        int ID { get; set; }
        string Title { get; set; }
        string Url { get; set; }
        string Code { get; set; }
        bool Active { get; set; }
        bool Deleted { get; set; }

        string Mesaj { get; set; }

        List<GalleryT> GalleryTList { get; set; }
        List<SelectListItem> TypesList { get; set; }

        List<Gallery> List();
        IGallery Select(int id);
        bool Insert(IGallery galeri);
        IGallery Update(int id, IGallery galeri);
        bool Update(IGallery galeri);
        bool Delete(int id);
        bool Remove(int id);
        bool Copy(int id);
    }
}
