using System;
using System.Collections.Generic;
using Repository.UserGroupTablesModel;
using Repository.UsersModel;

namespace Repository.UserGroupsModel
{
	public interface IUserGroups
	{
		#region Model

		int ID { get; set; }
		string Name { get; set; }
		string ShortName { get; set; }
		string Description { get; set; }

		string Mesaj { get; set; }

		List<IUserGroupTables> UserGroupTablesList { get; set; }
		List<IUsers> UsersList { get; set; }

		#endregion

		#region Methods

		List<UserGroups> List(int? id, int? top, bool relation);
		List<UserGroups> ListAll(bool relation);
		IUserGroups Select(int? id, bool relation);
		IUserGroups Insert(IUserGroups table, bool? none);
		bool Insert(IUserGroups table);
		IUserGroups Update(int? id, IUserGroups table);
		bool Update(IUserGroups table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
