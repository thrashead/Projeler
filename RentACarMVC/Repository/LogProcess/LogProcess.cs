using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACarMVC.Data;
using TDLibrary;

namespace Repository.LogProcessModel
{
    public class LogProcess : ILogProcess
    {
        readonly RentACarEntities entity = new RentACarEntities();

        public LogProcess()
        {
            LogTypesList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "Log Tipi alanı boş olamaz.")]
        public int LogTypeID { get; set; }
        [Required(ErrorMessage = "İsim alanı boş olamaz ve en fazla 50 karakter olmalıdır.")]
        [StringLength(50)]
        public string Name { get; set; }
        [Required(ErrorMessage = "Kısa İsim alanı boş olamaz ve en fazla 5 karakter olmalıdır.")]
        [StringLength(5)]
        public string ShortName { get; set; }
        public string Description { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> LogTypesList { get; set; }
        public string LogTypesAdi { get; set; }
        public string LogTypesKisaAdi { get; set; }


        public List<LogProcess> List()
        {
            return entity.usp_LogProcessDetailSelect(null).ToList().ChangeModelList<LogProcess, usp_LogProcessDetailSelect_Result>();
        }

        public ILogProcess Select(int id)
        {
            usp_LogProcessSelectTop_Result table = entity.usp_LogProcessSelectTop(id, 1).FirstOrDefault();
            ILogProcess log = table.ChangeModel<LogProcess>();

            return log;
        }

        public ILogProcess Insert(int? logID = null, ILogProcess log = null)
        {
            if (log == null)
                log = new LogProcess();

            List<usp_LogTypesSelect_Result> tableLogTipler = entity.usp_LogTypesSelect(null).ToList();
            log.LogTypesList = tableLogTipler.ToSelectList<usp_LogTypesSelect_Result, SelectListItem>("ID", "Name", logID);

            return log;
        }

        public bool Insert(ILogProcess log)
        {
            var result = entity.usp_LogProcessInsert(log.LogTypeID, log.Name, log.ShortName, log.Description);

            if (result != null)
                return true;
            else
                return false;
        }

        public ILogProcess Update(int id, ILogProcess log = null)
        {
            if (log == null)
                log = Select(id);

            List<usp_LogTypesSelect_Result> tableLogTipler = entity.usp_LogTypesSelect(null).ToList();
            log.LogTypesList = tableLogTipler.ToSelectList<usp_LogTypesSelect_Result, SelectListItem>("ID", "Name", log.LogTypeID);

            return log;
        }

        public bool Update(ILogProcess log)
        {
            var result = entity.usp_LogProcessUpdate(log.ID, log.LogTypeID, log.Name, log.ShortName, log.Description);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_LogProcessDelete(id);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
