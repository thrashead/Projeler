using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.CarStatusTModel
{
	public interface ICarStatusT
	{
		#region Model

		int ID { get; set; }
		int StatusID { get; set; }
		int TransID { get; set; }
		string Name { get; set; }

		string Mesaj { get; set; }

		List<SelectListItem> TranslationList { get; set; }
		List<SelectListItem> CarStatusList { get; set; }

		string TranslationAdi { get; set; }
		string CarStatusAdi { get; set; }

		#endregion

		#region Methods

		List<CarStatusT> List(int? id, int? top, bool relation);
		List<CarStatusT> ListAll(int? id, bool relation);
		ICarStatusT Select(int? id, bool relation);
		ICarStatusT Insert(ICarStatusT table, int? transID, int? statusID);
		bool Insert(ICarStatusT table);
		ICarStatusT Update(int? id, ICarStatusT table);
		bool Update(ICarStatusT table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
