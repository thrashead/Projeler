using System;
using System.Collections.Generic;

namespace Repository.ContentModel
{
	public interface IContent
	{
		#region Model

		int ID { get; set; }
		string ContentName { get; set; }
		string Code { get; set; }
		string ShortDesc1 { get; set; }
		string Description1 { get; set; }
		string ShortDesc2 { get; set; }
		string Description2 { get; set; }
		string Url { get; set; }

		string Mesaj { get; set; }

		#endregion

		#region Methods

		List<Content> List(int? id, int? top, bool relation);
		List<Content> ListAll(bool relation);
		IContent Select(int? id, bool relation);
		IContent SelectByUrl(string url, bool relation);
		List<Content> SelectByCode(string code, bool relation);
		IContent Insert(IContent table, bool? none);
		bool Insert(IContent table);
		IContent Update(int? id, IContent table);
		bool Update(IContent table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
