using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using AdminPanel.Data;
using TDLibrary;
using Repository.KullaniciGrupHakModel;
using Repository.KullaniciGrupTabloModel;

namespace Repository.KullaniciGrupModel
{
    public class KullaniciGrup : IKullaniciGrup
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public KullaniciGrup()
        {
            UserGroupTablesList = new List<KullaniciGrupTablo>();
            UserGroupRightsList = new List<KullaniciGrupHak>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "İsim alanı boş olamaz ve en fazla 25 karakter olmalıdır.")]
        [StringLength(25)]
        public string Name { get; set; }
        [Required(ErrorMessage = "Kısa İsim alanı boş olamaz ve en fazla 5 karakter olmalıdır.")]
        [StringLength(5)]
        public string ShortName { get; set; }
        public string Description { get; set; }

        public string Mesaj { get; set; }

        public List<KullaniciGrupTablo> UserGroupTablesList { get; set; }
        public List<KullaniciGrupHak> UserGroupRightsList { get; set; }


        public List<KullaniciGrup> List()
        {
            return entity.usp_UserGroupsSelect(null).ToList().ChangeModelList<KullaniciGrup, usp_UserGroupsSelect_Result>();
        }

        public IKullaniciGrup Select(int id)
        {
            usp_UserGroupsSelectTop_Result table = entity.usp_UserGroupsSelectTop(id, 1).FirstOrDefault();
            IKullaniciGrup kullanici = table.ChangeModel<KullaniciGrup>();

            return kullanici;
        }

        public bool Insert(IKullaniciGrup kullanici)
        {
            var result = entity.usp_UserGroupsInsert(kullanici.Name, kullanici.ShortName, kullanici.Description);

            if (result != null)
                return true;
            else
                return false;
        }

        public IKullaniciGrup Update(int id, IKullaniciGrup kullanici = null)
        {
            if (kullanici == null)
                kullanici = Select(id);

            kullanici.UserGroupTablesList = entity.usp_UserGroupTablesDetailSelect(id).ToList().ChangeModelList<KullaniciGrupTablo, usp_UserGroupTablesDetailSelect_Result>();
            kullanici.UserGroupRightsList = entity.usp_UserGroupRightsDetailSelect(id).ToList().ChangeModelList<KullaniciGrupHak, usp_UserGroupRightsDetailSelect_Result>();

            return kullanici;
        }

        public bool Update(IKullaniciGrup kullanici)
        {
            var result = entity.usp_UserGroupsUpdate(kullanici.ID, kullanici.Name, kullanici.ShortName, kullanici.Description);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_UserGroupsCheckDelete(id);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
