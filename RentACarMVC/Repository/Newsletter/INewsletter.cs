using System;
using System.Collections.Generic;

namespace Repository.NewsletterModel
{
	public interface INewsletter
	{
		#region Model

		int ID { get; set; }
		string Name { get; set; }
		string Mail { get; set; }
		bool Active { get; set; }

		string Mesaj { get; set; }

		#endregion

		#region Methods

		List<Newsletter> List(int? id, int? top, bool relation);
		List<Newsletter> ListAll(int? id, bool relation);
		INewsletter Select(int? id, bool relation);
		INewsletter Insert(INewsletter table, bool? none);
		bool Insert(INewsletter table);
		INewsletter Update(int? id, INewsletter table);
		bool Update(INewsletter table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
