using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Repository.CarDetailsBasicModel;

namespace Repository.CarFeatsModelModel
{
	public interface ICarFeatsModel
	{
		#region Model

		int ID { get; set; }
		int MakeID { get; set; }
		string ModelName { get; set; }

		string Mesaj { get; set; }

		List<ICarDetailsBasic> CarDetailsBasicList { get; set; }

		List<SelectListItem> CarFeatsMakeList { get; set; }

		string CarFeatsMakeAdi { get; set; }

		#endregion

		#region Methods

		List<CarFeatsModel> List(int? id, int? top, bool relation);
		List<CarFeatsModel> ListAll(int? id, bool relation);
		ICarFeatsModel Select(int? id, bool relation);
		ICarFeatsModel Insert(ICarFeatsModel table, int? makeID);
		bool Insert(ICarFeatsModel table);
		ICarFeatsModel Update(int? id, ICarFeatsModel table);
		bool Update(ICarFeatsModel table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
