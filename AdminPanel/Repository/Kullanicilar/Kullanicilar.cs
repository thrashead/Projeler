using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using AdminPanel.Data;
using TDLibrary;

namespace Repository.KullanicilarModel
{
    public class Kullanicilar : IKullanicilar
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public Kullanicilar()
        {
            UserGroupsList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "Kullanıcı Adı boş olamaz ve en fazla 25 karakter olmalıdır.")]
        [StringLength(25)]
        public string Username { get; set; }
        [Required(ErrorMessage = "Bağlı Grup alanı boş olamaz.")]
        public int GroupID { get; set; }
        public string Password { get; set; }
        public bool Active { get; set; }
        public string LoginTime { get; set; }
        public bool Deleted { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> UserGroupsList { get; set; }
        public string GroupName { get; set; }


        public List<Kullanicilar> List()
        {
            return entity.usp_UsersDetailSelect(null).ToList().ChangeModelList<Kullanicilar, usp_UsersDetailSelect_Result>();
        }

        public IKullanicilar Select(int id)
        {
            usp_UsersSelectTop_Result table = entity.usp_UsersSelectTop(id, 1).FirstOrDefault();
            IKullanicilar kullanici = table.ChangeModel<Kullanicilar>();

            return kullanici;
        }

        public IKullanicilar Insert(int? groupID = null, IKullanicilar kullanici = null)
        {
            if (kullanici == null)
                kullanici = new Kullanicilar();

            List<usp_UserGroupsSelect_Result> tableKullaniciGrup = entity.usp_UserGroupsSelect(null).ToList();
            kullanici.UserGroupsList = tableKullaniciGrup.ToSelectList<usp_UserGroupsSelect_Result, SelectListItem>("ID", "Name", groupID);

            return kullanici;
        }

        public bool Insert(IKullanicilar kullanici)
        {
            var result = entity.usp_UsersInsert(null, kullanici.Username, kullanici.Password, kullanici.Active, null);

            if (result != null)
                return true;
            else
                return false;
        }

        public IKullanicilar Update(int id, IKullanicilar kullanici = null)
        {
            if (kullanici == null)
                kullanici = Select(id);

            kullanici.Password = "";

            List<usp_UserGroupsSelect_Result> tableKullaniciGrup = entity.usp_UserGroupsSelect(null).ToList();
            kullanici.UserGroupsList = tableKullaniciGrup.ToSelectList<usp_UserGroupsSelect_Result, SelectListItem>("ID", "Name", kullanici.GroupID);

            return kullanici;
        }

        public bool Update(IKullanicilar kullanici)
        {
            var result = entity.usp_UsersUpdate(kullanici.ID, kullanici.Username, kullanici.Password, kullanici.Active, null);

            if (result != null)
                return true;
            else
                return false;
        }
        public IKullanicilar ChangeGroup(int id, IKullanicilar kullanici = null)
        {
            if (kullanici == null)
                kullanici = Select(id);

            List<usp_UserGroupsSelect_Result> tableKullaniciGrup = entity.usp_UserGroupsSelect(null).ToList();
            kullanici.UserGroupsList = tableKullaniciGrup.ToSelectList<usp_UserGroupsSelect_Result, SelectListItem>("ID", "Name", kullanici.GroupID);

            return kullanici;
        }

        public bool ChangeGroup(IKullanicilar kullanici)
        {
            var result = entity.usp_UsersGroupUpdate(kullanici.ID, kullanici.GroupID);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_UsersCheckDelete(id);

                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool Remove(int id)
        {
            try
            {
                entity.usp_UsersSetDeleted(id);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
