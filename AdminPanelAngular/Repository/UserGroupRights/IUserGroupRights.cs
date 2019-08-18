using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.UserGroupRightsModel
{
    public interface IUserGroupRights
    {
        int ID { get; set; }
        int UserGroupTableID { get; set; }
        int UserGroupProcessID { get; set; }
        bool Allow { get; set; }

        string Mesaj { get; set; }

        List<SelectListItem> UserGroupTablesList { get; set; }
        List<SelectListItem> UserGroupProcessList { get; set; }
        string UserGroupsAdi { get; set; }
        string UserGroupTablesAdi { get; set; }
        string UserGroupProcessAdi { get; set; }
        string UserGroupProcessKisaAdi { get; set; }

        List<UserGroupRights> List();
        IUserGroupRights Select(int id);
        IUserGroupRights Insert(int? userGroupTableID, int? userGroupProcessID, IUserGroupRights kullanici);
        bool Insert(IUserGroupRights kullanici);
        IUserGroupRights Update(int id, IUserGroupRights kullanici);
        bool Update(IUserGroupRights kullanici);
        bool Delete(int id);
    }
}
