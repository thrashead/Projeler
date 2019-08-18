using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using AdminPanelAngular.Data;
using TDLibrary;

namespace Repository.MetaTModel
{
    public class MetaT : IMetaT
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public MetaT()
        {
            MetaList = new List<SelectListItem>();
            TranslationList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        public int MetaID { get; set; }
        public int TransID { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public bool Deleted { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> MetaList { get; set; }
        public List<SelectListItem> TranslationList { get; set; }
        public string MetaAdi { get; set; }
        public string TranslationAdi { get; set; }


        public List<MetaT> List()
        {
            return entity.usp_MetaTLinkedSelect(null).ToList().ChangeModelList<MetaT, usp_MetaTLinkedSelect_Result>();
        }

        public IMetaT Select(int id)
        {
            usp_MetaTSelectTop_Result model = entity.usp_MetaTSelectTop(id, 1).FirstOrDefault();
            IMetaT table = model.ChangeModel<MetaT>();

            return table;
        }

        public IMetaT Insert(int? tableID = null, int? transID = null, IMetaT table = null)
        {
            if (table == null)
                table = new MetaT();

            List<usp_MetaSelect_Result> tableMeta = entity.usp_MetaSelect(null).ToList();
            table.MetaList = tableMeta.ToSelectList<usp_MetaSelect_Result, SelectListItem>("ID", "Title", tableID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", transID);

            return table;
        }

        public bool Insert(IMetaT table)
        {
            var result = entity.usp_MetaTCheckInsert(table.MetaID, table.TransID, table.Name, table.Content);

            if (result != null)
                return true;
            else
                return false;
        }

        public IMetaT Update(int id, IMetaT table = null)
        {
            if (table == null)
                table = Select(id);

            List<usp_MetaSelect_Result> tableMeta = entity.usp_MetaSelect(null).ToList();
            table.MetaList = tableMeta.ToSelectList<usp_MetaSelect_Result, SelectListItem>("ID", "Title", table.MetaID);

            List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
            table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);

            return table;
        }

        public bool Update(IMetaT table)
        {
            var result = entity.usp_MetaTCheckUpdate(table.ID, table.MetaID, table.TransID, table.Name, table.Content);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_MetaTDelete(id);

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
                entity.usp_MetaTSetDeleted(id);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
