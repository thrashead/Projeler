using System;
using System.Collections.Generic;
using Repository.CarDetailsBasicModel;
using Repository.CarFeatsModelModel;

namespace Repository.CarFeatsMakeModel
{
	public interface ICarFeatsMake
	{
		#region Model

		int ID { get; set; }
		string Title { get; set; }
		string Code { get; set; }
		string Url { get; set; }
		string PictureUrl { get; set; }

		string Mesaj { get; set; }

		string OldPictureUrl { get; set; }

		bool? HasFile { get; set; }

		List<ICarDetailsBasic> CarDetailsBasicList { get; set; }
		List<ICarFeatsModel> CarFeatsModelList { get; set; }

		#endregion

		#region Methods

		List<CarFeatsMake> List(int? id, int? top, bool relation);
		List<CarFeatsMake> ListAll(int? id, bool relation);
		ICarFeatsMake Select(int? id, bool relation);
		ICarFeatsMake SelectByUrl(string url, bool relation);
		List<CarFeatsMake> SelectByCode(string code, bool relation);
		ICarFeatsMake Insert(ICarFeatsMake table, bool? none);
		bool Insert(ICarFeatsMake table);
		ICarFeatsMake Update(int? id, ICarFeatsMake table);
		bool Update(ICarFeatsMake table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
