using System;
using System.Collections.Generic;

namespace Repository.PicturesModel
{
	public interface IPictures
	{
		#region Model

		int ID { get; set; }
		string Title { get; set; }
		string Description { get; set; }
		string PictureUrl { get; set; }
		string ThumbUrl { get; set; }
		string Code { get; set; }
		bool Active { get; set; }
		bool Deleted { get; set; }

		string Mesaj { get; set; }

		string OldPictureUrl { get; set; }
		string OldThumbUrl { get; set; }

		bool PictureUrlHasFile { get; set; }
		bool ThumbUrlHasFile { get; set; }

		#endregion

		#region Methods

		List<Pictures> List(int? id, int? top, bool relation);
		List<Pictures> ListAll(bool relation);
		IPictures Select(int? id, bool relation);
		List<Pictures> SelectByCode(string code, bool relation);
		IPictures Insert(IPictures table, bool? none);
		bool Insert(IPictures table);
		IPictures Update(int? id, IPictures table);
		bool Update(IPictures table);
		bool Copy(int id);
		bool Delete(int? id);
		bool Remove(int? id);

		#endregion
	}
}
