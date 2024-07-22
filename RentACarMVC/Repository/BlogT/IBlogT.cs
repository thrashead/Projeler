using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.BlogTModel
{
	public interface IBlogT
	{
		#region Model

		int ID { get; set; }
		int BlogID { get; set; }
		int TransID { get; set; }
		string Title { get; set; }
		string ShortDescription { get; set; }
		string Description { get; set; }
		string ShortDescription2 { get; set; }
		string Description2 { get; set; }

		string Mesaj { get; set; }

		List<SelectListItem> TranslationList { get; set; }
		List<SelectListItem> BlogList { get; set; }

		string TranslationAdi { get; set; }
		string BlogAdi { get; set; }

		#endregion

		#region Methods

		List<BlogT> List(int? id, int? top, bool relation);
		List<BlogT> ListAll(int? id, bool relation);
		IBlogT Select(int? id, bool relation);
		IBlogT Insert(IBlogT table, int? transID, int? blogID);
		bool Insert(IBlogT table);
		IBlogT Update(int? id, IBlogT table);
		bool Update(IBlogT table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
