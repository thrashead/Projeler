using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.GaleriDilModel
{
    public interface IGaleriDil
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

        List<GaleriDil> List();
        IGaleriDil Select(int id);
        bool Insert(IGaleriDil galeri);
        bool Update(IGaleriDil galeri);
        bool Delete(int id);
        bool Remove(int id);
    }
}
