using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.CarFeatsBodyTypeTModel
{
	public interface ICarFeatsBodyTypeT
	{
		#region Model

		int ID { get; set; }
		int BodyTypeID { get; set; }
		int TransID { get; set; }
		string Name { get; set; }

		string Mesaj { get; set; }

		List<SelectListItem> CarFeatsBodyTypeList { get; set; }
		List<SelectListItem> TranslationList { get; set; }

		string CarFeatsBodyTypeAdi { get; set; }
		string TranslationAdi { get; set; }

		#endregion

		#region Methods

		List<CarFeatsBodyTypeT> List(int? id, int? top, bool relation);
		List<CarFeatsBodyTypeT> ListAll(int? id, bool relation);
		ICarFeatsBodyTypeT Select(int? id, bool relation);
		ICarFeatsBodyTypeT Insert(ICarFeatsBodyTypeT table, int? bodyTypeID, int? transID);
		bool Insert(ICarFeatsBodyTypeT table);
		ICarFeatsBodyTypeT Update(int? id, ICarFeatsBodyTypeT table);
		bool Update(ICarFeatsBodyTypeT table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
