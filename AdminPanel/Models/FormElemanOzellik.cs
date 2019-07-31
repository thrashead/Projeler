using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace Models
{
	public class FormElemanOzellik
    {
        public FormElemanOzellik()
        {
            PropertyList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "Bağlı Özellik alanı boş olamaz.")]
		public int PropID { get; set; }
        [Required(ErrorMessage = "İsim alanı boş olamaz ve en fazla 50 karakter olmalıdır.")]
        [StringLength(50)]
        public string Name { get; set; }
        [Required(ErrorMessage = "Değer alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
        [StringLength(255)]
        public string Value { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> PropertyList { get; set; }
    }
}
