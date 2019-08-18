using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using AdminPanelAngular.Data;
using Repository.MetaTModel;
using TDLibrary;

namespace Repository.MetaModel
{
    public class Meta : IMeta
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public Meta()
        {
            MetaTList = new List<MetaT>();
            TypesList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        public string Title { get; set; }
        public string Code { get; set; }
        public bool Active { get; set; }
        public bool Deleted { get; set; }

        public string Mesaj { get; set; }

        public List<MetaT> MetaTList { get; set; }
        public List<SelectListItem> TypesList { get; set; }


        public List<Meta> List()
        {
            return entity.usp_MetaSelect(null).ToList().ChangeModelList<Meta, usp_MetaSelect_Result>();
        }

        public IMeta Select(int id)
        {
            usp_MetaSelectTop_Result model = entity.usp_MetaSelectTop(id, 1).FirstOrDefault();
            IMeta table = model.ChangeModel<Meta>();

            return table;
        }

        public bool Insert(IMeta table)
        {
            var result = entity.usp_MetaInsert(table.Title, table.Code, table.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public IMeta Update(int id, IMeta table = null)
        {
            if (table == null)
                table = Select(id);

            List<usp_MetaTByLinkedIDSelect_Result> tableMetaT = entity.usp_MetaTByLinkedIDSelect(id).ToList();
            table.MetaTList.AddRange(tableMetaT.ChangeModelList<MetaT, usp_MetaTByLinkedIDSelect_Result>());

            return table;
        }

        public bool Update(IMeta table)
        {
            var result = entity.usp_MetaUpdate(table.ID, table.Title, table.Code, table.Active);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_MetaCheckDelete(id);

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
                entity.usp_MetaCheckSetDeleted(id);

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
                var result = entity.usp_MetaCopy(id);

                return result == null ? false : true;
            }
            catch
            {
                return false;
            }
        }
    }
}
