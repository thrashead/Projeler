using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using HumanResources.Data;
using TDLibrary;

namespace Repository.LinksModel
{
    public class Links : ILinks
    {
        readonly HumanResourcesEntities entity = new HumanResourcesEntities();

        public Links()
        {
            LinkTypesList = new List<SelectListItem>();
            LinkedItemList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "Bağlı Tip alanı boş olamaz.")]
        public int LinkTypeID { get; set; }
        [Required(ErrorMessage = "Bağlı Nesne alanı boş olamaz.")]
        public int LinkID { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> LinkTypesList { get; set; }
        public List<SelectListItem> LinkedItemList { get; set; }

        public int LinkedTypeID { get; set; }
        public string Title { get; set; }

        public string LinkedTypesAdi { get; set; }

        public string MainCategoryAdi { get; set; }
        public string LinkedCategoryAdi { get; set; }
        public string MainContentAdi { get; set; }
        public string LinkedContentAdi { get; set; }
        public string MainGalleryAdi { get; set; }
        public string LinkedGalleryAdi { get; set; }
        public string MainPicturesAdi { get; set; }
        public string LinkedPicturesAdi { get; set; }
        public string MainFilesAdi { get; set; }
        public string LinkedFilesAdi { get; set; }
        public string MainMetaAdi { get; set; }
        public string LinkedMetaAdi { get; set; }
        public string MainFormGroupsAdi { get; set; }
        public string LinkedFormGroupsAdi { get; set; }


        public List<Links> List()
        {
            return entity.usp_LinksDetailSelect().ToList().ChangeModelList<Links, usp_LinksDetailSelect_Result>();
        }

        private ILinks Select(int id)
        {
            usp_LinksDetailSelectTop_Result table = entity.usp_LinksDetailSelectTop(id, 1).FirstOrDefault();
            ILinks link = table.ChangeModel<Links>();

            return link;
        }

        public ILinks Insert(int? linkID = null, int? linkTypeID = null, ILinks link = null)
        {
            if (link == null)
                link = new Links();

            List<usp_LinkTypesSelect_Result> tableBagliTipler = entity.usp_LinkTypesSelect(null).ToList();

            int? linkedTypeID = null;

            if (linkID == null && linkTypeID == null)
            {
                linkedTypeID = tableBagliTipler.FirstOrDefault().LinkedTypeID;
            }

            if (tableBagliTipler.Count > 0)
            {
                link.LinkedItemList = ReturnList(linkedTypeID, linkID, linkTypeID);
                link.LinkTypesList = tableBagliTipler.ToSelectList<usp_LinkTypesSelect_Result, SelectListItem>("ID", "Title", linkTypeID);
            }
            else
            {
                link.Mesaj = "Bağlantı oluşturabilmek için önce Bağlı Tip ekleyiniz.";
            }

            return link;
        }

        public bool Insert(ILinks link)
        {
            var result = entity.usp_LinksCheckInsert(link.LinkID, link.LinkTypeID).FirstOrDefault();

            if (result != null)
                return true;
            else
                return false;
        }

        public ILinks Update(int id, ILinks link = null)
        {
            if (link == null)
                link = Select(id);

            usp_LinkTypesSelectTop_Result tableLinkTypes = entity.usp_LinkTypesSelectTop(link.LinkTypeID, 1).FirstOrDefault();
            link.LinkedItemList = ReturnList(link.LinkedTypeID, link.LinkID);
            link.LinkedTypesAdi = tableLinkTypes.Title;

            return link;
        }

        public bool Update(ILinks link)
        {
            var result = entity.usp_LinksCheckUpdate(link.ID, link.LinkID, link.LinkTypeID).FirstOrDefault();

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_LinksDelete(id);

                return true;
            }
            catch
            {
                return false;
            }
        }

        public static List<SelectListItem> ReturnList(int? linkedTypeID = 1, int? linkID = null, int? linkTypeID = null)
        {
            HumanResourcesEntities _entity = new HumanResourcesEntities();

            List<SelectListItem> linkItems = new List<SelectListItem>();

            int? _linkedTypeID = linkTypeID == null ? linkedTypeID : linkTypeID;

            if (linkTypeID == null)
                _linkedTypeID = linkedTypeID;
            else
            {
                usp_LinkTypesSelectTop_Result table = _entity.usp_LinkTypesSelectTop(linkTypeID, 1).FirstOrDefault();

                _linkedTypeID = table.LinkedTypeID;
            }

            switch (_linkedTypeID)
            {
                case 1:
                    List<usp_CategorySelect_Result> tableCatItems = _entity.usp_CategorySelect(null).ToList();

                    foreach (var item in tableCatItems)
                        if (item.ID == linkID)
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Title, Selected = true });
                        else
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Title });
                    break;
                case 2:
                    List<usp_ContentSelect_Result> tableContItems = _entity.usp_ContentSelect(null).ToList();

                    foreach (var item in tableContItems)
                        if (item.ID == linkID)
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Title, Selected = true });
                        else
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Title });
                    break;
                case 4:
                    List<usp_GallerySelect_Result> tableGalItems = _entity.usp_GallerySelect(null).ToList();

                    foreach (var item in tableGalItems)
                        if (item.ID == linkID)
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Title, Selected = true });
                        else
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Title });
                    break;
                case 5:
                    List<usp_PicturesSelect_Result> tablePicItems = _entity.usp_PicturesSelect(null).ToList();

                    foreach (var item in tablePicItems)
                        if (item.ID == linkID)
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Title, Selected = true });
                        else
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Title });
                    break;
                case 6:
                    List<usp_FilesSelect_Result> tableFileItems = _entity.usp_FilesSelect(null).ToList();

                    foreach (var item in tableFileItems)
                        if (item.ID == linkID)
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Title, Selected = true });
                        else
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Title });
                    break;
                case 7:
                    List<usp_MetaSelect_Result> tableMetaItems = _entity.usp_MetaSelect(null).ToList();

                    foreach (var item in tableMetaItems)
                        if (item.ID == linkID)
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Title, Selected = true });
                        else
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Title });
                    break;
            }

            return linkItems;
        }

    }
}
