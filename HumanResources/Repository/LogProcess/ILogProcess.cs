using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Repository.LogsModel;

namespace Repository.LogProcessModel
{
	public interface ILogProcess
	{
		#region Model

		int ID { get; set; }
		int LogTypeID { get; set; }
		string Name { get; set; }
		string ShortName { get; set; }
		string Description { get; set; }

		string Mesaj { get; set; }

		List<ILogs> LogsList { get; set; }

		List<SelectListItem> LogTypesList { get; set; }

		string LogTypesAdi { get; set; }

		#endregion

		#region Methods

		List<LogProcess> List(int? id, int? top, bool relation);
		List<LogProcess> ListAll(bool relation);
		ILogProcess Select(int? id, bool relation);
		ILogProcess Insert(ILogProcess table, int? logTypeID);
		bool Insert(ILogProcess table);
		ILogProcess Update(int? id, ILogProcess table);
		bool Update(ILogProcess table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
