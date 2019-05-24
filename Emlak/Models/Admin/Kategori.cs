using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace Models
{
	public class Kategori
	{
		public Kategori()
		{
			CategoryTList = new List<KategoriDil>();
			ParentCategories = new List<SelectListItem>();
			TypesList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "Ana Kategori alanı boş olamaz.")]
		public int ParentID { get; set; }
        [Required(ErrorMessage = "Başlık alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
        [StringLength(255)]
		public string Title { get; set; }
		public string Url { get; set; }
		public string Code { get; set; }
		public bool Active { get; set; }
        public bool Deleted { get; set; }

        public string Mesaj { get; set; }

        public List<KategoriDil> CategoryTList { get; set; }
		public List<SelectListItem> ParentCategories { get; set; }
        public List<SelectListItem> TypesList { get; set; }
    }
}
