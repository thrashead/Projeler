using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using System.Linq;
using HumanResources.Data;
using TDLibrary;

namespace Repository.FilesModel
{
	public class Files : IFiles
	{
		readonly HumanResourcesEntities entity = new HumanResourcesEntities();

		#region Model

		public int ID { get; set; }
		public string Title { get; set; }
		[AllowHtml]
		public string Description { get; set; }
		public string FileUrl { get; set; }
		public string Code { get; set; }
		public bool Active { get; set; }
		public bool Deleted { get; set; }

		public string Mesaj { get; set; }

		public string OldFileUrl { get; set; }

		public bool FileUrlHasFile { get; set; }

		#endregion

		#region Methods

		public List<Files> List(int? id = null, int? top = null, bool relation = true)
		{
			List<Files> table;

			List<usp_FilesSelect_Result> tableTemp;
			List<usp_FilesSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_FilesSelect(id).ToList();
				table = tableTemp.ChangeModelList<Files, usp_FilesSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_FilesSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<Files, usp_FilesSelectTop_Result>();
			}

			return table;
		}

		public List<Files> ListAll(bool relation = true)
		{
			List<Files> table;

			List<usp_FilesSelectAll_Result> tableTemp;

			tableTemp = entity.usp_FilesSelectAll().ToList();
			table = tableTemp.ChangeModelList<Files, usp_FilesSelectAll_Result>();

			return table;
		}

		public IFiles Select(int? id, bool relation = true)
		{
			usp_FilesSelectTop_Result tableTemp = entity.usp_FilesSelectTop(id, 1).FirstOrDefault();
			Files table = tableTemp.ChangeModel<Files>();

			return table;
		}

		public List<Files> SelectByCode(string code, bool relation = true)
		{
			List<usp_FilesSelectByCode_Result> tableTemp = entity.usp_FilesSelectByCode(code).ToList();
			List<Files> table = tableTemp.ChangeModelList<Files, usp_FilesSelectByCode_Result>();

			return table;
		}

		public IFiles Insert(IFiles table = null, bool? none = null)
		{
			if (table == null)
				table = new Files();

			return table;
		}

		public bool Insert(IFiles table)
		{
			var result = entity.usp_FilesInsert(table.Title, table.Description, table.FileUrl, table.Code, table.Active).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public IFiles Update(int? id = null, IFiles table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}

			return table;
		}

		public bool Update(IFiles table)
		{
			var result = entity.usp_FilesUpdate(table.ID, table.Title, table.Description, table.FileUrl, table.Code, table.Active).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_FilesCopy(id).FirstOrDefault();

				return result == null ? false : true;
			}
			catch
			{
				return false;
			}
		}

		public bool Delete(int? id = null)
		{
			try
			{
				entity.usp_FilesDelete(id);

				return true;
			}
			catch
			{
				return false;
			}
		}

		public bool Remove(int? id = null)
		{
			try
			{
				entity.usp_FilesRemove(id);

				return true;
			}
			catch
			{
				return false;
			}
		}

		#endregion

		#region User Defined


		#endregion
	}
}
