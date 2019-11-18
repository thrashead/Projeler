using System;
using System.Collections.Generic;
using System.Web;
using System.Linq;
using HumanResources.Data;
using TDLibrary;
using Repository.UserGroupRightsModel;

namespace Repository.UserGroupProcessModel
{
	public class UserGroupProcess : IUserGroupProcess
	{
		readonly HumanResourcesEntities entity = new HumanResourcesEntities();

		#region Model

		public UserGroupProcess()
		{
			UserGroupRightsList = new List<IUserGroupRights>();
		}

		public int ID { get; set; }
		public string Name { get; set; }
		public string ShortName { get; set; }
		public string Description { get; set; }

		public string Mesaj { get; set; }

		public List<IUserGroupRights> UserGroupRightsList { get; set; }

		#endregion

		#region Methods

		public List<UserGroupProcess> List(int? id = null, int? top = null, bool relation = true)
		{
			List<UserGroupProcess> table;

			List<usp_UserGroupProcessSelect_Result> tableTemp;
			List<usp_UserGroupProcessSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_UserGroupProcessSelect(id).ToList();
				table = tableTemp.ChangeModelList<UserGroupProcess, usp_UserGroupProcessSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_UserGroupProcessSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<UserGroupProcess, usp_UserGroupProcessSelectTop_Result>();
			}

			if (relation)
			{
				foreach(UserGroupProcess item in table)
				{
					List<usp_UserGroupRights_UserGroupProcessByLinkedIDSelect_Result> usergrouprightsModelList = entity.usp_UserGroupRights_UserGroupProcessByLinkedIDSelect(item.ID).ToList();
					item.UserGroupRightsList.AddRange(usergrouprightsModelList.ChangeModelList<UserGroupRights, usp_UserGroupRights_UserGroupProcessByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public List<UserGroupProcess> ListAll(bool relation = true)
		{
			List<UserGroupProcess> table;

			List<usp_UserGroupProcessSelectAll_Result> tableTemp;

			tableTemp = entity.usp_UserGroupProcessSelectAll().ToList();
			table = tableTemp.ChangeModelList<UserGroupProcess, usp_UserGroupProcessSelectAll_Result>();

			if (relation)
			{
				foreach(UserGroupProcess item in table)
				{
					List<usp_UserGroupRights_UserGroupProcessByLinkedIDSelect_Result> usergrouprightsModelList = entity.usp_UserGroupRights_UserGroupProcessByLinkedIDSelect(item.ID).ToList();
					item.UserGroupRightsList.AddRange(usergrouprightsModelList.ChangeModelList<UserGroupRights, usp_UserGroupRights_UserGroupProcessByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public IUserGroupProcess Select(int? id, bool relation = true)
		{
			usp_UserGroupProcessSelectTop_Result tableTemp = entity.usp_UserGroupProcessSelectTop(id, 1).FirstOrDefault();
			UserGroupProcess table = tableTemp.ChangeModel<UserGroupProcess>();

			if (relation)
			{
				List<usp_UserGroupRights_UserGroupProcessByLinkedIDSelect_Result> usergrouprightsModelList = entity.usp_UserGroupRights_UserGroupProcessByLinkedIDSelect(id).ToList();
				table.UserGroupRightsList.AddRange(usergrouprightsModelList.ChangeModelList<UserGroupRights, usp_UserGroupRights_UserGroupProcessByLinkedIDSelect_Result>());
			}

			return table;
		}

		public IUserGroupProcess Insert(IUserGroupProcess table = null, bool? none = null)
		{
			if (table == null)
				table = new UserGroupProcess();

			return table;
		}

		public bool Insert(IUserGroupProcess table)
		{
			var result = entity.usp_UserGroupProcessInsert(table.Name, table.ShortName, table.Description).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public IUserGroupProcess Update(int? id = null, IUserGroupProcess table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_UserGroupRights_UserGroupProcessByLinkedIDSelect_Result> usergrouprightsModelList = entity.usp_UserGroupRights_UserGroupProcessByLinkedIDSelect(table.ID).ToList();
				table.UserGroupRightsList.AddRange(usergrouprightsModelList.ChangeModelList<UserGroupRights, usp_UserGroupRights_UserGroupProcessByLinkedIDSelect_Result>());
			}

			return table;
		}

		public bool Update(IUserGroupProcess table)
		{
			var result = entity.usp_UserGroupProcessUpdate(table.ID, table.Name, table.ShortName, table.Description).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_UserGroupProcessCopy(id).FirstOrDefault();

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
				entity.usp_UserGroupProcessDelete(id);

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
