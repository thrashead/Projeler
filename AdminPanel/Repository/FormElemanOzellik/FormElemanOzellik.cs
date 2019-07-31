using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using AdminPanel.Data;
using TDLibrary;

namespace Repository.FormElemanOzellikModel
{
	public class FormElemanOzellik : IFormElemanOzellik
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public FormElemanOzellik()
        {
            PropertyList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "Bağlı Özellik alanı boş olamaz.")]
		public int PropID { get; set; }
        [Required(ErrorMessage = "İsim alanı boş olamaz ve en fazla 50 karakter olmalıdır.")]
        [StringLength(50)]
        public string Name { get; set; }
        [Required(ErrorMessage = "Değer alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
        [StringLength(255)]
        public string Value { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> PropertyList { get; set; }

        public string PropertyAdi { get; set; }


        public List<FormElemanOzellik> List()
        {
            return entity.usp_PropertyAttributesWithPropertyNameSelect(null).ToList().ChangeModelList<FormElemanOzellik, usp_PropertyAttributesWithPropertyNameSelect_Result>();
        }

        public IFormElemanOzellik Select(int id)
        {
            usp_PropertyAttributesSelectTop_Result table = entity.usp_PropertyAttributesSelectTop(id, 1).FirstOrDefault();
            FormElemanOzellik formeleman = table.ChangeModel<FormElemanOzellik>();

            return formeleman;
        }

        public bool Insert(IFormElemanOzellik formeleman)
        {
            var result = entity.usp_PropertyAttributesInsert(formeleman.PropID, formeleman.Name, formeleman.Value);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Update(IFormElemanOzellik formeleman)
        {
            var result = entity.usp_PropertyAttributesUpdate(formeleman.ID, formeleman.PropID, formeleman.Name, formeleman.Value);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_PropertyAttributesDelete(id);

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
                var result = entity.usp_PropertyAttributesCopy(id);

                return result == null ? false : true;
            }
            catch
            {
                return false;
            }
        }
    }
}
