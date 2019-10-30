using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using Emlak.Data;
using TDLibrary;

namespace Models
{
	public class EmlakYeniDil
	{
		readonly EmlakEntities entity = new EmlakEntities();

		#region Model

		public EmlakYeniDil()
		{
			PropertyList = new List<SelectListItem>();
			TranslationList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int PropID { get; set; }
		public int TransID { get; set; }
		public string Title { get; set; }
		[AllowHtml]
		public string Description { get; set; }

		public string Mesaj { get; set; }

		public List<SelectListItem> PropertyList { get; set; }
		public List<SelectListItem> TranslationList { get; set; }

		public string PropertyAdi { get; set; }
		public string TranslationAdi { get; set; }

		#endregion

		#region Methods

		public List<EmlakYeniDil> List(int? id = null, int? top = null, bool relation = true)
		{
			List<EmlakYeniDil> table;

			List<usp_PropertyTLinkedSelect_Result> tableTemp;
			List<usp_PropertyTSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_PropertyTLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<EmlakYeniDil, usp_PropertyTLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_PropertyTSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<EmlakYeniDil, usp_PropertyTSelectTop_Result>();
			}

			if (relation)
			{
				foreach(EmlakYeniDil item in table)
				{
					List<usp_PropertySelect_Result> tableProperty = entity.usp_PropertySelect(null).ToList();
					item.PropertyList = tableProperty.ToSelectList<usp_PropertySelect_Result, SelectListItem>("ID", "Title", item.PropID);

					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);
				}
			}

			return table;
		}

		public List<EmlakYeniDil> ListAll(int? id = null, bool relation = true)
		{
			List<EmlakYeniDil> table;

			List<usp_PropertyTSelectAll_Result> tableTemp;

			tableTemp = entity.usp_PropertyTSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<EmlakYeniDil, usp_PropertyTSelectAll_Result>();

			if (relation)
			{
				foreach(EmlakYeniDil item in table)
				{
					List<usp_PropertySelect_Result> tableProperty = entity.usp_PropertySelect(null).ToList();
					item.PropertyList = tableProperty.ToSelectList<usp_PropertySelect_Result, SelectListItem>("ID", "Title", item.PropID);

					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);
				}
			}

			return table;
		}

		public EmlakYeniDil Select(int? id, bool relation = true)
		{
			usp_PropertyTSelectTop_Result tableTemp = entity.usp_PropertyTSelectTop(id, 1).FirstOrDefault();
			EmlakYeniDil table = tableTemp.ChangeModel<EmlakYeniDil>();

			if (relation)
			{
				List<usp_PropertySelect_Result> tableProperty = entity.usp_PropertySelect(null).ToList();
				table.PropertyList = tableProperty.ToSelectList<usp_PropertySelect_Result, SelectListItem>("ID", "Title", table.PropID);

				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);
			}

			return table;
		}

		public EmlakYeniDil Insert(EmlakYeniDil table = null, int? propID = null, int? transID = null)
		{
			if (table == null)
				table = new EmlakYeniDil();

			List<usp_PropertySelect_Result> tableProperty = entity.usp_PropertySelect(null).ToList();
			table.PropertyList = tableProperty.ToSelectList<usp_PropertySelect_Result, SelectListItem>("ID",  "Title", propID);

			List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
			table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID",  "TransName", transID);

			return table;
		}

		public bool Insert(EmlakYeniDil table)
		{
			var result = entity.usp_PropertyTInsert(table.PropID, table.TransID, table.Title, table.Description).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public EmlakYeniDil Update(int? id = null, EmlakYeniDil table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_PropertySelect_Result> tableProperty = entity.usp_PropertySelect(null).ToList();
				table.PropertyList = tableProperty.ToSelectList<usp_PropertySelect_Result, SelectListItem>("ID", "Title", table.PropID);

				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);
			}

			return table;
		}

		public bool Update(EmlakYeniDil table)
		{
			var result = entity.usp_PropertyTUpdate(table.ID, table.PropID, table.TransID, table.Title, table.Description).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_PropertyTCopy(id).FirstOrDefault();

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
				entity.usp_PropertyTDelete(id);

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
