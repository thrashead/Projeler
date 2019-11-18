using System;
using System.Collections.Generic;

namespace Repository.FilesModel
{
	public interface IFiles
	{
		#region Model

		int ID { get; set; }
		string Title { get; set; }
		string Description { get; set; }
		string FileUrl { get; set; }
		string Code { get; set; }
		bool Active { get; set; }
		bool Deleted { get; set; }

		string Mesaj { get; set; }

		string OldFileUrl { get; set; }

		bool FileUrlHasFile { get; set; }

		#endregion

		#region Methods

		List<Files> List(int? id, int? top, bool relation);
		List<Files> ListAll(bool relation);
		IFiles Select(int? id, bool relation);
		List<Files> SelectByCode(string code, bool relation);
		IFiles Insert(IFiles table, bool? none);
		bool Insert(IFiles table);
		IFiles Update(int? id, IFiles table);
		bool Update(IFiles table);
		bool Copy(int id);
		bool Delete(int? id);
		bool Remove(int? id);

		#endregion
	}
}
