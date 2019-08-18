using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using AdminPanelAngular.Data;
using TDLibrary;

namespace Repository.FilesModel
{
	public class Files : IFiles
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public Files()
		{
			TypesList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public string Title { get; set; }
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
            usp_FilesSelectTop_Result model = entity.usp_FilesSelectTop(id, 1).FirstOrDefault();
            IFiles table = model.ChangeModel<Files>();

            return table;
        }

        public bool Insert(IFiles table)
        {
            var result = entity.usp_FilesInsert(table.Title, table.Description, table.FileUrl, table.Code, table.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Update(IFiles table)
        {
            var result = entity.usp_FilesUpdate(table.ID, table.Title, table.Description, table.FileUrl, table.Code, table.Active);

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
