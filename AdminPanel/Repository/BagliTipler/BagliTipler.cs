using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using Repository.BaglantilarModel;
using AdminPanel.Data;
using TDLibrary;

namespace Repository.BagliTiplerModel
{
    public class BagliTipler : IBagliTipler
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public BagliTipler()
        {
            MainTypeList = new List<SelectListItem>();
            LinkedTypeList = new List<SelectListItem>();
            MainList = new List<SelectListItem>();
            LinkList = new List<Baglantilar>();
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
        public List<Baglantilar> LinkList { get; set; }

        public string MainTypeAdi { get; set; }
        public string LinkedTypeAdi { get; set; }
        public string MainCategoryAdi { get; set; }
        public string MainContentAdi { get; set; }
        public string MainProductAdi { get; set; }
        public string MainGalleryAdi { get; set; }
        public string MainPictureAdi { get; set; }
        public string MainFileAdi { get; set; }
        public string MainMetaAdi { get; set; }
        public string MainPropertyGroupAdi { get; set; }


        public List<BagliTipler> List()
        {
            return entity.usp_LinkTypesDetailSelect().ToList().ChangeModelList<BagliTipler, usp_LinkTypesDetailSelect_Result>();
        }

        public IBagliTipler Select(int id)
        {
            usp_LinkTypesSelectTop_Result table = entity.usp_LinkTypesSelectTop(id, 1).FirstOrDefault();
            IBagliTipler link = table.ChangeModel<BagliTipler>();

            return link;
        }

        public IBagliTipler Insert(IBagliTipler link = null, bool? none = null)
        {
            if (link == null)
                link = new BagliTipler();

            return link;
        }

        public bool Insert(IBagliTipler link)
        {
            link.Url = link.Title.ToUrl();

            var result = entity.usp_LinkTypesInsert(link.Title, link.MainTypeID, link.MainID, link.LinkedTypeID, link.Url);

            if (result != null)
                return true;
            else
                return false;
        }

        public IBagliTipler Update(int id, IBagliTipler link = null)
        {
            if (link == null)
                link = Select(id);

            return link;
        }

        public bool Update(IBagliTipler link)
        {
            link.Url = link.Title.ToUrl();

            var result = entity.usp_LinkTypesCheckUpdate(link.ID, link.Title, link.MainTypeID, link.MainID, link.LinkedTypeID, link.Url);

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
    }
}
