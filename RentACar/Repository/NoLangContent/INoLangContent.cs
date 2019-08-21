using System;
using System.Collections.Generic;

namespace Repository.NoLangContentModel
{
	public interface INoLangContent
	{
		#region Model

		int ID { get; set; }
		string Title { get; set; }
		string Code { get; set; }
		string ShortCode { get; set; }
		string ShortDescription { get; set; }
		string Description { get; set; }

		string Mesaj { get; set; }

		#endregion

		#region Methods

		List<NoLangContent> List(int? id, int? top, bool relation);
		List<NoLangContent> ListAll(int? id, bool relation);
		INoLangContent Select(int? id, bool relation);
		List<NoLangContent> SelectByCode(string code, bool relation);
		List<NoLangContent> SelectByShortCode(string code, bool relation);
		INoLangContent Insert(INoLangContent table, bool? none);
		bool Insert(INoLangContent table);
		INoLangContent Update(int? id, INoLangContent table);
		bool Update(INoLangContent table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
