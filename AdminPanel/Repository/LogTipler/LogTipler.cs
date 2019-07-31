using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using AdminPanel.Data;
using TDLibrary;
using Repository.LogIslemModel;

namespace Repository.LogTiplerModel
{
    public class LogTipler : ILogTipler
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public LogTipler()
        {
            LogProcessList = new List<LogIslem>();
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

        public List<LogIslem> LogProcessList { get; set; }


        public List<LogTipler> List()
        {
            return entity.usp_LogTypesSelect(null).ToList().ChangeModelList<LogTipler, usp_LogTypesSelect_Result>();
        }

        public ILogTipler Select(int id)
        {
            usp_LogTypesSelectTop_Result table = entity.usp_LogTypesSelectTop(id, 1).FirstOrDefault();
            LogTipler log = table.ChangeModel<LogTipler>();

            return log;
        }

        public bool Insert(ILogTipler log)
        {
            var result = entity.usp_LogTypesInsert(log.Name, log.ShortName);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Update(ILogTipler log)
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
