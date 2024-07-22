using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.CarDescTModel
{
	public interface ICarDescT
	{
		#region Model

		int ID { get; set; }
		int CarDescID { get; set; }
		int TransID { get; set; }
		string Title { get; set; }
		string ShortDescription { get; set; }
		string Description { get; set; }
		string ShortDescription2 { get; set; }
		string Description2 { get; set; }

		string Mesaj { get; set; }

		List<SelectListItem> TranslationList { get; set; }
		List<SelectListItem> CarDescList { get; set; }

		string TranslationAdi { get; set; }
		string CarDescAdi { get; set; }

		#endregion

		#region Methods

		List<CarDescT> List(int? id, int? top, bool relation);
		List<CarDescT> ListAll(int? id, bool relation);
		ICarDescT Select(int? id, bool relation);
		ICarDescT Insert(ICarDescT table, int? transID, int? carDescID);
		bool Insert(ICarDescT table);
		ICarDescT Update(int? id, ICarDescT table);
		bool Update(ICarDescT table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
