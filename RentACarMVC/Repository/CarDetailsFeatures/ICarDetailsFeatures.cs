using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.CarDetailsFeaturesModel
{
	public interface ICarDetailsFeatures
	{
		#region Model

		int ID { get; set; }
		int CarID { get; set; }
		bool? ABS { get; set; }
		bool? Airbag { get; set; }
		bool? AirConditioning { get; set; }
		bool? AlloyTires { get; set; }
		bool? AntiTheft { get; set; }
		bool? AudioRemoteControl { get; set; }
		bool? CDPlayer { get; set; }
		bool? CentralLocking { get; set; }
		bool? CooledSeats { get; set; }
		bool? EngineImmobiliser { get; set; }
		bool? FogLamps { get; set; }
		bool? FoldingSeats { get; set; }
		bool? GPS { get; set; }
		bool? HeatedDoorMirrors { get; set; }
		bool? HeatedSeats { get; set; }
		bool? HeadlightCovers { get; set; }
		bool? KeylessEntry { get; set; }
		bool? LeatherSeats { get; set; }
		bool? LeatherTrim { get; set; }
		bool? LPG { get; set; }
		bool? PassengerAirbag { get; set; }
		bool? PowerGlass { get; set; }
		bool? PowerMirrors { get; set; }
		bool? PowerSeats { get; set; }
		bool? PowerSteering { get; set; }
		bool? PowerWindows { get; set; }
		bool? RemoteStart { get; set; }
		bool? SecuritySystem { get; set; }
		bool? SideAirbag { get; set; }
		bool? Spoiler { get; set; }
		bool? TintedWindows { get; set; }
		bool? TowBar { get; set; }
		bool? TripComputer { get; set; }
		bool? Warrenty { get; set; }

		string Mesaj { get; set; }

		List<SelectListItem> CarsList { get; set; }

		string CarsAdi { get; set; }

		#endregion

		#region Methods

		List<CarDetailsFeatures> List(int? id, int? top, bool relation);
		List<CarDetailsFeatures> ListAll(int? id, bool relation);
		ICarDetailsFeatures Select(int? id, bool relation);
		ICarDetailsFeatures Insert(ICarDetailsFeatures table, int? carID);
		bool Insert(ICarDetailsFeatures table);
		ICarDetailsFeatures Update(int? id, ICarDetailsFeatures table);
		bool Update(ICarDetailsFeatures table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
