using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.WorkersTModel
{
	public interface IWorkersT
	{
		#region Model

		int ID { get; set; }
		int WorkersID { get; set; }
		int TransID { get; set; }
		string Position { get; set; }
		string Description { get; set; }

		string Mesaj { get; set; }

		List<SelectListItem> TranslationList { get; set; }
		List<SelectListItem> WorkersList { get; set; }

		string TranslationAdi { get; set; }
		string WorkersAdi { get; set; }

		#endregion

		#region Methods

		List<WorkersT> List(int? id, int? top, bool relation);
		List<WorkersT> ListAll(int? id, bool relation);
		IWorkersT Select(int? id, bool relation);
		IWorkersT Insert(IWorkersT table, int? transID, int? workersID);
		bool Insert(IWorkersT table);
		IWorkersT Update(int? id, IWorkersT table);
		bool Update(IWorkersT table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
