using System;
using System.Collections.Generic;

namespace Repository.WorkersModel
{
	public interface IWorkers
	{
		#region Model

		int ID { get; set; }
		string NameSurname { get; set; }
		string Position { get; set; }
		string Description { get; set; }
		string PictureUrl { get; set; }
		bool Deleted { get; set; }

		string Mesaj { get; set; }

		string OldPictureUrl { get; set; }

		bool? HasFile { get; set; }

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
