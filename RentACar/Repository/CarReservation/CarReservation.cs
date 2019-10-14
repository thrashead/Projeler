using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACar.Data;
using TDLibrary;
using Models;

namespace Repository.CarReservationModel
{
	public class CarReservation : ICarReservation
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public CarReservation()
		{
			CarsList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int CarID { get; set; }
		public string StartDate { get; set; }
		public string EndDate { get; set; }
		public string Name { get; set; }
		public string IdentityNo { get; set; }
		public string City { get; set; }
		public string DistrictPostal { get; set; }
		public string Phone { get; set; }
		public string Mail { get; set; }
		public string Address { get; set; }
		public string ProcessDate { get; set; }
		public bool Accepted { get; set; }
        public string IPAddress { get; set; }

        public string Mesaj { get; set; }

		public List<SelectListItem> CarsList { get; set; }

		public string CarsAdi { get; set; }

		#endregion

		#region Methods

		public List<CarReservation> List(int? id = null, int? top = null, bool relation = true)
		{
			List<CarReservation> table;

			List<usp_CarReservationLinkedSelect_Result> tableTemp;
			List<usp_CarReservationSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_CarReservationLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<CarReservation, usp_CarReservationLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_CarReservationSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<CarReservation, usp_CarReservationSelectTop_Result>();
			}

			if (relation)
			{
				foreach(CarReservation item in table)
				{
					List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
					item.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", item.CarID);
				}
			}

			return table;
		}

		public List<CarReservation> ListAll(int? id = null, bool relation = true)
		{
			List<CarReservation> table;

			List<usp_CarReservationSelectAll_Result> tableTemp;

			tableTemp = entity.usp_CarReservationSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<CarReservation, usp_CarReservationSelectAll_Result>();

			if (relation)
			{
				foreach(CarReservation item in table)
				{
					List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
					item.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", item.CarID);
				}
			}

			return table;
		}

		public ICarReservation Select(int? id, bool relation = true)
		{
			usp_CarReservationSelectTop_Result tableTemp = entity.usp_CarReservationSelectTop(id, 1).FirstOrDefault();
			CarReservation table = tableTemp.ChangeModel<CarReservation>();

			if (relation)
			{
				List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
				table.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", table.CarID);
			}

			return table;
		}

		public ICarReservation Insert(ICarReservation table = null, int? carID = null)
		{
			if (table == null)
				table = new CarReservation();

			List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
			table.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID",  "Title", carID);

			return table;
		}

		public bool Insert(ICarReservation table)
		{
            var result = entity.usp_CarReservationInsert(table.CarID, table.StartDate, table.EndDate, table.Name, table.IdentityNo, table.City, table.DistrictPostal, table.Phone, table.Mail, table.Address, table.ProcessDate, table.Accepted, table.IPAddress).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ICarReservation Update(int? id = null, ICarReservation table = null)
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

		public bool Update(ICarReservation table)
		{
            var result = entity.usp_CarReservationUpdate(table.ID, table.CarID, table.StartDate, table.EndDate, table.Name, table.IdentityNo, table.City, table.DistrictPostal, table.Phone, table.Mail, table.Address, table.ProcessDate, table.Accepted, table.IPAddress).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_CarReservationCopy(id).FirstOrDefault();

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
				entity.usp_CarReservationDelete(id);

				return true;
			}
			catch
			{
				return false;
			}
		}

        #endregion

        #region User Defined

        public List<sp_CarListForBookSelect_Result> CarListForBookSelect(BookSearchFilters searchFilters = null, int? transID = null)
        {
            List<sp_CarListForBookSelect_Result> table = entity.sp_CarListForBookSelect(searchFilters?.MakeCode, searchFilters?.ModelCode, searchFilters?.BodyTypeCode,
                searchFilters?.FuelTypeCode, searchFilters?.CarStatusCode, searchFilters?.PriceMin, searchFilters?.PriceMax, searchFilters?.YearMin, searchFilters?.YearMax,
                searchFilters?.Mileage,
                searchFilters?.DriveTypeCode,
                searchFilters?.Seats,
                searchFilters?.Doors,
                searchFilters?.ExteriorColor,
                searchFilters?.InteriorColor,
                searchFilters?.GearTypeCode,
                searchFilters?.GearCount,
                searchFilters?.EngineTypeCode,
                searchFilters?.EngineCapacity,
                searchFilters?.Cylinders,
                searchFilters?.StartDate,
                searchFilters?.EndDate,
                searchFilters?.ABS,
                searchFilters?.Airbag,
                searchFilters?.AirConditioning,
                searchFilters?.AlloyTires,
                searchFilters?.AntiTheft,
                searchFilters?.CDPlayer,
                searchFilters?.CentralLocking,
                searchFilters?.CooledSeats,
                searchFilters?.FogLamps,
                searchFilters?.FoldingSeats,
                searchFilters?.GPS,
                searchFilters?.HeatedSeats,
                searchFilters?.HeadlightCovers,
                searchFilters?.KeylessEntry,
                searchFilters?.LeatherSeats,
                searchFilters?.LeatherTrim,
                searchFilters?.LPG,
                searchFilters?.PassengerAirbag,
                searchFilters?.PowerGlass,
                searchFilters?.PowerMirrors,
                searchFilters?.PowerSeats,
                searchFilters?.PowerSteering,
                searchFilters?.PowerWindows,
                searchFilters?.RemoteStart,
                searchFilters?.SecuritySystem,
                searchFilters?.SideAirbag,
                searchFilters?.Spoiler,
                searchFilters?.TintedWindows,
                searchFilters?.TowBar,
                searchFilters?.TripComputer,
                searchFilters?.Warrenty,
                searchFilters?.AudioRemoteControl,
                searchFilters?.EngineImmobiliser,
                searchFilters?.HeatedDoorMirrors,
                transID).ToList();

            return table;
        }

        public DateTime? GetLastDate(string IPAddress)
        {
            DateTime? table = entity.sp_CarReservationLastDate(IPAddress).FirstOrDefault();

            return table;
        }

        #endregion
    }
}
