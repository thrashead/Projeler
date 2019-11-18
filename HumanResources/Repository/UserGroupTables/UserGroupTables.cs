using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using System.Linq;
using HumanResources.Data;
using TDLibrary;
using Repository.UserGroupRightsModel;

namespace Repository.UserGroupTablesModel
{
	public class UserGroupTables : IUserGroupTables
	{
		readonly HumanResourcesEntities entity = new HumanResourcesEntities();

		#region Model

		public UserGroupTables()
		{
			UserGroupRightsList = new List<IUserGroupRights>();
			TypesList = new List<SelectListItem>();
			UserGroupsList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int TypeID { get; set; }
		public int UserGroupID { get; set; }

		public string Mesaj { get; set; }

		public List<IUserGroupRights> UserGroupRightsList { get; set; }

		public List<SelectListItem> TypesList { get; set; }
		public List<SelectListItem> UserGroupsList { get; set; }

		public string TypesAdi { get; set; }
		public string UserGroupsAdi { get; set; }

		#endregion

		#region Methods

		public List<UserGroupTables> List(int? id = null, int? top = null, bool relation = true)
		{
			List<UserGroupTables> table;

			List<usp_UserGroupTablesLinkedSelect_Result> tableTemp;
			List<usp_UserGroupTablesSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_UserGroupTablesLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<UserGroupTables, usp_UserGroupTablesLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_UserGroupTablesSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<UserGroupTables, usp_UserGroupTablesSelectTop_Result>();
			}

			if (relation)
			{
				foreach(UserGroupTables item in table)
				{
					List<usp_TypesSelect_Result> tableTypes = entity.usp_TypesSelect(null).ToList();
					item.TypesList = tableTypes.ToSelectList<usp_TypesSelect_Result, SelectListItem>("ID", "TypeName", item.TypeID);

					List<usp_UserGroupsSelect_Result> tableUserGroups = entity.usp_UserGroupsSelect(null).ToList();
					item.UserGroupsList = tableUserGroups.ToSelectList<usp_UserGroupsSelect_Result, SelectListItem>("ID", "Name", item.UserGroupID);

					List<usp_UserGroupRights_UserGroupTablesByLinkedIDSelect_Result> usergrouprightsModelList = entity.usp_UserGroupRights_UserGroupTablesByLinkedIDSelect(item.ID).ToList();
					item.UserGroupRightsList.AddRange(usergrouprightsModelList.ChangeModelList<UserGroupRights, usp_UserGroupRights_UserGroupTablesByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public List<UserGroupTables> ListAll(bool relation = true)
		{
			List<UserGroupTables> table;

			List<usp_UserGroupTablesSelectAll_Result> tableTemp;

			tableTemp = entity.usp_UserGroupTablesSelectAll().ToList();
			table = tableTemp.ChangeModelList<UserGroupTables, usp_UserGroupTablesSelectAll_Result>();

			if (relation)
			{
				foreach(UserGroupTables item in table)
				{
					List<usp_TypesSelect_Result> tableTypes = entity.usp_TypesSelect(null).ToList();
					item.TypesList = tableTypes.ToSelectList<usp_TypesSelect_Result, SelectListItem>("ID", "TypeName", item.TypeID);

					List<usp_UserGroupsSelect_Result> tableUserGroups = entity.usp_UserGroupsSelect(null).ToList();
					item.UserGroupsList = tableUserGroups.ToSelectList<usp_UserGroupsSelect_Result, SelectListItem>("ID", "Name", item.UserGroupID);

					List<usp_UserGroupRights_UserGroupTablesByLinkedIDSelect_Result> usergrouprightsModelList = entity.usp_UserGroupRights_UserGroupTablesByLinkedIDSelect(item.ID).ToList();
					item.UserGroupRightsList.AddRange(usergrouprightsModelList.ChangeModelList<UserGroupRights, usp_UserGroupRights_UserGroupTablesByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public IUserGroupTables Select(int? id, bool relation = true)
		{
			usp_UserGroupTablesSelectTop_Result tableTemp = entity.usp_UserGroupTablesSelectTop(id, 1).FirstOrDefault();
			UserGroupTables table = tableTemp.ChangeModel<UserGroupTables>();

			if (relation)
			{
				List<usp_TypesSelect_Result> tableTypes = entity.usp_TypesSelect(null).ToList();
				table.TypesList = tableTypes.ToSelectList<usp_TypesSelect_Result, SelectListItem>("ID", "TypeName", table.TypeID);

				List<usp_UserGroupsSelect_Result> tableUserGroups = entity.usp_UserGroupsSelect(null).ToList();
				table.UserGroupsList = tableUserGroups.ToSelectList<usp_UserGroupsSelect_Result, SelectListItem>("ID", "Name", table.UserGroupID);

				List<usp_UserGroupRights_UserGroupTablesByLinkedIDSelect_Result> usergrouprightsModelList = entity.usp_UserGroupRights_UserGroupTablesByLinkedIDSelect(id).ToList();
				table.UserGroupRightsList.AddRange(usergrouprightsModelList.ChangeModelList<UserGroupRights, usp_UserGroupRights_UserGroupTablesByLinkedIDSelect_Result>());
			}

			return table;
		}

		public IUserGroupTables Insert(IUserGroupTables table = null, int? typeID = null, int? userGroupID = null)
		{
			if (table == null)
				table = new UserGroupTables();

			List<usp_TypesSelect_Result> tableTypes = entity.usp_TypesSelect(null).ToList();
			table.TypesList = tableTypes.ToSelectList<usp_TypesSelect_Result, SelectListItem>("ID",  "TypeName", typeID);

			List<usp_UserGroupsSelect_Result> tableUserGroups = entity.usp_UserGroupsSelect(null).ToList();
			table.UserGroupsList = tableUserGroups.ToSelectList<usp_UserGroupsSelect_Result, SelectListItem>("ID",  "Name", userGroupID);

			return table;
		}

		public bool Insert(IUserGroupTables table)
		{
			var result = entity.usp_UserGroupTablesInsert(table.TypeID, table.UserGroupID).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public IUserGroupTables Update(int? id = null, IUserGroupTables table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_TypesSelect_Result> tableTypes = entity.usp_TypesSelect(null).ToList();
				table.TypesList = tableTypes.ToSelectList<usp_TypesSelect_Result, SelectListItem>("ID", "TypeName", table.TypeID);


				List<usp_UserGroupsSelect_Result> tableUserGroups = entity.usp_UserGroupsSelect(null).ToList();
				table.UserGroupsList = tableUserGroups.ToSelectList<usp_UserGroupsSelect_Result, SelectListItem>("ID", "Name", table.UserGroupID);

				List<usp_UserGroupRights_UserGroupTablesByLinkedIDSelect_Result> usergrouprightsModelList = entity.usp_UserGroupRights_UserGroupTablesByLinkedIDSelect(table.ID).ToList();
				table.UserGroupRightsList.AddRange(usergrouprightsModelList.ChangeModelList<UserGroupRights, usp_UserGroupRights_UserGroupTablesByLinkedIDSelect_Result>());
			}

			return table;
		}

		public bool Update(IUserGroupTables table)
		{
			var result = entity.usp_UserGroupTablesUpdate(table.ID, table.TypeID, table.UserGroupID).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_UserGroupTablesCopy(id).FirstOrDefault();

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
				entity.usp_UserGroupTablesDelete(id);

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
