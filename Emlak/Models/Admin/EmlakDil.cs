using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace Models
{
    public class EmlakDil
    {
        public EmlakDil()
        {
            RealEstatesList = new List<SelectListItem>();
            TranslationList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "Bağlı Emlak alanı boş olamaz.")]
        public int RealEsID { get; set; }
        [Required(ErrorMessage = "Dil alanı boş olamaz.")]
        public int TransID { get; set; }
        [Required(ErrorMessage = "Başlık alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
        [StringLength(255)]
        public string Baslik { get; set; }
        public string Code { get; set; }
        [DataType(DataType.MultilineText)]
        [AllowHtml]
        public string Aciklama { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> RealEstatesList { get; set; }
        public List<SelectListItem> TranslationList { get; set; }
    }
}
