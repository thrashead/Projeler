using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.BlogCommentsModel
{
	public interface IBlogComments
	{
		#region Model

		int ID { get; set; }
		int BlogID { get; set; }
		string Sender { get; set; }
		string Mail { get; set; }
		string SendDate { get; set; }
		string Message { get; set; }
		bool Active { get; set; }

		string Mesaj { get; set; }

		List<SelectListItem> BlogList { get; set; }

		string BlogAdi { get; set; }

		#endregion

		#region Methods

		List<BlogComments> List(int? id, int? top, bool relation);
		List<BlogComments> ListAll(int? id, bool relation);
		IBlogComments Select(int? id, bool relation);
		IBlogComments Insert(IBlogComments table, int? blogID);
		bool Insert(IBlogComments table);
		IBlogComments Update(int? id, IBlogComments table);
		bool Update(IBlogComments table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
