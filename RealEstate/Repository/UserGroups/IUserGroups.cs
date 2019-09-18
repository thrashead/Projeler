using Repository.UserGroupRightsModel;
using Repository.UserGroupTablesModel;
using System.Collections.Generic;

namespace Repository.UserGroupsModel
{
    public interface IUserGroups
    {
        int ID { get; set; }
        string Name { get; set; }
        string ShortName { get; set; }
        string Description { get; set; }

        string Mesaj { get; set; }

        List<UserGroupTables> UserGroupTablesList { get; set; }
        List<UserGroupRights> UserGroupRightsList { get; set; }

        List<UserGroups> List();
        IUserGroups Select(int id);
        bool Insert(IUserGroups kullanici);
        IUserGroups Update(int id, IUserGroups kullanici);
        bool Update(IUserGroups kullanici);
        bool Delete(int id);
    }
}
