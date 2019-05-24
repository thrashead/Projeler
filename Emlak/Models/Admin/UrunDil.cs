using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace Models
{
	public class UrunDil
	{
		public UrunDil()
		{
			TranslationList = new List<SelectListItem>();
			ProductList = new List<SelectListItem>();
		}

		public int ID { get; set; }
        [Required(ErrorMessage = "Bağlı Ürün alanı boş olamaz.")]
		public int ProdID { get; set; }
        [Required(ErrorMessage = "Dil alanı boş olamaz.")]
		public int TransID { get; set; }
        [Required(ErrorMessage = "Ürün Adı alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
        [StringLength(255)]
		public string ProductName { get; set; }
		public string ShortText1 { get; set; }
		public string ShortText2 { get; set; }
		[DataType(DataType.MultilineText)]
        [AllowHtml]
		public string Description { get; set; }
        public bool Deleted { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> TranslationList { get; set; }
		public List<SelectListItem> ProductList { get; set; }

    }
}
