using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace Models
{
	public class MetalarDil
	{
		public MetalarDil()
		{
			TranslationList = new List<SelectListItem>();
			MetaList = new List<SelectListItem>();
		}

		public int ID { get; set; }
        [Required(ErrorMessage = "Bağlı Meta alanı boş olamaz.")]
		public int MetaID { get; set; }
        [Required(ErrorMessage = "Dil alanı boş olamaz.")]
		public int TransID { get; set; }
        [Required(ErrorMessage = "Özellik alanı boş olamaz ve en fazla 50 karakter olmalıdır.")]
        [StringLength(50)]
		public string Name { get; set; }
		[DataType(DataType.MultilineText)]
        [Required(ErrorMessage = "İçerik alanı boş olamaz.")]
        [StringLength(int.MaxValue)]
		public string Content { get; set; }
        public bool Deleted { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> TranslationList { get; set; }
		public List<SelectListItem> MetaList { get; set; }
    }
}
