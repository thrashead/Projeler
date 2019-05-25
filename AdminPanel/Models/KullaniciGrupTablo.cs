using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace Models
{
	public class KullaniciGrupTablo
    {
        public KullaniciGrupTablo()
        {
            TypesList = new List<SelectListItem>();
            UserGroupsList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "Tablo alanı boş olamaz.")]
		public int TypeID { get; set; }
        [Required(ErrorMessage = "Kullanıcı Grubu alanı boş olamaz.")]
        public int UserGroupID { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> TypesList { get; set; }
        public List<SelectListItem> UserGroupsList { get; set; }

        public string TypeAdi { get; set; }
        public string UserGroupAdi { get; set; }
    }
}
