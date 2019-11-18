using System;
using System.Collections.Generic;
using Repository.LogProcessModel;

namespace Repository.LogTypesModel
{
	public interface ILogTypes
	{
		#region Model

		int ID { get; set; }
		string Name { get; set; }
		string ShortName { get; set; }

		string Mesaj { get; set; }

		List<ILogProcess> LogProcessList { get; set; }

		#endregion

		#region Methods

		List<LogTypes> List(int? id, int? top, bool relation);
		List<LogTypes> ListAll(bool relation);
		ILogTypes Select(int? id, bool relation);
		ILogTypes Insert(ILogTypes table, bool? none);
		bool Insert(ILogTypes table);
		ILogTypes Update(int? id, ILogTypes table);
		bool Update(ILogTypes table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
