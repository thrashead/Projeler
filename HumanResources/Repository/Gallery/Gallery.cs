using System;
using System.Collections.Generic;
using System.Web;
using System.Linq;
using HumanResources.Data;
using TDLibrary;

namespace Repository.GalleryModel
{
	public class Gallery : IGallery
	{
		readonly HumanResourcesEntities entity = new HumanResourcesEntities();

		#region Model

		public int ID { get; set; }
		public string Title { get; set; }
		public string Url { get; set; }
		public string Code { get; set; }

		public string Mesaj { get; set; }

		#endregion

		#region Methods

		public List<Gallery> List(int? id = null, int? top = null, bool relation = true)
		{
			List<Gallery> table;

			List<usp_GallerySelect_Result> tableTemp;
			List<usp_GallerySelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_GallerySelect(id).ToList();
				table = tableTemp.ChangeModelList<Gallery, usp_GallerySelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_GallerySelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<Gallery, usp_GallerySelectTop_Result>();
			}

			return table;
		}

		public List<Gallery> ListAll(bool relation = true)
		{
			List<Gallery> table;

			List<usp_GallerySelectAll_Result> tableTemp;

			tableTemp = entity.usp_GallerySelectAll().ToList();
			table = tableTemp.ChangeModelList<Gallery, usp_GallerySelectAll_Result>();

			return table;
		}

		public IGallery Select(int? id, bool relation = true)
		{
			usp_GallerySelectTop_Result tableTemp = entity.usp_GallerySelectTop(id, 1).FirstOrDefault();
			Gallery table = tableTemp.ChangeModel<Gallery>();

			return table;
		}

		public IGallery SelectByUrl(string url, bool relation = true)
		{
			usp_GallerySelectByUrl_Result tableTemp = entity.usp_GallerySelectByUrl(url).FirstOrDefault();
			Gallery table = tableTemp.ChangeModel<Gallery>();

			return table;
		}

		public List<Gallery> SelectByCode(string code, bool relation = true)
		{
			List<usp_GallerySelectByCode_Result> tableTemp = entity.usp_GallerySelectByCode(code).ToList();
			List<Gallery> table = tableTemp.ChangeModelList<Gallery, usp_GallerySelectByCode_Result>();

			return table;
		}

		public IGallery Insert(IGallery table = null, bool? none = null)
		{
			if (table == null)
				table = new Gallery();

			return table;
		}

		public bool Insert(IGallery table)
		{
			table.Url = table.Title.ToUrl();

			var result = entity.usp_GalleryInsert(table.Title, table.Url, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public IGallery Update(int? id = null, IGallery table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}

			return table;
		}

		public bool Update(IGallery table)
		{
			table.Url = table.Title.ToUrl();

			var result = entity.usp_GalleryUpdate(table.ID, table.Title, table.Url, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_GalleryCopy(id).FirstOrDefault();

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
				entity.usp_GalleryDelete(id);

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
