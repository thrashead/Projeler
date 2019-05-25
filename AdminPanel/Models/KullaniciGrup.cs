using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Models
{
	public class KullaniciGrup
    {
        public KullaniciGrup()
        {
            UserGroupTablesList = new List<KullaniciGrupTablo>();
            UserGroupRightsList = new List<KullaniciGrupHak>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "İsim alanı boş olamaz ve en fazla 25 karakter olmalıdır.")]
        [StringLength(25)]
        public string Name { get; set; }
        [Required(ErrorMessage = "Kısa İsim alanı boş olamaz ve en fazla 5 karakter olmalıdır.")]
        [StringLength(5)]
        public string ShortName { get; set; }
        public string Description { get; set; }

        public string Mesaj { get; set; }

        public List<KullaniciGrupTablo> UserGroupTablesList { get; set; }
        public List<KullaniciGrupHak> UserGroupRightsList { get; set; }
    }
}
