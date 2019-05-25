using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models
{
	public class Dil
	{
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
    }
}
