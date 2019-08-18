using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using AdminPanelAngular.Data;
using TDLibrary;
using System.Web;

namespace Repository.UsersModel
{
    public class Users : IUsers
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public Users()
        {
            UserGroupsList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        public string Username { get; set; }
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
            usp_UsersSelectTop_Result model = entity.usp_UsersSelectTop(id, 1).FirstOrDefault();
            IUsers table = model.ChangeModel<Users>();

            return table;
        }

        public IUsers Insert(int? groupID = null, IUsers table = null)
        {
            if (table == null)
                table = new Users();

            List<usp_UserGroupsSelect_Result> tableUserGroups = entity.usp_UserGroupsSelect(null).ToList();
            table.UserGroupsList = tableUserGroups.ToSelectList<usp_UserGroupsSelect_Result, SelectListItem>("ID", "Name", groupID);

            return table;
        }

        public bool Insert(IUsers table)
        {
            table.Password = table.Password.ToMD5();

            var result = entity.usp_UsersInsert(null, table.Username, table.Password, table.Active, null);

            if (result != null)
                return true;
            else
                return false;
        }

        public IUsers Update(int id, IUsers table = null)
        {
            if (table == null)
                table = Select(id);

            table.Password = "";

            List<usp_UserGroupsSelect_Result> tableUserGroups = entity.usp_UserGroupsSelect(null).ToList();
            table.UserGroupsList = tableUserGroups.ToSelectList<usp_UserGroupsSelect_Result, SelectListItem>("ID", "Name", table.GroupID);

            return table;
        }

        public bool Update(IUsers table, int? curUserID = null)
        {
            string password = table.Password == null ? entity.usp_UsersOldPasswordSelect(table.ID).FirstOrDefault() : table.Password.ToMD5();
            table.Password = password;

            if (curUserID == table.ID)
                table.Active = true;

            var result = entity.usp_UsersUpdate(table.ID, table.Username, table.Password, table.Active, null);

            if (result != null)
            {
                if (curUserID == table.ID)
                    HttpContext.Current.Session["CurrentUser"] = entity.usp_UsersSelectTop(table.ID, 1).FirstOrDefault().ChangeModel<Users>();

                return true;
            }
            else
                return false;
        }
        public IUsers ChangeGroup(int id, IUsers table = null)
        {
            if (table == null)
                table = Select(id);

            List<usp_UserGroupsSelect_Result> tableUserGroups = entity.usp_UserGroupsSelect(null).ToList();
            table.UserGroupsList = tableUserGroups.ToSelectList<usp_UserGroupsSelect_Result, SelectListItem>("ID", "Name", table.GroupID);

            return table;
        }

        public bool ChangeGroup(IUsers table)
        {
            var result = entity.usp_UsersGroupUpdate(table.ID, table.GroupID);

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
