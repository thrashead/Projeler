using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using System.Linq;
using HumanResources.Data;
using TDLibrary;

namespace Repository.UserGroupRightsModel
{
	public class UserGroupRights : IUserGroupRights
	{
		readonly HumanResourcesEntities entity = new HumanResourcesEntities();

		#region Model

		public UserGroupRights()
		{
			UserGroupProcessList = new List<SelectListItem>();
			UserGroupTablesList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int UserGroupTableID { get; set; }
		public int UserGroupProcessID { get; set; }
		public bool Allow { get; set; }

		public string Mesaj { get; set; }

		public List<SelectListItem> UserGroupProcessList { get; set; }
		public List<SelectListItem> UserGroupTablesList { get; set; }

		public string UserGroupProcessAdi { get; set; }
		public string UserGroupTablesAdi { get; set; }

		#endregion

		#region Methods

		public List<UserGroupRights> List(int? id = null, int? top = null, bool relation = true)
		{
			List<UserGroupRights> table;

			List<usp_UserGroupRightsLinkedSelect_Result> tableTemp;
			List<usp_UserGroupRightsSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_UserGroupRightsLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<UserGroupRights, usp_UserGroupRightsLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_UserGroupRightsSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<UserGroupRights, usp_UserGroupRightsSelectTop_Result>();
			}

			if (relation)
			{
				foreach(UserGroupRights item in table)
				{
					List<usp_UserGroupProcessSelect_Result> tableUserGroupProcess = entity.usp_UserGroupProcessSelect(null).ToList();
					item.UserGroupProcessList = tableUserGroupProcess.ToSelectList<usp_UserGroupProcessSelect_Result, SelectListItem>("ID", "Name", item.UserGroupProcessID);

					List<usp_UserGroupTablesSelect_Result> tableUserGroupTables = entity.usp_UserGroupTablesSelect(null).ToList();
					item.UserGroupTablesList = tableUserGroupTables.ToSelectList<usp_UserGroupTablesSelect_Result, SelectListItem>("ID", "TypeID", item.UserGroupTableID);
				}
			}

			return table;
		}

		public List<UserGroupRights> ListAll(bool relation = true)
		{
			List<UserGroupRights> table;

			List<usp_UserGroupRightsSelectAll_Result> tableTemp;

			tableTemp = entity.usp_UserGroupRightsSelectAll().ToList();
			table = tableTemp.ChangeModelList<UserGroupRights, usp_UserGroupRightsSelectAll_Result>();

			if (relation)
			{
				foreach(UserGroupRights item in table)
				{
					List<usp_UserGroupProcessSelect_Result> tableUserGroupProcess = entity.usp_UserGroupProcessSelect(null).ToList();
					item.UserGroupProcessList = tableUserGroupProcess.ToSelectList<usp_UserGroupProcessSelect_Result, SelectListItem>("ID", "Name", item.UserGroupProcessID);

					List<usp_UserGroupTablesSelect_Result> tableUserGroupTables = entity.usp_UserGroupTablesSelect(null).ToList();
					item.UserGroupTablesList = tableUserGroupTables.ToSelectList<usp_UserGroupTablesSelect_Result, SelectListItem>("ID", "TypeID", item.UserGroupTableID);
				}
			}

			return table;
		}

		public IUserGroupRights Select(int? id, bool relation = true)
		{
			usp_UserGroupRightsSelectTop_Result tableTemp = entity.usp_UserGroupRightsSelectTop(id, 1).FirstOrDefault();
			UserGroupRights table = tableTemp.ChangeModel<UserGroupRights>();

			if (relation)
			{
				List<usp_UserGroupProcessSelect_Result> tableUserGroupProcess = entity.usp_UserGroupProcessSelect(null).ToList();
				table.UserGroupProcessList = tableUserGroupProcess.ToSelectList<usp_UserGroupProcessSelect_Result, SelectListItem>("ID", "Name", table.UserGroupProcessID);

				List<usp_UserGroupTablesSelect_Result> tableUserGroupTables = entity.usp_UserGroupTablesSelect(null).ToList();
				table.UserGroupTablesList = tableUserGroupTables.ToSelectList<usp_UserGroupTablesSelect_Result, SelectListItem>("ID", "TypeID", table.UserGroupTableID);
			}

			return table;
		}

		public IUserGroupRights Insert(IUserGroupRights table = null, int? userGroupProcessID = null, int? userGroupTableID = null)
		{
			if (table == null)
				table = new UserGroupRights();

			List<usp_UserGroupProcessSelect_Result> tableUserGroupProcess = entity.usp_UserGroupProcessSelect(null).ToList();
			table.UserGroupProcessList = tableUserGroupProcess.ToSelectList<usp_UserGroupProcessSelect_Result, SelectListItem>("ID",  "Name", userGroupProcessID);

			List<usp_UserGroupTablesSelect_Result> tableUserGroupTables = entity.usp_UserGroupTablesSelect(null).ToList();
			table.UserGroupTablesList = tableUserGroupTables.ToSelectList<usp_UserGroupTablesSelect_Result, SelectListItem>("ID",  "TypeID", userGroupTableID);

			return table;
		}

		public bool Insert(IUserGroupRights table)
		{
			var result = entity.usp_UserGroupRightsInsert(table.UserGroupTableID, table.UserGroupProcessID, table.Allow).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public IUserGroupRights Update(int? id = null, IUserGroupRights table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_UserGroupProcessSelect_Result> tableUserGroupProcess = entity.usp_UserGroupProcessSelect(null).ToList();
				table.UserGroupProcessList = tableUserGroupProcess.ToSelectList<usp_UserGroupProcessSelect_Result, SelectListItem>("ID", "Name", table.UserGroupProcessID);

				List<usp_UserGroupTablesSelect_Result> tableUserGroupTables = entity.usp_UserGroupTablesSelect(null).ToList();
				table.UserGroupTablesList = tableUserGroupTables.ToSelectList<usp_UserGroupTablesSelect_Result, SelectListItem>("ID", "TypeID", table.UserGroupTableID);
			}

			return table;
		}

		public bool Update(IUserGroupRights table)
		{
			var result = entity.usp_UserGroupRightsUpdate(table.ID, table.UserGroupTableID, table.UserGroupProcessID, table.Allow).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_UserGroupRightsCopy(id).FirstOrDefault();

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
				entity.usp_UserGroupRightsDelete(id);

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
