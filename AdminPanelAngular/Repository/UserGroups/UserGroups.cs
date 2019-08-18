using System.Collections.Generic;
using System.Linq;
using AdminPanelAngular.Data;
using TDLibrary;
using Repository.UserGroupRightsModel;
using Repository.UserGroupTablesModel;

namespace Repository.UserGroupsModel
{
    public class UserGroups : IUserGroups
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public UserGroups()
        {
            UserGroupTablesList = new List<UserGroupTables>();
            UserGroupRightsList = new List<UserGroupRights>();
        }

        public int ID { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public string Description { get; set; }

        public string Mesaj { get; set; }

        public List<UserGroupTables> UserGroupTablesList { get; set; }
        public List<UserGroupRights> UserGroupRightsList { get; set; }


        public List<UserGroups> List()
        {
            return entity.usp_UserGroupsSelect(null).ToList().ChangeModelList<UserGroups, usp_UserGroupsSelect_Result>();
        }

        public IUserGroups Select(int id)
        {
            usp_UserGroupsSelectTop_Result model = entity.usp_UserGroupsSelectTop(id, 1).FirstOrDefault();
            IUserGroups table = model.ChangeModel<UserGroups>();

            return table;
        }

        public bool Insert(IUserGroups table)
        {
            var result = entity.usp_UserGroupsInsert(table.Name, table.ShortName, table.Description);

            if (result != null)
                return true;
            else
                return false;
        }

        public IUserGroups Update(int id, IUserGroups table = null)
        {
            if (table == null)
                table = Select(id);

            table.UserGroupTablesList = entity.usp_UserGroupTablesDetailSelect(id).ToList().ChangeModelList<UserGroupTables, usp_UserGroupTablesDetailSelect_Result>();
            table.UserGroupRightsList = entity.usp_UserGroupRightsDetailSelect(id).ToList().ChangeModelList<UserGroupRights, usp_UserGroupRightsDetailSelect_Result>();

            return table;
        }

        public bool Update(IUserGroups table)
        {
            var result = entity.usp_UserGroupsUpdate(table.ID, table.Name, table.ShortName, table.Description);

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
