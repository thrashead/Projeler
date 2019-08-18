using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using AdminPanelAngular.Data;
using TDLibrary;

namespace Repository.UserGroupRightsModel
{
    public class UserGroupRights : IUserGroupRights
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public UserGroupRights()
        {
            UserGroupTablesList = new List<SelectListItem>();
            UserGroupProcessList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        public int UserGroupTableID { get; set; }
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
            usp_UserGroupRightsSelectTop_Result model = entity.usp_UserGroupRightsSelectTop(id, 1).FirstOrDefault();
            IUserGroupRights table = model.ChangeModel<UserGroupRights>();

            return table;
        }

        public IUserGroupRights Insert(int? userGroupTableID = null, int? userGroupProcessID = null, IUserGroupRights table = null)
        {
            if (table == null)
                table = new UserGroupRights();

            List<usp_UserGroupTablesDetailSelect_Result> tableUserGroupTables = entity.usp_UserGroupTablesDetailSelect(null).ToList();
            foreach (usp_UserGroupTablesDetailSelect_Result item in tableUserGroupTables)
                if (item.ID == userGroupTableID)
                    table.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupsAdi + " > " + item.TypesAdi, Selected = true });
                else
                    table.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupsAdi + " > " + item.TypesAdi });

            List<usp_UserGroupProcessSelect_Result> tableUserGroupProcess = entity.usp_UserGroupProcessSelect(null).ToList();
            table.UserGroupProcessList = tableUserGroupProcess.ToSelectList<usp_UserGroupProcessSelect_Result, SelectListItem>("ID", "Name", userGroupProcessID);

            return table;
        }

        public bool Insert(IUserGroupRights table)
        {
            var result = entity.usp_UserGroupRightsCheckInsert(table.UserGroupTableID, table.UserGroupProcessID, table.Allow);

            if (result != null)
                return true;
            else
                return false;
        }

        public IUserGroupRights Update(int id, IUserGroupRights table = null)
        {
            if (table == null)
                table = Select(id);

            List<usp_UserGroupTablesDetailSelect_Result> tableUserGroupTables = entity.usp_UserGroupTablesDetailSelect(null).ToList();
            foreach (usp_UserGroupTablesDetailSelect_Result item in tableUserGroupTables)
                if (item.ID == table.UserGroupTableID)
                    table.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupsAdi + " > " + item.TypesAdi, Selected = true });
                else
                    table.UserGroupTablesList.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.UserGroupsAdi + " > " + item.TypesAdi });

            List<usp_UserGroupProcessSelect_Result> tableUserGroupProcess = entity.usp_UserGroupProcessSelect(null).ToList();
            table.UserGroupProcessList = tableUserGroupProcess.ToSelectList<usp_UserGroupProcessSelect_Result, SelectListItem>("ID", "Name", table.UserGroupProcessID);

            return table;
        }

        public bool Update(IUserGroupRights table)
        {
            var result = entity.usp_UserGroupRightsCheckUpdate(table.ID, table.UserGroupTableID, table.UserGroupProcessID, table.Allow);

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
