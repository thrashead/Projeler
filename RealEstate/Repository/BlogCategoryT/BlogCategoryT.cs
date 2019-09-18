using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using System.Linq;
using RealEstate.Data;
using TDLibrary;

namespace Repository.BlogCategoryTModel
{
	public class BlogCategoryT : IBlogCategoryT
	{
		readonly RealEstateEntities entity = new RealEstateEntities();

		#region Model

		public BlogCategoryT()
		{
			BlogCategoryList = new List<SelectListItem>();
			TranslationList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		[Required(ErrorMessage = "BlogCatID alanı boş olamaz ve BlogCatID alanına en az 0 değeri girmelisiniz.")]
		[Range(0, int.MaxValue, ErrorMessage = "BlogCatID alanı boş olamaz ve BlogCatID alanına en az 0 değeri girmelisiniz.")]
		public int BlogCatID { get; set; }
		[Required(ErrorMessage = "TransID alanı boş olamaz ve TransID alanına en az 0 değeri girmelisiniz.")]
		[Range(0, int.MaxValue, ErrorMessage = "TransID alanı boş olamaz ve TransID alanına en az 0 değeri girmelisiniz.")]
		public int TransID { get; set; }
		[Required(ErrorMessage = "Title alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
		[StringLength(255)]
		public string Title { get; set; }

		public string Mesaj { get; set; }

		public List<SelectListItem> BlogCategoryList { get; set; }
		public List<SelectListItem> TranslationList { get; set; }

		public string BlogCategoryAdi { get; set; }
		public string TranslationAdi { get; set; }

		#endregion

		#region Methods

		public List<BlogCategoryT> List(int? id = null, int? top = null, bool relation = true)
		{
			List<BlogCategoryT> table;

			List<usp_BlogCategoryTLinkedSelect_Result> tableTemp;
			List<usp_BlogCategoryTSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_BlogCategoryTLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<BlogCategoryT, usp_BlogCategoryTLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_BlogCategoryTSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<BlogCategoryT, usp_BlogCategoryTSelectTop_Result>();
			}

			if (relation)
			{
				foreach(BlogCategoryT item in table)
				{
					List<usp_BlogCategorySelect_Result> tableBlogCategory = entity.usp_BlogCategorySelect(null).ToList();
					item.BlogCategoryList = tableBlogCategory.ToSelectList<usp_BlogCategorySelect_Result, SelectListItem>("ID", "Title", item.BlogCatID);

					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);
				}
			}

			return table;
		}

		public List<BlogCategoryT> ListAll(int? id = null, bool relation = true)
		{
			List<BlogCategoryT> table;

			List<usp_BlogCategoryTSelectAll_Result> tableTemp;

			tableTemp = entity.usp_BlogCategoryTSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<BlogCategoryT, usp_BlogCategoryTSelectAll_Result>();

			if (relation)
			{
				foreach(BlogCategoryT item in table)
				{
					List<usp_BlogCategorySelect_Result> tableBlogCategory = entity.usp_BlogCategorySelect(null).ToList();
					item.BlogCategoryList = tableBlogCategory.ToSelectList<usp_BlogCategorySelect_Result, SelectListItem>("ID", "Title", item.BlogCatID);

					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);
				}
			}

			return table;
		}

		public IBlogCategoryT Select(int? id, bool relation = true)
		{
			usp_BlogCategoryTSelectTop_Result tableTemp = entity.usp_BlogCategoryTSelectTop(id, 1).FirstOrDefault();
			BlogCategoryT table = tableTemp.ChangeModel<BlogCategoryT>();

			if (relation)
			{
				List<usp_BlogCategorySelect_Result> tableBlogCategory = entity.usp_BlogCategorySelect(null).ToList();
				table.BlogCategoryList = tableBlogCategory.ToSelectList<usp_BlogCategorySelect_Result, SelectListItem>("ID", "Title", table.BlogCatID);

				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);
			}

			return table;
		}

		public IBlogCategoryT Insert(IBlogCategoryT table = null, int? blogCatID = null, int? transID = null)
		{
			if (table == null)
				table = new BlogCategoryT();

			List<usp_BlogCategorySelect_Result> tableBlogCategory = entity.usp_BlogCategorySelect(null).ToList();
			table.BlogCategoryList = tableBlogCategory.ToSelectList<usp_BlogCategorySelect_Result, SelectListItem>("ID",  "Title", blogCatID);

			List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
			table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID",  "TransName", transID);

			return table;
		}

		public bool Insert(IBlogCategoryT table)
		{
			var result = entity.usp_BlogCategoryTInsert(table.BlogCatID, table.TransID, table.Title).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public IBlogCategoryT Update(int? id = null, IBlogCategoryT table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_BlogCategorySelect_Result> tableBlogCategory = entity.usp_BlogCategorySelect(null).ToList();
				table.BlogCategoryList = tableBlogCategory.ToSelectList<usp_BlogCategorySelect_Result, SelectListItem>("ID", "Title", table.BlogCatID);

				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);
			}

			return table;
		}

		public bool Update(IBlogCategoryT table)
		{
			var result = entity.usp_BlogCategoryTUpdate(table.ID, table.BlogCatID, table.TransID, table.Title).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_BlogCategoryTCopy(id).FirstOrDefault();

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
				entity.usp_BlogCategoryTDelete(id);

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
