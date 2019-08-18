using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using AdminPanelAngular.Data;
using Repository.CategoryTModel;
using TDLibrary;

namespace Repository.CategoryModel
{
    public class Category : ICategory
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public Category()
        {
            CategoryTList = new List<CategoryT>();
            TypesList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        public int ParentID { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public string Code { get; set; }
        public bool Active { get; set; }
        public bool Deleted { get; set; }

        public string Mesaj { get; set; }

        public List<CategoryT> CategoryTList { get; set; }
        public List<SelectListItem> ParentCategories { get; set; }
        public List<SelectListItem> TypesList { get; set; }


        public List<Category> List()
        {
            return entity.usp_CategorySelect(null).ToList().ChangeModelList<Category, usp_CategorySelect_Result>();
        }

        public ICategory Select(int id)
        {
            usp_CategorySelectTop_Result model = entity.usp_CategorySelectTop(id, 1).FirstOrDefault();
            ICategory table = model.ChangeModel<Category>();

            return table;
        }

        public ICategory Insert(ICategory table = null, bool? none = null)
        {
            if(table == null)
                table = new Category();

            List<usp_CategoryParentSelect_Result> tableParentCategories = entity.usp_CategoryParentSelect(null).ToList();
            table.ParentCategories = tableParentCategories.ToSelectList<usp_CategoryParentSelect_Result, SelectListItem>("ID", "Title", null, true);

            return table;
        }

        public bool Insert(ICategory table)
        {
            table.Url = table.Title.ToUrl();

            var result = entity.usp_CategoryInsert(table.ParentID, table.Title, table.Url, table.Code, table.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public ICategory Update(int id, ICategory table = null)
        {
            if(table == null)
                table = Select(id);

            List<usp_CategoryTByLinkedIDSelect_Result> tableCategoryT = entity.usp_CategoryTByLinkedIDSelect(id).ToList();
            table.CategoryTList.AddRange(tableCategoryT.ChangeModelList<CategoryT, usp_CategoryTByLinkedIDSelect_Result>());

            List<usp_CategoryParentSelect_Result> tableParentCategories = entity.usp_CategoryParentSelect(null).ToList();
            table.ParentCategories = tableParentCategories.ToSelectList<usp_CategoryParentSelect_Result, SelectListItem>("ID", "Title", table.ParentID, true);

            return table;
        }

        public bool Update(ICategory table)
        {
            table.Url = table.Title.ToUrl();

            var result = entity.usp_CategoryUpdate(table.ID, table.ParentID, table.Title, table.Url, table.Code, table.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_CategoryCheckDelete(id);

                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool Remove(int id)
        {
            try
            {
                entity.usp_CategoryCheckSetDeleted(id);

                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool Copy(int id)
        {
            try
            {
                var result = entity.usp_CategoryCopy(id);

                return result == null ? false : true;
            }
            catch
            {
                return false;
            }
        }
    }
}
