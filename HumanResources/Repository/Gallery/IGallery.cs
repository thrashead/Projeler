using System;
using System.Collections.Generic;

namespace Repository.GalleryModel
{
	public interface IGallery
	{
		#region Model

		int ID { get; set; }
		string Title { get; set; }
		string Url { get; set; }
		string Code { get; set; }

		string Mesaj { get; set; }

		#endregion

		#region Methods

		List<Gallery> List(int? id, int? top, bool relation);
		List<Gallery> ListAll(bool relation);
		IGallery Select(int? id, bool relation);
		IGallery SelectByUrl(string url, bool relation);
		List<Gallery> SelectByCode(string code, bool relation);
		IGallery Insert(IGallery table, bool? none);
		bool Insert(IGallery table);
		IGallery Update(int? id, IGallery table);
		bool Update(IGallery table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
