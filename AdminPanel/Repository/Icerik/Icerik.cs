using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using AdminPanel.Data;
using Repository.IcerikDilModel;
using TDLibrary;

namespace Repository.IcerikModel
{
    public class Icerik : IIcerik
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public Icerik()
        {
            ContentTList = new List<IcerikDil>();
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

        public List<IcerikDil> ContentTList { get; set; }
        public List<SelectListItem> TypesList { get; set; }


        public List<Icerik> List()
        {
            return entity.usp_ContentSelect(null).ToList().ChangeModelList<Icerik, usp_ContentSelect_Result>();
        }

        public IIcerik Select(int id)
        {
            usp_ContentSelectTop_Result table = entity.usp_ContentSelectTop(id, 1).FirstOrDefault();
            Icerik icerik = table.ChangeModel<Icerik>();

            return icerik;
        }

        public bool Insert(IIcerik icerik)
        {
            var result = entity.usp_ContentInsert(icerik.Title, icerik.Url, icerik.Code, icerik.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Update(IIcerik icerik)
        {
            var result = entity.usp_ContentUpdate(icerik.ID, icerik.Title, icerik.Url, icerik.Code, icerik.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_ContentCheckDelete(id);

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
                entity.usp_ContentCheckSetDeleted(id);

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
                var result = entity.usp_ContentCopy(id);

                return result == null ? false : true;
            }
            catch
            {
                return false;
            }
        }
    }
}
