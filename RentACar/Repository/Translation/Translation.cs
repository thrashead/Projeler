using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using Repository.ContentTModel;
using Repository.CategoryTModel;
using Repository.MetaTModel;
using RentACar.Data;
using TDLibrary;

namespace Repository.TranslationModel
{
	public class Translation : ITranslation
    {
        readonly RentACarEntities entity = new RentACarEntities();

        #region Model

        public Translation()
		{
			MetaTList = new List<MetaT>();
            ContentTList = new List<ContentT>();
            CategoryTList = new List<CategoryT>();
		}

		public int ID { get; set; }
        [Required(ErrorMessage = "Dil alanı boş olamaz ve en fazla 25 karakter olmalıdır.")]
        [StringLength(25)]
		public string TransName { get; set; }
        [Required(ErrorMessage = "Kısaltma alanı boş olamaz ve en fazla 5 karakter olmalıdır.")]
        [StringLength(5)]
		public string ShortName { get; set; }
		public string Flag { get; set; }
        public bool Active { get; set; }
        public bool Deleted { get; set; }

        public string Mesaj { get; set; }

        public List<MetaT> MetaTList { get; set; }
		public List<ContentT> ContentTList { get; set; }
		public List<CategoryT> CategoryTList { get; set; }
        public bool? HasFile { get; set; }
        public string OldFlag { get; set; }

        #endregion

        #region Methods

        public List<Translation> List()
        {
            return entity.usp_TranslationSelect(null).ToList().ChangeModelList<Translation, usp_TranslationSelect_Result>();
        }

        public ITranslation Select(int id)
        {
            usp_TranslationSelectTop_Result table = entity.usp_TranslationSelectTop(id, 1).FirstOrDefault();
            ITranslation ceviri = table.ChangeModel<Translation>();

            return ceviri;
        }

        public ITranslation Insert(ITranslation ceviri = null, bool? none = null)
        {
            if (ceviri == null)
                ceviri = new Translation();

            return ceviri;
        }

        public bool Insert(ITranslation ceviri)
        {
            var result = entity.usp_TranslationInsert(ceviri.TransName, ceviri.ShortName, ceviri.Flag, ceviri.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public ITranslation Update(int id, ITranslation ceviri = null)
        {
            if (ceviri == null)
                ceviri = Select(id);

            return ceviri;
        }

        public bool Update(ITranslation ceviri)
        {
            var result = entity.usp_TranslationUpdate(ceviri.ID, ceviri.TransName, ceviri.ShortName, ceviri.Flag, ceviri.Active);

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

        #endregion

        #region User Defined

        public ITranslation SelectByCode(string code)
        {
            sp_TranslationSelectByCode_Result table = entity.sp_TranslationSelectByCode(code).FirstOrDefault();
            ITranslation ceviri = table.ChangeModel<Translation>();

            return ceviri;
        }

        #endregion
    }
}
