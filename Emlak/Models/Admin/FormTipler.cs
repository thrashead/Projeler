using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class FormTipler
    {
        public int ID { get; set; }
        [Required(ErrorMessage = "İsim alanı boş olamaz ve en fazla 50 karakter olmalıdır.")]
        [StringLength(50)]
        public string Name { get; set; }
        [Required(ErrorMessage = "Tip alanı boş olamaz ve en fazla 50 karakter olmalıdır.")]
        [StringLength(50)]
        public string Type { get; set; }
        [Required(ErrorMessage = "Kısa İsim alanı boş olamaz ve en fazla 25 karakter olmalıdır.")]
        [StringLength(25)]
        public string ShortName { get; set; }
        public bool HasValue { get; set; }

        public string Mesaj { get; set; }
    }
}
