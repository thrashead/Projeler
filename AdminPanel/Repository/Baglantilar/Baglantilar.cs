using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using AdminPanel.Data;
using TDLibrary;

namespace Repository.BaglantilarModel
{
    public class Baglantilar : IBaglantilar
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public Baglantilar()
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

        public string LinkedTypeAdi { get; set; }

        public string MainCategoryAdi { get; set; }
        public string LinkedCategoryAdi { get; set; }
        public string MainContentAdi { get; set; }
        public string LinkedContentAdi { get; set; }
        public string MainProductAdi { get; set; }
        public string LinkedProductAdi { get; set; }
        public string MainGalleryAdi { get; set; }
        public string LinkedGalleryAdi { get; set; }
        public string MainPictureAdi { get; set; }
        public string LinkedPictureAdi { get; set; }
        public string MainFileAdi { get; set; }
        public string LinkedFileAdi { get; set; }
        public string MainMetaAdi { get; set; }
        public string LinkedMetaAdi { get; set; }
        public string MainPropertyGroupAdi { get; set; }
        public string LinkedPropertyGroupAdi { get; set; }


        public List<Baglantilar> List()
        {
            return entity.usp_LinksDetailSelect().ToList().ChangeModelList<Baglantilar, usp_LinksDetailSelect_Result>();
        }

        private IBaglantilar Select(int id)
        {
            usp_LinksDetailSelectTop_Result table = entity.usp_LinksDetailSelectTop(id, 1).FirstOrDefault();
            IBaglantilar link = table.ChangeModel<Baglantilar>();

            return link;
        }

        public IBaglantilar Insert(int? linkID = null, int? linkTypeID = null, IBaglantilar link = null)
        {
            if (link == null)
                link = new Baglantilar();

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

        public bool Insert(IBaglantilar link)
        {
            var result = entity.usp_LinksCheckInsert(link.LinkID, link.LinkTypeID).FirstOrDefault();

            if (result != null)
                return true;
            else
                return false;
        }

        public IBaglantilar Update(int id, IBaglantilar link = null)
        {
            if (link == null)
                link = Select(id);

            usp_LinkTypesSelectTop_Result tableLinkTypes = entity.usp_LinkTypesSelectTop(link.LinkTypeID, 1).FirstOrDefault();
            link.LinkedItemList = ReturnList(link.LinkedTypeID, link.LinkID);
            link.LinkedTypeAdi = tableLinkTypes.Title;

            return link;
        }

        public bool Update(IBaglantilar link)
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
            AdminPanelEntities _entity = new AdminPanelEntities();

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
                case 3:
                    List<usp_ProductSelect_Result> tableProdItems = _entity.usp_ProductSelect(null).ToList();

                    foreach (var item in tableProdItems)
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
                    List<usp_PictureSelect_Result> tablePicItems = _entity.usp_PictureSelect(null).ToList();

                    foreach (var item in tablePicItems)
                        if (item.ID == linkID)
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Title, Selected = true });
                        else
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Title });
                    break;
                case 6:
                    List<usp_FileSelect_Result> tableFileItems = _entity.usp_FileSelect(null).ToList();

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
                case 8:
                    List<usp_PropertyGroupSelect_Result> tablePropertyGroupItems = _entity.usp_PropertyGroupSelect(null).ToList();

                    foreach (var item in tablePropertyGroupItems)
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
