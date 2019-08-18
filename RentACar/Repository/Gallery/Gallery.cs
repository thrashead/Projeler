using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACar.Data;
using Repository.GalleryTModel;
using TDLibrary;

namespace Repository.GalleryModel
{
    public class Gallery : IGallery
    {
        readonly RentACarEntities entity = new RentACarEntities();

        public Gallery()
        {
            GalleryTList = new List<GalleryT>();
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

        public List<GalleryT> GalleryTList { get; set; }
        public List<SelectListItem> TypesList { get; set; }


        public List<Gallery> List()
        {
            return entity.usp_GallerySelect(null).ToList().ChangeModelList<Gallery, usp_GallerySelect_Result>();
        }

        public IGallery Select(int id)
        {
            usp_GallerySelectTop_Result table = entity.usp_GallerySelectTop(id, 1).FirstOrDefault();
            IGallery galeri = table.ChangeModel<Gallery>();

            return galeri;
        }

        public bool Insert(IGallery galeri)
        {
            var result = entity.usp_GalleryInsert(galeri.Title, galeri.Url, galeri.Code, galeri.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public IGallery Update(int id, IGallery galeri = null)
        {
            if (galeri == null)
                galeri = Select(id);

            List<usp_GalleryTByLinkedIDSelect_Result> galeriDilList = entity.usp_GalleryTByLinkedIDSelect(id).ToList();
            galeri.GalleryTList.AddRange(galeriDilList.ChangeModelList<GalleryT, usp_GalleryTByLinkedIDSelect_Result>());

            return galeri;
        }

        public bool Update(IGallery galeri)
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
