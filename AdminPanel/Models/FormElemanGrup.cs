using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models
{
	public class FormElemanGrup
	{
		public FormElemanGrup()
		{
            PropertyList = new List<FormEleman>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "Başlık alanı boş olamaz ve en fazla 50 karakter olmalıdır.")]
        [StringLength(50)]
        public string Title { get; set; }
		public string Description { get; set; }
		public string Code { get; set; }
		public bool Active { get; set; }

        public string Mesaj { get; set; }

        public List<FormEleman> PropertyList { get; set; }
    }
}
