using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using AdminPanel.Data;
using TDLibrary;

namespace Repository.KullaniciGrupHakModel
{
    public class KullaniciGrupHak : IKullaniciGrupHak
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public KullaniciGrupHak()
        {
            UserGroupTablesList = new List<SelectListItem>();
            UserGroupProcessList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "Kullanıcı Grubu Tablosu alanı boş olamaz.")]
        public int UserGroupTableID { get; set; }
        [Required(ErrorMessage = "Kullanıcı Grubu İşlemi alanı boş olamaz.")]
        public int UserGroupProcessID { get; set; }
        public bool Allow { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> UserGroupTablesList { get; set; }
        public List<SelectListItem> UserGroupProcessList { get; set; }
        public string GroupAdi { get; set; }
        public string UserGroupTablesAdi { get; set; }
        public string UserGroupProcessAdi { get; set; }
        public string UserGroupProcessKisaAdi { get; set; }


        public List<KullaniciGrupHak> List()
        {
            return entity.usp_UserGroupRightsDetailSelect(null).ToList().ChangeModelList<KullaniciGrupHak, usp_UserGroupRightsDetailSelect_Result>();
        }

        public IKullaniciGrupHak Select(int id)
        {
            usp_UserGroupRightsSelectTop_Result table = entity.usp_UserGroupRightsSelectTop(id, 1).FirstOrDefault();
            KullaniciGrupHak kullanici = table.ChangeModel<KullaniciGrupHak>();

            return kullanici;
        }

        public bool Insert(IKullaniciGrupHak kullanici)
        {
            var result = entity.usp_UserGroupRightsCheckInsert(kullanici.UserGroupTableID, kullanici.UserGroupProcessID, kullanici.Allow);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Update(IKullaniciGrupHak kullanici)
        {
            var result = entity.usp_UserGroupRightsCheckUpdate(kullanici.ID, kullanici.UserGroupTableID, kullanici.UserGroupProcessID, kullanici.Allow);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_UserGroupRightsDelete(id);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
