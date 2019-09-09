using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACar.Data;
using TDLibrary;

namespace Repository.WorkersTModel
{
	public class WorkersT : IWorkersT
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public WorkersT()
		{
			TranslationList = new List<SelectListItem>();
			WorkersList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int WorkersID { get; set; }
		public int TransID { get; set; }
		public string Position { get; set; }
		public string Description { get; set; }

		public string Mesaj { get; set; }

		public List<SelectListItem> TranslationList { get; set; }
		public List<SelectListItem> WorkersList { get; set; }

		public string TranslationAdi { get; set; }
		public string WorkersAdi { get; set; }

		#endregion

		#region Methods

		public List<WorkersT> List(int? id = null, int? top = null, bool relation = true)
		{
			List<WorkersT> table;

			List<usp_WorkersTLinkedSelect_Result> tableTemp;
			List<usp_WorkersTSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_WorkersTLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<WorkersT, usp_WorkersTLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_WorkersTSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<WorkersT, usp_WorkersTSelectTop_Result>();
			}

			if (relation)
			{
				foreach(WorkersT item in table)
				{
					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);

					List<usp_WorkersSelect_Result> tableWorkers = entity.usp_WorkersSelect(null).ToList();
					item.WorkersList = tableWorkers.ToSelectList<usp_WorkersSelect_Result, SelectListItem>("ID", "NameSurname", item.WorkersID);
				}
			}

			return table;
		}

		public List<WorkersT> ListAll(int? id = null, bool relation = true)
		{
			List<WorkersT> table;

			List<usp_WorkersTSelectAll_Result> tableTemp;

			tableTemp = entity.usp_WorkersTSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<WorkersT, usp_WorkersTSelectAll_Result>();

			if (relation)
			{
				foreach(WorkersT item in table)
				{
					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);

					List<usp_WorkersSelect_Result> tableWorkers = entity.usp_WorkersSelect(null).ToList();
					item.WorkersList = tableWorkers.ToSelectList<usp_WorkersSelect_Result, SelectListItem>("ID", "NameSurname", item.WorkersID);
				}
			}

			return table;
		}

		public IWorkersT Select(int? id, bool relation = true)
		{
			usp_WorkersTSelectTop_Result tableTemp = entity.usp_WorkersTSelectTop(id, 1).FirstOrDefault();
			WorkersT table = tableTemp.ChangeModel<WorkersT>();

			if (relation)
			{
				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);

				List<usp_WorkersSelect_Result> tableWorkers = entity.usp_WorkersSelect(null).ToList();
				table.WorkersList = tableWorkers.ToSelectList<usp_WorkersSelect_Result, SelectListItem>("ID", "NameSurname", table.WorkersID);
			}

			return table;
		}

		public IWorkersT Insert(IWorkersT table = null, int? transID = null, int? workersID = null)
		{
			if (table == null)
				table = new WorkersT();

			List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
			table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID",  "TransName", transID);

			List<usp_WorkersSelect_Result> tableWorkers = entity.usp_WorkersSelect(null).ToList();
			table.WorkersList = tableWorkers.ToSelectList<usp_WorkersSelect_Result, SelectListItem>("ID",  "NameSurname", workersID);

			return table;
		}

		public bool Insert(IWorkersT table)
		{
			var result = entity.usp_WorkersTInsert(table.WorkersID, table.TransID, table.Position, table.Description).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public IWorkersT Update(int? id = null, IWorkersT table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);

				List<usp_WorkersSelect_Result> tableWorkers = entity.usp_WorkersSelect(null).ToList();
				table.WorkersList = tableWorkers.ToSelectList<usp_WorkersSelect_Result, SelectListItem>("ID", "NameSurname", table.WorkersID);
			}

			return table;
		}

		public bool Update(IWorkersT table)
		{
			var result = entity.usp_WorkersTUpdate(table.ID, table.WorkersID, table.TransID, table.Position, table.Description).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_WorkersTCopy(id).FirstOrDefault();

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
				entity.usp_WorkersTDelete(id);

				return true;
			}
			catch
			{
				return false;
			}
		}

		#endregion
	}
}
