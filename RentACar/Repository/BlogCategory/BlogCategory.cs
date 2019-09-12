using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using RentACar.Data;
using TDLibrary;
using Repository.BlogCategoryTModel;
using Repository.BlogModel;

namespace Repository.BlogCategoryModel
{
	public class BlogCategory : IBlogCategory
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public BlogCategory()
		{
			BlogCategoryTList = new List<IBlogCategoryT>();
			BlogList = new List<IBlog>();
		}

		public int ID { get; set; }
		[Required(ErrorMessage = "Title alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
		[StringLength(255)]
		public string Title { get; set; }
        [Required(ErrorMessage = "Url alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
		[StringLength(255)]
		public string Url { get; set; }
        [Required(ErrorMessage = "Code alanı boş olamaz ve en fazla 25 karakter olmalıdır.")]
		[StringLength(25)]
		public string Code { get; set; }

		public string Mesaj { get; set; }

		public List<IBlogCategoryT> BlogCategoryTList { get; set; }
		public List<IBlog> BlogList { get; set; }

		#endregion

		#region Methods

		public List<BlogCategory> List(int? id = null, int? top = null, bool relation = true)
		{
			List<BlogCategory> table;

			List<usp_BlogCategorySelect_Result> tableTemp;
			List<usp_BlogCategorySelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_BlogCategorySelect(id).ToList();
				table = tableTemp.ChangeModelList<BlogCategory, usp_BlogCategorySelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_BlogCategorySelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<BlogCategory, usp_BlogCategorySelectTop_Result>();
			}

			if (relation)
			{
				foreach(BlogCategory item in table)
				{
					List<usp_BlogCategoryT_BlogCategoryByLinkedIDSelect_Result> blogcategorytModelList = entity.usp_BlogCategoryT_BlogCategoryByLinkedIDSelect(item.ID).ToList();
					item.BlogCategoryTList.AddRange(blogcategorytModelList.ChangeModelList<BlogCategoryT, usp_BlogCategoryT_BlogCategoryByLinkedIDSelect_Result>());

					List<usp_Blog_BlogCategoryByLinkedIDSelect_Result> blogModelList = entity.usp_Blog_BlogCategoryByLinkedIDSelect(item.ID).ToList();
					item.BlogList.AddRange(blogModelList.ChangeModelList<Blog, usp_Blog_BlogCategoryByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public List<BlogCategory> ListAll(int? id = null, bool relation = true)
		{
			List<BlogCategory> table;

			List<usp_BlogCategorySelectAll_Result> tableTemp;

			tableTemp = entity.usp_BlogCategorySelectAll(id).ToList();
			table = tableTemp.ChangeModelList<BlogCategory, usp_BlogCategorySelectAll_Result>();

			if (relation)
			{
				foreach(BlogCategory item in table)
				{
					List<usp_BlogCategoryT_BlogCategoryByLinkedIDSelect_Result> blogcategorytModelList = entity.usp_BlogCategoryT_BlogCategoryByLinkedIDSelect(item.ID).ToList();
					item.BlogCategoryTList.AddRange(blogcategorytModelList.ChangeModelList<BlogCategoryT, usp_BlogCategoryT_BlogCategoryByLinkedIDSelect_Result>());

					List<usp_Blog_BlogCategoryByLinkedIDSelect_Result> blogModelList = entity.usp_Blog_BlogCategoryByLinkedIDSelect(item.ID).ToList();
					item.BlogList.AddRange(blogModelList.ChangeModelList<Blog, usp_Blog_BlogCategoryByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public IBlogCategory Select(int? id, bool relation = true)
		{
			usp_BlogCategorySelectTop_Result tableTemp = entity.usp_BlogCategorySelectTop(id, 1).FirstOrDefault();
			BlogCategory table = tableTemp.ChangeModel<BlogCategory>();

			if (relation)
			{
				List<usp_BlogCategoryT_BlogCategoryByLinkedIDSelect_Result> blogcategorytModelList = entity.usp_BlogCategoryT_BlogCategoryByLinkedIDSelect(id).ToList();
				table.BlogCategoryTList.AddRange(blogcategorytModelList.ChangeModelList<BlogCategoryT, usp_BlogCategoryT_BlogCategoryByLinkedIDSelect_Result>());

				List<usp_Blog_BlogCategoryByLinkedIDSelect_Result> blogModelList = entity.usp_Blog_BlogCategoryByLinkedIDSelect(id).ToList();
				table.BlogList.AddRange(blogModelList.ChangeModelList<Blog, usp_Blog_BlogCategoryByLinkedIDSelect_Result>());
			}

			return table;
		}

		public List<BlogCategory> SelectByCode(string code, bool relation = true)
		{
			List<usp_BlogCategorySelectByCode_Result> tableTemp = entity.usp_BlogCategorySelectByCode(code).ToList();
			List<BlogCategory> table = tableTemp.ChangeModelList<BlogCategory, usp_BlogCategorySelectByCode_Result>();

			if (relation)
			{
				foreach(BlogCategory item in table)
				{
					List<usp_BlogCategoryT_BlogCategoryByLinkedIDSelect_Result> blogcategorytModelList = entity.usp_BlogCategoryT_BlogCategoryByLinkedIDSelect(item.ID).ToList();
					item.BlogCategoryTList.AddRange(blogcategorytModelList.ChangeModelList<BlogCategoryT, usp_BlogCategoryT_BlogCategoryByLinkedIDSelect_Result>());

					List<usp_Blog_BlogCategoryByLinkedIDSelect_Result> blogModelList = entity.usp_Blog_BlogCategoryByLinkedIDSelect(item.ID).ToList();
					item.BlogList.AddRange(blogModelList.ChangeModelList<Blog, usp_Blog_BlogCategoryByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public IBlogCategory Insert(IBlogCategory table = null, bool? none = null)
		{
			if (table == null)
				table = new BlogCategory();

			return table;
		}

		public bool Insert(IBlogCategory table)
		{
            table.Url = table.Title.ToUrl();

            var result = entity.usp_BlogCategoryInsert(table.Title, table.Url, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public IBlogCategory Update(int? id = null, IBlogCategory table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_BlogCategoryT_BlogCategoryByLinkedIDSelect_Result> blogcategorytModelList = entity.usp_BlogCategoryT_BlogCategoryByLinkedIDSelect(table.ID).ToList();
				table.BlogCategoryTList.AddRange(blogcategorytModelList.ChangeModelList<BlogCategoryT, usp_BlogCategoryT_BlogCategoryByLinkedIDSelect_Result>());

				List<usp_Blog_BlogCategoryByLinkedIDSelect_Result> blogModelList = entity.usp_Blog_BlogCategoryByLinkedIDSelect(table.ID).ToList();
				table.BlogList.AddRange(blogModelList.ChangeModelList<Blog, usp_Blog_BlogCategoryByLinkedIDSelect_Result>());

			}

			return table;
		}

		public bool Update(IBlogCategory table)
		{
            table.Url = table.Title.ToUrl();

            var result = entity.usp_BlogCategoryUpdate(table.ID, table.Title, table.Url, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_BlogCategoryCopy(id).FirstOrDefault();

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
				entity.usp_BlogCategoryDelete(id);

				return true;
			}
			catch
			{
				return false;
			}
		}

        #endregion

        #region User Defined

        public List<sp_BlogCategoryDetailSelectAll_Result> BlogCategoryDetailSelectAll(int? transID = null, int ? top = null)
        {
            List<sp_BlogCategoryDetailSelectAll_Result> table = entity.sp_BlogCategoryDetailSelectAll(transID, top).ToList();

            return table;
        }

        #endregion
    }
}
