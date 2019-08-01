using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using AdminPanel.Data;
using TDLibrary;

namespace Repository.UrunDilModel
{
    public class UrunDil : IUrunDil
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public UrunDil()
        {
            ProductList = new List<SelectListItem>();
            TranslationList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "Bağlı Ürün alanı boş olamaz.")]
        public int ProdID { get; set; }
        [Required(ErrorMessage = "Dil alanı boş olamaz.")]
        public int TransID { get; set; }
        [Required(ErrorMessage = "Ürün Adı alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
        [StringLength(255)]
        public string ProductName { get; set; }
        public string ShortText1 { get; set; }
        public string ShortText2 { get; set; }
        [DataType(DataType.MultilineText)]
        [AllowHtml]
        public string Description { get; set; }
        public bool Deleted { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> ProductList { get; set; }
        public List<SelectListItem> TranslationList { get; set; }
        public string ProductAdi { get; set; }
        public string TranslationAdi { get; set; }


        public List<UrunDil> List()
        {
            return entity.usp_ProductTLinkedSelect(null).ToList().ChangeModelList<UrunDil, usp_ProductTLinkedSelect_Result>();
        }

        public IUrunDil Select(int id)
        {
            usp_ProductTSelectTop_Result table = entity.usp_ProductTSelectTop(id, 1).FirstOrDefault();
            IUrunDil urun = table.ChangeModel<UrunDil>();

            return urun;
        }

        public IUrunDil Insert(int? prodID = null, int? transID = null, IUrunDil urun = null)
        {
            if (urun == null)
                urun = new UrunDil();

            List<usp_ProductSelect_Result> tableUrun = entity.usp_ProductSelect(null).ToList();
            urun.ProductList = tableUrun.ToSelectList<usp_ProductSelect_Result, SelectListItem>("ID", "Title", prodID);

            List<usp_TranslationSelect_Result> tableDil = entity.usp_TranslationSelect(null).ToList();
            urun.TranslationList = tableDil.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", transID);

            return urun;
        }

        public bool Insert(IUrunDil urun)
        {
            var result = entity.usp_ProductTCheckInsert(urun.ProdID, urun.TransID, urun.ProductName, urun.ShortText1, urun.ShortText2, urun.Description);

            if (result != null)
                return true;
            else
                return false;
        }

        public IUrunDil Update(int id, IUrunDil urun = null)
        {
            if (urun == null)
                urun = Select(id);

            List<usp_ProductSelect_Result> tableUrun = entity.usp_ProductSelect(null).ToList();
            urun.ProductList = tableUrun.ToSelectList<usp_ProductSelect_Result, SelectListItem>("ID", "Title", urun.ProdID);

            List<usp_TranslationSelect_Result> tableDil = entity.usp_TranslationSelect(null).ToList();
            urun.TranslationList = tableDil.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", urun.TransID);

            return urun;
        }

        public bool Update(IUrunDil urun)
        {
            var result = entity.usp_ProductTCheckUpdate(urun.ID, urun.ProdID, urun.TransID, urun.ProductName, urun.ShortText1, urun.ShortText2, urun.Description);

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
