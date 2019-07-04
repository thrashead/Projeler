using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace Models
{
	public class Dosya
	{
		public int ID { get; set; }
        [Required(ErrorMessage = "Başlık alanı boş olamaz ve en fazla 50 karakter olmalıdır.")]
        [StringLength(50)]
		public string Title { get; set; }
		[DataType(DataType.MultilineText)]
        [AllowHtml]
        public string Description { get; set; }
		public string FileUrl { get; set; }
		public string Code { get; set; }
		public bool Active { get; set; }
        public bool Deleted { get; set; }

        public string Mesaj { get; set; }

        public string OldFileUrl { get; set; }
        public bool? HasFile { get; set; }
    }
}
