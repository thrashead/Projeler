using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using Emlak.Data;
using TDLibrary;

namespace Models
{
	public class YakitTipiDil
	{
		readonly EmlakEntities entity = new EmlakEntities();

		#region Model

		public YakitTipiDil()
		{
			FuelTypeList = new List<SelectListItem>();
			TranslationList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int FuelTypeID { get; set; }
		public int TransID { get; set; }
		public string Name { get; set; }

		public string Mesaj { get; set; }

		public List<SelectListItem> FuelTypeList { get; set; }
		public List<SelectListItem> TranslationList { get; set; }

		public string FuelTypeAdi { get; set; }
		public string TranslationAdi { get; set; }

		#endregion

		#region Methods

		public List<YakitTipiDil> List(int? id = null, int? top = null, bool relation = true)
		{
			List<YakitTipiDil> table;

			List<usp_FuelTypeTLinkedSelect_Result> tableTemp;
			List<usp_FuelTypeTSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_FuelTypeTLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<YakitTipiDil, usp_FuelTypeTLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_FuelTypeTSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<YakitTipiDil, usp_FuelTypeTSelectTop_Result>();
			}

			if (relation)
			{
				foreach(YakitTipiDil item in table)
				{
					List<usp_FuelTypeSelect_Result> tableFuelType = entity.usp_FuelTypeSelect(null).ToList();
					item.FuelTypeList = tableFuelType.ToSelectList<usp_FuelTypeSelect_Result, SelectListItem>("ID", "Title", item.FuelTypeID);

					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);
				}
			}

			return table;
		}

		public List<YakitTipiDil> ListAll(int? id = null, bool relation = true)
		{
			List<YakitTipiDil> table;

			List<usp_FuelTypeTSelectAll_Result> tableTemp;

			tableTemp = entity.usp_FuelTypeTSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<YakitTipiDil, usp_FuelTypeTSelectAll_Result>();

			if (relation)
			{
				foreach(YakitTipiDil item in table)
				{
					List<usp_FuelTypeSelect_Result> tableFuelType = entity.usp_FuelTypeSelect(null).ToList();
					item.FuelTypeList = tableFuelType.ToSelectList<usp_FuelTypeSelect_Result, SelectListItem>("ID", "Title", item.FuelTypeID);

					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);
				}
			}

			return table;
		}

		public YakitTipiDil Select(int? id, bool relation = true)
		{
			usp_FuelTypeTSelectTop_Result tableTemp = entity.usp_FuelTypeTSelectTop(id, 1).FirstOrDefault();
			YakitTipiDil table = tableTemp.ChangeModel<YakitTipiDil>();

			if (relation)
			{
				List<usp_FuelTypeSelect_Result> tableFuelType = entity.usp_FuelTypeSelect(null).ToList();
				table.FuelTypeList = tableFuelType.ToSelectList<usp_FuelTypeSelect_Result, SelectListItem>("ID", "Title", table.FuelTypeID);

				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);
			}

			return table;
		}

		public YakitTipiDil Insert(YakitTipiDil table = null, int? fuelTypeID = null, int? transID = null)
		{
			if (table == null)
				table = new YakitTipiDil();

			List<usp_FuelTypeSelect_Result> tableFuelType = entity.usp_FuelTypeSelect(null).ToList();
			table.FuelTypeList = tableFuelType.ToSelectList<usp_FuelTypeSelect_Result, SelectListItem>("ID",  "Title", fuelTypeID);

			List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
			table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID",  "TransName", transID);

			return table;
		}

		public bool Insert(YakitTipiDil table)
		{
			var result = entity.usp_FuelTypeTInsert(table.FuelTypeID, table.TransID, table.Name).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public YakitTipiDil Update(int? id = null, YakitTipiDil table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_FuelTypeSelect_Result> tableFuelType = entity.usp_FuelTypeSelect(null).ToList();
				table.FuelTypeList = tableFuelType.ToSelectList<usp_FuelTypeSelect_Result, SelectListItem>("ID", "Title", table.FuelTypeID);

				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);
			}

			return table;
		}

		public bool Update(YakitTipiDil table)
		{
			var result = entity.usp_FuelTypeTUpdate(table.ID, table.FuelTypeID, table.TransID, table.Name).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_FuelTypeTCopy(id).FirstOrDefault();

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
				entity.usp_FuelTypeTDelete(id);

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
