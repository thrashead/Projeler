using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using System.Linq;
using RentACar.Data;
using TDLibrary;

namespace Repository.BlogVideosModel
{
	public class BlogVideos : IBlogVideos
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public BlogVideos()
		{
			BlogList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		[Required(ErrorMessage = "BlogID alanı boş olamaz ve BlogID alanına en az 0 değeri girmelisiniz.")]
		[Range(0, int.MaxValue, ErrorMessage = "BlogID alanı boş olamaz ve BlogID alanına en az 0 değeri girmelisiniz.")]
		public int BlogID { get; set; }
		[Required(ErrorMessage = "VideoUrl alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
		[StringLength(255)]
		public string VideoUrl { get; set; }
		public string Code { get; set; }

		public string Mesaj { get; set; }

		public List<SelectListItem> BlogList { get; set; }

		public string BlogAdi { get; set; }

		#endregion

		#region Methods

		public List<BlogVideos> List(int? id = null, int? top = null, bool relation = true)
		{
			List<BlogVideos> table;

			List<usp_BlogVideosLinkedSelect_Result> tableTemp;
			List<usp_BlogVideosSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_BlogVideosLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<BlogVideos, usp_BlogVideosLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_BlogVideosSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<BlogVideos, usp_BlogVideosSelectTop_Result>();
			}

			if (relation)
			{
				foreach(BlogVideos item in table)
				{
					List<usp_BlogSelect_Result> tableBlog = entity.usp_BlogSelect(null).ToList();
					item.BlogList = tableBlog.ToSelectList<usp_BlogSelect_Result, SelectListItem>("ID", "Title", item.BlogID);
				}
			}

			return table;
		}

		public List<BlogVideos> ListAll(int? id = null, bool relation = true)
		{
			List<BlogVideos> table;

			List<usp_BlogVideosSelectAll_Result> tableTemp;

			tableTemp = entity.usp_BlogVideosSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<BlogVideos, usp_BlogVideosSelectAll_Result>();

			if (relation)
			{
				foreach(BlogVideos item in table)
				{
					List<usp_BlogSelect_Result> tableBlog = entity.usp_BlogSelect(null).ToList();
					item.BlogList = tableBlog.ToSelectList<usp_BlogSelect_Result, SelectListItem>("ID", "Title", item.BlogID);
				}
			}

			return table;
		}

		public IBlogVideos Select(int? id, bool relation = true)
		{
			usp_BlogVideosSelectTop_Result tableTemp = entity.usp_BlogVideosSelectTop(id, 1).FirstOrDefault();
			BlogVideos table = tableTemp.ChangeModel<BlogVideos>();

			if (relation)
			{
				List<usp_BlogSelect_Result> tableBlog = entity.usp_BlogSelect(null).ToList();
				table.BlogList = tableBlog.ToSelectList<usp_BlogSelect_Result, SelectListItem>("ID", "Title", table.BlogID);
			}

			return table;
		}

		public List<BlogVideos> SelectByCode(string code, bool relation = true)
		{
			List<usp_BlogVideosSelectByCode_Result> tableTemp = entity.usp_BlogVideosSelectByCode(code).ToList();
			List<BlogVideos> table = tableTemp.ChangeModelList<BlogVideos, usp_BlogVideosSelectByCode_Result>();

			if (relation)
			{
				foreach(BlogVideos item in table)
				{
					List<usp_BlogSelect_Result> tableBlog = entity.usp_BlogSelect(null).ToList();
					item.BlogList = tableBlog.ToSelectList<usp_BlogSelect_Result, SelectListItem>("ID", "Title", item.BlogID);
				}
			}

			return table;
		}

		public IBlogVideos Insert(IBlogVideos table = null, int? blogID = null)
		{
			if (table == null)
				table = new BlogVideos();

			List<usp_BlogSelect_Result> tableBlog = entity.usp_BlogSelect(null).ToList();
			table.BlogList = tableBlog.ToSelectList<usp_BlogSelect_Result, SelectListItem>("ID",  "Title", blogID);

			return table;
		}

		public bool Insert(IBlogVideos table)
		{
			var result = entity.usp_BlogVideosInsert(table.BlogID, table.VideoUrl, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public IBlogVideos Update(int? id = null, IBlogVideos table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_BlogSelect_Result> tableBlog = entity.usp_BlogSelect(null).ToList();
				table.BlogList = tableBlog.ToSelectList<usp_BlogSelect_Result, SelectListItem>("ID", "Title", table.BlogID);
			}

			return table;
		}

		public bool Update(IBlogVideos table)
		{
			var result = entity.usp_BlogVideosUpdate(table.ID, table.BlogID, table.VideoUrl, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_BlogVideosCopy(id).FirstOrDefault();

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
				entity.usp_BlogVideosDelete(id);

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
