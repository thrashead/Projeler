using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace Models
{
	public class KullaniciGrupHak
    {
        public KullaniciGrupHak()
        {
            UserGroupTablesList = new List<SelectListItem>();
            UserGroupProcessList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "Kullanıcı Grubu Tablosu alanı boş olamaz.")]
		public int UserGroupTableID { get; set; }
        [Required(ErrorMessage = "Kullanıcı Grubu İşlemi alanı boş olamaz.")]
		public int UserGroupProcessID { get; set; }
		public bool Allow { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> UserGroupTablesList { get; set; }
        public List<SelectListItem> UserGroupProcessList { get; set; }

        public string UserGroupTablesAdi { get; set; }
        public string UserGroupProcessAdi { get; set; }
    }
}
