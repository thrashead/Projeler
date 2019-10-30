using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using Repository.LinksModel;
using Repository.Data;
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
        [Required(ErrorMessage = "Başlık alanı boş olamaz ve en fazla 50 karakter olmalıdır.")]
        [StringLength(50)]
        public string Title { get; set; }
        [Required(ErrorMessage = "Ana Tip alanı boş olamaz.")]
        public int MainTypeID { get; set; }
        [Required(ErrorMessage = "Ana Nesne alanı boş olamaz.")]
        public int MainID { get; set; }
        [Required(ErrorMessage = "Bağlanacak Tip alanı boş olamaz.")]
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
            return entity.usp_LinkTypesDetailSelect().ToList().ChangeModelList<LinkTypes, usp_LinkTypesDetailSelect_Result>();
        }

        public ILinkTypes Select(int id)
        {
            usp_LinkTypesSelectTop_Result table = entity.usp_LinkTypesSelectTop(id, 1).FirstOrDefault();
            ILinkTypes link = table.ChangeModel<LinkTypes>();

            return link;
        }

        public ILinkTypes Insert(ILinkTypes link = null, bool? none = null)
        {
            if (link == null)
                link = new LinkTypes();

            link.MainTypeList.AddRange(ReturnList(0));
            link.LinkedTypeList.AddRange(ReturnList(0, 2));
            link.MainList.AddRange(ReturnList(1));

            return link;
        }

        public bool Insert(ILinkTypes link)
        {
            link.Url = link.Title.ToUrl();

            var result = entity.usp_LinkTypesInsert(link.Title, link.MainTypeID, link.MainID, link.LinkedTypeID, link.Url).FirstOrDefault();

            if (result != null)
                return true;
            else
                return false;
        }

        public ILinkTypes Update(int id, ILinkTypes link = null)
        {
            if (link == null)
                link = Select(id);

            link.MainTypeList.AddRange(ReturnList(0, link.MainTypeID));
            link.LinkedTypeList.AddRange(ReturnList(0, link.LinkedTypeID));
            link.MainList.AddRange(ReturnList(link.MainTypeID, link.MainID));
            link.LinkList = entity.usp_LinksDetailByLinkTypeIDSelect(link.ID).ToList().ChangeModelList<Links, usp_LinksDetailByLinkTypeIDSelect_Result>();

            return link;
        }

        public bool Update(ILinkTypes link)
        {
            link.Url = link.Title.ToUrl();

            var result = entity.usp_LinkTypesCheckUpdate(link.ID, link.Title, link.MainTypeID, link.MainID, link.LinkedTypeID, link.Url).FirstOrDefault();

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


        public static List<SelectListItem> ListeDoldur(dynamic list, BaglantiTipi baglantiTipi = BaglantiTipi.Tablo, int selectedID = 0)
        {
            List<SelectListItem> returnList = new List<SelectListItem>();

            foreach (dynamic item in list)
            {
                switch (baglantiTipi)
                {
                    case BaglantiTipi.Tip:
                        returnList.Add(new SelectListItem()
                        {
                            Text = item.TypeName,
                            Value = item.ID.ToString(),
                            Selected = item.ID == selectedID ? true : false
                        });
                        break;
                    case BaglantiTipi.Tablo:
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

        public enum BaglantiTipi
        {
            Tip,
            Tablo
        }

        public static List<SelectListItem> ReturnList(int? typeID, int selectedID = 0)
        {
            AdminPanelEntities _entity = new AdminPanelEntities();

            switch (typeID)
            {
                case 1:
                    List<usp_CategorySelect_Result> kategoriler = _entity.usp_CategorySelect(null).ToList();
                    return ListeDoldur(kategoriler, BaglantiTipi.Tablo, selectedID);
                case 2:
                    List<usp_ContentSelect_Result> icerikler = _entity.usp_ContentSelect(null).ToList();
                    return ListeDoldur(icerikler, BaglantiTipi.Tablo, selectedID);
                case 3:
                    List<usp_ProductSelect_Result> urunler = _entity.usp_ProductSelect(null).ToList();
                    return ListeDoldur(urunler, BaglantiTipi.Tablo, selectedID);
                case 4:
                    List<usp_GallerySelect_Result> galeriler = _entity.usp_GallerySelect(null).ToList();
                    return ListeDoldur(galeriler, BaglantiTipi.Tablo, selectedID);
                case 5:
                    List<usp_PicturesSelect_Result> resimler = _entity.usp_PicturesSelect(null).ToList();
                    return ListeDoldur(resimler, BaglantiTipi.Tablo, selectedID);
                case 6:
                    List<usp_FilesSelect_Result> dosyalar = _entity.usp_FilesSelect(null).ToList();
                    return ListeDoldur(dosyalar, BaglantiTipi.Tablo, selectedID);
                case 7:
                    List<usp_MetaSelect_Result> metalar = _entity.usp_MetaSelect(null).ToList();
                    return ListeDoldur(metalar, BaglantiTipi.Tablo, selectedID);
                default:
                    List<usp_TypesLinkableSelect_Result> tipler = _entity.usp_TypesLinkableSelect(null).ToList();
                    return ListeDoldur(tipler, BaglantiTipi.Tip, selectedID);
            }
        }
    }
}
