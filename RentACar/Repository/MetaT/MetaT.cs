using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACar.Data;
using TDLibrary;

namespace Repository.MetaTModel
{
    public class MetaT : IMetaT
    {
        readonly RentACarEntities entity = new RentACarEntities();

        public MetaT()
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


        public List<MetaT> List()
        {
            return entity.usp_MetaTLinkedSelect(null).ToList().ChangeModelList<MetaT, usp_MetaTLinkedSelect_Result>();
        }

        public IMetaT Select(int id)
        {
            usp_MetaTSelectTop_Result table = entity.usp_MetaTSelectTop(id, 1).FirstOrDefault();
            IMetaT meta = table.ChangeModel<MetaT>();

            return meta;
        }

        public IMetaT Insert(int? metaID = null, int? transID = null, IMetaT meta = null)
        {
            if (meta == null)
                meta = new MetaT();

            List<usp_MetaSelect_Result> tableMetalar = entity.usp_MetaSelect(null).ToList();
            meta.MetaList = tableMetalar.ToSelectList<usp_MetaSelect_Result, SelectListItem>("ID", "Title", metaID);

            List<usp_TranslationSelect_Result> tableDil = entity.usp_TranslationSelect(null).ToList();
            meta.TranslationList = tableDil.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", transID);

            return meta;
        }

        public bool Insert(IMetaT meta)
        {
            var result = entity.usp_MetaTCheckInsert(meta.MetaID, meta.TransID, meta.Name, meta.Content);

            if (result != null)
                return true;
            else
                return false;
        }

        public IMetaT Update(int id, IMetaT meta = null)
        {
            if (meta == null)
                meta = Select(id);

            List<usp_MetaSelect_Result> tableMetalar = entity.usp_MetaSelect(null).ToList();
            meta.MetaList = tableMetalar.ToSelectList<usp_MetaSelect_Result, SelectListItem>("ID", "Title", meta.MetaID);

            List<usp_TranslationSelect_Result> tableDil = entity.usp_TranslationSelect(null).ToList();
            meta.TranslationList = tableDil.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", meta.TransID);

            return meta;
        }

        public bool Update(IMetaT meta)
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
