using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Repository.CarDetailsExtIntModel;
using Repository.CarDetailsMechanicalModel;
using Repository.CarDetailsBasicModel;
using Repository.CarDetailsFeaturesModel;
using Repository.CarDescModel;

namespace Repository.CarsModel
{
	public interface ICars
	{
		#region Model

		int ID { get; set; }
		string Title { get; set; }
		string Code { get; set; }
		string PictureUrl { get; set; }
		int StatusID { get; set; }
		string Url { get; set; }
		string Guid { get; set; }

		string Mesaj { get; set; }

		string OldPictureUrl { get; set; }

		bool? HasFile { get; set; }

		List<ICarDetailsExtInt> CarDetailsExtIntList { get; set; }
		List<ICarDetailsMechanical> CarDetailsMechanicalList { get; set; }
		List<ICarDetailsBasic> CarDetailsBasicList { get; set; }
		List<ICarDetailsFeatures> CarDetailsFeaturesList { get; set; }
		List<ICarDesc> CarDescList { get; set; }

		List<SelectListItem> CarStatusList { get; set; }

		string CarStatusAdi { get; set; }

		#endregion

		#region Methods

		List<Cars> List(int? id, int? top, bool relation);
		List<Cars> ListAll(int? id, bool relation);
		ICars Select(int? id, bool relation);
		ICars SelectByUrl(string url, bool relation);
		ICars SelectByGuid(string guid, bool relation);
		List<Cars> SelectByCode(string code, bool relation);
		ICars Insert(ICars table, int? statusID);
		bool Insert(ICars table);
		ICars Update(int? id, ICars table);
		bool Update(ICars table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
