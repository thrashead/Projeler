using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using System.Linq;
using HumanResources.Data;
using TDLibrary;

namespace Repository.ContentModel
{
	public class Content : IContent
	{
		readonly HumanResourcesEntities entity = new HumanResourcesEntities();

		#region Model

		public int ID { get; set; }
		public string ContentName { get; set; }
		public string Code { get; set; }
		public string ShortDesc1 { get; set; }
		[AllowHtml]
		public string Description1 { get; set; }
		public string ShortDesc2 { get; set; }
		[AllowHtml]
		public string Description2 { get; set; }
		public string Url { get; set; }

		public string Mesaj { get; set; }

		#endregion

		#region Methods

		public List<Content> List(int? id = null, int? top = null, bool relation = true)
		{
			List<Content> table;

			List<usp_ContentSelect_Result> tableTemp;
			List<usp_ContentSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_ContentSelect(id).ToList();
				table = tableTemp.ChangeModelList<Content, usp_ContentSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_ContentSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<Content, usp_ContentSelectTop_Result>();
			}

			return table;
		}

		public List<Content> ListAll(bool relation = true)
		{
			List<Content> table;

			List<usp_ContentSelectAll_Result> tableTemp;

			tableTemp = entity.usp_ContentSelectAll().ToList();
			table = tableTemp.ChangeModelList<Content, usp_ContentSelectAll_Result>();

			return table;
		}

		public IContent Select(int? id, bool relation = true)
		{
			usp_ContentSelectTop_Result tableTemp = entity.usp_ContentSelectTop(id, 1).FirstOrDefault();
			Content table = tableTemp.ChangeModel<Content>();

			return table;
		}

		public IContent SelectByUrl(string url, bool relation = true)
		{
			usp_ContentSelectByUrl_Result tableTemp = entity.usp_ContentSelectByUrl(url).FirstOrDefault();
			Content table = tableTemp.ChangeModel<Content>();

			return table;
		}

		public List<Content> SelectByCode(string code, bool relation = true)
		{
			List<usp_ContentSelectByCode_Result> tableTemp = entity.usp_ContentSelectByCode(code).ToList();
			List<Content> table = tableTemp.ChangeModelList<Content, usp_ContentSelectByCode_Result>();

			return table;
		}

		public IContent Insert(IContent table = null, bool? none = null)
		{
			if (table == null)
				table = new Content();

			return table;
		}

		public bool Insert(IContent table)
		{
			table.Url = table.ContentName.ToUrl();

			var result = entity.usp_ContentInsert(table.ContentName, table.Code, table.ShortDesc1, table.Description1, table.ShortDesc2, table.Description2, table.Url).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public IContent Update(int? id = null, IContent table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}

			return table;
		}

		public bool Update(IContent table)
		{
			table.Url = table.ContentName.ToUrl();

			var result = entity.usp_ContentUpdate(table.ID, table.ContentName, table.Code, table.ShortDesc1, table.Description1, table.ShortDesc2, table.Description2, table.Url).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_ContentCopy(id).FirstOrDefault();

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
				entity.usp_ContentDelete(id);

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
