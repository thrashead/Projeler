using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using System.Linq;
using HumanResources.Data;
using TDLibrary;
using Repository.LogsModel;

namespace Repository.UsersModel
{
	public class Users : IUsers
	{
		readonly HumanResourcesEntities entity = new HumanResourcesEntities();

		#region Model

		public Users()
		{
			LogsList = new List<ILogs>();
			UserGroupsList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int GroupID { get; set; }
		public string Username { get; set; }
		public string Password { get; set; }
		public bool Active { get; set; }
		public string LoginTime { get; set; }
		public bool Deleted { get; set; }

		public string Mesaj { get; set; }

		public List<ILogs> LogsList { get; set; }

		public List<SelectListItem> UserGroupsList { get; set; }

		public string UserGroupsAdi { get; set; }

		#endregion

		#region Methods

		public List<Users> List(int? id = null, int? top = null, bool relation = true)
		{
			List<Users> table;

			List<usp_UsersLinkedSelect_Result> tableTemp;
			List<usp_UsersSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_UsersLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<Users, usp_UsersLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_UsersSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<Users, usp_UsersSelectTop_Result>();
			}

			if (relation)
			{
				foreach(Users item in table)
				{
					List<usp_UserGroupsSelect_Result> tableUserGroups = entity.usp_UserGroupsSelect(null).ToList();
					item.UserGroupsList = tableUserGroups.ToSelectList<usp_UserGroupsSelect_Result, SelectListItem>("ID", "Name", item.GroupID);

					List<usp_Logs_UsersByLinkedIDSelect_Result> logsModelList = entity.usp_Logs_UsersByLinkedIDSelect(item.ID).ToList();
					item.LogsList.AddRange(logsModelList.ChangeModelList<Logs, usp_Logs_UsersByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public List<Users> ListAll(bool relation = true)
		{
			List<Users> table;

			List<usp_UsersSelectAll_Result> tableTemp;

			tableTemp = entity.usp_UsersSelectAll().ToList();
			table = tableTemp.ChangeModelList<Users, usp_UsersSelectAll_Result>();

			if (relation)
			{
				foreach(Users item in table)
				{
					List<usp_UserGroupsSelect_Result> tableUserGroups = entity.usp_UserGroupsSelect(null).ToList();
					item.UserGroupsList = tableUserGroups.ToSelectList<usp_UserGroupsSelect_Result, SelectListItem>("ID", "Name", item.GroupID);

					List<usp_Logs_UsersByLinkedIDSelect_Result> logsModelList = entity.usp_Logs_UsersByLinkedIDSelect(item.ID).ToList();
					item.LogsList.AddRange(logsModelList.ChangeModelList<Logs, usp_Logs_UsersByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public IUsers Select(int? id, bool relation = true)
		{
			usp_UsersSelectTop_Result tableTemp = entity.usp_UsersSelectTop(id, 1).FirstOrDefault();
			Users table = tableTemp.ChangeModel<Users>();

			if (relation)
			{
				List<usp_UserGroupsSelect_Result> tableUserGroups = entity.usp_UserGroupsSelect(null).ToList();
				table.UserGroupsList = tableUserGroups.ToSelectList<usp_UserGroupsSelect_Result, SelectListItem>("ID", "Name", table.GroupID);

				List<usp_Logs_UsersByLinkedIDSelect_Result> logsModelList = entity.usp_Logs_UsersByLinkedIDSelect(id).ToList();
				table.LogsList.AddRange(logsModelList.ChangeModelList<Logs, usp_Logs_UsersByLinkedIDSelect_Result>());
			}

			return table;
		}

		public IUsers Insert(IUsers table = null, int? groupID = null)
		{
			if (table == null)
				table = new Users();

			List<usp_UserGroupsSelect_Result> tableUserGroups = entity.usp_UserGroupsSelect(null).ToList();
			table.UserGroupsList = tableUserGroups.ToSelectList<usp_UserGroupsSelect_Result, SelectListItem>("ID",  "Name", groupID);

			return table;
		}

		public bool Insert(IUsers table)
		{
			table.Password = table.Password.ToMD5();

			var result = entity.usp_UsersInsert(table.GroupID, table.Username, table.Password, table.Active, table.LoginTime).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public IUsers Update(int? id = null, IUsers table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_UserGroupsSelect_Result> tableUserGroups = entity.usp_UserGroupsSelect(null).ToList();
				table.UserGroupsList = tableUserGroups.ToSelectList<usp_UserGroupsSelect_Result, SelectListItem>("ID", "Name", table.GroupID);

				List<usp_Logs_UsersByLinkedIDSelect_Result> logsModelList = entity.usp_Logs_UsersByLinkedIDSelect(table.ID).ToList();
				table.LogsList.AddRange(logsModelList.ChangeModelList<Logs, usp_Logs_UsersByLinkedIDSelect_Result>());
			}

			return table;
		}

		public bool Update(IUsers table, int? curUserID = null)
		{
			string password = table.Password == null ? entity.usp_UsersOldPasswordSelect(table.ID).FirstOrDefault() : table.Password.ToMD5();
			table.Password = password;

			if (curUserID == table.ID)
				table.Active = true;

			var result = entity.usp_UsersUpdate(table.ID, table.GroupID, table.Username, table.Password, table.Active).FirstOrDefault();

			if(result != null)
			{
				if (curUserID == table.ID)
					HttpContext.Current.Session["CurrentUser"] = entity.usp_UsersSelectTop(table.ID, 1).FirstOrDefault().ChangeModel<Users>();

				return true;
			}
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_UsersCopy(id).FirstOrDefault();

				return result == null ? false : true;
			}
			catch
			{
				return false;
			}
		}

		public bool Delete(int? id = null)
		{
			try
			{
				entity.usp_UsersDelete(id);

				return true;
			}
			catch
			{
				return false;
			}
		}

		public bool Remove(int? id = null)
		{
			try
			{
				entity.usp_UsersRemove(id);

				return true;
			}
			catch
			{
				return false;
			}
		}

		public IUsers ChangeGroup(int id, IUsers table = null)
		{
			if (table == null)
				table = Select(id);

			List<usp_UserGroupsSelect_Result> tableUsersGroup = entity.usp_UserGroupsSelect(null).ToList();
			table.UserGroupsList = tableUsersGroup.ToSelectList<usp_UserGroupsSelect_Result, SelectListItem>("ID", "Name", table.GroupID);

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

		#endregion

		#region User Defined


		#endregion
	}
}
