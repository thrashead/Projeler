using System;
using System.Collections.Generic;
using Repository.CarsModel;
using Repository.CarStatusTModel;

namespace Repository.CarStatusModel
{
	public interface ICarStatus
	{
		#region Model

		int ID { get; set; }
		string Title { get; set; }

		string Mesaj { get; set; }

		List<ICars> CarsList { get; set; }
		List<ICarStatusT> CarStatusTList { get; set; }

		#endregion

		#region Methods

		List<CarStatus> List(int? id, int? top, bool relation);
		List<CarStatus> ListAll(int? id, bool relation);
		ICarStatus Select(int? id, bool relation);
		ICarStatus Insert(ICarStatus table, bool? none);
		bool Insert(ICarStatus table);
		ICarStatus Update(int? id, ICarStatus table);
		bool Update(ICarStatus table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
