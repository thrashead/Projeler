using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using Emlak.Data;
using TDLibrary;

namespace Models
{
	public class IsinmaTipiDil
	{
		readonly EmlakEntities entity = new EmlakEntities();

		#region Model

		public IsinmaTipiDil()
		{
			WarmTypeList = new List<SelectListItem>();
			TranslationList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int WarmTypeID { get; set; }
		public int TransID { get; set; }
		public string Name { get; set; }

		public string Mesaj { get; set; }

		public List<SelectListItem> WarmTypeList { get; set; }
		public List<SelectListItem> TranslationList { get; set; }

		public string WarmTypeAdi { get; set; }
		public string TranslationAdi { get; set; }

		#endregion

		#region Methods

		public List<IsinmaTipiDil> List(int? id = null, int? top = null, bool relation = true)
		{
			List<IsinmaTipiDil> table;

			List<usp_WarmTypeTLinkedSelect_Result> tableTemp;
			List<usp_WarmTypeTSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_WarmTypeTLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<IsinmaTipiDil, usp_WarmTypeTLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_WarmTypeTSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<IsinmaTipiDil, usp_WarmTypeTSelectTop_Result>();
			}

			if (relation)
			{
				foreach(IsinmaTipiDil item in table)
				{
					List<usp_WarmTypeSelect_Result> tableWarmType = entity.usp_WarmTypeSelect(null).ToList();
					item.WarmTypeList = tableWarmType.ToSelectList<usp_WarmTypeSelect_Result, SelectListItem>("ID", "Title", item.WarmTypeID);

					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);
				}
			}

			return table;
		}

		public List<IsinmaTipiDil> ListAll(int? id = null, bool relation = true)
		{
			List<IsinmaTipiDil> table;

			List<usp_WarmTypeTSelectAll_Result> tableTemp;

			tableTemp = entity.usp_WarmTypeTSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<IsinmaTipiDil, usp_WarmTypeTSelectAll_Result>();

			if (relation)
			{
				foreach(IsinmaTipiDil item in table)
				{
					List<usp_WarmTypeSelect_Result> tableWarmType = entity.usp_WarmTypeSelect(null).ToList();
					item.WarmTypeList = tableWarmType.ToSelectList<usp_WarmTypeSelect_Result, SelectListItem>("ID", "Title", item.WarmTypeID);

					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);
				}
			}

			return table;
		}

		public IsinmaTipiDil Select(int? id, bool relation = true)
		{
			usp_WarmTypeTSelectTop_Result tableTemp = entity.usp_WarmTypeTSelectTop(id, 1).FirstOrDefault();
			IsinmaTipiDil table = tableTemp.ChangeModel<IsinmaTipiDil>();

			if (relation)
			{
				List<usp_WarmTypeSelect_Result> tableWarmType = entity.usp_WarmTypeSelect(null).ToList();
				table.WarmTypeList = tableWarmType.ToSelectList<usp_WarmTypeSelect_Result, SelectListItem>("ID", "Title", table.WarmTypeID);

				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);
			}

			return table;
		}

		public IsinmaTipiDil Insert(IsinmaTipiDil table = null, int? warmTypeID = null, int? transID = null)
		{
			if (table == null)
				table = new IsinmaTipiDil();

			List<usp_WarmTypeSelect_Result> tableWarmType = entity.usp_WarmTypeSelect(null).ToList();
			table.WarmTypeList = tableWarmType.ToSelectList<usp_WarmTypeSelect_Result, SelectListItem>("ID",  "Title", warmTypeID);

			List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
			table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID",  "TransName", transID);

			return table;
		}

		public bool Insert(IsinmaTipiDil table)
		{
			var result = entity.usp_WarmTypeTInsert(table.WarmTypeID, table.TransID, table.Name).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public IsinmaTipiDil Update(int? id = null, IsinmaTipiDil table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_WarmTypeSelect_Result> tableWarmType = entity.usp_WarmTypeSelect(null).ToList();
				table.WarmTypeList = tableWarmType.ToSelectList<usp_WarmTypeSelect_Result, SelectListItem>("ID", "Title", table.WarmTypeID);

				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);
			}

			return table;
		}

		public bool Update(IsinmaTipiDil table)
		{
			var result = entity.usp_WarmTypeTUpdate(table.ID, table.WarmTypeID, table.TransID, table.Name).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_WarmTypeTCopy(id).FirstOrDefault();

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
				entity.usp_WarmTypeTDelete(id);

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
