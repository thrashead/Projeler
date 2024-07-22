using System;
using System.Collections.Generic;
using Repository.CarDetailsExtIntModel;
using Repository.CarFeatsDriveTypeTModel;

namespace Repository.CarFeatsDriveTypeModel
{
	public interface ICarFeatsDriveType
	{
		#region Model

		int ID { get; set; }
		string Title { get; set; }
		string Code { get; set; }

		string Mesaj { get; set; }

		List<ICarDetailsExtInt> CarDetailsExtIntList { get; set; }
		List<ICarFeatsDriveTypeT> CarFeatsDriveTypeTList { get; set; }

		#endregion

		#region Methods

		List<CarFeatsDriveType> List(int? id, int? top, bool relation);
		List<CarFeatsDriveType> ListAll(int? id, bool relation);
		ICarFeatsDriveType Select(int? id, bool relation);
		List<CarFeatsDriveType> SelectByCode(string code, bool relation);
		ICarFeatsDriveType Insert(ICarFeatsDriveType table, bool? none);
		bool Insert(ICarFeatsDriveType table);
		ICarFeatsDriveType Update(int? id, ICarFeatsDriveType table);
		bool Update(ICarFeatsDriveType table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
