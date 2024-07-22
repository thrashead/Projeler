using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Repository.CarDescTModel;

namespace Repository.CarDescModel
{
	public interface ICarDesc
	{
		#region Model

		int ID { get; set; }
		int CarID { get; set; }
		string Title { get; set; }
		string Code { get; set; }

		string Mesaj { get; set; }

		List<ICarDescT> CarDescTList { get; set; }

		List<SelectListItem> CarsList { get; set; }

		string CarsAdi { get; set; }

		#endregion

		#region Methods

		List<CarDesc> List(int? id, int? top, bool relation);
		List<CarDesc> ListAll(int? id, bool relation);
		ICarDesc Select(int? id, bool relation);
		List<CarDesc> SelectByCode(string code, bool relation);
		ICarDesc Insert(ICarDesc table, int? carID);
		bool Insert(ICarDesc table);
		ICarDesc Update(int? id, ICarDesc table);
		bool Update(ICarDesc table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
