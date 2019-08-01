using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using AdminPanel.Data;
using TDLibrary;

namespace Repository.ResimModel
{
	public class Resim : IResim
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public Resim()
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
		public string PictureUrl { get; set; }
		public string ThumbUrl { get; set; }
		public string Code { get; set; }
		public bool Active { get; set; }
        public bool Deleted { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> TypesList { get; set; }


        public List<Resim> List()
        {
            return entity.usp_PictureSelect(null).ToList().ChangeModelList<Resim, usp_PictureSelect_Result>();
        }

        public IResim Select(int id)
        {
            usp_PictureSelectTop_Result table = entity.usp_PictureSelectTop(id, 1).FirstOrDefault();
            IResim resim = table.ChangeModel<Resim>();

            return resim;
        }

        public bool Insert(IResim resim)
        {
            var result = entity.usp_PictureInsert(resim.Title, resim.Description, resim.PictureUrl, resim.ThumbUrl, resim.Code, resim.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Update(IResim resim)
        {
            var result = entity.usp_PictureUpdate(resim.ID, resim.Title, resim.Description, resim.PictureUrl, resim.ThumbUrl, resim.Code, resim.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_PictureCheckDelete(id);

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
                entity.usp_PictureCheckSetDeleted(id);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
