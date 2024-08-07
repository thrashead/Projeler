using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace Models
{
    public class Kullanicilar
    {
        public Kullanicilar()
        {
            UserGroupsList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "Kullanıcı Adı boş olamaz ve en fazla 25 karakter olmalıdır.")]
        [StringLength(25)]
        public string Username { get; set; }
        [Required(ErrorMessage = "Bağlı Grup alanı boş olamaz.")]
        public int GroupID { get; set; }
        public string Password { get; set; }
        public bool Active { get; set; }
        public string LoginTime { get; set; }
        public bool Deleted { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> UserGroupsList { get; set; }
    }
}
