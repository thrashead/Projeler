using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using Repository.FormElemanModel;
using AdminPanel.Data;
using TDLibrary;

namespace Repository.FormElemanGrupModel
{
    public class FormElemanGrup : IFormElemanGrup
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public FormElemanGrup()
        {
            PropertyList = new List<FormEleman>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "Başlık alanı boş olamaz ve en fazla 50 karakter olmalıdır.")]
        [StringLength(50)]
        public string Title { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public bool Active { get; set; }

        public string Mesaj { get; set; }

        public List<FormEleman> PropertyList { get; set; }


        public List<FormElemanGrup> List()
        {
            return entity.usp_PropertyGroupSelect(null).ToList().ChangeModelList<FormElemanGrup, usp_PropertyGroupSelect_Result>();
        }

        public IFormElemanGrup Select(int id)
        {
            usp_PropertyGroupSelectTop_Result table = entity.usp_PropertyGroupSelectTop(id, 1).FirstOrDefault();
            IFormElemanGrup formeleman = table.ChangeModel<FormElemanGrup>();

            return formeleman;
        }

        public bool Insert(IFormElemanGrup formeleman)
        {
            var result = entity.usp_PropertyGroupInsert(formeleman.Title, formeleman.Description, formeleman.Code, formeleman.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public IFormElemanGrup Update(int id, IFormElemanGrup formeleman = null)
        {
            if (formeleman == null)
                formeleman = Select(id);

            List<usp_PropertyByGroupIDSelect_Result> formelemanGrupList = entity.usp_PropertyByGroupIDSelect(id).ToList();
            formeleman.PropertyList.AddRange(formelemanGrupList.ChangeModelList<FormEleman, usp_PropertyByGroupIDSelect_Result>());

            return formeleman;
        }

        public bool Update(IFormElemanGrup formeleman)
        {
            var result = entity.usp_PropertyGroupUpdate(formeleman.ID, formeleman.Title, formeleman.Description, formeleman.Code, formeleman.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_PropertyGroupCheckDelete(id);

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
                var result = entity.usp_PropertyGroupCopy(id);

                return result == null ? false : true;
            }
            catch
            {
                return false;
            }
        }
    }
}
