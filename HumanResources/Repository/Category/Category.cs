using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using System.Linq;
using HumanResources.Data;
using TDLibrary;

namespace Repository.CategoryModel
{
	public class Category : ICategory
	{
		readonly HumanResourcesEntities entity = new HumanResourcesEntities();

		#region Model

		public int ID { get; set; }
		public int ParentID { get; set; }
		public string CategoryName { get; set; }
		public string Code { get; set; }
		public string ShortDesc1 { get; set; }
		[AllowHtml]
		public string Description1 { get; set; }
		public string ShortDesc2 { get; set; }
		[AllowHtml]
		public string Description2 { get; set; }
		public string Url { get; set; }
		public bool Show { get; set; }

		public string Mesaj { get; set; }
		public List<SelectListItem> ParentCategories { get; set; }

		#endregion

		#region Methods

		public List<Category> List(int? id = null, int? top = null, bool relation = true)
		{
			List<Category> table;

			List<usp_CategorySelect_Result> tableTemp;
			List<usp_CategorySelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_CategorySelect(id).ToList();
				table = tableTemp.ChangeModelList<Category, usp_CategorySelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_CategorySelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<Category, usp_CategorySelectTop_Result>();
			}

			if (relation)
			{
				foreach(Category item in table)
				{
					List<usp_CategoryParentSelect_Result> parentList = entity.usp_CategoryParentSelect(item.ID).ToList();
					item.ParentCategories = parentList.ToSelectList<usp_CategoryParentSelect_Result, SelectListItem>("ID", "Title", item.ParentID, true);

				}
			}

			return table;
		}

		public List<Category> ListAll(bool relation = true)
		{
			List<Category> table;

			List<usp_CategorySelectAll_Result> tableTemp;

			tableTemp = entity.usp_CategorySelectAll().ToList();
			table = tableTemp.ChangeModelList<Category, usp_CategorySelectAll_Result>();

			if (relation)
			{
				foreach(Category item in table)
				{
					List<usp_CategoryParentSelect_Result> parentList = entity.usp_CategoryParentSelect(item.ID).ToList();
					item.ParentCategories = parentList.ToSelectList<usp_CategoryParentSelect_Result, SelectListItem>("ID", "Title", item.ParentID, true);

				}
			}

			return table;
		}

		public ICategory Select(int? id, bool relation = true)
		{
			usp_CategorySelectTop_Result tableTemp = entity.usp_CategorySelectTop(id, 1).FirstOrDefault();
			Category table = tableTemp.ChangeModel<Category>();

			if (relation)
			{
				List<usp_CategoryParentSelect_Result> parentList = entity.usp_CategoryParentSelect(table.ID).ToList();
				table.ParentCategories = parentList.ToSelectList<usp_CategoryParentSelect_Result, SelectListItem>("ID", "Title", table.ParentID, true);

			}

			return table;
		}

		public ICategory SelectByUrl(string url, bool relation = true)
		{
			usp_CategorySelectByUrl_Result tableTemp = entity.usp_CategorySelectByUrl(url).FirstOrDefault();
			Category table = tableTemp.ChangeModel<Category>();

			if (relation)
			{
				List<usp_CategoryParentSelect_Result> parentList = entity.usp_CategoryParentSelect(table.ID).ToList();
				table.ParentCategories = parentList.ToSelectList<usp_CategoryParentSelect_Result, SelectListItem>("ID", "Title", table.ParentID, true);

			}

			return table;
		}

		public List<Category> SelectByCode(string code, bool relation = true)
		{
			List<usp_CategorySelectByCode_Result> tableTemp = entity.usp_CategorySelectByCode(code).ToList();
			List<Category> table = tableTemp.ChangeModelList<Category, usp_CategorySelectByCode_Result>();

			if (relation)
			{
				foreach(Category item in table)
				{
					List<usp_CategoryParentSelect_Result> parentList = entity.usp_CategoryParentSelect(item.ID).ToList();
					item.ParentCategories = parentList.ToSelectList<usp_CategoryParentSelect_Result, SelectListItem>("ID", "Title", item.ParentID, true);

				}
			}

			return table;
		}

		public ICategory Insert(ICategory table = null, bool? none = null)
		{
			if (table == null)
				table = new Category();

			List<usp_CategoryParentSelect_Result> parentList = entity.usp_CategoryParentSelect(null).ToList();
			table.ParentCategories = parentList.ToSelectList<usp_CategoryParentSelect_Result, SelectListItem>("ID", "Title", null, true);

			return table;
		}

		public bool Insert(ICategory table)
		{
			table.Url = table.CategoryName.ToUrl();

			var result = entity.usp_CategoryInsert(table.ParentID, table.CategoryName, table.Code, table.ShortDesc1, table.Description1, table.ShortDesc2, table.Description2, table.Url, table.Show).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ICategory Update(int? id = null, ICategory table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
				List<usp_CategoryParentSelect_Result> parentList = entity.usp_CategoryParentSelect(table.ID).ToList();
				table.ParentCategories = parentList.ToSelectList<usp_CategoryParentSelect_Result, SelectListItem>("ID", "Title", table.ParentID, true);


			return table;
		}

		public bool Update(ICategory table)
		{
			table.Url = table.CategoryName.ToUrl();

			var result = entity.usp_CategoryUpdate(table.ID, table.ParentID, table.CategoryName, table.Code, table.ShortDesc1, table.Description1, table.ShortDesc2, table.Description2, table.Url, table.Show).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_CategoryCopy(id).FirstOrDefault();

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
				entity.usp_CategoryDelete(id);

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
