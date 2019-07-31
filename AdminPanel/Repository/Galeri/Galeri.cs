using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using AdminPanel.Data;
using Repository.GaleriDilModel;
using TDLibrary;

namespace Repository.GaleriModel
{
    public class Galeri : IGaleri
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public Galeri()
        {
            GalleryTList = new List<GaleriDil>();
            TypesList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "Başlık alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
        [StringLength(255)]
        public string Title { get; set; }
        public string Url { get; set; }
        public string Code { get; set; }
        public bool Active { get; set; }
        public bool Deleted { get; set; }

        public string Mesaj { get; set; }

        public List<GaleriDil> GalleryTList { get; set; }
        public List<SelectListItem> TypesList { get; set; }


        public List<Galeri> List()
        {
            return entity.usp_GallerySelect(null).ToList().ChangeModelList<Galeri, usp_GallerySelect_Result>();
        }

        public IGaleri Select(int id)
        {
            usp_GallerySelectTop_Result table = entity.usp_GallerySelectTop(id, 1).FirstOrDefault();
            Galeri galeri = table.ChangeModel<Galeri>();

            return galeri;
        }

        public bool Insert(IGaleri galeri)
        {
            var result = entity.usp_GalleryInsert(galeri.Title, galeri.Url, galeri.Code, galeri.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Update(IGaleri galeri)
        {
            var result = entity.usp_GalleryUpdate(galeri.ID, galeri.Title, galeri.Url, galeri.Code, galeri.Active);

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
