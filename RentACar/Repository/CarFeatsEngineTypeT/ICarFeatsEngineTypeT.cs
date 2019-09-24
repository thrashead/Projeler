using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.CarFeatsEngineTypeTModel
{
	public interface ICarFeatsEngineTypeT
	{
		#region Model

		int ID { get; set; }
		int EngineTypeID { get; set; }
		int TransID { get; set; }
		string Name { get; set; }

		string Mesaj { get; set; }

		List<SelectListItem> CarFeatsEngineTypeList { get; set; }
		List<SelectListItem> TranslationList { get; set; }

		string CarFeatsEngineTypeAdi { get; set; }
		string TranslationAdi { get; set; }

		#endregion

		#region Methods

		List<CarFeatsEngineTypeT> List(int? id, int? top, bool relation);
		List<CarFeatsEngineTypeT> ListAll(int? id, bool relation);
		ICarFeatsEngineTypeT Select(int? id, bool relation);
		ICarFeatsEngineTypeT Insert(ICarFeatsEngineTypeT table, int? engineTypeID, int? transID);
		bool Insert(ICarFeatsEngineTypeT table);
		ICarFeatsEngineTypeT Update(int? id, ICarFeatsEngineTypeT table);
		bool Update(ICarFeatsEngineTypeT table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
