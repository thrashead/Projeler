using System;
using System.Collections.Generic;
using Repository.CarDetailsMechanicalModel;
using Repository.CarFeatsEngineTypeTModel;

namespace Repository.CarFeatsEngineTypeModel
{
	public interface ICarFeatsEngineType
	{
		#region Model

		int ID { get; set; }
		string Title { get; set; }

		string Mesaj { get; set; }

		List<ICarDetailsMechanical> CarDetailsMechanicalList { get; set; }
		List<ICarFeatsEngineTypeT> CarFeatsEngineTypeTList { get; set; }

		#endregion

		#region Methods

		List<CarFeatsEngineType> List(int? id, int? top, bool relation);
		List<CarFeatsEngineType> ListAll(int? id, bool relation);
		ICarFeatsEngineType Select(int? id, bool relation);
		ICarFeatsEngineType Insert(ICarFeatsEngineType table, bool? none);
		bool Insert(ICarFeatsEngineType table);
		ICarFeatsEngineType Update(int? id, ICarFeatsEngineType table);
		bool Update(ICarFeatsEngineType table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
