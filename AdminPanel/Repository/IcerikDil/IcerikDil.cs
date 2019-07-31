using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using AdminPanel.Data;
using TDLibrary;

namespace Repository.IcerikDilModel
{
    public class IcerikDil : IIcerikDil
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public IcerikDil()
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


        public List<IcerikDil> List()
        {
            return entity.usp_ContentTLinkedSelect(null).ToList().ChangeModelList<IcerikDil, usp_ContentTLinkedSelect_Result>();
        }

        public IIcerikDil Select(int id)
        {
            usp_ContentTSelectTop_Result table = entity.usp_ContentTSelectTop(id, 1).FirstOrDefault();
            IcerikDil icerik = table.ChangeModel<IcerikDil>();

            return icerik;
        }

        public bool Insert(IIcerikDil icerik)
        {
            var result = entity.usp_ContentTCheckInsert(icerik.ContID, icerik.TransID, icerik.ContentName, icerik.ShortText1, icerik.ShortText2, icerik.Description);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Update(IIcerikDil icerik)
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
