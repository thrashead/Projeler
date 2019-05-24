using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace Models
{
    public class FormEleman
    {
        public FormEleman()
        {
            PropertyTypesList = new List<SelectListItem>();
            PropertyGroupList = new List<SelectListItem>();

            PropertyAttributesList = new List<FormElemanOzellik>();
            PropertyValuesList = new List<FormElemanDeger>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "Özellik Tipi alanı boş olamaz.")]
        public int PropTypeID { get; set; }
        public int? GroupID { get; set; }
        [Required(ErrorMessage = "Başlık alanı boş olamaz ve en fazla 50 karakter olmalıdır.")]
        [StringLength(50)]
        public string Title { get; set; }
        public string Description { get; set; }
        public string ErrorMessage { get; set; }
        public string Code { get; set; }
        public int? OrderNumber { get; set; }

        public string Mesaj { get; set; }

        public bool? HasValue { get; set; }

        public List<SelectListItem> PropertyTypesList;
        public List<SelectListItem> PropertyGroupList;

        public List<FormElemanOzellik> PropertyAttributesList;
        public List<FormElemanDeger> PropertyValuesList;
    }
}
