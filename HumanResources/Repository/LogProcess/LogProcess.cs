using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using System.Linq;
using HumanResources.Data;
using TDLibrary;
using Repository.LogsModel;

namespace Repository.LogProcessModel
{
	public class LogProcess : ILogProcess
	{
		readonly HumanResourcesEntities entity = new HumanResourcesEntities();

		#region Model

		public LogProcess()
		{
			LogsList = new List<ILogs>();
			LogTypesList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int LogTypeID { get; set; }
		public string Name { get; set; }
		public string ShortName { get; set; }
		public string Description { get; set; }

		public string Mesaj { get; set; }

		public List<ILogs> LogsList { get; set; }

		public List<SelectListItem> LogTypesList { get; set; }

		public string LogTypesAdi { get; set; }

		#endregion

		#region Methods

		public List<LogProcess> List(int? id = null, int? top = null, bool relation = true)
		{
			List<LogProcess> table;

			List<usp_LogProcessLinkedSelect_Result> tableTemp;
			List<usp_LogProcessSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_LogProcessLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<LogProcess, usp_LogProcessLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_LogProcessSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<LogProcess, usp_LogProcessSelectTop_Result>();
			}

			if (relation)
			{
				foreach(LogProcess item in table)
				{
					List<usp_LogTypesSelect_Result> tableLogTypes = entity.usp_LogTypesSelect(null).ToList();
					item.LogTypesList = tableLogTypes.ToSelectList<usp_LogTypesSelect_Result, SelectListItem>("ID", "Name", item.LogTypeID);

					List<usp_Logs_LogProcessByLinkedIDSelect_Result> logsModelList = entity.usp_Logs_LogProcessByLinkedIDSelect(item.ID).ToList();
					item.LogsList.AddRange(logsModelList.ChangeModelList<Logs, usp_Logs_LogProcessByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public List<LogProcess> ListAll(bool relation = true)
		{
			List<LogProcess> table;

			List<usp_LogProcessSelectAll_Result> tableTemp;

			tableTemp = entity.usp_LogProcessSelectAll().ToList();
			table = tableTemp.ChangeModelList<LogProcess, usp_LogProcessSelectAll_Result>();

			if (relation)
			{
				foreach(LogProcess item in table)
				{
					List<usp_LogTypesSelect_Result> tableLogTypes = entity.usp_LogTypesSelect(null).ToList();
					item.LogTypesList = tableLogTypes.ToSelectList<usp_LogTypesSelect_Result, SelectListItem>("ID", "Name", item.LogTypeID);

					List<usp_Logs_LogProcessByLinkedIDSelect_Result> logsModelList = entity.usp_Logs_LogProcessByLinkedIDSelect(item.ID).ToList();
					item.LogsList.AddRange(logsModelList.ChangeModelList<Logs, usp_Logs_LogProcessByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public ILogProcess Select(int? id, bool relation = true)
		{
			usp_LogProcessSelectTop_Result tableTemp = entity.usp_LogProcessSelectTop(id, 1).FirstOrDefault();
			LogProcess table = tableTemp.ChangeModel<LogProcess>();

			if (relation)
			{
				List<usp_LogTypesSelect_Result> tableLogTypes = entity.usp_LogTypesSelect(null).ToList();
				table.LogTypesList = tableLogTypes.ToSelectList<usp_LogTypesSelect_Result, SelectListItem>("ID", "Name", table.LogTypeID);

				List<usp_Logs_LogProcessByLinkedIDSelect_Result> logsModelList = entity.usp_Logs_LogProcessByLinkedIDSelect(id).ToList();
				table.LogsList.AddRange(logsModelList.ChangeModelList<Logs, usp_Logs_LogProcessByLinkedIDSelect_Result>());
			}

			return table;
		}

		public ILogProcess Insert(ILogProcess table = null, int? logTypeID = null)
		{
			if (table == null)
				table = new LogProcess();

			List<usp_LogTypesSelect_Result> tableLogTypes = entity.usp_LogTypesSelect(null).ToList();
			table.LogTypesList = tableLogTypes.ToSelectList<usp_LogTypesSelect_Result, SelectListItem>("ID",  "Name", logTypeID);

			return table;
		}

		public bool Insert(ILogProcess table)
		{
			var result = entity.usp_LogProcessInsert(table.LogTypeID, table.Name, table.ShortName, table.Description).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ILogProcess Update(int? id = null, ILogProcess table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_LogTypesSelect_Result> tableLogTypes = entity.usp_LogTypesSelect(null).ToList();
				table.LogTypesList = tableLogTypes.ToSelectList<usp_LogTypesSelect_Result, SelectListItem>("ID", "Name", table.LogTypeID);

				List<usp_Logs_LogProcessByLinkedIDSelect_Result> logsModelList = entity.usp_Logs_LogProcessByLinkedIDSelect(table.ID).ToList();
				table.LogsList.AddRange(logsModelList.ChangeModelList<Logs, usp_Logs_LogProcessByLinkedIDSelect_Result>());
			}

			return table;
		}

		public bool Update(ILogProcess table)
		{
			var result = entity.usp_LogProcessUpdate(table.ID, table.LogTypeID, table.Name, table.ShortName, table.Description).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_LogProcessCopy(id).FirstOrDefault();

				return result == null ? false : true;
			}
			catch
			{
				return false;
			}
		}

		public bool Delete(int? id = null)
		{
			try
			{
				entity.usp_LogProcessDelete(id);

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
