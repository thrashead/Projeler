using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using System.Linq;
using HumanResources.Data;
using TDLibrary;

namespace Repository.PicturesModel
{
	public class Pictures : IPictures
	{
		readonly HumanResourcesEntities entity = new HumanResourcesEntities();

		#region Model

		public int ID { get; set; }
		public string Title { get; set; }
		[AllowHtml]
		public string Description { get; set; }
		public string PictureUrl { get; set; }
		public string ThumbUrl { get; set; }
		public string Code { get; set; }
		public bool Active { get; set; }
		public bool Deleted { get; set; }

		public string Mesaj { get; set; }

		public string OldPictureUrl { get; set; }
		public string OldThumbUrl { get; set; }

		public bool PictureUrlHasFile { get; set; }
		public bool ThumbUrlHasFile { get; set; }

		#endregion

		#region Methods

		public List<Pictures> List(int? id = null, int? top = null, bool relation = true)
		{
			List<Pictures> table;

			List<usp_PicturesSelect_Result> tableTemp;
			List<usp_PicturesSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_PicturesSelect(id).ToList();
				table = tableTemp.ChangeModelList<Pictures, usp_PicturesSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_PicturesSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<Pictures, usp_PicturesSelectTop_Result>();
			}

			return table;
		}

		public List<Pictures> ListAll(bool relation = true)
		{
			List<Pictures> table;

			List<usp_PicturesSelectAll_Result> tableTemp;

			tableTemp = entity.usp_PicturesSelectAll().ToList();
			table = tableTemp.ChangeModelList<Pictures, usp_PicturesSelectAll_Result>();

			return table;
		}

		public IPictures Select(int? id, bool relation = true)
		{
			usp_PicturesSelectTop_Result tableTemp = entity.usp_PicturesSelectTop(id, 1).FirstOrDefault();
			Pictures table = tableTemp.ChangeModel<Pictures>();

			return table;
		}

		public List<Pictures> SelectByCode(string code, bool relation = true)
		{
			List<usp_PicturesSelectByCode_Result> tableTemp = entity.usp_PicturesSelectByCode(code).ToList();
			List<Pictures> table = tableTemp.ChangeModelList<Pictures, usp_PicturesSelectByCode_Result>();

			return table;
		}

		public IPictures Insert(IPictures table = null, bool? none = null)
		{
			if (table == null)
				table = new Pictures();

			return table;
		}

		public bool Insert(IPictures table)
		{
			var result = entity.usp_PicturesInsert(table.Title, table.Description, table.PictureUrl, table.ThumbUrl, table.Code, table.Active).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public IPictures Update(int? id = null, IPictures table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}

			return table;
		}

		public bool Update(IPictures table)
		{
			var result = entity.usp_PicturesUpdate(table.ID, table.Title, table.Description, table.PictureUrl, table.ThumbUrl, table.Code, table.Active).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_PicturesCopy(id).FirstOrDefault();

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
				entity.usp_PicturesDelete(id);

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
				entity.usp_PicturesRemove(id);

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
