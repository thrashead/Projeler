using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RealEstate.Data;
using TDLibrary;

namespace Repository.FilesModel
{
	public class Files : IFiles
    {
        readonly RealEstateEntities entity = new RealEstateEntities();

        public Files()
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
        public bool? HasFile { get; set; }
        public string OldFileUrl { get; set; }

        public List<Files> List()
        {
            return entity.usp_FilesSelect(null).ToList().ChangeModelList<Files, usp_FilesSelect_Result>();
        }

        public IFiles Select(int id)
        {
            usp_FilesSelectTop_Result table = entity.usp_FilesSelectTop(id, 1).FirstOrDefault();
            IFiles dosya = table.ChangeModel<Files>();

            return dosya;
        }

        public bool Insert(IFiles dosya)
        {
            var result = entity.usp_FilesInsert(dosya.Title, dosya.Description, dosya.FileUrl, dosya.Code, dosya.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Update(IFiles dosya)
        {
            var result = entity.usp_FilesUpdate(dosya.ID, dosya.Title, dosya.Description, dosya.FileUrl, dosya.Code, dosya.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_FilesCheckDelete(id);

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
                entity.usp_FilesCheckSetDeleted(id);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
