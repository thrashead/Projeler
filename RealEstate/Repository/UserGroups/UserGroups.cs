using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using RealEstate.Data;
using TDLibrary;
using Repository.UserGroupRightsModel;
using Repository.UserGroupTablesModel;

namespace Repository.UserGroupsModel
{
    public class UserGroups : IUserGroups
    {
        readonly RealEstateEntities entity = new RealEstateEntities();

        public UserGroups()
        {
            UserGroupTablesList = new List<UserGroupTables>();
            UserGroupRightsList = new List<UserGroupRights>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "İsim alanı boş olamaz ve en fazla 25 karakter olmalıdır.")]
        [StringLength(25)]
        public string Name { get; set; }
        [Required(ErrorMessage = "Kısa İsim alanı boş olamaz ve en fazla 5 karakter olmalıdır.")]
        [StringLength(5)]
        public string ShortName { get; set; }
        public string Description { get; set; }

        public string Mesaj { get; set; }

        public List<UserGroupTables> UserGroupTablesList { get; set; }
        public List<UserGroupRights> UserGroupRightsList { get; set; }


        public List<UserGroups> List()
        {
            return entity.usp_UserGroupsSelect(null).ToList().ChangeModelList<UserGroups, usp_UserGroupsSelect_Result>();
        }

        public IUserGroups Select(int id)
        {
            usp_UserGroupsSelectTop_Result table = entity.usp_UserGroupsSelectTop(id, 1).FirstOrDefault();
            IUserGroups kullanici = table.ChangeModel<UserGroups>();

            return kullanici;
        }

        public bool Insert(IUserGroups kullanici)
        {
            var result = entity.usp_UserGroupsInsert(kullanici.Name, kullanici.ShortName, kullanici.Description);

            if (result != null)
                return true;
            else
                return false;
        }

        public IUserGroups Update(int id, IUserGroups kullanici = null)
        {
            if (kullanici == null)
                kullanici = Select(id);

            kullanici.UserGroupTablesList = entity.usp_UserGroupTablesDetailSelect(id).ToList().ChangeModelList<UserGroupTables, usp_UserGroupTablesDetailSelect_Result>();
            kullanici.UserGroupRightsList = entity.usp_UserGroupRightsDetailSelect(id).ToList().ChangeModelList<UserGroupRights, usp_UserGroupRightsDetailSelect_Result>();

            return kullanici;
        }

        public bool Update(IUserGroups kullanici)
        {
            var result = entity.usp_UserGroupsUpdate(kullanici.ID, kullanici.Name, kullanici.ShortName, kullanici.Description);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_UserGroupsCheckDelete(id);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
