using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using System.Linq;
using HumanResources.Data;
using TDLibrary;

namespace Repository.LangContentTModel
{
	public class LangContentT : ILangContentT
	{
		readonly HumanResourcesEntities entity = new HumanResourcesEntities();

		#region Model

		public LangContentT()
		{
			TranslationList = new List<SelectListItem>();
			LangContentList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		[Required(ErrorMessage = "LangContentID alanı boş olamaz ve LangContentID alanına en az 0 değeri girmelisiniz.")]
		[Range(0, int.MaxValue, ErrorMessage = "LangContentID alanı boş olamaz ve LangContentID alanına en az 0 değeri girmelisiniz.")]
		public int LangContentID { get; set; }
		[Required(ErrorMessage = "TransID alanı boş olamaz ve TransID alanına en az 0 değeri girmelisiniz.")]
		[Range(0, int.MaxValue, ErrorMessage = "TransID alanı boş olamaz ve TransID alanına en az 0 değeri girmelisiniz.")]
		public int TransID { get; set; }
		public string ShortDescription { get; set; }
		[AllowHtml]
		public string Description { get; set; }
        public string ShortDescription2 { get; set; }
        [AllowHtml]
        public string Description2 { get; set; }

        public string Mesaj { get; set; }

		public List<SelectListItem> TranslationList { get; set; }
		public List<SelectListItem> LangContentList { get; set; }

		public string TranslationAdi { get; set; }
		public string LangContentAdi { get; set; }

		#endregion

		#region Methods

		public List<LangContentT> List(int? id = null, int? top = null, bool relation = true)
		{
			List<LangContentT> table;

			List<usp_LangContentTLinkedSelect_Result> tableTemp;
			List<usp_LangContentTSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_LangContentTLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<LangContentT, usp_LangContentTLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_LangContentTSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<LangContentT, usp_LangContentTSelectTop_Result>();
			}

			if (relation)
			{
				foreach(LangContentT item in table)
				{
					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);

					List<usp_LangContentSelect_Result> tableLangContent = entity.usp_LangContentSelect(null).ToList();
					item.LangContentList = tableLangContent.ToSelectList<usp_LangContentSelect_Result, SelectListItem>("ID", "Title", item.LangContentID);
				}
			}

			return table;
		}

		public List<LangContentT> ListAll(int? id = null, bool relation = true)
		{
			List<LangContentT> table;

			List<usp_LangContentTSelectAll_Result> tableTemp;

			tableTemp = entity.usp_LangContentTSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<LangContentT, usp_LangContentTSelectAll_Result>();

			if (relation)
			{
				foreach(LangContentT item in table)
				{
					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);

					List<usp_LangContentSelect_Result> tableLangContent = entity.usp_LangContentSelect(null).ToList();
					item.LangContentList = tableLangContent.ToSelectList<usp_LangContentSelect_Result, SelectListItem>("ID", "Title", item.LangContentID);
				}
			}

			return table;
		}

		public ILangContentT Select(int? id, bool relation = true)
		{
			usp_LangContentTSelectTop_Result tableTemp = entity.usp_LangContentTSelectTop(id, 1).FirstOrDefault();
			LangContentT table = tableTemp.ChangeModel<LangContentT>();

			if (relation)
			{
				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);

				List<usp_LangContentSelect_Result> tableLangContent = entity.usp_LangContentSelect(null).ToList();
				table.LangContentList = tableLangContent.ToSelectList<usp_LangContentSelect_Result, SelectListItem>("ID", "Title", table.LangContentID);
			}

			return table;
		}

		public ILangContentT Insert(ILangContentT table = null, int? transID = null, int? langContentID = null)
		{
			if (table == null)
				table = new LangContentT();

			List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
			table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID",  "TransName", transID);

			List<usp_LangContentSelect_Result> tableLangContent = entity.usp_LangContentSelect(null).ToList();
			table.LangContentList = tableLangContent.ToSelectList<usp_LangContentSelect_Result, SelectListItem>("ID",  "Title", langContentID);

			return table;
		}

		public bool Insert(ILangContentT table)
		{
			var result = entity.usp_LangContentTInsert(table.LangContentID, table.TransID, table.ShortDescription, table.Description, table.ShortDescription2, table.Description2).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ILangContentT Update(int? id = null, ILangContentT table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);

				List<usp_LangContentSelect_Result> tableLangContent = entity.usp_LangContentSelect(null).ToList();
				table.LangContentList = tableLangContent.ToSelectList<usp_LangContentSelect_Result, SelectListItem>("ID", "Title", table.LangContentID);
			}

			return table;
		}

		public bool Update(ILangContentT table)
		{
			var result = entity.usp_LangContentTUpdate(table.ID, table.LangContentID, table.TransID, table.ShortDescription, table.Description, table.ShortDescription2, table.Description2).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_LangContentTCopy(id).FirstOrDefault();

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
				entity.usp_LangContentTDelete(id);

				return true;
			}
			catch
			{
				return false;
			}
		}

		#endregion
	}
}
