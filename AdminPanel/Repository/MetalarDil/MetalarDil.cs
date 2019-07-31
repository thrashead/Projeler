using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using AdminPanel.Data;
using TDLibrary;

namespace Repository.MetalarDilModel
{
    public class MetalarDil : IMetalarDil
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public MetalarDil()
        {
            MetaList = new List<SelectListItem>();
            TranslationList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "Bağlı Meta alanı boş olamaz.")]
        public int MetaID { get; set; }
        [Required(ErrorMessage = "Dil alanı boş olamaz.")]
        public int TransID { get; set; }
        [Required(ErrorMessage = "Meta Adı alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
        [StringLength(255)]
        public string Name { get; set; }
        public string Content { get; set; }
        public bool Deleted { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> MetaList { get; set; }
        public List<SelectListItem> TranslationList { get; set; }
        public string MetaAdi { get; set; }
        public string TranslationAdi { get; set; }


        public List<MetalarDil> List()
        {
            return entity.usp_MetaTLinkedSelect(null).ToList().ChangeModelList<MetalarDil, usp_MetaTLinkedSelect_Result>();
        }

        public IMetalarDil Select(int id)
        {
            usp_MetaTSelectTop_Result table = entity.usp_MetaTSelectTop(id, 1).FirstOrDefault();
            MetalarDil meta = table.ChangeModel<MetalarDil>();

            return meta;
        }

        public bool Insert(IMetalarDil meta)
        {
            var result = entity.usp_MetaTCheckInsert(meta.MetaID, meta.TransID, meta.Name, meta.Content);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Update(IMetalarDil meta)
        {
            var result = entity.usp_MetaTCheckUpdate(meta.ID, meta.MetaID, meta.TransID, meta.Name, meta.Content);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_MetaTDelete(id);

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
                entity.usp_MetaTSetDeleted(id);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
