using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Repository.UserGroupRightsModel;

namespace Repository.UserGroupTablesModel
{
	public interface IUserGroupTables
	{
		#region Model

		int ID { get; set; }
		int TypeID { get; set; }
		int UserGroupID { get; set; }

		string Mesaj { get; set; }

		List<IUserGroupRights> UserGroupRightsList { get; set; }

		List<SelectListItem> TypesList { get; set; }
		List<SelectListItem> UserGroupsList { get; set; }

		string TypesAdi { get; set; }
		string UserGroupsAdi { get; set; }

		#endregion

		#region Methods

		List<UserGroupTables> List(int? id, int? top, bool relation);
		List<UserGroupTables> ListAll(bool relation);
		IUserGroupTables Select(int? id, bool relation);
		IUserGroupTables Insert(IUserGroupTables table, int? typeID, int? userGroupID);
		bool Insert(IUserGroupTables table);
		IUserGroupTables Update(int? id, IUserGroupTables table);
		bool Update(IUserGroupTables table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
