using System;
using System.Collections.Generic;
using Repository.BlogCategoryTModel;
using Repository.BlogModel;

namespace Repository.BlogCategoryModel
{
	public interface IBlogCategory
	{
		#region Model

		int ID { get; set; }
		string Title { get; set; }
        string Url { get; set; }
        string Code { get; set; }

		string Mesaj { get; set; }

		List<IBlogCategoryT> BlogCategoryTList { get; set; }
		List<IBlog> BlogList { get; set; }

		#endregion

		#region Methods

		List<BlogCategory> List(int? id, int? top, bool relation);
		List<BlogCategory> ListAll(int? id, bool relation);
		IBlogCategory Select(int? id, bool relation);
		List<BlogCategory> SelectByCode(string code, bool relation);
		IBlogCategory Insert(IBlogCategory table, bool? none);
		bool Insert(IBlogCategory table);
		IBlogCategory Update(int? id, IBlogCategory table);
		bool Update(IBlogCategory table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
