using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.CarVideosModel
{
	public interface ICarVideos
	{
		#region Model

		int ID { get; set; }
		int CarID { get; set; }
		string VideoUrl { get; set; }
		string Code { get; set; }

		string Mesaj { get; set; }

		List<SelectListItem> CarsList { get; set; }

		string CarsAdi { get; set; }

		#endregion

		#region Methods

		List<CarVideos> List(int? id, int? top, bool relation);
		List<CarVideos> ListAll(int? id, bool relation);
		ICarVideos Select(int? id, bool relation);
		List<CarVideos> SelectByCode(string code, bool relation);
		ICarVideos Insert(ICarVideos table, int? carID);
		bool Insert(ICarVideos table);
		ICarVideos Update(int? id, ICarVideos table);
		bool Update(ICarVideos table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
