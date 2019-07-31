using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using AdminPanel.Data;
using TDLibrary;

namespace Repository.KategoriDilModel
{
    public class KategoriDil : IKategoriDil
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public KategoriDil()
        {
            CategoryList = new List<SelectListItem>();
            TranslationList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "Bağlı İçerik alanı boş olamaz.")]
        public int CatID { get; set; }
        [Required(ErrorMessage = "Dil alanı boş olamaz.")]
        public int TransID { get; set; }
        [Required(ErrorMessage = "İçerik Adı alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
        [StringLength(255)]
        public string CategoryName { get; set; }
        public string ShortText1 { get; set; }
        public string ShortText2 { get; set; }
        [DataType(DataType.MultilineText)]
        [AllowHtml]
        public string Description { get; set; }
        public bool Deleted { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> CategoryList { get; set; }
        public List<SelectListItem> TranslationList { get; set; }
        public string CategoryAdi { get; set; }
        public string TranslationAdi { get; set; }


        public List<KategoriDil> List()
        {
            return entity.usp_CategoryTLinkedSelect(null).ToList().ChangeModelList<KategoriDil, usp_CategoryTLinkedSelect_Result>();
        }

        public IKategoriDil Select(int id)
        {
            usp_CategoryTSelectTop_Result table = entity.usp_CategoryTSelectTop(id, 1).FirstOrDefault();
            KategoriDil kategori = table.ChangeModel<KategoriDil>();

            return kategori;
        }

        public bool Insert(IKategoriDil kategori)
        {
            var result = entity.usp_CategoryTCheckInsert(kategori.CatID, kategori.TransID, kategori.CategoryName, kategori.ShortText1, kategori.ShortText2, kategori.Description);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Update(IKategoriDil kategori)
        {
            var result = entity.usp_CategoryTCheckUpdate(kategori.ID, kategori.CatID, kategori.TransID, kategori.CategoryName, kategori.ShortText1, kategori.ShortText2, kategori.Description);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_CategoryTDelete(id);

                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool Remove(int id)
        {
            try
            {
                entity.usp_CategoryTSetDeleted(id);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
