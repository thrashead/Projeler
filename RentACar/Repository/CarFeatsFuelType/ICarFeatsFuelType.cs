using System;
using System.Collections.Generic;
using Repository.CarDetailsMechanicalModel;
using Repository.CarFeatsFuelTypeTModel;

namespace Repository.CarFeatsFuelTypeModel
{
	public interface ICarFeatsFuelType
	{
		#region Model

		int ID { get; set; }
		string Title { get; set; }

		string Mesaj { get; set; }

		List<ICarDetailsMechanical> CarDetailsMechanicalList { get; set; }
		List<ICarFeatsFuelTypeT> CarFeatsFuelTypeTList { get; set; }

		#endregion

		#region Methods

		List<CarFeatsFuelType> List(int? id, int? top, bool relation);
		List<CarFeatsFuelType> ListAll(int? id, bool relation);
		ICarFeatsFuelType Select(int? id, bool relation);
		ICarFeatsFuelType Insert(ICarFeatsFuelType table, bool? none);
		bool Insert(ICarFeatsFuelType table);
		ICarFeatsFuelType Update(int? id, ICarFeatsFuelType table);
		bool Update(ICarFeatsFuelType table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
