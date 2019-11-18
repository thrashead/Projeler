using System;
using System.Collections.Generic;

namespace Repository.CityModel
{
	public interface ICity
	{
		#region Model

		int ID { get; set; }
		string Name { get; set; }
		int Code { get; set; }
		bool Active { get; set; }
		bool Show { get; set; }
		int? Order { get; set; }

		string Mesaj { get; set; }

		#endregion

		#region Methods

		List<City> List(int? id, int? top, bool relation);
		List<City> ListAll(bool relation);
		ICity Select(int? id, bool relation);
		List<City> SelectByCode(int? code, bool relation);
		ICity Insert(ICity table, bool? none);
		bool Insert(ICity table);
		ICity Update(int? id, ICity table);
		bool Update(ICity table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
