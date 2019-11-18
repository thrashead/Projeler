using System;
using System.Collections.Generic;
using Repository.UserGroupRightsModel;

namespace Repository.UserGroupProcessModel
{
	public interface IUserGroupProcess
	{
		#region Model

		int ID { get; set; }
		string Name { get; set; }
		string ShortName { get; set; }
		string Description { get; set; }

		string Mesaj { get; set; }

		List<IUserGroupRights> UserGroupRightsList { get; set; }

		#endregion

		#region Methods

		List<UserGroupProcess> List(int? id, int? top, bool relation);
		List<UserGroupProcess> ListAll(bool relation);
		IUserGroupProcess Select(int? id, bool relation);
		IUserGroupProcess Insert(IUserGroupProcess table, bool? none);
		bool Insert(IUserGroupProcess table);
		IUserGroupProcess Update(int? id, IUserGroupProcess table);
		bool Update(IUserGroupProcess table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
