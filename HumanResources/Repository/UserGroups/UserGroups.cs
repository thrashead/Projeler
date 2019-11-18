using System;
using System.Collections.Generic;
using System.Web;
using System.Linq;
using HumanResources.Data;
using TDLibrary;
using Repository.UserGroupTablesModel;
using Repository.UsersModel;

namespace Repository.UserGroupsModel
{
	public class UserGroups : IUserGroups
	{
		readonly HumanResourcesEntities entity = new HumanResourcesEntities();

		#region Model

		public UserGroups()
		{
			UserGroupTablesList = new List<IUserGroupTables>();
			UsersList = new List<IUsers>();
		}

		public int ID { get; set; }
		public string Name { get; set; }
		public string ShortName { get; set; }
		public string Description { get; set; }

		public string Mesaj { get; set; }

		public List<IUserGroupTables> UserGroupTablesList { get; set; }
		public List<IUsers> UsersList { get; set; }

		#endregion

		#region Methods

		public List<UserGroups> List(int? id = null, int? top = null, bool relation = true)
		{
			List<UserGroups> table;

			List<usp_UserGroupsSelect_Result> tableTemp;
			List<usp_UserGroupsSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_UserGroupsSelect(id).ToList();
				table = tableTemp.ChangeModelList<UserGroups, usp_UserGroupsSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_UserGroupsSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<UserGroups, usp_UserGroupsSelectTop_Result>();
			}

			if (relation)
			{
				foreach(UserGroups item in table)
				{
					List<usp_UserGroupTables_UserGroupsByLinkedIDSelect_Result> usergrouptablesModelList = entity.usp_UserGroupTables_UserGroupsByLinkedIDSelect(item.ID).ToList();
					item.UserGroupTablesList.AddRange(usergrouptablesModelList.ChangeModelList<UserGroupTables, usp_UserGroupTables_UserGroupsByLinkedIDSelect_Result>());

					List<usp_Users_UserGroupsByLinkedIDSelect_Result> usersModelList = entity.usp_Users_UserGroupsByLinkedIDSelect(item.ID).ToList();
					item.UsersList.AddRange(usersModelList.ChangeModelList<Users, usp_Users_UserGroupsByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public List<UserGroups> ListAll(bool relation = true)
		{
			List<UserGroups> table;

			List<usp_UserGroupsSelectAll_Result> tableTemp;

			tableTemp = entity.usp_UserGroupsSelectAll().ToList();
			table = tableTemp.ChangeModelList<UserGroups, usp_UserGroupsSelectAll_Result>();

			if (relation)
			{
				foreach(UserGroups item in table)
				{
					List<usp_UserGroupTables_UserGroupsByLinkedIDSelect_Result> usergrouptablesModelList = entity.usp_UserGroupTables_UserGroupsByLinkedIDSelect(item.ID).ToList();
					item.UserGroupTablesList.AddRange(usergrouptablesModelList.ChangeModelList<UserGroupTables, usp_UserGroupTables_UserGroupsByLinkedIDSelect_Result>());

					List<usp_Users_UserGroupsByLinkedIDSelect_Result> usersModelList = entity.usp_Users_UserGroupsByLinkedIDSelect(item.ID).ToList();
					item.UsersList.AddRange(usersModelList.ChangeModelList<Users, usp_Users_UserGroupsByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public IUserGroups Select(int? id, bool relation = true)
		{
			usp_UserGroupsSelectTop_Result tableTemp = entity.usp_UserGroupsSelectTop(id, 1).FirstOrDefault();
			UserGroups table = tableTemp.ChangeModel<UserGroups>();

			if (relation)
			{
				List<usp_UserGroupTables_UserGroupsByLinkedIDSelect_Result> usergrouptablesModelList = entity.usp_UserGroupTables_UserGroupsByLinkedIDSelect(id).ToList();
				table.UserGroupTablesList.AddRange(usergrouptablesModelList.ChangeModelList<UserGroupTables, usp_UserGroupTables_UserGroupsByLinkedIDSelect_Result>());

				List<usp_Users_UserGroupsByLinkedIDSelect_Result> usersModelList = entity.usp_Users_UserGroupsByLinkedIDSelect(id).ToList();
				table.UsersList.AddRange(usersModelList.ChangeModelList<Users, usp_Users_UserGroupsByLinkedIDSelect_Result>());
			}

			return table;
		}

		public IUserGroups Insert(IUserGroups table = null, bool? none = null)
		{
			if (table == null)
				table = new UserGroups();

			return table;
		}

		public bool Insert(IUserGroups table)
		{
			var result = entity.usp_UserGroupsInsert(table.Name, table.ShortName, table.Description).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public IUserGroups Update(int? id = null, IUserGroups table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_UserGroupTables_UserGroupsByLinkedIDSelect_Result> usergrouptablesModelList = entity.usp_UserGroupTables_UserGroupsByLinkedIDSelect(table.ID).ToList();
				table.UserGroupTablesList.AddRange(usergrouptablesModelList.ChangeModelList<UserGroupTables, usp_UserGroupTables_UserGroupsByLinkedIDSelect_Result>());

				List<usp_Users_UserGroupsByLinkedIDSelect_Result> usersModelList = entity.usp_Users_UserGroupsByLinkedIDSelect(table.ID).ToList();
				table.UsersList.AddRange(usersModelList.ChangeModelList<Users, usp_Users_UserGroupsByLinkedIDSelect_Result>());

			}

			return table;
		}

		public bool Update(IUserGroups table)
		{
			var result = entity.usp_UserGroupsUpdate(table.ID, table.Name, table.ShortName, table.Description).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_UserGroupsCopy(id).FirstOrDefault();

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
				entity.usp_UserGroupsDelete(id);

				return true;
			}
			catch
			{
				return false;
			}
		}

		#endregion

		#region User Defined


		#endregion
	}
}
