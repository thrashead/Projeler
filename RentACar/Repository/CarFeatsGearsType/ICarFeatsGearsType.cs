using System;
using System.Collections.Generic;
using Repository.CarDetailsMechanicalModel;
using Repository.CarFeatsGearsTypeTModel;

namespace Repository.CarFeatsGearsTypeModel
{
	public interface ICarFeatsGearsType
	{
		#region Model

		int ID { get; set; }
		string Title { get; set; }

		string Mesaj { get; set; }

		List<ICarDetailsMechanical> CarDetailsMechanicalList { get; set; }
		List<ICarFeatsGearsTypeT> CarFeatsGearsTypeTList { get; set; }

		#endregion

		#region Methods

		List<CarFeatsGearsType> List(int? id, int? top, bool relation);
		List<CarFeatsGearsType> ListAll(int? id, bool relation);
		ICarFeatsGearsType Select(int? id, bool relation);
		ICarFeatsGearsType Insert(ICarFeatsGearsType table, bool? none);
		bool Insert(ICarFeatsGearsType table);
		ICarFeatsGearsType Update(int? id, ICarFeatsGearsType table);
		bool Update(ICarFeatsGearsType table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
