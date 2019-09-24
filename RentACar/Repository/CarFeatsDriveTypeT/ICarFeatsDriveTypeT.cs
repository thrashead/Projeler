using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.CarFeatsDriveTypeTModel
{
	public interface ICarFeatsDriveTypeT
	{
		#region Model

		int ID { get; set; }
		int DriveTypeID { get; set; }
		int TransID { get; set; }
		string Name { get; set; }

		string Mesaj { get; set; }

		List<SelectListItem> CarFeatsDriveTypeList { get; set; }
		List<SelectListItem> TranslationList { get; set; }

		string CarFeatsDriveTypeAdi { get; set; }
		string TranslationAdi { get; set; }

		#endregion

		#region Methods

		List<CarFeatsDriveTypeT> List(int? id, int? top, bool relation);
		List<CarFeatsDriveTypeT> ListAll(int? id, bool relation);
		ICarFeatsDriveTypeT Select(int? id, bool relation);
		ICarFeatsDriveTypeT Insert(ICarFeatsDriveTypeT table, int? driveTypeID, int? transID);
		bool Insert(ICarFeatsDriveTypeT table);
		ICarFeatsDriveTypeT Update(int? id, ICarFeatsDriveTypeT table);
		bool Update(ICarFeatsDriveTypeT table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
