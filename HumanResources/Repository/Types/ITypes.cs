using System;
using System.Collections.Generic;
using Repository.UserGroupTablesModel;

namespace Repository.TypesModel
{
	public interface ITypes
	{
		#region Model

		int ID { get; set; }
		string TypeName { get; set; }
		string Url { get; set; }
		string TableName { get; set; }
		bool Show { get; set; }

		string Mesaj { get; set; }

		List<IUserGroupTables> UserGroupTablesList { get; set; }

		#endregion

		#region Methods

		List<Types> List(int? id, int? top, bool relation);
		List<Types> ListAll(bool relation);
		ITypes Select(int? id, bool relation);
		ITypes SelectByUrl(string url, bool relation);
		ITypes Insert(ITypes table, bool? none);
		bool Insert(ITypes table);
		ITypes Update(int? id, ITypes table);
		bool Update(ITypes table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
