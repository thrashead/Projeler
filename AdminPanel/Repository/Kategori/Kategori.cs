using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using AdminPanel.Data;
using Repository.KategoriDilModel;
using TDLibrary;

namespace Repository.KategoriModel
{
    public class Kategori : IKategori
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public Kategori()
        {
            CategoryTList = new List<KategoriDil>();
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

        public List<KategoriDil> CategoryTList { get; set; }
        public List<SelectListItem> ParentCategories { get; set; }
        public List<SelectListItem> TypesList { get; set; }


        public List<Kategori> List()
        {
            return entity.usp_CategorySelect(null).ToList().ChangeModelList<Kategori, usp_CategorySelect_Result>();
        }

        public IKategori Select(int id)
        {
            usp_CategorySelectTop_Result table = entity.usp_CategorySelectTop(id, 1).FirstOrDefault();
            Kategori kategori = table.ChangeModel<Kategori>();

            return kategori;
        }

        public bool Insert(IKategori kategori)
        {
            var result = entity.usp_CategoryInsert(kategori.ParentID, kategori.Title, kategori.Url, kategori.Code, kategori.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Update(IKategori kategori)
        {
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
    }
}
