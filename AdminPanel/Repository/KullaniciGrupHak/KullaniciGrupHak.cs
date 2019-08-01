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
            IKullaniciGrupHak kullanici = table.ChangeModel<KullaniciGrupHak>();

            return kullanici;
        }

        public IKullaniciGrupHak Insert(int? userGroupTableID = null, int? userGroupProcessID = null, IKullaniciGrupHak kullanici = null)
        {
            if (kullanici == null)
                kullanici = new KullaniciGrupHak();

            List<usp_UserGroupTablesDetailSelect_Result> tableUserGroupTables = entity.usp_UserGroupTablesDetailSelect(null).ToList();
            foreach (usp_UserGroupTablesDetailSelect_Result item in tableUserGroupTables)
                if (item.ID == userGroupTableID)
                    kullanici.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupAdi + " > " + item.TypeAdi, Selected = true });
                else
                    kullanici.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupAdi + " > " + item.TypeAdi });

            List<usp_UserGroupProcessSelect_Result> tableKullaniciGrupIslem = entity.usp_UserGroupProcessSelect(null).ToList();
            kullanici.UserGroupProcessList = tableKullaniciGrupIslem.ToSelectList<usp_UserGroupProcessSelect_Result, SelectListItem>("ID", "Name", userGroupProcessID);

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

        public IKullaniciGrupHak Update(int id, IKullaniciGrupHak kullanici = null)
        {
            if (kullanici == null)
                kullanici = Select(id);

            List<usp_UserGroupTablesDetailSelect_Result> tableUserGroupTables = entity.usp_UserGroupTablesDetailSelect(null).ToList();
            foreach (usp_UserGroupTablesDetailSelect_Result item in tableUserGroupTables)
                if (item.ID == kullanici.UserGroupTableID)
                    kullanici.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupAdi + " > " + item.TypeAdi, Selected = true });
                else
                    kullanici.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupAdi + " > " + item.TypeAdi });

            List<usp_UserGroupProcessSelect_Result> tableKullaniciGrupIslem = entity.usp_UserGroupProcessSelect(null).ToList();
            kullanici.UserGroupProcessList = tableKullaniciGrupIslem.ToSelectList<usp_UserGroupProcessSelect_Result, SelectListItem>("ID", "Name", kullanici.UserGroupProcessID);

            return kullanici;
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
