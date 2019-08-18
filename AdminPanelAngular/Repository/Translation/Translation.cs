using System.Collections.Generic;
using System.Linq;
using Repository.GalleryTModel;
using Repository.ContentTModel;
using Repository.CategoryTModel;
using Repository.MetaTModel;
using Repository.ProductTModel;
using AdminPanelAngular.Data;
using TDLibrary;

namespace Repository.TranslationModel
{
	public class Translation : ITranslation
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public Translation()
		{
			MetaTList = new List<MetaT>();
            ContentTList = new List<ContentT>();
            CategoryTList = new List<CategoryT>();
			GalleryTList = new List<GalleryT>();
			ProductTList = new List<ProductT>();
		}

		public int ID { get; set; }
		public string TransName { get; set; }
		public string ShortName { get; set; }
		public string Flag { get; set; }
        public bool Active { get; set; }
        public bool Deleted { get; set; }

        public string Mesaj { get; set; }

        public List<MetaT> MetaTList { get; set; }
		public List<ContentT> ContentTList { get; set; }
		public List<CategoryT> CategoryTList { get; set; }
		public List<GalleryT> GalleryTList { get; set; }
		public List<ProductT> ProductTList { get; set; }

        public bool? HasFile { get; set; }
        public string OldFlag { get; set; }

        public List<Translation> List()
        {
            return entity.usp_TranslationSelect(null).ToList().ChangeModelList<Translation, usp_TranslationSelect_Result>();
        }

        public ITranslation Select(int id)
        {
            usp_TranslationSelectTop_Result model = entity.usp_TranslationSelectTop(id, 1).FirstOrDefault();
            ITranslation table = model.ChangeModel<Translation>();

            return table;
        }

        public ITranslation Insert(ITranslation table = null, bool? none = null)
        {
            if (table == null)
                table = new Translation();

            return table;
        }

        public bool Insert(ITranslation table)
        {
            var result = entity.usp_TranslationInsert(table.TransName, table.ShortName, table.Flag, table.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public ITranslation Update(int id, ITranslation table = null)
        {
            if (table == null)
                table = Select(id);

            return table;
        }

        public bool Update(ITranslation table)
        {
            var result = entity.usp_TranslationUpdate(table.ID, table.TransName, table.ShortName, table.Flag, table.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_TranslationDelete(id);

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
                entity.usp_TranslationSetDeleted(id);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
