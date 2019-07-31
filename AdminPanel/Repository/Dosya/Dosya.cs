using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using AdminPanel.Data;
using TDLibrary;

namespace Repository.DosyaModel
{
	public class Dosya : IDosya
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public Dosya()
		{
			TypesList = new List<SelectListItem>();
		}

		public int ID { get; set; }
        [Required(ErrorMessage = "Başlık alanı boş olamaz ve en fazla 50 karakter olmalıdır.")]
        [StringLength(50)]
		public string Title { get; set; }
		[DataType(DataType.MultilineText)]
        [AllowHtml]
        public string Description { get; set; }
		public string FileUrl { get; set; }
		public string Code { get; set; }
		public bool Active { get; set; }
        public bool Deleted { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> TypesList { get; set; }


        public List<Dosya> List()
        {
            return entity.usp_FileSelect(null).ToList().ChangeModelList<Dosya, usp_FileSelect_Result>();
        }

        public IDosya Select(int id)
        {
            usp_FileSelectTop_Result table = entity.usp_FileSelectTop(id, 1).FirstOrDefault();
            Dosya dosya = table.ChangeModel<Dosya>();

            return dosya;
        }

        public bool Insert(IDosya dosya)
        {
            var result = entity.usp_FileInsert(dosya.Title, dosya.Description, dosya.FileUrl, dosya.Code, dosya.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Update(IDosya dosya)
        {
            var result = entity.usp_FileUpdate(dosya.ID, dosya.Title, dosya.Description, dosya.FileUrl, dosya.Code, dosya.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_FileCheckDelete(id);

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
                entity.usp_FileCheckSetDeleted(id);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
