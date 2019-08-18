using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.UserGroupTablesModel
{
    public interface IUserGroupTables
    {
        int ID { get; set; }
        int TypeID { get; set; }
        int UserGroupID { get; set; }

        string Mesaj { get; set; }

        List<SelectListItem> TypesList { get; set; }
        List<SelectListItem> UserGroupsList { get; set; }

        string TypesAdi { get; set; }
        string UserGroupsAdi { get; set; }

        List<UserGroupTables> List();
        IUserGroupTables Select(int id);
        IUserGroupTables Insert(int? groupID, int? typeID, IUserGroupTables kullanici);
        bool Insert(IUserGroupTables kullanici);
        IUserGroupTables Update(int id, IUserGroupTables kullanici);
        bool Update(IUserGroupTables kullanici);
        bool Delete(int id);
    }
}
