using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models
{
	public class LogTipler
    {
        public LogTipler()
        {
            LogProcessList = new List<LogIslem>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "İsim alanı boş olamaz ve en fazla 50 karakter olmalıdır.")]
        [StringLength(50)]
        public string Name { get; set; }
        [Required(ErrorMessage = "Kısa İsim alanı boş olamaz ve en fazla 5 karakter olmalıdır.")]
        [StringLength(5)]
        public string ShortName { get; set; }
		public string Description { get; set; }

        public string Mesaj { get; set; }

        public List<LogIslem> LogProcessList { get; set; }
    }
}
