using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using AdminPanelAngular.Data;
using TDLibrary;

namespace Repository.PicturesModel
{
	public class Pictures : IPictures
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public Pictures()
		{
			TypesList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public string Title { get; set; }
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

        public List<Pictures> List()
        {
            return entity.usp_PicturesSelect(null).ToList().ChangeModelList<Pictures, usp_PicturesSelect_Result>();
        }

        public IPictures Select(int id)
        {
            usp_PicturesSelectTop_Result model = entity.usp_PicturesSelectTop(id, 1).FirstOrDefault();
            IPictures table = model.ChangeModel<Pictures>();

            return table;
        }

        public bool Insert(IPictures table)
        {
            var result = entity.usp_PicturesInsert(table.Title, table.Description, table.PictureUrl, table.ThumbUrl, table.Code, table.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Update(IPictures table)
        {
            var result = entity.usp_PicturesUpdate(table.ID, table.Title, table.Description, table.PictureUrl, table.ThumbUrl, table.Code, table.Active);

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
    }
}
