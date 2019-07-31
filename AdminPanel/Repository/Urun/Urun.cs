using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using AdminPanel.Data;
using Repository.UrunDilModel;
using TDLibrary;

namespace Repository.UrunModel
{
    public class Urun : IUrun
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public Urun()
        {
            ProductTList = new List<UrunDil>();
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

        public List<UrunDil> ProductTList { get; set; }
        public List<SelectListItem> TypesList { get; set; }


        public List<Urun> List()
        {
            return entity.usp_ProductSelect(null).ToList().ChangeModelList<Urun, usp_ProductSelect_Result>();
        }

        public IUrun Select(int id)
        {
            usp_ProductSelectTop_Result table = entity.usp_ProductSelectTop(id, 1).FirstOrDefault();
            Urun urun = table.ChangeModel<Urun>();

            return urun;
        }

        public bool Insert(IUrun urun)
        {
            var result = entity.usp_ProductInsert(urun.Title, urun.Url, urun.Code, urun.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Update(IUrun urun)
        {
            var result = entity.usp_ProductUpdate(urun.ID, urun.Title, urun.Url, urun.Code, urun.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_ProductCheckDelete(id);

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
                entity.usp_ProductCheckSetDeleted(id);

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
                var result = entity.usp_ProductCopy(id);

                return result == null ? false : true;
            }
            catch
            {
                return false;
            }
        }
    }
}
