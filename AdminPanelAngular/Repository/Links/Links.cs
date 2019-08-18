using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using AdminPanelAngular.Data;
using TDLibrary;

namespace Repository.LinksModel
{
    public class Links : ILinks
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public Links()
        {
            LinkTypesList = new List<SelectListItem>();
            LinkedItemList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        public int LinkTypeID { get; set; }
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
        public string MainProductAdi { get; set; }
        public string LinkedProductAdi { get; set; }
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
            usp_LinksDetailSelectTop_Result model = entity.usp_LinksDetailSelectTop(id, 1).FirstOrDefault();
            ILinks table = model.ChangeModel<Links>();

            return table;
        }

        public ILinks Insert(int? linkID = null, int? linkTypeID = null, ILinks table = null)
        {
            if (table == null)
                table = new Links();

            List<usp_LinkTypesSelect_Result> tableLinkTypes = entity.usp_LinkTypesSelect(null).ToList();

            int? linkedTypeID = null;

            if (linkID == null && linkTypeID == null)
            {
                linkedTypeID = tableLinkTypes.FirstOrDefault().LinkedTypeID;
            }

            if (tableLinkTypes.Count > 0)
            {
                table.LinkedItemList = ReturnList(linkedTypeID, linkID, linkTypeID);
                table.LinkTypesList = tableLinkTypes.ToSelectList<usp_LinkTypesSelect_Result, SelectListItem>("ID", "Title", linkTypeID);
            }
            else
            {
                table.Mesaj = "Bağlantı oluşturabilmek için önce Bağlı Tip ekleyiniz.";
            }

            return table;
        }

        public bool Insert(ILinks table)
        {
            var result = entity.usp_LinksCheckInsert(table.LinkID, table.LinkTypeID).FirstOrDefault();

            if (result != null)
                return true;
            else
                return false;
        }

        public ILinks Update(int id, ILinks table = null)
        {
            if (table == null)
                table = Select(id);

            usp_LinkTypesSelectTop_Result tableLinkTypes = entity.usp_LinkTypesSelectTop(table.LinkTypeID, 1).FirstOrDefault();
            table.LinkedItemList = ReturnList(table.LinkedTypeID, table.LinkID);
            table.LinkedTypesAdi = tableLinkTypes.Title;

            return table;
        }

        public bool Update(ILinks table)
        {
            var result = entity.usp_LinksCheckUpdate(table.ID, table.LinkID, table.LinkTypeID).FirstOrDefault();

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
                usp_LinkTypesSelectTop_Result model = _entity.usp_LinkTypesSelectTop(linkTypeID, 1).FirstOrDefault();

                _linkedTypeID = model.LinkedTypeID;
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
                case 8:
                    List<usp_FormGroupsSelect_Result> tableFormGroupsItems = _entity.usp_FormGroupsSelect(null).ToList();

                    foreach (var item in tableFormGroupsItems)
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
