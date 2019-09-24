using System;
using System.Collections.Generic;
using Repository.CarDetailsExtIntModel;
using Repository.CarFeatsBodyTypeTModel;

namespace Repository.CarFeatsBodyTypeModel
{
	public interface ICarFeatsBodyType
	{
		#region Model

		int ID { get; set; }
		string Title { get; set; }

		string Mesaj { get; set; }

		List<ICarDetailsExtInt> CarDetailsExtIntList { get; set; }
		List<ICarFeatsBodyTypeT> CarFeatsBodyTypeTList { get; set; }

		#endregion

		#region Methods

		List<CarFeatsBodyType> List(int? id, int? top, bool relation);
		List<CarFeatsBodyType> ListAll(int? id, bool relation);
		ICarFeatsBodyType Select(int? id, bool relation);
		ICarFeatsBodyType Insert(ICarFeatsBodyType table, bool? none);
		bool Insert(ICarFeatsBodyType table);
		ICarFeatsBodyType Update(int? id, ICarFeatsBodyType table);
		bool Update(ICarFeatsBodyType table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
