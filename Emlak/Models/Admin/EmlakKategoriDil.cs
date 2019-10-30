using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using Emlak.Data;
using TDLibrary;

namespace Models
{
	public class EmlakKategoriDil
	{
		readonly EmlakEntities entity = new EmlakEntities();

		#region Model

		public EmlakKategoriDil()
		{
			PropertyCategoriesList = new List<SelectListItem>();
			TranslationList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int PropCatID { get; set; }
		public int TransID { get; set; }
		public string CategoryName { get; set; }
		public string ShortText { get; set; }
		public string Description { get; set; }

		public string Mesaj { get; set; }

		public List<SelectListItem> PropertyCategoriesList { get; set; }
		public List<SelectListItem> TranslationList { get; set; }

		public string PropertyCategoriesAdi { get; set; }
		public string TranslationAdi { get; set; }

		#endregion

		#region Methods

		public List<EmlakKategoriDil> List(int? id = null, int? top = null, bool relation = true)
		{
			List<EmlakKategoriDil> table;

			List<usp_PropertyCategoriesTLinkedSelect_Result> tableTemp;
			List<usp_PropertyCategoriesTSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_PropertyCategoriesTLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<EmlakKategoriDil, usp_PropertyCategoriesTLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_PropertyCategoriesTSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<EmlakKategoriDil, usp_PropertyCategoriesTSelectTop_Result>();
			}

			if (relation)
			{
				foreach(EmlakKategoriDil item in table)
				{
					List<usp_PropertyCategoriesSelect_Result> tablePropertyCategories = entity.usp_PropertyCategoriesSelect(null).ToList();
					item.PropertyCategoriesList = tablePropertyCategories.ToSelectList<usp_PropertyCategoriesSelect_Result, SelectListItem>("ID", "Title", item.PropCatID);

					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);
				}
			}

			return table;
		}

		public List<EmlakKategoriDil> ListAll(int? id = null, bool relation = true)
		{
			List<EmlakKategoriDil> table;

			List<usp_PropertyCategoriesTSelectAll_Result> tableTemp;

			tableTemp = entity.usp_PropertyCategoriesTSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<EmlakKategoriDil, usp_PropertyCategoriesTSelectAll_Result>();

			if (relation)
			{
				foreach(EmlakKategoriDil item in table)
				{
					List<usp_PropertyCategoriesSelect_Result> tablePropertyCategories = entity.usp_PropertyCategoriesSelect(null).ToList();
					item.PropertyCategoriesList = tablePropertyCategories.ToSelectList<usp_PropertyCategoriesSelect_Result, SelectListItem>("ID", "Title", item.PropCatID);

					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);
				}
			}

			return table;
		}

		public EmlakKategoriDil Select(int? id, bool relation = true)
		{
			usp_PropertyCategoriesTSelectTop_Result tableTemp = entity.usp_PropertyCategoriesTSelectTop(id, 1).FirstOrDefault();
			EmlakKategoriDil table = tableTemp.ChangeModel<EmlakKategoriDil>();

			if (relation)
			{
				List<usp_PropertyCategoriesSelect_Result> tablePropertyCategories = entity.usp_PropertyCategoriesSelect(null).ToList();
				table.PropertyCategoriesList = tablePropertyCategories.ToSelectList<usp_PropertyCategoriesSelect_Result, SelectListItem>("ID", "Title", table.PropCatID);

				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);
			}

			return table;
		}

		public EmlakKategoriDil Insert(EmlakKategoriDil table = null, int? propCatID = null, int? transID = null)
		{
			if (table == null)
				table = new EmlakKategoriDil();

			List<usp_PropertyCategoriesSelect_Result> tablePropertyCategories = entity.usp_PropertyCategoriesSelect(null).ToList();
			table.PropertyCategoriesList = tablePropertyCategories.ToSelectList<usp_PropertyCategoriesSelect_Result, SelectListItem>("ID",  "Title", propCatID);

			List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
			table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID",  "TransName", transID);

			return table;
		}

		public bool Insert(EmlakKategoriDil table)
		{
			var result = entity.usp_PropertyCategoriesTInsert(table.PropCatID, table.TransID, table.CategoryName, table.ShortText, table.Description).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public EmlakKategoriDil Update(int? id = null, EmlakKategoriDil table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_PropertyCategoriesSelect_Result> tablePropertyCategories = entity.usp_PropertyCategoriesSelect(null).ToList();
				table.PropertyCategoriesList = tablePropertyCategories.ToSelectList<usp_PropertyCategoriesSelect_Result, SelectListItem>("ID", "Title", table.PropCatID);

				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);
			}

			return table;
		}

		public bool Update(EmlakKategoriDil table)
		{
			var result = entity.usp_PropertyCategoriesTUpdate(table.ID, table.PropCatID, table.TransID, table.CategoryName, table.ShortText, table.Description).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_PropertyCategoriesTCopy(id).FirstOrDefault();

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
				entity.usp_PropertyCategoriesTDelete(id);

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
