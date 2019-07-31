using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using AdminPanel.Data;
using TDLibrary;

namespace Repository.FormTiplerModel
{
    public class FormTipler : IFormTipler
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public int ID { get; set; }
        [Required(ErrorMessage = "İsim alanı boş olamaz ve en fazla 50 karakter olmalıdır.")]
        [StringLength(50)]
        public string Name { get; set; }
        [Required(ErrorMessage = "Tip alanı boş olamaz ve en fazla 50 karakter olmalıdır.")]
        [StringLength(50)]
        public string Type { get; set; }
        [Required(ErrorMessage = "Kısa İsim alanı boş olamaz ve en fazla 25 karakter olmalıdır.")]
        [StringLength(25)]
        public string ShortName { get; set; }
        public bool HasValue { get; set; }

        public string Mesaj { get; set; }


        public List<FormTipler> List()
        {
            return entity.usp_PropertyTypesSelect(null).ToList().ChangeModelList<FormTipler, usp_PropertyTypesSelect_Result>();
        }

        public IFormTipler Select(int id)
        {
            usp_PropertyTypesSelectTop_Result table = entity.usp_PropertyTypesSelectTop(id, 1).FirstOrDefault();
            FormTipler formeleman = table.ChangeModel<FormTipler>();

            return formeleman;
        }

        public bool Insert(IFormTipler formeleman)
        {
            var result = entity.usp_PropertyTypesInsert(formeleman.Name, formeleman.Type, formeleman.ShortName, formeleman.HasValue);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Update(IFormTipler formeleman)
        {
            var result = entity.usp_PropertyTypesUpdate(formeleman.ID, formeleman.Name, formeleman.Type, formeleman.ShortName, formeleman.HasValue);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_PropertyTypesCheckDelete(id);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
