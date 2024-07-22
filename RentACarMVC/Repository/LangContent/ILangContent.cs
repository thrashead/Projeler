using System;
using System.Collections.Generic;
using Repository.LangContentTModel;

namespace Repository.LangContentModel
{
	public interface ILangContent
	{
		#region Model

		int ID { get; set; }
		string Title { get; set; }
		string Code { get; set; }
		string ShortCode { get; set; }

		string Mesaj { get; set; }

		List<ILangContentT> LangContentTList { get; set; }

		#endregion

		#region Methods

		List<LangContent> List(int? id, int? top, bool relation);
		List<LangContent> ListAll(int? id, bool relation);
		ILangContent Select(int? id, bool relation);
		List<LangContent> SelectByCode(string code, bool relation);
		List<LangContent> SelectByShortCode(string code, bool relation);
		ILangContent Insert(ILangContent table, bool? none);
		bool Insert(ILangContent table);
		ILangContent Update(int? id, ILangContent table);
		bool Update(ILangContent table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
