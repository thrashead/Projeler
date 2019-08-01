using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using AdminPanel.Data;
using TDLibrary;

namespace Repository.KullaniciGrupIslemModel
{
    public class KullaniciGrupIslem : IKullaniciGrupIslem
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public int ID { get; set; }
        [Required(ErrorMessage = "İsim alanı boş olamaz ve en fazla 25 karakter olmalıdır.")]
        [StringLength(25)]
        public string Name { get; set; }
        [Required(ErrorMessage = "Kısa İsim alanı boş olamaz ve en fazla 5 karakter olmalıdır.")]
        [StringLength(5)]
        public string ShortName { get; set; }
        public string Description { get; set; }

        public string Mesaj { get; set; }


        public List<KullaniciGrupIslem> List()
        {
            return entity.usp_UserGroupProcessSelect(null).ToList().ChangeModelList<KullaniciGrupIslem, usp_UserGroupProcessSelect_Result>();
        }

        public IKullaniciGrupIslem Select(int id)
        {
            usp_UserGroupProcessSelectTop_Result table = entity.usp_UserGroupProcessSelectTop(id, 1).FirstOrDefault();
            IKullaniciGrupIslem kullanici = table.ChangeModel<KullaniciGrupIslem>();

            return kullanici;
        }

        public bool Insert(IKullaniciGrupIslem kullanici)
        {
            var result = entity.usp_UserGroupProcessInsert(kullanici.Name, kullanici.ShortName, kullanici.Description);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Update(IKullaniciGrupIslem kullanici)
        {
            var result = entity.usp_UserGroupProcessUpdate(kullanici.ID, kullanici.Name, kullanici.ShortName, kullanici.Description);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_UserGroupProcessDelete(id);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
