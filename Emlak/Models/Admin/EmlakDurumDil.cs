using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using Emlak.Data;
using TDLibrary;

namespace Models
{
	public class EmlakDurumDil
	{
		readonly EmlakEntities entity = new EmlakEntities();

		#region Model

		public EmlakDurumDil()
		{
			PropertyStatusList = new List<SelectListItem>();
			TranslationList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int StatusID { get; set; }
		public int TransID { get; set; }
		public string Name { get; set; }

		public string Mesaj { get; set; }

		public List<SelectListItem> PropertyStatusList { get; set; }
		public List<SelectListItem> TranslationList { get; set; }

		public string PropertyStatusAdi { get; set; }
		public string TranslationAdi { get; set; }

		#endregion

		#region Methods

		public List<EmlakDurumDil> List(int? id = null, int? top = null, bool relation = true)
		{
			List<EmlakDurumDil> table;

			List<usp_PropertyStatusTLinkedSelect_Result> tableTemp;
			List<usp_PropertyStatusTSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_PropertyStatusTLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<EmlakDurumDil, usp_PropertyStatusTLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_PropertyStatusTSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<EmlakDurumDil, usp_PropertyStatusTSelectTop_Result>();
			}

			if (relation)
			{
				foreach(EmlakDurumDil item in table)
				{
					List<usp_PropertyStatusSelect_Result> tablePropertyStatus = entity.usp_PropertyStatusSelect(null).ToList();
					item.PropertyStatusList = tablePropertyStatus.ToSelectList<usp_PropertyStatusSelect_Result, SelectListItem>("ID", "Title", item.StatusID);

					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);
				}
			}

			return table;
		}

		public List<EmlakDurumDil> ListAll(int? id = null, bool relation = true)
		{
			List<EmlakDurumDil> table;

			List<usp_PropertyStatusTSelectAll_Result> tableTemp;

			tableTemp = entity.usp_PropertyStatusTSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<EmlakDurumDil, usp_PropertyStatusTSelectAll_Result>();

			if (relation)
			{
				foreach(EmlakDurumDil item in table)
				{
					List<usp_PropertyStatusSelect_Result> tablePropertyStatus = entity.usp_PropertyStatusSelect(null).ToList();
					item.PropertyStatusList = tablePropertyStatus.ToSelectList<usp_PropertyStatusSelect_Result, SelectListItem>("ID", "Title", item.StatusID);

					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);
				}
			}

			return table;
		}

		public EmlakDurumDil Select(int? id, bool relation = true)
		{
			usp_PropertyStatusTSelectTop_Result tableTemp = entity.usp_PropertyStatusTSelectTop(id, 1).FirstOrDefault();
			EmlakDurumDil table = tableTemp.ChangeModel<EmlakDurumDil>();

			if (relation)
			{
				List<usp_PropertyStatusSelect_Result> tablePropertyStatus = entity.usp_PropertyStatusSelect(null).ToList();
				table.PropertyStatusList = tablePropertyStatus.ToSelectList<usp_PropertyStatusSelect_Result, SelectListItem>("ID", "Title", table.StatusID);

				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);
			}

			return table;
		}

		public EmlakDurumDil Insert(EmlakDurumDil table = null, int? statusID = null, int? transID = null)
		{
			if (table == null)
				table = new EmlakDurumDil();

			List<usp_PropertyStatusSelect_Result> tablePropertyStatus = entity.usp_PropertyStatusSelect(null).ToList();
			table.PropertyStatusList = tablePropertyStatus.ToSelectList<usp_PropertyStatusSelect_Result, SelectListItem>("ID",  "Title", statusID);

			List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
			table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID",  "TransName", transID);

			return table;
		}

		public bool Insert(EmlakDurumDil table)
		{
			var result = entity.usp_PropertyStatusTInsert(table.StatusID, table.TransID, table.Name).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public EmlakDurumDil Update(int? id = null, EmlakDurumDil table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_PropertyStatusSelect_Result> tablePropertyStatus = entity.usp_PropertyStatusSelect(null).ToList();
				table.PropertyStatusList = tablePropertyStatus.ToSelectList<usp_PropertyStatusSelect_Result, SelectListItem>("ID", "Title", table.StatusID);

				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);
			}

			return table;
		}

		public bool Update(EmlakDurumDil table)
		{
			var result = entity.usp_PropertyStatusTUpdate(table.ID, table.StatusID, table.TransID, table.Name).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_PropertyStatusTCopy(id).FirstOrDefault();

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
				entity.usp_PropertyStatusTDelete(id);

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
