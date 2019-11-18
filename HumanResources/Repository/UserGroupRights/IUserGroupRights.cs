using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.UserGroupRightsModel
{
	public interface IUserGroupRights
	{
		#region Model

		int ID { get; set; }
		int UserGroupTableID { get; set; }
		int UserGroupProcessID { get; set; }
		bool Allow { get; set; }

		string Mesaj { get; set; }

		List<SelectListItem> UserGroupProcessList { get; set; }
		List<SelectListItem> UserGroupTablesList { get; set; }

		string UserGroupProcessAdi { get; set; }
		string UserGroupTablesAdi { get; set; }

		#endregion

		#region Methods

		List<UserGroupRights> List(int? id, int? top, bool relation);
		List<UserGroupRights> ListAll(bool relation);
		IUserGroupRights Select(int? id, bool relation);
		IUserGroupRights Insert(IUserGroupRights table, int? userGroupProcessID, int? userGroupTableID);
		bool Insert(IUserGroupRights table);
		IUserGroupRights Update(int? id, IUserGroupRights table);
		bool Update(IUserGroupRights table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
