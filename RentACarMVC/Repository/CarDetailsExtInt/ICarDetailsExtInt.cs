using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.CarDetailsExtIntModel
{
	public interface ICarDetailsExtInt
	{
		#region Model

		int ID { get; set; }
		int CarID { get; set; }
		int BodyTypeID { get; set; }
		int DriveTypeID { get; set; }
		string Tires { get; set; }
		int? Seats { get; set; }
		int? Doors { get; set; }
		string ExtColor { get; set; }
		string IntColor { get; set; }
		string TrimStyle { get; set; }

		string Mesaj { get; set; }

		List<SelectListItem> CarFeatsBodyTypeList { get; set; }
		List<SelectListItem> CarFeatsDriveTypeList { get; set; }
		List<SelectListItem> CarsList { get; set; }

		string CarFeatsBodyTypeAdi { get; set; }
		string CarFeatsDriveTypeAdi { get; set; }
		string CarsAdi { get; set; }

		#endregion

		#region Methods

		List<CarDetailsExtInt> List(int? id, int? top, bool relation);
		List<CarDetailsExtInt> ListAll(int? id, bool relation);
		ICarDetailsExtInt Select(int? id, bool relation);
		ICarDetailsExtInt Insert(ICarDetailsExtInt table, int? bodyTypeID, int? driveTypeID, int? carID);
		bool Insert(ICarDetailsExtInt table);
		ICarDetailsExtInt Update(int? id, ICarDetailsExtInt table);
		bool Update(ICarDetailsExtInt table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
