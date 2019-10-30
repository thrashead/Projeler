using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using Emlak.Data;
using TDLibrary;

namespace Models
{
	public class EmlakResim
	{
		readonly EmlakEntities entity = new EmlakEntities();

		#region Model

		public EmlakResim()
		{
			PropertyList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int PropID { get; set; }
		public string PictureUrl { get; set; }
		public string Code { get; set; }

		public string Mesaj { get; set; }

		public string OldPictureUrl { get; set; }

		public bool PictureUrlHasFile { get; set; }

		public List<SelectListItem> PropertyList { get; set; }

		public string PropertyAdi { get; set; }

		#endregion

		#region Methods

		public List<EmlakResim> List(int? id = null, int? top = null, bool relation = true)
		{
			List<EmlakResim> table;

			List<usp_PropertyPicturesLinkedSelect_Result> tableTemp;
			List<usp_PropertyPicturesSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_PropertyPicturesLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<EmlakResim, usp_PropertyPicturesLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_PropertyPicturesSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<EmlakResim, usp_PropertyPicturesSelectTop_Result>();
			}

			if (relation)
			{
				foreach(EmlakResim item in table)
				{
					List<usp_PropertySelect_Result> tableProperty = entity.usp_PropertySelect(null).ToList();
					item.PropertyList = tableProperty.ToSelectList<usp_PropertySelect_Result, SelectListItem>("ID", "Title", item.PropID);
				}
			}

			return table;
		}

		public List<EmlakResim> ListAll(int? id = null, bool relation = true)
		{
			List<EmlakResim> table;

			List<usp_PropertyPicturesSelectAll_Result> tableTemp;

			tableTemp = entity.usp_PropertyPicturesSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<EmlakResim, usp_PropertyPicturesSelectAll_Result>();

			if (relation)
			{
				foreach(EmlakResim item in table)
				{
					List<usp_PropertySelect_Result> tableProperty = entity.usp_PropertySelect(null).ToList();
					item.PropertyList = tableProperty.ToSelectList<usp_PropertySelect_Result, SelectListItem>("ID", "Title", item.PropID);
				}
			}

			return table;
		}

		public EmlakResim Select(int? id, bool relation = true)
		{
			usp_PropertyPicturesSelectTop_Result tableTemp = entity.usp_PropertyPicturesSelectTop(id, 1).FirstOrDefault();
			EmlakResim table = tableTemp.ChangeModel<EmlakResim>();

			if (relation)
			{
				List<usp_PropertySelect_Result> tableProperty = entity.usp_PropertySelect(null).ToList();
				table.PropertyList = tableProperty.ToSelectList<usp_PropertySelect_Result, SelectListItem>("ID", "Title", table.PropID);
			}

			return table;
		}

		public List<EmlakResim> SelectByCode(string code, bool relation = true)
		{
			List<usp_PropertyPicturesSelectByCode_Result> tableTemp = entity.usp_PropertyPicturesSelectByCode(code).ToList();
			List<EmlakResim> table = tableTemp.ChangeModelList<EmlakResim, usp_PropertyPicturesSelectByCode_Result>();

			if (relation)
			{
				foreach(EmlakResim item in table)
				{
					List<usp_PropertySelect_Result> tableProperty = entity.usp_PropertySelect(null).ToList();
					item.PropertyList = tableProperty.ToSelectList<usp_PropertySelect_Result, SelectListItem>("ID", "Title", item.PropID);
				}
			}

			return table;
		}

		public EmlakResim Insert(EmlakResim table = null, int? propID = null)
		{
			if (table == null)
				table = new EmlakResim();

			List<usp_PropertySelect_Result> tableProperty = entity.usp_PropertySelect(null).ToList();
			table.PropertyList = tableProperty.ToSelectList<usp_PropertySelect_Result, SelectListItem>("ID",  "Title", propID);

			return table;
		}

		public bool Insert(EmlakResim table)
		{
			var result = entity.usp_PropertyPicturesInsert(table.PropID, table.PictureUrl, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public EmlakResim Update(int? id = null, EmlakResim table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_PropertySelect_Result> tableProperty = entity.usp_PropertySelect(null).ToList();
				table.PropertyList = tableProperty.ToSelectList<usp_PropertySelect_Result, SelectListItem>("ID", "Title", table.PropID);
			}

			return table;
		}

		public bool Update(EmlakResim table)
		{
			var result = entity.usp_PropertyPicturesUpdate(table.ID, table.PropID, table.PictureUrl, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_PropertyPicturesCopy(id).FirstOrDefault();

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
				entity.usp_PropertyPicturesDelete(id);

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
