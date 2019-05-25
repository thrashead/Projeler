using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace Models
{
    public class BagliTipler
    {
        public BagliTipler()
        {
            MainTypeList = new List<SelectListItem>();
            LinkedTypeList = new List<SelectListItem>();
            MainList = new List<SelectListItem>();
            LinkList = new List<Baglantilar>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "Başlık alanı boş olamaz ve en fazla 50 karakter olmalıdır.")]
        [StringLength(50)]
        public string Title { get; set; }
        [Required(ErrorMessage = "Ana Tip alanı boş olamaz.")]
        public int MainTypeID { get; set; }
        [Required(ErrorMessage = "Ana Nesne alanı boş olamaz.")]
        public int MainID { get; set; }
        [Required(ErrorMessage = "Bağlanacak Tip alanı boş olamaz.")]
        public int LinkedTypeID { get; set; }
        public string Url { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> MainTypeList { get; set; }
        public List<SelectListItem> LinkedTypeList { get; set; }
        public List<SelectListItem> MainList { get; set; }
        public List<Baglantilar> LinkList { get; set; }

        public static List<SelectListItem> ListeDoldur(dynamic list, BaglantiTipi baglantiTipi = BaglantiTipi.Tablo, int selectedID = 0)
        {
            List<SelectListItem> returnList = new List<SelectListItem>();

            foreach (dynamic item in list)
            {
                switch (baglantiTipi)
                {
                    case BaglantiTipi.Tip:
                        returnList.Add(new SelectListItem()
                        {
                            Text = item.TypeName,
                            Value = item.ID.ToString(),
                            Selected = item.ID == selectedID ? true : false
                        });
                        break;
                    case BaglantiTipi.Tablo:
                        returnList.Add(new SelectListItem()
                        {
                            Text = item.Title,
                            Value = item.ID.ToString(),
                            Selected = item.ID == selectedID ? true : false
                        });
                        break;
                    default:
                        returnList.Add(new SelectListItem()
                        {
                            Text = item.Title,
                            Value = item.ID.ToString(),
                            Selected = item.ID == selectedID ? true : false
                        });
                        break;
                }
            }

            return returnList;
        }

        public enum BaglantiTipi
        {
            Tip,
            Tablo
        }
    }
}
