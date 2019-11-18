using System;
using System.Collections.Generic;

namespace Repository.MetaModel
{
	public interface IMeta
	{
		#region Model

		int ID { get; set; }
		string Name { get; set; }
		string Content { get; set; }
		string Code { get; set; }

		string Mesaj { get; set; }

		#endregion

		#region Methods

		List<Meta> List(int? id, int? top, bool relation);
		List<Meta> ListAll(bool relation);
		IMeta Select(int? id, bool relation);
		List<Meta> SelectByCode(string code, bool relation);
		IMeta Insert(IMeta table, bool? none);
		bool Insert(IMeta table);
		IMeta Update(int? id, IMeta table);
		bool Update(IMeta table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
