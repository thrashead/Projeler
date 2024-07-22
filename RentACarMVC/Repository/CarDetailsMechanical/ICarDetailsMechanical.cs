using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.CarDetailsMechanicalModel
{
	public interface ICarDetailsMechanical
	{
		#region Model

		int ID { get; set; }
		int CarID { get; set; }
		int EngineTypeID { get; set; }
		int? EngineCapacity { get; set; }
		int? Cylinders { get; set; }
		int? Horsepower { get; set; }
		int FuelTypeID { get; set; }
		int? FuelCapacity { get; set; }
		string CityFuelEconomy { get; set; }
		string HighwayFuelEconomy { get; set; }
		int GearsTypeID { get; set; }
		int? GearsNumber { get; set; }
		int Drivetrain { get; set; }

		string Mesaj { get; set; }

		List<SelectListItem> CarFeatsEngineTypeList { get; set; }
		List<SelectListItem> CarFeatsFuelTypeList { get; set; }
		List<SelectListItem> CarFeatsGearsTypeList { get; set; }
		List<SelectListItem> CarsList { get; set; }

		string CarFeatsEngineTypeAdi { get; set; }
		string CarFeatsFuelTypeAdi { get; set; }
		string CarFeatsGearsTypeAdi { get; set; }
		string CarsAdi { get; set; }

		#endregion

		#region Methods

		List<CarDetailsMechanical> List(int? id, int? top, bool relation);
		List<CarDetailsMechanical> ListAll(int? id, bool relation);
		ICarDetailsMechanical Select(int? id, bool relation);
		ICarDetailsMechanical Insert(ICarDetailsMechanical table, int? engineTypeID, int? fuelTypeID, int? gearsTypeID, int? carID);
		bool Insert(ICarDetailsMechanical table);
		ICarDetailsMechanical Update(int? id, ICarDetailsMechanical table);
		bool Update(ICarDetailsMechanical table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
