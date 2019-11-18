using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.CategoryModel
{
	public interface ICategory
	{
		#region Model

		int ID { get; set; }
		int ParentID { get; set; }
		string CategoryName { get; set; }
		string Code { get; set; }
		string ShortDesc1 { get; set; }
		string Description1 { get; set; }
		string ShortDesc2 { get; set; }
		string Description2 { get; set; }
		string Url { get; set; }
		bool Show { get; set; }

		string Mesaj { get; set; }
		List<SelectListItem> ParentCategories { get; set; }

		#endregion

		#region Methods

		List<Category> List(int? id, int? top, bool relation);
		List<Category> ListAll(bool relation);
		ICategory Select(int? id, bool relation);
		ICategory SelectByUrl(string url, bool relation);
		List<Category> SelectByCode(string code, bool relation);
		ICategory Insert(ICategory table, bool? none);
		bool Insert(ICategory table);
		ICategory Update(int? id, ICategory table);
		bool Update(ICategory table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
