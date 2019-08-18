using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using AdminPanelAngular.Data;
using TDLibrary;

namespace Repository.ProductTModel
{
    public class ProductT : IProductT
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public ProductT()
        {
            ProductList = new List<SelectListItem>();
            TranslationList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        public int ProdID { get; set; }
        public int TransID { get; set; }
        public string ProductName { get; set; }
        public string ShortText1 { get; set; }
        public string ShortText2 { get; set; }
        [AllowHtml]
        public string Description { get; set; }
        public bool Deleted { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> ProductList { get; set; }
        public List<SelectListItem> TranslationList { get; set; }

        public string ProductAdi { get; set; }
        public string TranslationAdi { get; set; }


        public List<ProductT> List()
        {
            return entity.usp_ProductTLinkedSelect(null).ToList().ChangeModelList<ProductT, usp_ProductTLinkedSelect_Result>();
        }

        public IProductT Select(int id)
        {
            usp_ProductTSelectTop_Result model = entity.usp_ProductTSelectTop(id, 1).FirstOrDefault();
            IProductT table = model.ChangeModel<ProductT>();

            return table;
        }

        public IProductT Insert(int? prodID = null, int? transID = null, IProductT table = null)
        {
            if (table == null)
                table = new ProductT();

            List<usp_ProductSelect_Result> tableProduct = entity.usp_ProductSelect(null).ToList();
            table.ProductList = tableProduct.ToSelectList<usp_ProductSelect_Result, SelectListItem>("ID", "Title", prodID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", transID);

            return table;
        }

        public bool Insert(IProductT table)
        {
            var result = entity.usp_ProductTCheckInsert(table.ProdID, table.TransID, table.ProductName, table.ShortText1, table.ShortText2, table.Description);

            if (result != null)
                return true;
            else
                return false;
        }

        public IProductT Update(int id, IProductT table = null)
        {
            if (table == null)
                table = Select(id);

            List<usp_ProductSelect_Result> tableProduct = entity.usp_ProductSelect(null).ToList();
            table.ProductList = tableProduct.ToSelectList<usp_ProductSelect_Result, SelectListItem>("ID", "Title", table.ProdID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);

            return table;
        }

        public bool Update(IProductT table)
        {
            var result = entity.usp_ProductTCheckUpdate(table.ID, table.ProdID, table.TransID, table.ProductName, table.ShortText1, table.ShortText2, table.Description);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_ProductTDelete(id);

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
                entity.usp_ProductTSetDeleted(id);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
