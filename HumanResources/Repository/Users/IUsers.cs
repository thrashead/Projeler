using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Repository.LogsModel;

namespace Repository.UsersModel
{
	public interface IUsers
	{
		#region Model

		int ID { get; set; }
		int GroupID { get; set; }
		string Username { get; set; }
		string Password { get; set; }
		bool Active { get; set; }
		string LoginTime { get; set; }
		bool Deleted { get; set; }

		string Mesaj { get; set; }

		List<ILogs> LogsList { get; set; }

		List<SelectListItem> UserGroupsList { get; set; }

		string UserGroupsAdi { get; set; }

		#endregion

		#region Methods

		List<Users> List(int? id, int? top, bool relation);
		List<Users> ListAll(bool relation);
		IUsers Select(int? id, bool relation);
		IUsers Insert(IUsers table, int? groupID);
		bool Insert(IUsers table);
		IUsers Update(int? id, IUsers table);
		bool Update(IUsers table, int? curUserID);
		bool Copy(int id);
		bool Delete(int? id);
		bool Remove(int? id);
		IUsers ChangeGroup(int id, IUsers table);
		bool ChangeGroup(IUsers table);

		#endregion
	}
}
