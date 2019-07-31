using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using AdminPanel.Data;
using TDLibrary;

namespace Repository.TiplerModel
{
    public class Tipler : ITipler
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public int ID { get; set; }
        [Required(ErrorMessage = "Tip İsmi alanı boş olamaz ve en fazla 50 karakter olmalıdır.")]
        [StringLength(50)]
        public string TypeName { get; set; }
        [Required(ErrorMessage = "Url alanı boş olamaz ve en fazla 100 karakter olmalıdır.")]
        [StringLength(100)]
        public string Url { get; set; }
        [Required(ErrorMessage = "Tablo İsmi alanı boş olamaz ve en fazla 50 karakter olmalıdır.")]
        [StringLength(50)]
        public string TableName { get; set; }
        public bool Linkable { get; set; }
        public bool Show { get; set; }

        public string Mesaj { get; set; }


        public List<Tipler> List()
        {
            return entity.usp_TypesSelect(null).ToList().ChangeModelList<Tipler, usp_TypesSelect_Result>();
        }

        public ITipler Select(int id)
        {
            usp_TypesSelectTop_Result table = entity.usp_TypesSelectTop(id, 1).FirstOrDefault();
            Tipler tip = table.ChangeModel<Tipler>();

            return tip;

        }

        public bool Insert(ITipler tip)
        {
            var result = entity.usp_TypesInsert(tip.TypeName, tip.Url, tip.TableName, tip.Linkable, tip.Show);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Update(ITipler tip)
        {
            var result = entity.usp_TypesUpdate(tip.ID, tip.TypeName, tip.Url, tip.TableName, tip.Linkable, tip.Show);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_TypesCheckDelete(id);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
