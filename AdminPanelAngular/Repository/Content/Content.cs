using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using AdminPanelAngular.Data;
using Repository.ContentTModel;
using TDLibrary;

namespace Repository.ContentModel
{
    public class Content : IContent
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public Content()
        {
            ContentTList = new List<ContentT>();
            TypesList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public string Code { get; set; }
        public bool Active { get; set; }
        public bool Deleted { get; set; }

        public string Mesaj { get; set; }

        public List<ContentT> ContentTList { get; set; }
        public List<SelectListItem> TypesList { get; set; }


        public List<Content> List()
        {
            return entity.usp_ContentSelect(null).ToList().ChangeModelList<Content, usp_ContentSelect_Result>();
        }

        public IContent Select(int id)
        {
            usp_ContentSelectTop_Result model = entity.usp_ContentSelectTop(id, 1).FirstOrDefault();
            IContent table = model.ChangeModel<Content>();

            return table;
        }

        public bool Insert(IContent table)
        {
            var result = entity.usp_ContentInsert(table.Title, table.Url, table.Code, table.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public IContent Update(int id, IContent table = null)
        {
            if (table == null)
                table = Select(id);

            List<usp_ContentTByLinkedIDSelect_Result> tableContentT = entity.usp_ContentTByLinkedIDSelect(id).ToList();
            table.ContentTList.AddRange(tableContentT.ChangeModelList<ContentT, usp_ContentTByLinkedIDSelect_Result>());

            return table;
        }

        public bool Update(IContent table)
        {
            var result = entity.usp_ContentUpdate(table.ID, table.Title, table.Url, table.Code, table.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_ContentCheckDelete(id);

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
                entity.usp_ContentCheckSetDeleted(id);

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
                var result = entity.usp_ContentCopy(id);

                return result == null ? false : true;
            }
            catch
            {
                return false;
            }
        }
    }
}
