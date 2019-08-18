using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using AdminPanelAngular.Data;
using Repository.ProductTModel;
using TDLibrary;

namespace Repository.ProductModel
{
    public class Product : IProduct
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public Product()
        {
            ProductTList = new List<ProductT>();
            TypesList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public string Code { get; set; }
        public bool Active { get; set; }
        public bool Deleted { get; set; }

        public string Mesaj { get; set; }

        public List<ProductT> ProductTList { get; set; }
        public List<SelectListItem> TypesList { get; set; }


        public List<Product> List()
        {
            return entity.usp_ProductSelect(null).ToList().ChangeModelList<Product, usp_ProductSelect_Result>();
        }

        public IProduct Select(int id)
        {
            usp_ProductSelectTop_Result model = entity.usp_ProductSelectTop(id, 1).FirstOrDefault();
            IProduct table = model.ChangeModel<Product>();

            return table;
        }

        public bool Insert(IProduct table)
        {
            var result = entity.usp_ProductInsert(table.Title, table.Url, table.Code, table.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public IProduct Update(int id, IProduct table = null)
        {
            if (table == null)
                table = Select(id);

            List<usp_ProductTByLinkedIDSelect_Result> tableProductT = entity.usp_ProductTByLinkedIDSelect(id).ToList();
            table.ProductTList.AddRange(tableProductT.ChangeModelList<ProductT, usp_ProductTByLinkedIDSelect_Result>());

            return table;
        }

        public bool Update(IProduct table)
        {
            var result = entity.usp_ProductUpdate(table.ID, table.Title, table.Url, table.Code, table.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_ProductCheckDelete(id);

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
                entity.usp_ProductCheckSetDeleted(id);

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
                var result = entity.usp_ProductCopy(id);

                return result == null ? false : true;
            }
            catch
            {
                return false;
            }
        }
    }
}
