
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using AdminPanelAngular.Data;
using TDLibrary;

namespace Repository.GalleryTModel
{
	public class GalleryT : IGalleryT
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public GalleryT()
		{
			GalleryList = new List<SelectListItem>();
			TranslationList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int GalID { get; set; }
		public int TransID { get; set; }
		public string GalleryName { get; set; }
		public string ShortText1 { get; set; }
		public string ShortText2 { get; set; }
        [AllowHtml]
        public string Description { get; set; }
        public bool Deleted { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> GalleryList { get; set; }
		public List<SelectListItem> TranslationList { get; set; }
        public string GalleryAdi { get; set; }
        public string TranslationAdi { get; set; }


        public List<GalleryT> List()
        {
            return entity.usp_GalleryTLinkedSelect(null).ToList().ChangeModelList<GalleryT, usp_GalleryTLinkedSelect_Result>();
        }

        public IGalleryT Select(int id)
        {
            usp_GalleryTSelectTop_Result model = entity.usp_GalleryTSelectTop(id, 1).FirstOrDefault();
            IGalleryT table = model.ChangeModel<GalleryT>();

            return table;
        }

        public IGalleryT Insert(int? galID = null, int? transID = null, IGalleryT table = null)
        {
            if (table == null)
                table = new GalleryT();

            List<usp_GallerySelect_Result> tableGallery = entity.usp_GallerySelect(null).ToList();
            table.GalleryList = tableGallery.ToSelectList<usp_GallerySelect_Result, SelectListItem>("ID", "Title", galID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", transID);

            return table;
        }

        public bool Insert(IGalleryT table)
        {
            var result = entity.usp_GalleryTCheckInsert(table.GalID, table.TransID, table.GalleryName, table.ShortText1, table.ShortText2, table.Description);

            if (result != null)
                return true;
            else
                return false;
        }

        public IGalleryT Update(int id, IGalleryT table = null)
        {
            if (table == null)
                table = Select(id);

            List<usp_GallerySelect_Result> tableGallery = entity.usp_GallerySelect(null).ToList();
            table.GalleryList = tableGallery.ToSelectList<usp_GallerySelect_Result, SelectListItem>("ID", "Title", table.GalID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);

            return table;
        }

        public bool Update(IGalleryT table)
        {
            var result = entity.usp_GalleryTCheckUpdate(table.ID, table.GalID, table.TransID, table.GalleryName, table.ShortText1, table.ShortText2, table.Description);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_GalleryTDelete(id);

                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool Remove(int id)
        {
            try
            {
                entity.usp_GalleryTSetDeleted(id);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
