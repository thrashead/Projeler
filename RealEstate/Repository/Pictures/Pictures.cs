using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RealEstate.Data;
using TDLibrary;

namespace Repository.PicturesModel
{
	public class Pictures : IPictures
    {
        readonly RealEstateEntities entity = new RealEstateEntities();

        #region Model

        public Pictures()
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
        public bool? HasFile { get; set; }
        public string OldPictureUrl { get; set; }
        public string OldThumbUrl { get; set; }

        #endregion

        #region Methods

        public List<Pictures> List()
        {
            return entity.usp_PicturesSelect(null).ToList().ChangeModelList<Pictures, usp_PicturesSelect_Result>();
        }

        public IPictures Select(int id)
        {
            usp_PicturesSelectTop_Result table = entity.usp_PicturesSelectTop(id, 1).FirstOrDefault();
            IPictures resim = table.ChangeModel<Pictures>();

            return resim;
        }

        public bool Insert(IPictures resim)
        {
            var result = entity.usp_PicturesInsert(resim.Title, resim.Description, resim.PictureUrl, resim.ThumbUrl, resim.Code, resim.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Update(IPictures resim)
        {
            var result = entity.usp_PicturesUpdate(resim.ID, resim.Title, resim.Description, resim.PictureUrl, resim.ThumbUrl, resim.Code, resim.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_PicturesCheckDelete(id);

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
                entity.usp_PicturesCheckSetDeleted(id);

                return true;
            }
            catch
            {
                return false;
            }
        }

        #endregion

        #region User Defined

        public List<sp_SliderContentSelectByCode_Result> MainSliderByCode(string code, int transID)
        {
            List<sp_SliderContentSelectByCode_Result> table = entity.sp_SliderContentSelectByCode(code, transID).ToList();

            return table;
        }

        public List<string> PicturesByCode(string code, int top)
        {
            List<string> table = entity.sp_PicturesSelectByCode(code, top).ToList();

            return table;
        }

        #endregion
    }
}
