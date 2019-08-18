using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.BlogCategoryTModel
{
	public interface IBlogCategoryT
	{
		#region Model

		int ID { get; set; }
		int BlogCatID { get; set; }
		int TransID { get; set; }
		string Title { get; set; }

		string Mesaj { get; set; }

		List<SelectListItem> BlogCategoryList { get; set; }
		List<SelectListItem> TranslationList { get; set; }

		string BlogCategoryAdi { get; set; }
		string TranslationAdi { get; set; }

		#endregion

		#region Methods

		List<BlogCategoryT> List(int? id, int? top, bool relation);
		List<BlogCategoryT> ListAll(int? id, bool relation);
		IBlogCategoryT Select(int? id, bool relation);
		IBlogCategoryT Insert(IBlogCategoryT table, int? blogCatID, int? transID);
		bool Insert(IBlogCategoryT table);
		IBlogCategoryT Update(int? id, IBlogCategoryT table);
		bool Update(IBlogCategoryT table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
