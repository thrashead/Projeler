using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACarMVC.Data;
using TDLibrary;

namespace Repository.CarDetailsFeaturesModel
{
	public class CarDetailsFeatures : ICarDetailsFeatures
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public CarDetailsFeatures()
		{
			CarsList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int CarID { get; set; }
		public bool? ABS { get; set; }
		public bool? Airbag { get; set; }
		public bool? AirConditioning { get; set; }
		public bool? AlloyTires { get; set; }
		public bool? AntiTheft { get; set; }
		public bool? AudioRemoteControl { get; set; }
		public bool? CDPlayer { get; set; }
		public bool? CentralLocking { get; set; }
		public bool? CooledSeats { get; set; }
		public bool? EngineImmobiliser { get; set; }
		public bool? FogLamps { get; set; }
		public bool? FoldingSeats { get; set; }
		public bool? GPS { get; set; }
		public bool? HeatedDoorMirrors { get; set; }
		public bool? HeatedSeats { get; set; }
		public bool? HeadlightCovers { get; set; }
		public bool? KeylessEntry { get; set; }
		public bool? LeatherSeats { get; set; }
		public bool? LeatherTrim { get; set; }
		public bool? LPG { get; set; }
		public bool? PassengerAirbag { get; set; }
		public bool? PowerGlass { get; set; }
		public bool? PowerMirrors { get; set; }
		public bool? PowerSeats { get; set; }
		public bool? PowerSteering { get; set; }
		public bool? PowerWindows { get; set; }
		public bool? RemoteStart { get; set; }
		public bool? SecuritySystem { get; set; }
		public bool? SideAirbag { get; set; }
		public bool? Spoiler { get; set; }
		public bool? TintedWindows { get; set; }
		public bool? TowBar { get; set; }
		public bool? TripComputer { get; set; }
		public bool? Warrenty { get; set; }

		public string Mesaj { get; set; }

		public List<SelectListItem> CarsList { get; set; }

		public string CarsAdi { get; set; }

		#endregion

		#region Methods

		public List<CarDetailsFeatures> List(int? id = null, int? top = null, bool relation = true)
		{
			List<CarDetailsFeatures> table;

			List<usp_CarDetailsFeaturesLinkedSelect_Result> tableTemp;
			List<usp_CarDetailsFeaturesSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_CarDetailsFeaturesLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<CarDetailsFeatures, usp_CarDetailsFeaturesLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_CarDetailsFeaturesSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<CarDetailsFeatures, usp_CarDetailsFeaturesSelectTop_Result>();
			}

			if (relation)
			{
				foreach(CarDetailsFeatures item in table)
				{
					List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
					item.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", item.CarID);
				}
			}

			return table;
		}

		public List<CarDetailsFeatures> ListAll(int? id = null, bool relation = true)
		{
			List<CarDetailsFeatures> table;

			List<usp_CarDetailsFeaturesSelectAll_Result> tableTemp;

			tableTemp = entity.usp_CarDetailsFeaturesSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<CarDetailsFeatures, usp_CarDetailsFeaturesSelectAll_Result>();

			if (relation)
			{
				foreach(CarDetailsFeatures item in table)
				{
					List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
					item.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", item.CarID);
				}
			}

			return table;
		}

		public ICarDetailsFeatures Select(int? id, bool relation = true)
		{
			usp_CarDetailsFeaturesSelectTop_Result tableTemp = entity.usp_CarDetailsFeaturesSelectTop(id, 1).FirstOrDefault();
			CarDetailsFeatures table = tableTemp.ChangeModel<CarDetailsFeatures>();

			if (relation)
			{
				List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
				table.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", table.CarID);
			}

			return table;
		}

		public ICarDetailsFeatures Insert(ICarDetailsFeatures table = null, int? carID = null)
		{
			if (table == null)
				table = new CarDetailsFeatures();

			List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
			table.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID",  "Title", carID);

			return table;
		}

		public bool Insert(ICarDetailsFeatures table)
		{
			var result = entity.usp_CarDetailsFeaturesInsert(table.CarID, table.ABS, table.Airbag, table.AirConditioning, table.AlloyTires, table.AntiTheft, table.AudioRemoteControl, table.CDPlayer, table.CentralLocking, table.CooledSeats, table.EngineImmobiliser, table.FogLamps, table.FoldingSeats, table.GPS, table.HeatedDoorMirrors, table.HeatedSeats, table.HeadlightCovers, table.KeylessEntry, table.LeatherSeats, table.LeatherTrim, table.LPG, table.PassengerAirbag, table.PowerGlass, table.PowerMirrors, table.PowerSeats, table.PowerSteering, table.PowerWindows, table.RemoteStart, table.SecuritySystem, table.SideAirbag, table.Spoiler, table.TintedWindows, table.TowBar, table.TripComputer, table.Warrenty).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ICarDetailsFeatures Update(int? id = null, ICarDetailsFeatures table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
				table.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", table.CarID);
			}

			return table;
		}

		public bool Update(ICarDetailsFeatures table)
		{
			var result = entity.usp_CarDetailsFeaturesUpdate(table.ID, table.CarID, table.ABS, table.Airbag, table.AirConditioning, table.AlloyTires, table.AntiTheft, table.AudioRemoteControl, table.CDPlayer, table.CentralLocking, table.CooledSeats, table.EngineImmobiliser, table.FogLamps, table.FoldingSeats, table.GPS, table.HeatedDoorMirrors, table.HeatedSeats, table.HeadlightCovers, table.KeylessEntry, table.LeatherSeats, table.LeatherTrim, table.LPG, table.PassengerAirbag, table.PowerGlass, table.PowerMirrors, table.PowerSeats, table.PowerSteering, table.PowerWindows, table.RemoteStart, table.SecuritySystem, table.SideAirbag, table.Spoiler, table.TintedWindows, table.TowBar, table.TripComputer, table.Warrenty).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_CarDetailsFeaturesCopy(id).FirstOrDefault();

				return result == null ? false : true;
			}
			catch
			{
				return false;
			}
		}

		public bool Delete(int? id = null)
		{
			try
			{
				entity.usp_CarDetailsFeaturesDelete(id);

				return true;
			}
			catch
			{
				return false;
			}
		}

		#endregion

		#region User Defined



		#endregion
	}
}
