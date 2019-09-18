using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RealEstate.Data;
using TDLibrary;

namespace Repository.CategoryTModel
{
    public class CategoryT : ICategoryT
    {
        readonly RealEstateEntities entity = new RealEstateEntities();

        public CategoryT()
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


        public List<CategoryT> List()
        {
            return entity.usp_CategoryTLinkedSelect(null).ToList().ChangeModelList<CategoryT, usp_CategoryTLinkedSelect_Result>();
        }

        public ICategoryT Select(int id)
        {
            usp_CategoryTSelectTop_Result table = entity.usp_CategoryTSelectTop(id, 1).FirstOrDefault();
            ICategoryT kategori = table.ChangeModel<CategoryT>();

            return kategori;
        }

        public ICategoryT Insert(int? catID = null, int? transID = null, ICategoryT kategori = null)
        {
            if (kategori == null)
                kategori = new CategoryT();

            List<usp_CategorySelect_Result> tableKategori = entity.usp_CategorySelect(null).ToList();
            kategori.CategoryList = tableKategori.ToSelectList<usp_CategorySelect_Result, SelectListItem>("ID", "Title", catID);

            List<usp_TranslationSelect_Result> tableDil = entity.usp_TranslationSelect(null).ToList();
            kategori.TranslationList = tableDil.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", transID);

            return kategori;
        }

        public bool Insert(ICategoryT kategori)
        {
            var result = entity.usp_CategoryTCheckInsert(kategori.CatID, kategori.TransID, kategori.CategoryName, kategori.ShortText1, kategori.ShortText2, kategori.Description);

            if (result != null)
                return true;
            else
                return false;
        }

        public ICategoryT Update(int id, ICategoryT kategori = null)
        {
            if (kategori == null)
                kategori = Select(id);

            List<usp_CategorySelect_Result> tableKategori = entity.usp_CategorySelect(null).ToList();
            kategori.CategoryList = tableKategori.ToSelectList<usp_CategorySelect_Result, SelectListItem>("ID", "Title", kategori.CatID);

            List<usp_TranslationSelect_Result> tableDil = entity.usp_TranslationSelect(null).ToList();
            kategori.TranslationList = tableDil.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", kategori.TransID);

            return kategori;
        }

        public bool Update(ICategoryT kategori)
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
