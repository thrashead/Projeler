using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.BlogPicturesModel
{
	public interface IBlogPictures
	{
		#region Model

		int ID { get; set; }
		int BlogID { get; set; }
		string PictureUrl { get; set; }
		string Code { get; set; }

		string Mesaj { get; set; }

		string OldPictureUrl { get; set; }

		bool PictureUrlHasFile { get; set; }

		List<SelectListItem> BlogList { get; set; }

		string BlogAdi { get; set; }

		#endregion

		#region Methods

		List<BlogPictures> List(int? id, int? top, bool relation);
		List<BlogPictures> ListAll(int? id, bool relation);
		IBlogPictures Select(int? id, bool relation);
		List<BlogPictures> SelectByCode(string code, bool relation);
		IBlogPictures Insert(IBlogPictures table, int? blogID);
		bool Insert(IBlogPictures table);
		IBlogPictures Update(int? id, IBlogPictures table);
		bool Update(IBlogPictures table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
