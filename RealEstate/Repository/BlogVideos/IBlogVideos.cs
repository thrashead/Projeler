using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.BlogVideosModel
{
	public interface IBlogVideos
	{
		#region Model

		int ID { get; set; }
		int BlogID { get; set; }
		string VideoUrl { get; set; }
		string Code { get; set; }

		string Mesaj { get; set; }

		List<SelectListItem> BlogList { get; set; }

		string BlogAdi { get; set; }

		#endregion

		#region Methods

		List<BlogVideos> List(int? id, int? top, bool relation);
		List<BlogVideos> ListAll(int? id, bool relation);
		IBlogVideos Select(int? id, bool relation);
		List<BlogVideos> SelectByCode(string code, bool relation);
		IBlogVideos Insert(IBlogVideos table, int? blogID);
		bool Insert(IBlogVideos table);
		IBlogVideos Update(int? id, IBlogVideos table);
		bool Update(IBlogVideos table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
