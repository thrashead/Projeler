using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACar.Data;
using TDLibrary;
using System.Web;

namespace Repository.UsersModel
{
    public class Users : IUsers
    {
        readonly RentACarEntities entity = new RentACarEntities();

        public Users()
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
        public string UserGroupsAdi { get; set; }


        public List<Users> List()
        {
            return entity.usp_UsersDetailSelect(null).ToList().ChangeModelList<Users, usp_UsersDetailSelect_Result>();
        }

        public IUsers Select(int id)
        {
            usp_UsersSelectTop_Result table = entity.usp_UsersSelectTop(id, 1).FirstOrDefault();
            IUsers kullanici = table.ChangeModel<Users>();

            return kullanici;
        }

        public IUsers Insert(int? groupID = null, IUsers kullanici = null)
        {
            if (kullanici == null)
                kullanici = new Users();

            List<usp_UserGroupsSelect_Result> tableKullaniciGrup = entity.usp_UserGroupsSelect(null).ToList();
            kullanici.UserGroupsList = tableKullaniciGrup.ToSelectList<usp_UserGroupsSelect_Result, SelectListItem>("ID", "Name", groupID);

            return kullanici;
        }

        public bool Insert(IUsers kullanici)
        {
            kullanici.Password = kullanici.Password.ToMD5();

            var result = entity.usp_UsersInsert(null, kullanici.Username, kullanici.Password, kullanici.Active, null);

            if (result != null)
                return true;
            else
                return false;
        }

        public IUsers Update(int id, IUsers kullanici = null)
        {
            if (kullanici == null)
                kullanici = Select(id);

            kullanici.Password = "";

            List<usp_UserGroupsSelect_Result> tableKullaniciGrup = entity.usp_UserGroupsSelect(null).ToList();
            kullanici.UserGroupsList = tableKullaniciGrup.ToSelectList<usp_UserGroupsSelect_Result, SelectListItem>("ID", "Name", kullanici.GroupID);

            return kullanici;
        }

        public bool Update(IUsers kullanici, int? curUserID = null)
        {
            string password = kullanici.Password == null ? entity.usp_UsersOldPasswordSelect(kullanici.ID).FirstOrDefault() : kullanici.Password.ToMD5();
            kullanici.Password = password;

            if (curUserID == kullanici.ID)
                kullanici.Active = true;

            var result = entity.usp_UsersUpdate(kullanici.ID, kullanici.Username, kullanici.Password, kullanici.Active, null);

            if (result != null)
            {
                if (curUserID == kullanici.ID)
                    HttpContext.Current.Session["CurrentUser"] = entity.usp_UsersSelectTop(kullanici.ID, 1).FirstOrDefault().ChangeModel<Users>();

                return true;
            }
            else
                return false;
        }

        public IUsers ChangeGroup(int id, IUsers kullanici = null)
        {
            if (kullanici == null)
                kullanici = Select(id);

            List<usp_UserGroupsSelect_Result> tableKullaniciGrup = entity.usp_UserGroupsSelect(null).ToList();
            kullanici.UserGroupsList = tableKullaniciGrup.ToSelectList<usp_UserGroupsSelect_Result, SelectListItem>("ID", "Name", kullanici.GroupID);

            return kullanici;
        }

        public bool ChangeGroup(IUsers kullanici)
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
