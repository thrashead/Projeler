using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.CarReservationModel
{
	public interface ICarReservation
	{
		#region Model

		int ID { get; set; }
		int CarID { get; set; }
        string StartDate { get; set; }
        string EndDate { get; set; }
		string Name { get; set; }
		string IdentityNo { get; set; }
		string City { get; set; }
		string DistrictPostal { get; set; }
		string Phone { get; set; }
		string Mail { get; set; }
		string Address { get; set; }
		string ProcessDate { get; set; }
		bool Accepted { get; set; }
        string IPAddress { get; set; }

        string Mesaj { get; set; }

		List<SelectListItem> CarsList { get; set; }

		string CarsAdi { get; set; }

		#endregion

		#region Methods

		List<CarReservation> List(int? id, int? top, bool relation);
		List<CarReservation> ListAll(int? id, bool relation);
		ICarReservation Select(int? id, bool relation);
		ICarReservation Insert(ICarReservation table, int? carID);
		bool Insert(ICarReservation table);
		ICarReservation Update(int? id, ICarReservation table);
		bool Update(ICarReservation table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
