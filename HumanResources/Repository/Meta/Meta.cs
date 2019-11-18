using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using System.Linq;
using HumanResources.Data;
using TDLibrary;

namespace Repository.MetaModel
{
	public class Meta : IMeta
	{
		readonly HumanResourcesEntities entity = new HumanResourcesEntities();

		#region Model

		public int ID { get; set; }
		public string Name { get; set; }
		[AllowHtml]
		public string Content { get; set; }
		public string Code { get; set; }

		public string Mesaj { get; set; }

		#endregion

		#region Methods

		public List<Meta> List(int? id = null, int? top = null, bool relation = true)
		{
			List<Meta> table;

			List<usp_MetaSelect_Result> tableTemp;
			List<usp_MetaSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_MetaSelect(id).ToList();
				table = tableTemp.ChangeModelList<Meta, usp_MetaSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_MetaSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<Meta, usp_MetaSelectTop_Result>();
			}

			return table;
		}

		public List<Meta> ListAll(bool relation = true)
		{
			List<Meta> table;

			List<usp_MetaSelectAll_Result> tableTemp;

			tableTemp = entity.usp_MetaSelectAll().ToList();
			table = tableTemp.ChangeModelList<Meta, usp_MetaSelectAll_Result>();

			return table;
		}

		public IMeta Select(int? id, bool relation = true)
		{
			usp_MetaSelectTop_Result tableTemp = entity.usp_MetaSelectTop(id, 1).FirstOrDefault();
			Meta table = tableTemp.ChangeModel<Meta>();

			return table;
		}

		public List<Meta> SelectByCode(string code, bool relation = true)
		{
			List<usp_MetaSelectByCode_Result> tableTemp = entity.usp_MetaSelectByCode(code).ToList();
			List<Meta> table = tableTemp.ChangeModelList<Meta, usp_MetaSelectByCode_Result>();

			return table;
		}

		public IMeta Insert(IMeta table = null, bool? none = null)
		{
			if (table == null)
				table = new Meta();

			return table;
		}

		public bool Insert(IMeta table)
		{
			var result = entity.usp_MetaInsert(table.Name, table.Content, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public IMeta Update(int? id = null, IMeta table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}

			return table;
		}

		public bool Update(IMeta table)
		{
			var result = entity.usp_MetaUpdate(table.ID, table.Name, table.Content, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_MetaCopy(id).FirstOrDefault();

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
				entity.usp_MetaDelete(id);

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
