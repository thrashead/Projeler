using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACarMVC.Data;
using TDLibrary;

namespace Repository.NoLangContentModel
{
	public class NoLangContent : INoLangContent
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public int ID { get; set; }
		public string Title { get; set; }
		public string Code { get; set; }
		public string ShortCode { get; set; }
        public string ShortDescription { get; set; }
        [AllowHtml]
        public string Description { get; set; }
        public string ShortDescription2 { get; set; }
        [AllowHtml]
        public string Description2 { get; set; }

        public string Mesaj { get; set; }

		#endregion

		#region Methods

		public List<NoLangContent> List(int? id = null, int? top = null, bool relation = true)
		{
			List<NoLangContent> table;

			List<usp_NoLangContentSelect_Result> tableTemp;
			List<usp_NoLangContentSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_NoLangContentSelect(id).ToList();
				table = tableTemp.ChangeModelList<NoLangContent, usp_NoLangContentSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_NoLangContentSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<NoLangContent, usp_NoLangContentSelectTop_Result>();
			}

			return table;
		}

		public List<NoLangContent> ListAll(int? id = null, bool relation = true)
		{
			List<NoLangContent> table;

			List<usp_NoLangContentSelectAll_Result> tableTemp;

			tableTemp = entity.usp_NoLangContentSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<NoLangContent, usp_NoLangContentSelectAll_Result>();

			return table;
		}

		public INoLangContent Select(int? id, bool relation = true)
		{
			usp_NoLangContentSelectTop_Result tableTemp = entity.usp_NoLangContentSelectTop(id, 1).FirstOrDefault();
			NoLangContent table = tableTemp.ChangeModel<NoLangContent>();

			return table;
		}

		public List<NoLangContent> SelectByCode(string code, bool relation = true)
		{
			List<usp_NoLangContentSelectByCode_Result> tableTemp = entity.usp_NoLangContentSelectByCode(code).ToList();
			List<NoLangContent> table = tableTemp.ChangeModelList<NoLangContent, usp_NoLangContentSelectByCode_Result>();

			return table;
		}

		public List<NoLangContent> SelectByShortCode(string code, bool relation = true)
		{
			List<usp_NoLangContentSelectByShortCode_Result> tableTemp = entity.usp_NoLangContentSelectByShortCode(code).ToList();
			List<NoLangContent> table = tableTemp.ChangeModelList<NoLangContent, usp_NoLangContentSelectByShortCode_Result>();

			return table;
		}

		public INoLangContent Insert(INoLangContent table = null, bool? none = null)
		{
			if (table == null)
				table = new NoLangContent();

			return table;
		}

		public bool Insert(INoLangContent table)
		{
			var result = entity.usp_NoLangContentInsert(table.Title, table.Code, table.ShortCode, table.ShortDescription, table.Description, table.ShortDescription2, table.Description2).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public INoLangContent Update(int? id = null, INoLangContent table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}

			return table;
		}

		public bool Update(INoLangContent table)
		{
			var result = entity.usp_NoLangContentUpdate(table.ID, table.Title, table.Code, table.ShortCode, table.ShortDescription, table.Description, table.ShortDescription2, table.Description2).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_NoLangContentCopy(id).FirstOrDefault();

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
				entity.usp_NoLangContentDelete(id);

				return true;
			}
			catch
			{
				return false;
			}
		}

        #endregion

        #region User Defined

        public List<sp_NoLangContentDetailSelectByCode_Result> DetailSelectByCode(string code, int? top = null)
        {
            List<sp_NoLangContentDetailSelectByCode_Result> table = entity.sp_NoLangContentDetailSelectByCode(code, top).ToList();

            return table;
        }

        public List<sp_NoLangContentDetailSelectByShortCode_Result> DetailSelectByShortCode(string shortCode, int? top = null)
        {
            List<sp_NoLangContentDetailSelectByShortCode_Result> table = entity.sp_NoLangContentDetailSelectByShortCode(shortCode, top).ToList();

            return table;
        }

        public List<sp_NoLangContentDetailSelectByCodeAndShortCode_Result> DetailSelectByCodeAndShortCode(string code, string shortCode, int? top = null)
        {
            List<sp_NoLangContentDetailSelectByCodeAndShortCode_Result> table = entity.sp_NoLangContentDetailSelectByCodeAndShortCode(code, shortCode, top).ToList();

            return table;
        }

        #endregion
    }
}
