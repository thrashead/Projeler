using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.GalleryTModel
{
    public interface IGalleryT
    {
        int ID { get; set; }
        int GalID { get; set; }
        int TransID { get; set; }
        string GalleryName { get; set; }
        string ShortText1 { get; set; }
        string ShortText2 { get; set; }
        string Description { get; set; }
        bool Deleted { get; set; }

        string Mesaj { get; set; }

        List<SelectListItem> GalleryList { get; set; }
        List<SelectListItem> TranslationList { get; set; }
        string GalleryAdi { get; set; }
        string TranslationAdi { get; set; }

        List<GalleryT> List();
        IGalleryT Select(int id);
        IGalleryT Insert(int? galID, int? transID, IGalleryT galeri);
        bool Insert(IGalleryT galeri);
        IGalleryT Update(int id, IGalleryT galeri);
        bool Update(IGalleryT galeri);
        bool Delete(int id);
        bool Remove(int id);
    }
}
