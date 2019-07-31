using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using AdminPanel.Data;
using TDLibrary;

namespace Repository.FormElemanDegerModel
{
    public class FormElemanDeger : IFormElemanDeger
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public FormElemanDeger()
        {
            PropertyList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "Bağlı Özellik alanı boş olamaz.")]
        public int PropID { get; set; }
        public string Text { get; set; }
        [Required(ErrorMessage = "Değer alanı boş olamaz ve en fazla 50 karakter olmalıdır.")]
        [StringLength(50)]
        public string Value { get; set; }
        public string Code { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> PropertyList { get; set; }
        public string PropertyAdi { get; set; }


        public List<FormElemanDeger> List()
        {
            return entity.usp_PropertyValuesWithPropertyNameSelect(null).ToList().ChangeModelList<FormElemanDeger, usp_PropertyValuesWithPropertyNameSelect_Result>();
        }

        public IFormElemanDeger Select(int id)
        {
            usp_PropertyValuesSelectTop_Result table = entity.usp_PropertyValuesSelectTop(id, 1).FirstOrDefault();
            FormElemanDeger formeleman = table.ChangeModel<FormElemanDeger>();

            return formeleman;
        }

        public bool Insert(IFormElemanDeger formeleman)
        {
            var result = entity.usp_PropertyValuesInsert(formeleman.PropID, formeleman.Text, formeleman.Value, formeleman.Code);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Update(IFormElemanDeger formeleman)
        {
            var result = entity.usp_PropertyValuesUpdate(formeleman.ID, formeleman.PropID, formeleman.Text, formeleman.Value, formeleman.Code);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_PropertyValuesDelete(id);

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
                var result = entity.usp_PropertyValuesCopy(id);

                return result == null ? false : true;
            }
            catch
            {
                return false;
            }
        }
    }
}
