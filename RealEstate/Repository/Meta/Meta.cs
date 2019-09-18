using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RealEstate.Data;
using Repository.MetaTModel;
using TDLibrary;

namespace Repository.MetaModel
{
    public class Meta : IMeta
    {
        readonly RealEstateEntities entity = new RealEstateEntities();

        public Meta()
        {
            MetaTList = new List<MetaT>();
            TypesList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "Başlık alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
        [StringLength(255)]
        public string Title { get; set; }
        public string Code { get; set; }
        public bool Active { get; set; }
        public bool Deleted { get; set; }

        public string Mesaj { get; set; }

        public List<MetaT> MetaTList { get; set; }
        public List<SelectListItem> TypesList { get; set; }


        public List<Meta> List()
        {
            return entity.usp_MetaSelect(null).ToList().ChangeModelList<Meta, usp_MetaSelect_Result>();
        }

        public IMeta Select(int id)
        {
            usp_MetaSelectTop_Result table = entity.usp_MetaSelectTop(id, 1).FirstOrDefault();
            IMeta meta = table.ChangeModel<Meta>();

            return meta;
        }

        public bool Insert(IMeta meta)
        {
            var result = entity.usp_MetaInsert(meta.Title, meta.Code, meta.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public IMeta Update(int id, IMeta meta = null)
        {
            if (meta == null)
                meta = Select(id);

            List<usp_MetaTByLinkedIDSelect_Result> metaDilList = entity.usp_MetaTByLinkedIDSelect(id).ToList();
            meta.MetaTList.AddRange(metaDilList.ChangeModelList<MetaT, usp_MetaTByLinkedIDSelect_Result>());

            return meta;
        }

        public bool Update(IMeta meta)
        {
            var result = entity.usp_MetaUpdate(meta.ID, meta.Title, meta.Code, meta.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_MetaCheckDelete(id);

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
                entity.usp_MetaCheckSetDeleted(id);

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
                var result = entity.usp_MetaCopy(id);

                return result == null ? false : true;
            }
            catch
            {
                return false;
            }
        }
    }
}
