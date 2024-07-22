using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACarMVC.Data;
using Repository.CategoryTModel;
using TDLibrary;

namespace Repository.CategoryModel
{
    public class Category : ICategory
    {
        readonly RentACarEntities entity = new RentACarEntities();

        #region Model

        public Category()
        {
            CategoryTList = new List<CategoryT>();
            TypesList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "Ana Kategori alanı boş olamaz.")]
        public int ParentID { get; set; }
        [Required(ErrorMessage = "Başlık alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
        [StringLength(255)]
        public string Title { get; set; }
        public string Url { get; set; }
        public string Code { get; set; }
        public bool Active { get; set; }
        public bool Deleted { get; set; }

        public string Mesaj { get; set; }

        public List<CategoryT> CategoryTList { get; set; }
        public List<SelectListItem> ParentCategories { get; set; }
        public List<SelectListItem> TypesList { get; set; }

        #endregion

        #region Methods

        public List<Category> List()
        {
            return entity.usp_CategorySelect(null).ToList().ChangeModelList<Category, usp_CategorySelect_Result>();
        }

        public ICategory Select(int id)
        {
            usp_CategorySelectTop_Result table = entity.usp_CategorySelectTop(id, 1).FirstOrDefault();
            ICategory kategori = table.ChangeModel<Category>();

            return kategori;
        }

        public ICategory Insert(ICategory kategori = null, bool? none = null)
        {
            if (kategori == null)
                kategori = new Category();

            List<usp_CategoryParentSelect_Result> parentList = entity.usp_CategoryParentSelect(null).ToList();
            kategori.ParentCategories = parentList.ToSelectList<usp_CategoryParentSelect_Result, SelectListItem>("ID", "Title", null, true);

            return kategori;
        }

        public bool Insert(ICategory kategori)
        {
            kategori.Url = kategori.Title.ToUrl();

            var result = entity.usp_CategoryInsert(kategori.ParentID, kategori.Title, kategori.Url, kategori.Code, kategori.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public ICategory Update(int id, ICategory kategori = null)
        {
            if (kategori == null)
                kategori = Select(id);

            List<usp_CategoryTByLinkedIDSelect_Result> kategoriDilList = entity.usp_CategoryTByLinkedIDSelect(id).ToList();
            kategori.CategoryTList.AddRange(kategoriDilList.ChangeModelList<CategoryT, usp_CategoryTByLinkedIDSelect_Result>());

            List<usp_CategoryParentSelect_Result> parentList = entity.usp_CategoryParentSelect(null).ToList();
            kategori.ParentCategories = parentList.ToSelectList<usp_CategoryParentSelect_Result, SelectListItem>("ID", "Title", kategori.ParentID, true);

            return kategori;
        }

        public bool Update(ICategory kategori)
        {
            kategori.Url = kategori.Title.ToUrl();

            var result = entity.usp_CategoryUpdate(kategori.ID, kategori.ParentID, kategori.Title, kategori.Url, kategori.Code, kategori.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_CategoryCheckDelete(id);

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
                entity.usp_CategoryCheckSetDeleted(id);

                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool Copy(int id)
        {
            try
            {
                var result = entity.usp_CategoryCopy(id);

                return result == null ? false : true;
            }
            catch
            {
                return false;
            }
        }

        #endregion

        #region User Defined



        #endregion
    }
}
