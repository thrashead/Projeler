using Repository.LinksModel;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.LinkTypesModel
{
    public interface ILinkTypes
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
        List<Links> LinkList { get; set; }

        string MainTypeAdi { get; set; }
        string LinkedTypeAdi { get; set; }
        string MainCategoryAdi { get; set; }
        string MainContentAdi { get; set; }
        string MainGalleryAdi { get; set; }
        string MainPicturesAdi { get; set; }
        string MainFilesAdi { get; set; }
        string MainMetaAdi { get; set; }
        string MainFormGroupsAdi { get; set; }

        List<LinkTypes> List();
        ILinkTypes Select(int id);
        ILinkTypes Insert(ILinkTypes link, bool? none);
        bool Insert(ILinkTypes link);
        ILinkTypes Update(int id, ILinkTypes link);
        bool Update(ILinkTypes link);
        bool Delete(int id);
        bool Copy(int id);
    }
}
