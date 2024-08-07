using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACarMVC.Data;
using Repository.ContentTModel;
using TDLibrary;

namespace Repository.ContentModel
{
    public class Content : IContent
    {
        readonly RentACarEntities entity = new RentACarEntities();

        #region Model

        public Content()
        {
            ContentTList = new List<ContentT>();
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

        public List<ContentT> ContentTList { get; set; }
        public List<SelectListItem> TypesList { get; set; }

        #endregion

        #region Methods

        public List<Content> List()
        {
            return entity.usp_ContentSelect(null).ToList().ChangeModelList<Content, usp_ContentSelect_Result>();
        }

        public IContent Select(int id)
        {
            usp_ContentSelectTop_Result table = entity.usp_ContentSelectTop(id, 1).FirstOrDefault();
            IContent icerik = table.ChangeModel<Content>();

            return icerik;
        }

        public bool Insert(IContent icerik)
        {
            icerik.Url = icerik.Title.ToUrl();
            
            var result = entity.usp_ContentInsert(icerik.Title, icerik.Url, icerik.Code, icerik.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public IContent Update(int id, IContent icerik = null)
        {
            if (icerik == null)
                icerik = Select(id);

            List<usp_ContentTByLinkedIDSelect_Result> icerikDilList = entity.usp_ContentTByLinkedIDSelect(id).ToList();
            icerik.ContentTList.AddRange(icerikDilList.ChangeModelList<ContentT, usp_ContentTByLinkedIDSelect_Result>());

            return icerik;
        }

        public bool Update(IContent icerik)
        {
            icerik.Url = icerik.Title.ToUrl();

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

        #endregion

        #region User Defined

        public List<sp_ContentDetailSelectByCode_Result> DetailSelectByCode(string code, int transID, int? top = null)
        {
            List<sp_ContentDetailSelectByCode_Result> table = entity.sp_ContentDetailSelectByCode(code, transID, top).ToList();

            return table;
        }

        #endregion
    }
}
