using Repository.BaglantilarModel;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.BagliTiplerModel
{
    public interface IBagliTipler
    {
        int ID { get; set; }
        string Title { get; set; }
        int MainTypeID { get; set; }
        int MainID { get; set; }
        int LinkedTypeID { get; set; }
        string Url { get; set; }

        string Mesaj { get; set; }

        List<SelectListItem> MainTypeList { get; set; }
        List<SelectListItem> LinkedTypeList { get; set; }
        List<SelectListItem> MainList { get; set; }
        List<Baglantilar> LinkList { get; set; }

        string MainTypeAdi { get; set; }
        string LinkedTypeAdi { get; set; }
        string MainCategoryAdi { get; set; }
        string MainContentAdi { get; set; }
        string MainProductAdi { get; set; }
        string MainGalleryAdi { get; set; }
        string MainPictureAdi { get; set; }
        string MainFileAdi { get; set; }
        string MainMetaAdi { get; set; }
        string MainPropertyGroupAdi { get; set; }

        List<BagliTipler> List();
        IBagliTipler Select(int id);
        bool Insert(IBagliTipler link);
        bool Update(IBagliTipler link);
        bool Delete(int id);
        bool Copy(int id);
    }
}
