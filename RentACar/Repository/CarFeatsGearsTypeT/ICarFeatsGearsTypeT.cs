using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.CarFeatsGearsTypeTModel
{
	public interface ICarFeatsGearsTypeT
	{
		#region Model

		int ID { get; set; }
		int GearsTypeID { get; set; }
		int TransID { get; set; }
		string Name { get; set; }

		string Mesaj { get; set; }

		List<SelectListItem> CarFeatsGearsTypeList { get; set; }
		List<SelectListItem> TranslationList { get; set; }

		string CarFeatsGearsTypeAdi { get; set; }
		string TranslationAdi { get; set; }

		#endregion

		#region Methods

		List<CarFeatsGearsTypeT> List(int? id, int? top, bool relation);
		List<CarFeatsGearsTypeT> ListAll(int? id, bool relation);
		ICarFeatsGearsTypeT Select(int? id, bool relation);
		ICarFeatsGearsTypeT Insert(ICarFeatsGearsTypeT table, int? gearsTypeID, int? transID);
		bool Insert(ICarFeatsGearsTypeT table);
		ICarFeatsGearsTypeT Update(int? id, ICarFeatsGearsTypeT table);
		bool Update(ICarFeatsGearsTypeT table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
