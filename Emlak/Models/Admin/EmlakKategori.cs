using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Emlak.Data;
using TDLibrary;

namespace Models
{
	public class EmlakKategori
	{
		readonly EmlakEntities entity = new EmlakEntities();

		#region Model

		public EmlakKategori()
		{
			PropertyList = new List<EmlakYeni>();
			PropertyCategoriesTList = new List<EmlakKategoriDil>();
			ParentCategories = new List<SelectListItem>();
        }

        public int ID { get; set; }
		public int ParentID { get; set; }
		public string Title { get; set; }
		public string Url { get; set; }
		public string Code { get; set; }

		public string Mesaj { get; set; }

		public List<EmlakYeni> PropertyList { get; set; }
		public List<EmlakKategoriDil> PropertyCategoriesTList { get; set; }
        public List<SelectListItem> ParentCategories { get; set; }

        #endregion

        #region Methods

        public List<EmlakKategori> List(int? id = null, int? top = null, bool relation = true)
		{
			List<EmlakKategori> table;

			List<usp_PropertyCategoriesSelect_Result> tableTemp;
			List<usp_PropertyCategoriesSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_PropertyCategoriesSelect(id).ToList();
				table = tableTemp.ChangeModelList<EmlakKategori, usp_PropertyCategoriesSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_PropertyCategoriesSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<EmlakKategori, usp_PropertyCategoriesSelectTop_Result>();
			}

