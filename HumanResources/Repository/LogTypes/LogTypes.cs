using System;
using System.Collections.Generic;
using System.Web;
using System.Linq;
using HumanResources.Data;
using TDLibrary;
using Repository.LogProcessModel;

namespace Repository.LogTypesModel
{
	public class LogTypes : ILogTypes
	{
		readonly HumanResourcesEntities entity = new HumanResourcesEntities();

		#region Model

		public LogTypes()
		{
			LogProcessList = new List<ILogProcess>();
		}

		public int ID { get; set; }
		public string Name { get; set; }
		public string ShortName { get; set; }

		public string Mesaj { get; set; }

		public List<ILogProcess> LogProcessList { get; set; }

		#endregion

		#region Methods

		public List<LogTypes> List(int? id = null, int? top = null, bool relation = true)
		{
			List<LogTypes> table;

			List<usp_LogTypesSelect_Result> tableTemp;
			List<usp_LogTypesSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_LogTypesSelect(id).ToList();
				table = tableTemp.ChangeModelList<LogTypes, usp_LogTypesSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_LogTypesSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<LogTypes, usp_LogTypesSelectTop_Result>();
			}

			if (relation)
			{
				foreach(LogTypes item in table)
				{
					List<usp_LogProcess_LogTypesByLinkedIDSelect_Result> logprocessModelList = entity.usp_LogProcess_LogTypesByLinkedIDSelect(item.ID).ToList();
					item.LogProcessList.AddRange(logprocessModelList.ChangeModelList<LogProcess, usp_LogProcess_LogTypesByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public List<LogTypes> ListAll(bool relation = true)
		{
			List<LogTypes> table;

			List<usp_LogTypesSelectAll_Result> tableTemp;

			tableTemp = entity.usp_LogTypesSelectAll().ToList();
			table = tableTemp.ChangeModelList<LogTypes, usp_LogTypesSelectAll_Result>();

			if (relation)
			{
				foreach(LogTypes item in table)
				{
					List<usp_LogProcess_LogTypesByLinkedIDSelect_Result> logprocessModelList = entity.usp_LogProcess_LogTypesByLinkedIDSelect(item.ID).ToList();
					item.LogProcessList.AddRange(logprocessModelList.ChangeModelList<LogProcess, usp_LogProcess_LogTypesByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public ILogTypes Select(int? id, bool relation = true)
		{
			usp_LogTypesSelectTop_Result tableTemp = entity.usp_LogTypesSelectTop(id, 1).FirstOrDefault();
			LogTypes table = tableTemp.ChangeModel<LogTypes>();

			if (relation)
			{
				List<usp_LogProcess_LogTypesByLinkedIDSelect_Result> logprocessModelList = entity.usp_LogProcess_LogTypesByLinkedIDSelect(id).ToList();
				table.LogProcessList.AddRange(logprocessModelList.ChangeModelList<LogProcess, usp_LogProcess_LogTypesByLinkedIDSelect_Result>());
			}

			return table;
		}

		public ILogTypes Insert(ILogTypes table = null, bool? none = null)
		{
			if (table == null)
				table = new LogTypes();

			return table;
		}

		public bool Insert(ILogTypes table)
		{
			var result = entity.usp_LogTypesInsert(table.Name, table.ShortName).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ILogTypes Update(int? id = null, ILogTypes table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_LogProcess_LogTypesByLinkedIDSelect_Result> logprocessModelList = entity.usp_LogProcess_LogTypesByLinkedIDSelect(table.ID).ToList();
				table.LogProcessList.AddRange(logprocessModelList.ChangeModelList<LogProcess, usp_LogProcess_LogTypesByLinkedIDSelect_Result>());
			}

			return table;
		}

		public bool Update(ILogTypes table)
		{
			var result = entity.usp_LogTypesUpdate(table.ID, table.Name, table.ShortName).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_LogTypesCopy(id).FirstOrDefault();

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
				entity.usp_LogTypesDelete(id);

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
