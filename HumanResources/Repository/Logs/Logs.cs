using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using System.Linq;
using HumanResources.Data;
using TDLibrary;

namespace Repository.LogsModel
{
	public class Logs : ILogs
	{
		readonly HumanResourcesEntities entity = new HumanResourcesEntities();

		#region Model

		public Logs()
		{
			LogProcessList = new List<SelectListItem>();
			UsersList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int UserID { get; set; }
		public int LogProcessID { get; set; }
		public string ProcessTime { get; set; }
		public string Description { get; set; }

		public string Mesaj { get; set; }

		public List<SelectListItem> LogProcessList { get; set; }
		public List<SelectListItem> UsersList { get; set; }

		public string LogProcessAdi { get; set; }
		public string UsersAdi { get; set; }

		#endregion

		#region Methods

		public List<Logs> List(int? id = null, int? top = null, bool relation = true)
		{
			List<Logs> table;

			List<usp_LogsLinkedSelect_Result> tableTemp;
			List<usp_LogsSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_LogsLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<Logs, usp_LogsLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_LogsSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<Logs, usp_LogsSelectTop_Result>();
			}

			if (relation)
			{
				foreach(Logs item in table)
				{
					List<usp_LogProcessSelect_Result> tableLogProcess = entity.usp_LogProcessSelect(null).ToList();
					item.LogProcessList = tableLogProcess.ToSelectList<usp_LogProcessSelect_Result, SelectListItem>("ID", "Name", item.LogProcessID);

					List<usp_UsersSelect_Result> tableUsers = entity.usp_UsersSelect(null).ToList();
					item.UsersList = tableUsers.ToSelectList<usp_UsersSelect_Result, SelectListItem>("ID", "Username", item.UserID);
				}
			}

			return table;
		}

		public List<Logs> ListAll(bool relation = true)
		{
			List<Logs> table;

			List<usp_LogsSelectAll_Result> tableTemp;

			tableTemp = entity.usp_LogsSelectAll().ToList();
			table = tableTemp.ChangeModelList<Logs, usp_LogsSelectAll_Result>();

			if (relation)
			{
				foreach(Logs item in table)
				{
					List<usp_LogProcessSelect_Result> tableLogProcess = entity.usp_LogProcessSelect(null).ToList();
					item.LogProcessList = tableLogProcess.ToSelectList<usp_LogProcessSelect_Result, SelectListItem>("ID", "Name", item.LogProcessID);

					List<usp_UsersSelect_Result> tableUsers = entity.usp_UsersSelect(null).ToList();
					item.UsersList = tableUsers.ToSelectList<usp_UsersSelect_Result, SelectListItem>("ID", "Username", item.UserID);
				}
			}

			return table;
		}

		public ILogs Select(int? id, bool relation = true)
		{
			usp_LogsSelectTop_Result tableTemp = entity.usp_LogsSelectTop(id, 1).FirstOrDefault();
			Logs table = tableTemp.ChangeModel<Logs>();

			if (relation)
			{
				List<usp_LogProcessSelect_Result> tableLogProcess = entity.usp_LogProcessSelect(null).ToList();
				table.LogProcessList = tableLogProcess.ToSelectList<usp_LogProcessSelect_Result, SelectListItem>("ID", "Name", table.LogProcessID);

				List<usp_UsersSelect_Result> tableUsers = entity.usp_UsersSelect(null).ToList();
				table.UsersList = tableUsers.ToSelectList<usp_UsersSelect_Result, SelectListItem>("ID", "Username", table.UserID);
			}

			return table;
		}

		public bool Clear()
		{
			try
			{
				entity.usp_LogsClear();

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
