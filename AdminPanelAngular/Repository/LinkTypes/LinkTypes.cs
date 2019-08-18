using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using Repository.LinksModel;
using AdminPanelAngular.Data;
using TDLibrary;

namespace Repository.LinkTypesModel
{
    public class LinkTypes : ILinkTypes
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public LinkTypes()
        {
            MainTypeList = new List<SelectListItem>();
            LinkedTypeList = new List<SelectListItem>();
            MainList = new List<SelectListItem>();
            LinkList = new List<Links>();
        }

        public int ID { get; set; }
        public string Title { get; set; }
        public int MainTypeID { get; set; }
        public int MainID { get; set; }
        public int LinkedTypeID { get; set; }
        public string Url { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> MainTypeList { get; set; }
        public List<SelectListItem> LinkedTypeList { get; set; }
        public List<SelectListItem> MainList { get; set; }
        public List<Links> LinkList { get; set; }

        public string MainTypeAdi { get; set; }
        public string LinkedTypeAdi { get; set; }
        public string MainCategoryAdi { get; set; }
        public string MainContentAdi { get; set; }
        public string MainProductAdi { get; set; }
        public string MainGalleryAdi { get; set; }
        public string MainPicturesAdi { get; set; }
        public string MainFilesAdi { get; set; }
        public string MainMetaAdi { get; set; }
        public string MainFormGroupsAdi { get; set; }


        public List<LinkTypes> List()
        {
            return entity.usp_LinkTypesDetailSelect().ToList().ChangeModelList<LinkTypesModel.LinkTypes, usp_LinkTypesDetailSelect_Result>();
        }

        public ILinkTypes Select(int id)
        {
            usp_LinkTypesSelectTop_Result model = entity.usp_LinkTypesSelectTop(id, 1).FirstOrDefault();
            ILinkTypes table = model.ChangeModel<LinkTypesModel.LinkTypes>();

            return table;
        }

        public ILinkTypes Insert(ILinkTypes table = null, bool? none = null)
        {
            if (table == null)
                table = new LinkTypesModel.LinkTypes();

            table.MainTypeList.AddRange(ReturnList(0));
            table.LinkedTypeList.AddRange(ReturnList(0, 2));
            table.MainList.AddRange(ReturnList(1));

            return table;
        }

        public bool Insert(ILinkTypes table)
        {
            table.Url = table.Title.ToUrl();

            var result = entity.usp_LinkTypesInsert(table.Title, table.MainTypeID, table.MainID, table.LinkedTypeID, table.Url).FirstOrDefault();

            if (result != null)
                return true;
            else
                return false;
        }

        public ILinkTypes Update(int id, ILinkTypes table = null)
        {
            if (table == null)
                table = Select(id);

            table.MainTypeList.AddRange(ReturnList(0, table.MainTypeID));
            table.LinkedTypeList.AddRange(ReturnList(0, table.LinkedTypeID));
            table.MainList.AddRange(ReturnList(table.MainTypeID, table.MainID));
            table.LinkList = entity.usp_LinksDetailByLinkTypeIDSelect(table.ID).ToList().ChangeModelList<Links, usp_LinksDetailByLinkTypeIDSelect_Result>();

            return table;
        }

        public bool Update(ILinkTypes table)
        {
            table.Url = table.Title.ToUrl();

            var result = entity.usp_LinkTypesCheckUpdate(table.ID, table.Title, table.MainTypeID, table.MainID, table.LinkedTypeID, table.Url).FirstOrDefault();

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_LinkTypesDelete(id);

                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool Copy(int id)
        {
            try
            {
                var result = entity.usp_LinkTypesCopy(id);

                return result == null ? false : true;
            }
            catch
            {
                return false;
            }
        }


        public static List<SelectListItem> FillList(dynamic list, LinkType linkType = LinkType.Table, int selectedID = 0)
        {
            List<SelectListItem> returnList = new List<SelectListItem>();

            foreach (dynamic item in list)
            {
                switch (linkType)
                {
                    case LinkType.Type:
                        returnList.Add(new SelectListItem()
                        {
                            Text = item.TypeName,
                            Value = item.ID.ToString(),
                            Selected = item.ID == selectedID ? true : false
                        });
                        break;
                    case LinkType.Table:
                        returnList.Add(new SelectListItem()
                        {
                            Text = item.Title,
                            Value = item.ID.ToString(),
                            Selected = item.ID == selectedID ? true : false
                        });
                        break;
                    default:
                        returnList.Add(new SelectListItem()
                        {
                            Text = item.Title,
                            Value = item.ID.ToString(),
                            Selected = item.ID == selectedID ? true : false
                        });
                        break;
                }
            }

            return returnList;
        }

        public enum LinkType
        {
            Type,
            Table
        }

        public static List<SelectListItem> ReturnList(int? typeID, int selectedID = 0)
        {
            AdminPanelEntities _entity = new AdminPanelEntities();

            switch (typeID)
            {
                case 1:
                    List<usp_CategorySelect_Result> categories = _entity.usp_CategorySelect(null).ToList();
                    return FillList(categories, LinkType.Table, selectedID);
                case 2:
                    List<usp_ContentSelect_Result> contents = _entity.usp_ContentSelect(null).ToList();
                    return FillList(contents, LinkType.Table, selectedID);
                case 3:
                    List<usp_ProductSelect_Result> products = _entity.usp_ProductSelect(null).ToList();
                    return FillList(products, LinkType.Table, selectedID);
                case 4:
                    List<usp_GallerySelect_Result> galleries = _entity.usp_GallerySelect(null).ToList();
                    return FillList(galleries, LinkType.Table, selectedID);
                case 5:
                    List<usp_PicturesSelect_Result> pictures = _entity.usp_PicturesSelect(null).ToList();
                    return FillList(pictures, LinkType.Table, selectedID);
                case 6:
                    List<usp_FilesSelect_Result> files = _entity.usp_FilesSelect(null).ToList();
                    return FillList(files, LinkType.Table, selectedID);
                case 7:
                    List<usp_MetaSelect_Result> metas = _entity.usp_MetaSelect(null).ToList();
                    return FillList(metas, LinkType.Table, selectedID);
                case 8:
                    List<usp_FormGroupsSelect_Result> formitems = _entity.usp_FormGroupsSelect(null).ToList();
                    return FillList(formitems, LinkType.Table, selectedID);
                default:
                    List<usp_TypesLinkableSelect_Result> types = _entity.usp_TypesLinkableSelect(null).ToList();
                    return FillList(types, LinkType.Type, selectedID);
            }
        }
    }
}
