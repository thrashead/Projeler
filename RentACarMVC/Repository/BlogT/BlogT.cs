using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using System.Linq;
using RentACarMVC.Data;
using TDLibrary;

namespace Repository.BlogTModel
{
	public class BlogT : IBlogT
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public BlogT()
		{
			TranslationList = new List<SelectListItem>();
			BlogList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		[Required(ErrorMessage = "BlogID alanı boş olamaz ve BlogID alanına en az 0 değeri girmelisiniz.")]
		[Range(0, int.MaxValue, ErrorMessage = "BlogID alanı boş olamaz ve BlogID alanına en az 0 değeri girmelisiniz.")]
		public int BlogID { get; set; }
		[Required(ErrorMessage = "TransID alanı boş olamaz ve TransID alanına en az 0 değeri girmelisiniz.")]
		[Range(0, int.MaxValue, ErrorMessage = "TransID alanı boş olamaz ve TransID alanına en az 0 değeri girmelisiniz.")]
		public int TransID { get; set; }
		[Required(ErrorMessage = "Title alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
		[StringLength(255)]
		public string Title { get; set; }
		public string ShortDescription { get; set; }
		[AllowHtml]
		public string Description { get; set; }
		public string ShortDescription2 { get; set; }
		[AllowHtml]
        public string Description2 { get; set; }

		public string Mesaj { get; set; }

		public List<SelectListItem> TranslationList { get; set; }
		public List<SelectListItem> BlogList { get; set; }

		public string TranslationAdi { get; set; }
		public string BlogAdi { get; set; }

		#endregion

		#region Methods

		public List<BlogT> List(int? id = null, int? top = null, bool relation = true)
		{
			List<BlogT> table;

			List<usp_BlogTLinkedSelect_Result> tableTemp;
			List<usp_BlogTSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_BlogTLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<BlogT, usp_BlogTLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_BlogTSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<BlogT, usp_BlogTSelectTop_Result>();
			}

			if (relation)
			{
				foreach(BlogT item in table)
				{
					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);

					List<usp_BlogSelect_Result> tableBlog = entity.usp_BlogSelect(null).ToList();
					item.BlogList = tableBlog.ToSelectList<usp_BlogSelect_Result, SelectListItem>("ID", "Title", item.BlogID);
				}
			}

			return table;
		}

		public List<BlogT> ListAll(int? id = null, bool relation = true)
		{
			List<BlogT> table;

			List<usp_BlogTSelectAll_Result> tableTemp;

			tableTemp = entity.usp_BlogTSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<BlogT, usp_BlogTSelectAll_Result>();

			if (relation)
			{
				foreach(BlogT item in table)
				{
					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);

					List<usp_BlogSelect_Result> tableBlog = entity.usp_BlogSelect(null).ToList();
					item.BlogList = tableBlog.ToSelectList<usp_BlogSelect_Result, SelectListItem>("ID", "Title", item.BlogID);
				}
			}

			return table;
		}

		public IBlogT Select(int? id, bool relation = true)
		{
			usp_BlogTSelectTop_Result tableTemp = entity.usp_BlogTSelectTop(id, 1).FirstOrDefault();
			BlogT table = tableTemp.ChangeModel<BlogT>();

			if (relation)
			{
				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);

				List<usp_BlogSelect_Result> tableBlog = entity.usp_BlogSelect(null).ToList();
				table.BlogList = tableBlog.ToSelectList<usp_BlogSelect_Result, SelectListItem>("ID", "Title", table.BlogID);
			}

			return table;
		}

		public IBlogT Insert(IBlogT table = null, int? transID = null, int? blogID = null)
		{
			if (table == null)
				table = new BlogT();

			List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
			table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID",  "TransName", transID);

			List<usp_BlogSelect_Result> tableBlog = entity.usp_BlogSelect(null).ToList();
			table.BlogList = tableBlog.ToSelectList<usp_BlogSelect_Result, SelectListItem>("ID",  "Title", blogID);

			return table;
		}

		public bool Insert(IBlogT table)
		{
			var result = entity.usp_BlogTInsert(table.BlogID, table.TransID, table.Title, table.ShortDescription, table.ShortDescription2, table.Description, table.Description2).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public IBlogT Update(int? id = null, IBlogT table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);

				List<usp_BlogSelect_Result> tableBlog = entity.usp_BlogSelect(null).ToList();
				table.BlogList = tableBlog.ToSelectList<usp_BlogSelect_Result, SelectListItem>("ID", "Title", table.BlogID);
			}

			return table;
		}

		public bool Update(IBlogT table)
		{
			var result = entity.usp_BlogTUpdate(table.ID, table.BlogID, table.TransID, table.Title, table.ShortDescription, table.ShortDescription2, table.Description, table.Description2).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_BlogTCopy(id).FirstOrDefault();

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
				entity.usp_BlogTDelete(id);

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
