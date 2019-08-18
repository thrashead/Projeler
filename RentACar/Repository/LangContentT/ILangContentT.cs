using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.LangContentTModel
{
	public interface ILangContentT
	{
		#region Model

		int ID { get; set; }
		int LangContentID { get; set; }
		int TransID { get; set; }
		string ShortDescription { get; set; }
		string Description { get; set; }

		string Mesaj { get; set; }

		List<SelectListItem> TranslationList { get; set; }
		List<SelectListItem> LangContentList { get; set; }

		string TranslationAdi { get; set; }
		string LangContentAdi { get; set; }

		#endregion

		#region Methods

		List<LangContentT> List(int? id, int? top, bool relation);
		List<LangContentT> ListAll(int? id, bool relation);
		ILangContentT Select(int? id, bool relation);
		ILangContentT Insert(ILangContentT table, int? transID, int? langContentID);
		bool Insert(ILangContentT table);
		ILangContentT Update(int? id, ILangContentT table);
		bool Update(ILangContentT table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
