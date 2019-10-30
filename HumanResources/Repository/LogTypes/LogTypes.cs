using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using HumanResources.Data;
using TDLibrary;
using Repository.LogProcessModel;

namespace Repository.LogTypesModel
{
    public class LogTypes : ILogTypes
    {
        readonly HumanResourcesEntities entity = new HumanResourcesEntities();

        public LogTypes()
        {
            LogProcessList = new List<LogProcess>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "İsim alanı boş olamaz ve en fazla 50 karakter olmalıdır.")]
        [StringLength(50)]
        public string Name { get; set; }
        [Required(ErrorMessage = "Kısa İsim alanı boş olamaz ve en fazla 5 karakter olmalıdır.")]
        [StringLength(5)]
        public string ShortName { get; set; }
        public string Description { get; set; }

        public string Mesaj { get; set; }

        public List<LogProcess> LogProcessList { get; set; }


        public List<LogTypes> List()
        {
            return entity.usp_LogTypesSelect(null).ToList().ChangeModelList<LogTypes, usp_LogTypesSelect_Result>();
        }

        public ILogTypes Select(int id)
        {
            usp_LogTypesSelectTop_Result table = entity.usp_LogTypesSelectTop(id, 1).FirstOrDefault();
            ILogTypes log = table.ChangeModel<LogTypes>();

            return log;
        }

        public bool Insert(ILogTypes log)
        {
            var result = entity.usp_LogTypesInsert(log.Name, log.ShortName);

            if (result != null)
                return true;
            else
                return false;
        }

        public ILogTypes Update(int id, ILogTypes log = null)
        {
            if (log == null)
                log = Select(id);

            List<usp_LogProcessByLogTypeIDSelect_Result> logTipList = entity.usp_LogProcessByLogTypeIDSelect(id).ToList();
            log.LogProcessList.AddRange(logTipList.ChangeModelList<LogProcess, usp_LogProcessByLogTypeIDSelect_Result>());

            return log;
        }

        public bool Update(ILogTypes log)
        {
            var result = entity.usp_LogTypesUpdate(log.ID, log.Name, log.ShortName);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_LogTypesCheckDelete(id);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
