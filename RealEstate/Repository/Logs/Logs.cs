using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using RealEstate.Data;
using TDLibrary;

namespace Repository.LogsModel
{
    public class Logs : ILogs
    {
        readonly RealEstateEntities entity = new RealEstateEntities();

        public int ID { get; set; }
        [Required(ErrorMessage = "UserID alanı boş olamaz ve UserID alanına en az 0 değeri girmelisiniz.")]
        [Range(0, int.MaxValue, ErrorMessage = "UserID alanı boş olamaz ve UserID alanına en az 0 değeri girmelisiniz.")]
        public int UserID { get; set; }
        [Required(ErrorMessage = "LogProcessID alanı boş olamaz ve LogProcessID alanına en az 0 değeri girmelisiniz.")]
        [Range(0, int.MaxValue, ErrorMessage = "LogProcessID alanı boş olamaz ve LogProcessID alanına en az 0 değeri girmelisiniz.")]
        public int LogProcessID { get; set; }
        [Required(ErrorMessage = "ProcessTime alanı boş olamaz ve en fazla 50 karakter olmalıdır.")]
        [StringLength(50)]
        public string ProcessTime { get; set; }
        public string Description { get; set; }
        public string UsersAdi { get; set; }
        public string LogTypesAdi { get; set; }
        public string LogProcessAdi { get; set; }
        public string LogProcessKisaAdi { get; set; }

        public List<Logs> List()
        {
            return entity.usp_LogsDetailSelect(null).ToList().ChangeModelList<Logs, usp_LogsDetailSelect_Result>();
        }

        public bool Clear()
        {
            try
            {
                entity.usp_LogsClear();

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
