using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using RentACarMVC.Data;
using TDLibrary;

namespace Repository.UserGroupProcessModel
{
    public class UserGroupProcess : IUserGroupProcess
    {
        readonly RentACarEntities entity = new RentACarEntities();

        public int ID { get; set; }
        [Required(ErrorMessage = "İsim alanı boş olamaz ve en fazla 25 karakter olmalıdır.")]
        [StringLength(25)]
        public string Name { get; set; }
        [Required(ErrorMessage = "Kısa İsim alanı boş olamaz ve en fazla 5 karakter olmalıdır.")]
        [StringLength(5)]
        public string ShortName { get; set; }
        public string Description { get; set; }

        public string Mesaj { get; set; }


        public List<UserGroupProcess> List()
        {
            return entity.usp_UserGroupProcessSelect(null).ToList().ChangeModelList<UserGroupProcess, usp_UserGroupProcessSelect_Result>();
        }

        public IUserGroupProcess Select(int id)
        {
            usp_UserGroupProcessSelectTop_Result table = entity.usp_UserGroupProcessSelectTop(id, 1).FirstOrDefault();
            IUserGroupProcess kullanici = table.ChangeModel<UserGroupProcess>();

            return kullanici;
        }

        public bool Insert(IUserGroupProcess kullanici)
        {
            var result = entity.usp_UserGroupProcessInsert(kullanici.Name, kullanici.ShortName, kullanici.Description);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Update(IUserGroupProcess kullanici)
        {
            var result = entity.usp_UserGroupProcessUpdate(kullanici.ID, kullanici.Name, kullanici.ShortName, kullanici.Description);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_UserGroupProcessDelete(id);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
