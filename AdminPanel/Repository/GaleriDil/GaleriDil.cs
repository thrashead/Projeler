using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using AdminPanel.Data;
using TDLibrary;

namespace Repository.GaleriDilModel
{
	public class GaleriDil : IGaleriDil
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public GaleriDil()
		{
			GalleryList = new List<SelectListItem>();
			TranslationList = new List<SelectListItem>();
		}

		public int ID { get; set; }
        [Required(ErrorMessage = "Bağlı Galeri alanı boş olamaz.")]
		public int GalID { get; set; }
        [Required(ErrorMessage = "Dil alanı boş olamaz.")]
		public int TransID { get; set; }
        [Required(ErrorMessage = "Galeri Adı alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
        [StringLength(255)]
		public string GalleryName { get; set; }
		public string ShortText1 { get; set; }
		public string ShortText2 { get; set; }
		[DataType(DataType.MultilineText)]
        [AllowHtml]
        public string Description { get; set; }
        public bool Deleted { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> GalleryList { get; set; }
		public List<SelectListItem> TranslationList { get; set; }
        public string GalleryAdi { get; set; }
        public string TranslationAdi { get; set; }


        public List<GaleriDil> List()
        {
            return entity.usp_GalleryTLinkedSelect(null).ToList().ChangeModelList<GaleriDil, usp_GalleryTLinkedSelect_Result>();
        }

        public IGaleriDil Select(int id)
        {
            usp_GalleryTSelectTop_Result table = entity.usp_GalleryTSelectTop(id, 1).FirstOrDefault();
            GaleriDil galeri = table.ChangeModel<GaleriDil>();

            return galeri;
        }

        public bool Insert(IGaleriDil galeri)
        {
            var result = entity.usp_GalleryTCheckInsert(galeri.GalID, galeri.TransID, galeri.GalleryName, galeri.ShortText1, galeri.ShortText2, galeri.Description);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Update(IGaleriDil galeri)
        {
            var result = entity.usp_GalleryTCheckUpdate(galeri.ID, galeri.GalID, galeri.TransID, galeri.GalleryName, galeri.ShortText1, galeri.ShortText2, galeri.Description);

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
