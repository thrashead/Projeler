using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.UsersModel
{
    public interface IUsers
    {
         int ID { get; set; }
         string Username { get; set; }
         int GroupID { get; set; }
         string Password { get; set; }
         bool Active { get; set; }
         string LoginTime { get; set; }
         bool Deleted { get; set; }

         string Mesaj { get; set; }

         List<SelectListItem> UserGroupsList { get; set; }
        string GroupAdi { get; set; }

        List<Users> List();
        IUsers Select(int id);
        IUsers Insert(int? groupID, IUsers kullanici);
        bool Insert(IUsers kullanici);
        IUsers Update(int id, IUsers kullanici);
        bool Update(IUsers kullanici, int? curUserID);
        IUsers ChangeGroup(int id, IUsers kullanici = null);
        bool ChangeGroup(IUsers kullanici);
        bool Delete(int id);
        bool Remove(int id);
    }
}
