using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.CarPicturesModel
{
	public interface ICarPictures
	{
		#region Model

		int ID { get; set; }
		int CarID { get; set; }
		string Title { get; set; }
		string Description { get; set; }
		string PictureUrl { get; set; }
		string Code { get; set; }
		string ShortCode { get; set; }
		bool IsMainPicture { get; set; }

		string Mesaj { get; set; }

		string OldPictureUrl { get; set; }

		bool? HasFile { get; set; }

		List<SelectListItem> CarsList { get; set; }

		string CarsAdi { get; set; }

		#endregion

		#region Methods

		List<CarPictures> List(int? id, int? top, bool relation);
		List<CarPictures> ListAll(int? id, bool relation);
		ICarPictures Select(int? id, bool relation);
		List<CarPictures> SelectByCode(string code, bool relation);
		List<CarPictures> SelectByShortCode(string code, bool relation);
		ICarPictures Insert(ICarPictures table, int? carID);
		bool Insert(ICarPictures table);
		ICarPictures Update(int? id, ICarPictures table);
		bool Update(ICarPictures table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
