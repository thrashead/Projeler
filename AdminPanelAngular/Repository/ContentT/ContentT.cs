using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using AdminPanelAngular.Data;
using TDLibrary;

namespace Repository.ContentTModel
{
    public class ContentT : IContentT
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public ContentT()
        {
            ContentList = new List<SelectListItem>();
            TranslationList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        public int ContID { get; set; }
        public int TransID { get; set; }
        public string ContentName { get; set; }
        public string ShortText1 { get; set; }
        public string ShortText2 { get; set; }
        [AllowHtml]
        public string Description { get; set; }
        public bool Deleted { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> ContentList { get; set; }
        public List<SelectListItem> TranslationList { get; set; }
        public string ContentAdi { get; set; }
        public string TranslationAdi { get; set; }


        public List<ContentT> List()
        {
            return entity.usp_ContentTLinkedSelect(null).ToList().ChangeModelList<ContentT, usp_ContentTLinkedSelect_Result>();
        }

        public IContentT Select(int id)
        {
            usp_ContentTSelectTop_Result model = entity.usp_ContentTSelectTop(id, 1).FirstOrDefault();
            IContentT table = model.ChangeModel<ContentT>();

            return table;
        }

        public IContentT Insert(int? contID = null, int? transID = null, IContentT table = null)
        {
            if (table == null)
                table = new ContentT();

            List<usp_ContentSelect_Result> tableContent = entity.usp_ContentSelect(null).ToList();
            table.ContentList = tableContent.ToSelectList<usp_ContentSelect_Result, SelectListItem>("ID", "Title", contID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", transID);

            return table;
        }

        public bool Insert(IContentT table)
        {
            var result = entity.usp_ContentTCheckInsert(table.ContID, table.TransID, table.ContentName, table.ShortText1, table.ShortText2, table.Description);

            if (result != null)
                return true;
            else
                return false;
        }

        public IContentT Update(int id, IContentT table = null)
        {
            if (table == null)
                table = Select(id);

            List<usp_ContentSelect_Result> tableContent = entity.usp_ContentSelect(null).ToList();
            table.ContentList = tableContent.ToSelectList<usp_ContentSelect_Result, SelectListItem>("ID", "Title", table.ContID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);

            return table;
        }

        public bool Update(IContentT table)
        {
            var result = entity.usp_ContentTCheckUpdate(table.ID, table.ContID, table.TransID, table.ContentName, table.ShortText1, table.ShortText2, table.Description);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_ContentTDelete(id);

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
                entity.usp_ContentTSetDeleted(id);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
