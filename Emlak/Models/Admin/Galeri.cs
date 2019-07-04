using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace Models
{
	public class Galeri
	{
		public Galeri()
		{
			GalleryTList = new List<GaleriDil>();
		}

		public int ID { get; set; }
        [Required(ErrorMessage = "Başlık alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
        [StringLength(255)]
		public string Title { get; set; }
		public string Url { get; set; }
		public string Code { get; set; }
		public bool Active { get; set; }
        public bool Deleted { get; set; }

        public string Mesaj { get; set; }

        public List<GaleriDil> GalleryTList { get; set; }
    }
}
