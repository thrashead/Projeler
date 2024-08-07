using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using System.Linq;
using RentACar.Data;
using TDLibrary;

namespace Repository.BlogCommentsModel
{
	public class BlogComments : IBlogComments
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public BlogComments()
		{
			BlogList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		[Required(ErrorMessage = "BlogID alanı boş olamaz ve BlogID alanına en az 0 değeri girmelisiniz.")]
		[Range(0, int.MaxValue, ErrorMessage = "BlogID alanı boş olamaz ve BlogID alanına en az 0 değeri girmelisiniz.")]
		public int BlogID { get; set; }
		[Required(ErrorMessage = "Sender alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
		[StringLength(255)]
		public string Sender { get; set; }
		[Required(ErrorMessage = "Mail alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
		[StringLength(255)]
		public string Mail { get; set; }
		public string SendDate { get; set; }
		[Required(ErrorMessage = "Message alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
		[StringLength(255)]
		public string Message { get; set; }
		public bool Active { get; set; }
        public string IPAddress { get; set; }

        public string Mesaj { get; set; }

		public List<SelectListItem> BlogList { get; set; }

		public string BlogAdi { get; set; }

		#endregion

		#region Methods

		public List<BlogComments> List(int? id = null, int? top = null, bool relation = true)
		{
			List<BlogComments> table;

			List<usp_BlogCommentsLinkedSelect_Result> tableTemp;
			List<usp_BlogCommentsSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_BlogCommentsLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<BlogComments, usp_BlogCommentsLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_BlogCommentsSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<BlogComments, usp_BlogCommentsSelectTop_Result>();
			}

			if (relation)
			{
				foreach(BlogComments item in table)
				{
					List<usp_BlogSelect_Result> tableBlog = entity.usp_BlogSelect(null).ToList();
					item.BlogList = tableBlog.ToSelectList<usp_BlogSelect_Result, SelectListItem>("ID", "Title", item.BlogID);
				}
			}

			return table;
		}

		public List<BlogComments> ListAll(int? id = null, bool relation = true)
		{
			List<BlogComments> table;

			List<usp_BlogCommentsSelectAll_Result> tableTemp;

			tableTemp = entity.usp_BlogCommentsSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<BlogComments, usp_BlogCommentsSelectAll_Result>();

			if (relation)
			{
				foreach(BlogComments item in table)
				{
					List<usp_BlogSelect_Result> tableBlog = entity.usp_BlogSelect(null).ToList();
					item.BlogList = tableBlog.ToSelectList<usp_BlogSelect_Result, SelectListItem>("ID", "Title", item.BlogID);
				}
			}

			return table;
		}

		public IBlogComments Select(int? id, bool relation = true)
		{
			usp_BlogCommentsSelectTop_Result tableTemp = entity.usp_BlogCommentsSelectTop(id, 1).FirstOrDefault();
			BlogComments table = tableTemp.ChangeModel<BlogComments>();

			if (relation)
			{
				List<usp_BlogSelect_Result> tableBlog = entity.usp_BlogSelect(null).ToList();
				table.BlogList = tableBlog.ToSelectList<usp_BlogSelect_Result, SelectListItem>("ID", "Title", table.BlogID);
			}

			return table;
		}

		public IBlogComments Insert(IBlogComments table = null, int? blogID = null)
		{
			if (table == null)
				table = new BlogComments();

			List<usp_BlogSelect_Result> tableBlog = entity.usp_BlogSelect(null).ToList();
			table.BlogList = tableBlog.ToSelectList<usp_BlogSelect_Result, SelectListItem>("ID",  "Title", blogID);

			return table;
		}

		public bool Insert(IBlogComments table)
		{
			var result = entity.usp_BlogCommentsInsert(table.BlogID, table.Sender, table.Mail, table.SendDate, table.Message, table.Active, table.IPAddress).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public IBlogComments Update(int? id = null, IBlogComments table = null)
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

		public bool Update(IBlogComments table)
		{
			var result = entity.usp_BlogCommentsUpdate(table.ID, table.BlogID, table.Sender, table.Mail, table.SendDate, table.Message, table.Active, table.IPAddress).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_BlogCommentsCopy(id).FirstOrDefault();

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
				entity.usp_BlogCommentsDelete(id);

				return true;
			}
			catch
			{
				return false;
			}
		}

        #endregion

        #region User Defined

        public DateTime? GetLastDate(string IPAddress)
        {
            DateTime? table = entity.sp_BlogCommentsLastDate(IPAddress).FirstOrDefault();

            return table;
        }

        #endregion
    }
}
