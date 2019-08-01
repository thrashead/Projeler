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

        public IBaglantilar Select(int id)
        {
            usp_LinksDetailSelectTop_Result table = entity.usp_LinksDetailSelectTop(id, 1).FirstOrDefault();
            IBaglantilar link = table.ChangeModel<Baglantilar>();

            return link;
        }

        public IBaglantilar Insert(IBaglantilar link = null, bool? none = null)
        {
            if (link == null)
                link = new Baglantilar();

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
    }
}
