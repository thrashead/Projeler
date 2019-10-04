using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.CarDetailsBasicModel
{
	public interface ICarDetailsBasic
	{
		#region Model

		int ID { get; set; }
		int CarID { get; set; }
		int MakeID { get; set; }
		int ModelID { get; set; }
		int StatusID { get; set; }
		int? Year { get; set; }
		int? Price { get; set; }
		decimal? Width { get; set; }
		decimal? Height { get; set; }
		decimal? Length { get; set; }
		decimal? WheelBase { get; set; }
		decimal? CargoCapacity { get; set; }
		int? Mileage { get; set; }

		string Mesaj { get; set; }

		List<SelectListItem> CarsList { get; set; }
		List<SelectListItem> CarFeatsMakeList { get; set; }
		List<SelectListItem> CarStatusList { get; set; }
		List<SelectListItem> CarFeatsModelList { get; set; }

		string CarsAdi { get; set; }
		string CarFeatsMakeAdi { get; set; }
		string CarStatusAdi { get; set; }
		string CarFeatsModelAdi { get; set; }

		#endregion

		#region Methods

		List<CarDetailsBasic> List(int? id, int? top, bool relation);
		List<CarDetailsBasic> ListAll(int? id, bool relation);
		ICarDetailsBasic Select(int? id, bool relation);
		ICarDetailsBasic Insert(ICarDetailsBasic table, int? carID, int? makeID, int? statusID, int? modelID);
		bool Insert(ICarDetailsBasic table);
		ICarDetailsBasic Update(int? id, ICarDetailsBasic table);
		bool Update(ICarDetailsBasic table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
