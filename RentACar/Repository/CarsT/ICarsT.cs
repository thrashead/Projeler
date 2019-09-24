using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.CarsTModel
{
	public interface ICarsT
	{
		#region Model

		int ID { get; set; }
		int CarID { get; set; }
		int TransID { get; set; }
		string ShortDescription { get; set; }
		string Description { get; set; }
		string ShortDescription2 { get; set; }
		string Description2 { get; set; }

		string Mesaj { get; set; }

		List<SelectListItem> TranslationList { get; set; }
		List<SelectListItem> CarsList { get; set; }

		string TranslationAdi { get; set; }
		string CarsAdi { get; set; }

		#endregion

		#region Methods

		List<CarsT> List(int? id, int? top, bool relation);
		List<CarsT> ListAll(int? id, bool relation);
		ICarsT Select(int? id, bool relation);
		ICarsT Insert(ICarsT table, int? transID, int? carID);
		bool Insert(ICarsT table);
		ICarsT Update(int? id, ICarsT table);
		bool Update(ICarsT table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
