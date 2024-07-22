using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACarMVC.Data;
using TDLibrary;

namespace Repository.UserGroupRightsModel
{
    public class UserGroupRights : IUserGroupRights
    {
        readonly RentACarEntities entity = new RentACarEntities();

        public UserGroupRights()
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
        public string UserGroupsAdi { get; set; }
        public string UserGroupTablesAdi { get; set; }
        public string UserGroupProcessAdi { get; set; }
        public string UserGroupProcessKisaAdi { get; set; }


        public List<UserGroupRights> List()
        {
            return entity.usp_UserGroupRightsDetailSelect(null).ToList().ChangeModelList<UserGroupRights, usp_UserGroupRightsDetailSelect_Result>();
        }

        public IUserGroupRights Select(int id)
        {
            usp_UserGroupRightsSelectTop_Result table = entity.usp_UserGroupRightsSelectTop(id, 1).FirstOrDefault();
            IUserGroupRights kullanici = table.ChangeModel<UserGroupRights>();

            return kullanici;
        }

        public IUserGroupRights Insert(int? userGroupTableID = null, int? userGroupProcessID = null, IUserGroupRights kullanici = null)
        {
            if (kullanici == null)
                kullanici = new UserGroupRights();

            List<usp_UserGroupTablesDetailSelect_Result> tableUserGroupTables = entity.usp_UserGroupTablesDetailSelect(null).ToList();
            foreach (usp_UserGroupTablesDetailSelect_Result item in tableUserGroupTables)
                if (item.ID == userGroupTableID)
                    kullanici.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupsAdi + " > " + item.TypesAdi, Selected = true });
                else
                    kullanici.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupsAdi + " > " + item.TypesAdi });

            List<usp_UserGroupProcessSelect_Result> tableKullaniciGrupIslem = entity.usp_UserGroupProcessSelect(null).ToList();
            kullanici.UserGroupProcessList = tableKullaniciGrupIslem.ToSelectList<usp_UserGroupProcessSelect_Result, SelectListItem>("ID", "Name", userGroupProcessID);

            return kullanici;
        }

        public bool Insert(IUserGroupRights kullanici)
        {
            var result = entity.usp_UserGroupRightsCheckInsert(kullanici.UserGroupTableID, kullanici.UserGroupProcessID, kullanici.Allow);

            if (result != null)
                return true;
            else
                return false;
        }

        public IUserGroupRights Update(int id, IUserGroupRights kullanici = null)
        {
            if (kullanici == null)
                kullanici = Select(id);

            List<usp_UserGroupTablesDetailSelect_Result> tableUserGroupTables = entity.usp_UserGroupTablesDetailSelect(null).ToList();
            foreach (usp_UserGroupTablesDetailSelect_Result item in tableUserGroupTables)
                if (item.ID == kullanici.UserGroupTableID)
                    kullanici.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupsAdi + " > " + item.TypesAdi, Selected = true });
                else
                    kullanici.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupsAdi + " > " + item.TypesAdi });

            List<usp_UserGroupProcessSelect_Result> tableKullaniciGrupIslem = entity.usp_UserGroupProcessSelect(null).ToList();
            kullanici.UserGroupProcessList = tableKullaniciGrupIslem.ToSelectList<usp_UserGroupProcessSelect_Result, SelectListItem>("ID", "Name", kullanici.UserGroupProcessID);

            return kullanici;
        }

        public bool Update(IUserGroupRights kullanici)
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
