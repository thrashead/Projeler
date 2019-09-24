using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.CarFeatsFuelTypeTModel
{
	public interface ICarFeatsFuelTypeT
	{
		#region Model

		int ID { get; set; }
		int FuelTypeID { get; set; }
		int TransID { get; set; }
		string Name { get; set; }

		string Mesaj { get; set; }

		List<SelectListItem> CarFeatsFuelTypeList { get; set; }
		List<SelectListItem> TranslationList { get; set; }

		string CarFeatsFuelTypeAdi { get; set; }
		string TranslationAdi { get; set; }

		#endregion

		#region Methods

		List<CarFeatsFuelTypeT> List(int? id, int? top, bool relation);
		List<CarFeatsFuelTypeT> ListAll(int? id, bool relation);
		ICarFeatsFuelTypeT Select(int? id, bool relation);
		ICarFeatsFuelTypeT Insert(ICarFeatsFuelTypeT table, int? fuelTypeID, int? transID);
		bool Insert(ICarFeatsFuelTypeT table);
		ICarFeatsFuelTypeT Update(int? id, ICarFeatsFuelTypeT table);
		bool Update(ICarFeatsFuelTypeT table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
