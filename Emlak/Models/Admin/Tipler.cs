using System.ComponentModel.DataAnnotations;

namespace Models
{
	public class Tipler
    {
        public int ID { get; set; }
        [Required(ErrorMessage = "Tip İsmi alanı boş olamaz ve en fazla 50 karakter olmalıdır.")]
        [StringLength(50)]
        public string TypeName { get; set; }
        [Required(ErrorMessage = "Url alanı boş olamaz ve en fazla 100 karakter olmalıdır.")]
        [StringLength(100)]
        public string Url { get; set; }
        [Required(ErrorMessage = "Tablo İsmi alanı boş olamaz ve en fazla 50 karakter olmalıdır.")]
        [StringLength(50)]
        public string TableName { get; set; }
		public bool Linkable { get; set; }
		public bool Show { get; set; }

        public string Mesaj { get; set; }
    }
}
