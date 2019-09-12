using System;
using System.Collections.Generic;
using System.Linq;
using RentACar.Data;
using TDLibrary;
using Repository.WorkersTModel;

namespace Repository.WorkersModel
{
    public class Workers : IWorkers
    {
        readonly RentACarEntities entity = new RentACarEntities();

        #region Model

        public Workers()
        {
            WorkersTList = new List<IWorkersT>();
        }

        public int ID { get; set; }
        public string NameSurname { get; set; }
        public string PictureUrl { get; set; }
        public string Facebook { get; set; }
        public string Twitter { get; set; }
        public string Pinterest { get; set; }
        public bool Deleted { get; set; }

        public string Mesaj { get; set; }

        public bool? HasFile { get; set; }

        public string OldPictureUrl { get; set; }

        public List<IWorkersT> WorkersTList { get; set; }

        #endregion

        #region Methods

        public List<Workers> List(int? id = null, int? top = null, bool relation = true)
        {
            List<Workers> table;

            List<usp_WorkersSelect_Result> tableTemp;
            List<usp_WorkersSelectTop_Result> tableTopTemp;

            if (top == null)
            {
                tableTemp = entity.usp_WorkersSelect(id).ToList();
                table = tableTemp.ChangeModelList<Workers, usp_WorkersSelect_Result>();
            }
            else
            {
                tableTopTemp = entity.usp_WorkersSelectTop(id, top).ToList();
                table = tableTopTemp.ChangeModelList<Workers, usp_WorkersSelectTop_Result>();
            }

            if (relation)
            {
                foreach (Workers item in table)
                {
                    List<usp_WorkersT_WorkersByLinkedIDSelect_Result> workerstModelList = entity.usp_WorkersT_WorkersByLinkedIDSelect(item.ID).ToList();
                    item.WorkersTList.AddRange(workerstModelList.ChangeModelList<WorkersT, usp_WorkersT_WorkersByLinkedIDSelect_Result>());
                }
            }

            return table;
        }

        public List<Workers> ListAll(int? id = null, bool relation = true)
        {
            List<Workers> table;

            List<usp_WorkersSelectAll_Result> tableTemp;

            tableTemp = entity.usp_WorkersSelectAll(id).ToList();
            table = tableTemp.ChangeModelList<Workers, usp_WorkersSelectAll_Result>();

            if (relation)
            {
                foreach (Workers item in table)
                {
                    List<usp_WorkersT_WorkersByLinkedIDSelect_Result> workerstModelList = entity.usp_WorkersT_WorkersByLinkedIDSelect(item.ID).ToList();
                    item.WorkersTList.AddRange(workerstModelList.ChangeModelList<WorkersT, usp_WorkersT_WorkersByLinkedIDSelect_Result>());
                }
            }

            return table;
        }

        public IWorkers Select(int? id, bool relation = true)
        {
            usp_WorkersSelectTop_Result tableTemp = entity.usp_WorkersSelectTop(id, 1).FirstOrDefault();
            Workers table = tableTemp.ChangeModel<Workers>();

            if (relation)
            {
                List<usp_WorkersT_WorkersByLinkedIDSelect_Result> workerstModelList = entity.usp_WorkersT_WorkersByLinkedIDSelect(id).ToList();
                table.WorkersTList.AddRange(workerstModelList.ChangeModelList<WorkersT, usp_WorkersT_WorkersByLinkedIDSelect_Result>());
            }

            return table;
        }

        public IWorkers Insert(IWorkers table = null, bool? none = null)
        {
            if (table == null)
                table = new Workers();

            return table;
        }

        public bool Insert(IWorkers table)
        {
            var result = entity.usp_WorkersInsert(table.NameSurname, table.PictureUrl, table.Facebook, table.Twitter, table.Pinterest).FirstOrDefault();

            if (result != null)
                return true;
            else
                return false;
        }

        public IWorkers Update(int? id = null, IWorkers table = null)
        {
            if (table == null)
            {
                table = Select(id);
            }
            else
            {
                List<usp_WorkersT_WorkersByLinkedIDSelect_Result> workerstModelList = entity.usp_WorkersT_WorkersByLinkedIDSelect(table.ID).ToList();
                table.WorkersTList.AddRange(workerstModelList.ChangeModelList<WorkersT, usp_WorkersT_WorkersByLinkedIDSelect_Result>());
            }

            return table;
        }

        public bool Update(IWorkers table)
        {
            var result = entity.usp_WorkersUpdate(table.ID, table.NameSurname, table.PictureUrl, table.Facebook, table.Twitter, table.Pinterest).FirstOrDefault();

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Copy(int id)
        {
            try
            {
                var result = entity.usp_WorkersCopy(id).FirstOrDefault();

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
                entity.usp_WorkersDelete(id);

                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool Remove(int? id = null)
        {
            try
            {
                entity.usp_WorkersRemove(id);

                return true;
            }
            catch
            {
                return false;
            }
        }

        #endregion

        #region User Defined

        public List<sp_WorkersDetailSelectAll_Result> WorkersDetailSelectAll(int? transID = null)
        {
            List<sp_WorkersDetailSelectAll_Result> table = entity.sp_WorkersDetailSelectAll(transID).ToList();

            return table;
        }

        #endregion
    }
}
