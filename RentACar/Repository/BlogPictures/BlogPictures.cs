using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using System.Linq;
using RentACar.Data;
using TDLibrary;

namespace Repository.BlogPicturesModel
{
	public class BlogPictures : IBlogPictures
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public BlogPictures()
		{
			BlogList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		[Required(ErrorMessage = "BlogID alanı boş olamaz ve BlogID alanına en az 0 değeri girmelisiniz.")]
		[Range(0, int.MaxValue, ErrorMessage = "BlogID alanı boş olamaz ve BlogID alanına en az 0 değeri girmelisiniz.")]
		public int BlogID { get; set; }
		[Required(ErrorMessage = "PictureUrl alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
		[StringLength(255)]
		public string PictureUrl { get; set; }
		public string Code { get; set; }

		public string Mesaj { get; set; }

		public string OldPictureUrl { get; set; }

		public bool PictureUrlHasFile { get; set; }

		public List<SelectListItem> BlogList { get; set; }

		public string BlogAdi { get; set; }

		#endregion

		#region Methods

		public List<BlogPictures> List(int? id = null, int? top = null, bool relation = true)
		{
			List<BlogPictures> table;

			List<usp_BlogPicturesLinkedSelect_Result> tableTemp;
			List<usp_BlogPicturesSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_BlogPicturesLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<BlogPictures, usp_BlogPicturesLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_BlogPicturesSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<BlogPictures, usp_BlogPicturesSelectTop_Result>();
			}

			if (relation)
			{
				foreach(BlogPictures item in table)
				{
					List<usp_BlogSelect_Result> tableBlog = entity.usp_BlogSelect(null).ToList();
					item.BlogList = tableBlog.ToSelectList<usp_BlogSelect_Result, SelectListItem>("ID", "Title", item.BlogID);
				}
			}

			return table;
		}

		public List<BlogPictures> ListAll(int? id = null, bool relation = true)
		{
			List<BlogPictures> table;

			List<usp_BlogPicturesSelectAll_Result> tableTemp;

			tableTemp = entity.usp_BlogPicturesSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<BlogPictures, usp_BlogPicturesSelectAll_Result>();

			if (relation)
			{
				foreach(BlogPictures item in table)
				{
					List<usp_BlogSelect_Result> tableBlog = entity.usp_BlogSelect(null).ToList();
					item.BlogList = tableBlog.ToSelectList<usp_BlogSelect_Result, SelectListItem>("ID", "Title", item.BlogID);
				}
			}

			return table;
		}

		public IBlogPictures Select(int? id, bool relation = true)
		{
			usp_BlogPicturesSelectTop_Result tableTemp = entity.usp_BlogPicturesSelectTop(id, 1).FirstOrDefault();
			BlogPictures table = tableTemp.ChangeModel<BlogPictures>();

			if (relation)
			{
				List<usp_BlogSelect_Result> tableBlog = entity.usp_BlogSelect(null).ToList();
				table.BlogList = tableBlog.ToSelectList<usp_BlogSelect_Result, SelectListItem>("ID", "Title", table.BlogID);
			}

			return table;
		}

		public List<BlogPictures> SelectByCode(string code, bool relation = true)
		{
			List<usp_BlogPicturesSelectByCode_Result> tableTemp = entity.usp_BlogPicturesSelectByCode(code).ToList();
			List<BlogPictures> table = tableTemp.ChangeModelList<BlogPictures, usp_BlogPicturesSelectByCode_Result>();

			if (relation)
			{
				foreach(BlogPictures item in table)
				{
					List<usp_BlogSelect_Result> tableBlog = entity.usp_BlogSelect(null).ToList();
					item.BlogList = tableBlog.ToSelectList<usp_BlogSelect_Result, SelectListItem>("ID", "Title", item.BlogID);
				}
			}

			return table;
		}

		public IBlogPictures Insert(IBlogPictures table = null, int? blogID = null)
		{
			if (table == null)
				table = new BlogPictures();

			List<usp_BlogSelect_Result> tableBlog = entity.usp_BlogSelect(null).ToList();
			table.BlogList = tableBlog.ToSelectList<usp_BlogSelect_Result, SelectListItem>("ID",  "Title", blogID);

			return table;
		}

		public bool Insert(IBlogPictures table)
		{
			var result = entity.usp_BlogPicturesInsert(table.BlogID, table.PictureUrl, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public IBlogPictures Update(int? id = null, IBlogPictures table = null)
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

		public bool Update(IBlogPictures table)
		{
			var result = entity.usp_BlogPicturesUpdate(table.ID, table.BlogID, table.PictureUrl, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_BlogPicturesCopy(id).FirstOrDefault();

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
				entity.usp_BlogPicturesDelete(id);

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
