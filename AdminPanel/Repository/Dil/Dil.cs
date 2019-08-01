using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using Repository.GaleriDilModel;
using Repository.IcerikDilModel;
using Repository.KategoriDilModel;
using Repository.MetalarDilModel;
using Repository.UrunDilModel;
using AdminPanel.Data;
using TDLibrary;

namespace Repository.DilModel
{
	public class Dil : IDil
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public Dil()
		{
			MetaTList = new List<MetalarDil>();
			ContentTList = new List<IcerikDil>();
			CategoryTList = new List<KategoriDil>();
			GalleryTList = new List<GaleriDil>();
			ProductTList = new List<UrunDil>();
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

        public List<MetalarDil> MetaTList { get; set; }
		public List<IcerikDil> ContentTList { get; set; }
		public List<KategoriDil> CategoryTList { get; set; }
		public List<GaleriDil> GalleryTList { get; set; }
		public List<UrunDil> ProductTList { get; set; }


        public List<Dil> List()
        {
            return entity.usp_TranslationSelect(null).ToList().ChangeModelList<Dil, usp_TranslationSelect_Result>();
        }

        public IDil Select(int id)
        {
            usp_TranslationSelectTop_Result table = entity.usp_TranslationSelectTop(id, 1).FirstOrDefault();
            IDil ceviri = table.ChangeModel<Dil>();

            return ceviri;
        }

        public IDil Insert(IDil ceviri = null, bool? none = null)
        {
            if (ceviri == null)
                ceviri = new Dil();

            return ceviri;
        }

        public bool Insert(IDil ceviri)
        {
            var result = entity.usp_TranslationInsert(ceviri.TransName, ceviri.ShortName, ceviri.Flag, ceviri.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public IDil Update(int id, IDil ceviri = null)
        {
            if (ceviri == null)
                ceviri = Select(id);

            return ceviri;
        }

        public bool Update(IDil ceviri)
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
    }
}
