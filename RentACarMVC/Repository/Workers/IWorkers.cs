using System;
using System.Collections.Generic;
using Repository.WorkersTModel;

namespace Repository.WorkersModel
{
	public interface IWorkers
	{
		#region Model

		int ID { get; set; }
		string NameSurname { get; set; }
		string PictureUrl { get; set; }
		string Facebook { get; set; }
		string Twitter { get; set; }
		string Pinterest { get; set; }
        bool Deleted { get; set; }

		string Mesaj { get; set; }

        bool? HasFile { get; set; }
        string OldPictureUrl { get; set; }

		List<IWorkersT> WorkersTList { get; set; }

		#endregion

		#region Methods

		List<Workers> List(int? id, int? top, bool relation);
		List<Workers> ListAll(int? id, bool relation);
		IWorkers Select(int? id, bool relation);
		IWorkers Insert(IWorkers table, bool? none);
		bool Insert(IWorkers table);
		IWorkers Update(int? id, IWorkers table);
		bool Update(IWorkers table);
		bool Copy(int id);
		bool Delete(int? id);
		bool Remove(int? id);

		#endregion
	}
}
