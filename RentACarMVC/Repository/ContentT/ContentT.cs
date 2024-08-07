using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACarMVC.Data;
using TDLibrary;

namespace Repository.ContentTModel
{
    public class ContentT : IContentT
    {
        readonly RentACarEntities entity = new RentACarEntities();

        public ContentT()
        {
            ContentList = new List<SelectListItem>();
            TranslationList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "Bağlı İçerik alanı boş olamaz.")]
        public int ContID { get; set; }
        [Required(ErrorMessage = "Dil alanı boş olamaz.")]
        public int TransID { get; set; }
        [Required(ErrorMessage = "İçerik Adı alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
        [StringLength(255)]
        public string ContentName { get; set; }
        public string ShortText1 { get; set; }
        public string ShortText2 { get; set; }
        [DataType(DataType.MultilineText)]
        [AllowHtml]
        public string Description { get; set; }
        public bool Deleted { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> ContentList { get; set; }
        public List<SelectListItem> TranslationList { get; set; }
        public string ContentAdi { get; set; }
        public string TranslationAdi { get; set; }


        public List<ContentT> List()
        {
            return entity.usp_ContentTLinkedSelect(null).ToList().ChangeModelList<ContentT, usp_ContentTLinkedSelect_Result>();
        }

        public IContentT Select(int id)
        {
            usp_ContentTSelectTop_Result table = entity.usp_ContentTSelectTop(id, 1).FirstOrDefault();
            IContentT icerik = table.ChangeModel<ContentT>();

            return icerik;
        }

        public IContentT Insert(int? contID = null, int? transID = null, IContentT icerik = null)
        {
            if (icerik == null)
                icerik = new ContentT();

            List<usp_ContentSelect_Result> tableIcerik = entity.usp_ContentSelect(null).ToList();
            icerik.ContentList = tableIcerik.ToSelectList<usp_ContentSelect_Result, SelectListItem>("ID", "Title", contID);

            List<usp_TranslationSelect_Result> tableDil = entity.usp_TranslationSelect(null).ToList();
            icerik.TranslationList = tableDil.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", transID);

            return icerik;
        }

        public bool Insert(IContentT icerik)
        {
            var result = entity.usp_ContentTCheckInsert(icerik.ContID, icerik.TransID, icerik.ContentName, icerik.ShortText1, icerik.ShortText2, icerik.Description);

            if (result != null)
                return true;
            else
                return false;
        }

        public IContentT Update(int id, IContentT icerik = null)
        {
            if (icerik == null)
                icerik = Select(id);

            List<usp_ContentSelect_Result> tableIcerik = entity.usp_ContentSelect(null).ToList();
            icerik.ContentList = tableIcerik.ToSelectList<usp_ContentSelect_Result, SelectListItem>("ID", "Title", icerik.ContID);

            List<usp_TranslationSelect_Result> tableDil = entity.usp_TranslationSelect(null).ToList();
            icerik.TranslationList = tableDil.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", icerik.TransID);

            return icerik;
        }

        public bool Update(IContentT icerik)
        {
            var result = entity.usp_ContentTCheckUpdate(icerik.ID, icerik.ContID, icerik.TransID, icerik.ContentName, icerik.ShortText1, icerik.ShortText2, icerik.Description);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_ContentTDelete(id);

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
                entity.usp_ContentTSetDeleted(id);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
