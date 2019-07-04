using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace Models
{
	public class Baglantilar
	{
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
        public string LinkedTypeAdi { get; set; }

        public string LinkedAdi { get; set; }
        public string LinkedCategoryAdi { get; set; }
        public string LinkedContentAdi { get; set; }
        public string LinkedProductAdi { get; set; }
        public string LinkedGalleryAdi { get; set; }
        public string LinkedPictureAdi { get; set; }
        public string LinkedFileAdi { get; set; }
        public string LinkedMetaAdi { get; set; }
        public string LinkedPropertyGroupAdi { get; set; }
        public string LinkedRealEstatesAdi { get; set; }
    }
}
