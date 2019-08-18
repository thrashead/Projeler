
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using AdminPanelAngular.Data;
using Repository.GalleryTModel;
using TDLibrary;

namespace Repository.GalleryModel
{
    public class Gallery : IGallery
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public Gallery()
        {
            GalleryTList = new List<GalleryT>();
            TypesList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public string Code { get; set; }
        public bool Active { get; set; }
        public bool Deleted { get; set; }

        public string Mesaj { get; set; }

        public List<GalleryT> GalleryTList { get; set; }
        public List<SelectListItem> TypesList { get; set; }


        public List<Gallery> List()
        {
            return entity.usp_GallerySelect(null).ToList().ChangeModelList<Gallery, usp_GallerySelect_Result>();
        }

        public IGallery Select(int id)
        {
            usp_GallerySelectTop_Result model = entity.usp_GallerySelectTop(id, 1).FirstOrDefault();
            IGallery table = model.ChangeModel<Gallery>();

            return table;
        }

        public bool Insert(IGallery table)
        {
            table.Url = table.Title.ToUrl();

            var result = entity.usp_GalleryInsert(table.Title, table.Url, table.Code, table.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public IGallery Update(int id, IGallery table = null)
        {
            if (table == null)
                table = Select(id);

            List<usp_GalleryTByLinkedIDSelect_Result> tableGalleryT = entity.usp_GalleryTByLinkedIDSelect(id).ToList();
            table.GalleryTList.AddRange(tableGalleryT.ChangeModelList<GalleryT, usp_GalleryTByLinkedIDSelect_Result>());

            return table;
        }

        public bool Update(IGallery table)
        {
            table.Url = table.Title.ToUrl();

            var result = entity.usp_GalleryUpdate(table.ID, table.Title, table.Url, table.Code, table.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_GalleryCheckDelete(id);

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
                entity.usp_GalleryCheckSetDeleted(id);

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
                var result = entity.usp_GalleryCopy(id);

                return result == null ? false : true;
            }
            catch
            {
                return false;
            }
        }
    }
}
