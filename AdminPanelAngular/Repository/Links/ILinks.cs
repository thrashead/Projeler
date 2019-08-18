using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.LinksModel
{
    public interface ILinks
    {
		int ID { get; set; }
		int LinkTypeID { get; set; }
		int LinkID { get; set; }

        string Mesaj { get; set; }

        List<SelectListItem> LinkTypesList { get; set; }
        List<SelectListItem> LinkedItemList { get; set; }

        int LinkedTypeID { get; set; }
        string Title { get; set; }

        string LinkedTypesAdi { get; set; }

        string MainCategoryAdi { get; set; }
        string LinkedCategoryAdi { get; set; }
        string MainContentAdi { get; set; }
        string LinkedContentAdi { get; set; }
        string MainProductAdi { get; set; }
        string LinkedProductAdi { get; set; }
        string MainGalleryAdi { get; set; }
        string LinkedGalleryAdi { get; set; }
        string MainPicturesAdi { get; set; }
        string LinkedPicturesAdi { get; set; }
        string MainFilesAdi { get; set; }
        string LinkedFilesAdi { get; set; }
        string MainMetaAdi { get; set; }
        string LinkedMetaAdi { get; set; }
        string MainFormGroupsAdi { get; set; }
        string LinkedFormGroupsAdi { get; set; }

        List<Links> List();
        ILinks Insert(int? linkID, int? linkTypeID, ILinks link);
        bool Insert(ILinks link);
        ILinks Update(int id, ILinks link);
        bool Update(ILinks link);
        bool Delete(int id);
    }
}