			if (relation)
			{
				foreach(EmlakKategori item in table)
				{
                    List<usp_CategoryParentSelect_Result> parentList = entity.usp_CategoryParentSelect(null).ToList();
                    item.ParentCategories = parentList.ToSelectList<usp_CategoryParentSelect_Result, SelectListItem>("ID", "Title", item.ParentID, true);

                    List<usp_Property_PropertyCategoriesByLinkedIDSelect_Result> propertyModelList = entity.usp_Property_PropertyCategoriesByLinkedIDSelect(item.ID).ToList();
					item.PropertyList.AddRange(propertyModelList.ChangeModelList<EmlakYeni, usp_Property_PropertyCategoriesByLinkedIDSelect_Result>());

					List<usp_PropertyCategoriesT_PropertyCategoriesByLinkedIDSelect_Result> propertycategoriestModelList = entity.usp_PropertyCategoriesT_PropertyCategoriesByLinkedIDSelect(item.ID).ToList();
					item.PropertyCategoriesTList.AddRange(propertycategoriestModelList.ChangeModelList<EmlakKategoriDil, usp_PropertyCategoriesT_PropertyCategoriesByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public List<EmlakKategori> ListAll(int? id = null, bool relation = true)
		{
			List<EmlakKategori> table;

			List<usp_PropertyCategoriesSelectAll_Result> tableTemp;

			tableTemp = entity.usp_PropertyCategoriesSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<EmlakKategori, usp_PropertyCategoriesSelectAll_Result>();

			if (relation)
			{
				foreach(EmlakKategori item in table)
				{
                    List<usp_CategoryParentSelect_Result> parentList = entity.usp_CategoryParentSelect(null).ToList();
                    item.ParentCategories = parentList.ToSelectList<usp_CategoryParentSelect_Result, SelectListItem>("ID", "Title", item.ParentID, true);

                    List<usp_Property_PropertyCategoriesByLinkedIDSelect_Result> propertyModelList = entity.usp_Property_PropertyCategoriesByLinkedIDSelect(item.ID).ToList();
					item.PropertyList.AddRange(propertyModelList.ChangeModelList<EmlakYeni, usp_Property_PropertyCategoriesByLinkedIDSelect_Result>());

					List<usp_PropertyCategoriesT_PropertyCategoriesByLinkedIDSelect_Result> propertycategoriestModelList = entity.usp_PropertyCategoriesT_PropertyCategoriesByLinkedIDSelect(item.ID).ToList();
					item.PropertyCategoriesTList.AddRange(propertycategoriestModelList.ChangeModelList<EmlakKategoriDil, usp_PropertyCategoriesT_PropertyCategoriesByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public EmlakKategori Select(int? id, bool relation = true)
		{
			usp_PropertyCategoriesSelectTop_Result tableTemp = entity.usp_PropertyCategoriesSelectTop(id, 1).FirstOrDefault();
			EmlakKategori table = tableTemp.ChangeModel<EmlakKategori>();

			if (relation)
			{
                List<usp_CategoryParentSelect_Result> parentList = entity.usp_CategoryParentSelect(null).ToList();
                table.ParentCategories = parentList.ToSelectList<usp_CategoryParentSelect_Result, SelectListItem>("ID", "Title", table.ParentID, true);

                List<usp_Property_PropertyCategoriesByLinkedIDSelect_Result> propertyModelList = entity.usp_Property_PropertyCategoriesByLinkedIDSelect(id).ToList();
				table.PropertyList.AddRange(propertyModelList.ChangeModelList<EmlakYeni, usp_Property_PropertyCategoriesByLinkedIDSelect_Result>());

				List<usp_PropertyCategoriesT_PropertyCategoriesByLinkedIDSelect_Result> propertycategoriestModelList = entity.usp_PropertyCategoriesT_PropertyCategoriesByLinkedIDSelect(id).ToList();
				table.PropertyCategoriesTList.AddRange(propertycategoriestModelList.ChangeModelList<EmlakKategoriDil, usp_PropertyCategoriesT_PropertyCategoriesByLinkedIDSelect_Result>());
			}

			return table;
		}

		public EmlakKategori SelectByUrl(string url, bool relation = true)
		{
			usp_PropertyCategoriesSelectByUrl_Result tableTemp = entity.usp_PropertyCategoriesSelectByUrl(url).FirstOrDefault();
			EmlakKategori table = tableTemp.ChangeModel<EmlakKategori>();

			if (relation)
			{
                List<usp_CategoryParentSelect_Result> parentList = entity.usp_CategoryParentSelect(null).ToList();
                table.ParentCategories = parentList.ToSelectList<usp_CategoryParentSelect_Result, SelectListItem>("ID", "Title", table.ParentID, true);

                List<usp_Property_PropertyCategoriesByLinkedIDSelect_Result> propertyModelList = entity.usp_Property_PropertyCategoriesByLinkedIDSelect(table.ID).ToList();
				table.PropertyList.AddRange(propertyModelList.ChangeModelList<EmlakYeni, usp_Property_PropertyCategoriesByLinkedIDSelect_Result>());

				List<usp_PropertyCategoriesT_PropertyCategoriesByLinkedIDSelect_Result> propertycategoriestModelList = entity.usp_PropertyCategoriesT_PropertyCategoriesByLinkedIDSelect(table.ID).ToList();
				table.PropertyCategoriesTList.AddRange(propertycategoriestModelList.ChangeModelList<EmlakKategoriDil, usp_PropertyCategoriesT_PropertyCategoriesByLinkedIDSelect_Result>());
			}

			return table;
		}

		public List<EmlakKategori> SelectByCode(string code, bool relation = true)
		{
			List<usp_PropertyCategoriesSelectByCode_Result> tableTemp = entity.usp_PropertyCategoriesSelectByCode(code).ToList();
			List<EmlakKategori> table = tableTemp.ChangeModelList<EmlakKategori, usp_PropertyCategoriesSelectByCode_Result>();

			if (relation)
			{
				foreach(EmlakKategori item in table)
				{
                    List<usp_CategoryParentSelect_Result> parentList = entity.usp_CategoryParentSelect(null).ToList();
                    item.ParentCategories = parentList.ToSelectList<usp_CategoryParentSelect_Result, SelectListItem>("ID", "Title", item.ParentID, true);

                    List<usp_Property_PropertyCategoriesByLinkedIDSelect_Result> propertyModelList = entity.usp_Property_PropertyCategoriesByLinkedIDSelect(item.ID).ToList();
					item.PropertyList.AddRange(propertyModelList.ChangeModelList<EmlakYeni, usp_Property_PropertyCategoriesByLinkedIDSelect_Result>());

					List<usp_PropertyCategoriesT_PropertyCategoriesByLinkedIDSelect_Result> propertycategoriestModelList = entity.usp_PropertyCategoriesT_PropertyCategoriesByLinkedIDSelect(item.ID).ToList();
					item.PropertyCategoriesTList.AddRange(propertycategoriestModelList.ChangeModelList<EmlakKategoriDil, usp_PropertyCategoriesT_PropertyCategoriesByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public EmlakKategori Insert(EmlakKategori table = null, bool? none = null)
		{
			if (table == null)
				table = new EmlakKategori();

            List<usp_CategoryParentSelect_Result> parentList = entity.usp_CategoryParentSelect(null).ToList();
            table.ParentCategories = parentList.ToSelectList<usp_CategoryParentSelect_Result, SelectListItem>("ID", "Title", null, true);

            return table;
		}

		public bool Insert(EmlakKategori table)
		{
			table.Url = table.Title.ToUrl();

			var result = entity.usp_PropertyCategoriesInsert(table.ParentID, table.Title, table.Url, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public EmlakKategori Update(int? id = null, EmlakKategori table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
                List<usp_CategoryParentSelect_Result> parentList = entity.usp_CategoryParentSelect(null).ToList();
                table.ParentCategories = parentList.ToSelectList<usp_CategoryParentSelect_Result, SelectListItem>("ID", "Title", table.ParentID, true);

                List<usp_Property_PropertyCategoriesByLinkedIDSelect_Result> propertyModelList = entity.usp_Property_PropertyCategoriesByLinkedIDSelect(table.ID).ToList();
				table.PropertyList.AddRange(propertyModelList.ChangeModelList<EmlakYeni, usp_Property_PropertyCategoriesByLinkedIDSelect_Result>());

				List<usp_PropertyCategoriesT_PropertyCategoriesByLinkedIDSelect_Result> propertycategoriestModelList = entity.usp_PropertyCategoriesT_PropertyCategoriesByLinkedIDSelect(table.ID).ToList();
				table.PropertyCategoriesTList.AddRange(propertycategoriestModelList.ChangeModelList<EmlakKategoriDil, usp_PropertyCategoriesT_PropertyCategoriesByLinkedIDSelect_Result>());

			}

			return table;
		}

		public bool Update(EmlakKategori table)
		{
			table.Url = table.Title.ToUrl();

			var result = entity.usp_PropertyCategoriesUpdate(table.ID, table.ParentID, table.Title, table.Url, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_PropertyCategoriesCopy(id).FirstOrDefault();

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
				entity.usp_PropertyCategoriesDelete(id);

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
