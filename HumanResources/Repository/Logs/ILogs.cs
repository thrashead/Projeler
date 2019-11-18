using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.LogsModel
{
	public interface ILogs
	{
		#region Model

		int ID { get; set; }
		int UserID { get; set; }
		int LogProcessID { get; set; }
		string ProcessTime { get; set; }
		string Description { get; set; }

		string Mesaj { get; set; }

		List<SelectListItem> LogProcessList { get; set; }
		List<SelectListItem> UsersList { get; set; }

		string LogProcessAdi { get; set; }
		string UsersAdi { get; set; }

		#endregion

		#region Methods

		List<Logs> List(int? id, int? top, bool relation);
		List<Logs> ListAll(bool relation);
		ILogs Select(int? id, bool relation);

		#endregion
	}
}
