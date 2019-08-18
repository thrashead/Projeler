using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using AdminPanelAngular.Data;
using TDLibrary;

namespace Repository.CategoryTModel
{
    public class CategoryT : ICategoryT
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public CategoryT()
        {
            CategoryList = new List<SelectListItem>();
            TranslationList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        public int CatID { get; set; }
        public int TransID { get; set; }
        public string CategoryName { get; set; }
        public string ShortText1 { get; set; }
        public string ShortText2 { get; set; }
        [AllowHtml]
        public string Description { get; set; }
        public bool Deleted { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> CategoryList { get; set; }
        public List<SelectListItem> TranslationList { get; set; }
        public string CategoryAdi { get; set; }
        public string TranslationAdi { get; set; }


        public List<CategoryT> List()
        {
            return entity.usp_CategoryTLinkedSelect(null).ToList().ChangeModelList<CategoryT, usp_CategoryTLinkedSelect_Result>();
        }

        public ICategoryT Select(int id)
        {
            usp_CategoryTSelectTop_Result model = entity.usp_CategoryTSelectTop(id, 1).FirstOrDefault();
            ICategoryT table = model.ChangeModel<CategoryT>();

            return table;
        }

        public ICategoryT Insert(int? catID = null, int? transID = null, ICategoryT table = null)
        {
            if (table == null)
                table = new CategoryT();

            List<usp_CategorySelect_Result> tableCategory = entity.usp_CategorySelect(null).ToList();
            table.CategoryList = tableCategory.ToSelectList<usp_CategorySelect_Result, SelectListItem>("ID", "Title", catID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", transID);

            return table;
        }

        public bool Insert(ICategoryT table)
        {
            var result = entity.usp_CategoryTCheckInsert(table.CatID, table.TransID, table.CategoryName, table.ShortText1, table.ShortText2, table.Description);

            if (result != null)
                return true;
            else
                return false;
        }

        public ICategoryT Update(int id, ICategoryT table = null)
        {
            if (table == null)
                table = Select(id);

            List<usp_CategorySelect_Result> tableCategory = entity.usp_CategorySelect(null).ToList();
            table.CategoryList = tableCategory.ToSelectList<usp_CategorySelect_Result, SelectListItem>("ID", "Title", table.CatID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);

            return table;
        }

        public bool Update(ICategoryT table)
        {
            var result = entity.usp_CategoryTCheckUpdate(table.ID, table.CatID, table.TransID, table.CategoryName, table.ShortText1, table.ShortText2, table.Description);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_CategoryTDelete(id);

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
                entity.usp_CategoryTSetDeleted(id);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
