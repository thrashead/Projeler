using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.BaglantilarModel
{
    public interface IBaglantilar
    {
		int ID { get; set; }
		int LinkTypeID { get; set; }
		int LinkID { get; set; }

        string Mesaj { get; set; }

        List<SelectListItem> LinkTypesList { get; set; }
        List<SelectListItem> LinkedItemList { get; set; }

        int LinkedTypeID { get; set; }
        string Title { get; set; }

        string LinkedTypeAdi { get; set; }

        string MainCategoryAdi { get; set; }
        string LinkedCategoryAdi { get; set; }
        string MainContentAdi { get; set; }
        string LinkedContentAdi { get; set; }
        string MainProductAdi { get; set; }
        string LinkedProductAdi { get; set; }
        string MainGalleryAdi { get; set; }
        string LinkedGalleryAdi { get; set; }
        string MainPictureAdi { get; set; }
        string LinkedPictureAdi { get; set; }
        string MainFileAdi { get; set; }
        string LinkedFileAdi { get; set; }
        string MainMetaAdi { get; set; }
        string LinkedMetaAdi { get; set; }
        string MainPropertyGroupAdi { get; set; }
        string LinkedPropertyGroupAdi { get; set; }

        List<Baglantilar> List();
        IBaglantilar Select(int id);
        IBaglantilar Insert(IBaglantilar link, bool? none);
        bool Insert(IBaglantilar link);
        IBaglantilar Update(int id, IBaglantilar link);
        bool Update(IBaglantilar link);
        bool Delete(int id);
    }
}
