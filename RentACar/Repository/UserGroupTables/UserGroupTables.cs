using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACar.Data;
using TDLibrary;

namespace Repository.UserGroupTablesModel
{
    public class UserGroupTables : IUserGroupTables
    {
        readonly RentACarEntities entity = new RentACarEntities();

        public UserGroupTables()
        {
            TypesList = new List<SelectListItem>();
            UserGroupsList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "Tablo alanı boş olamaz.")]
        public int TypeID { get; set; }
        [Required(ErrorMessage = "Kullanıcı Grubu alanı boş olamaz.")]
        public int UserGroupID { get; set; }

        public string Mesaj { get; set; }

        public List<SelectListItem> TypesList { get; set; }
        public List<SelectListItem> UserGroupsList { get; set; }

        public string TypesAdi { get; set; }
        public string UserGroupsAdi { get; set; }


        public List<UserGroupTables> List()
        {
            return entity.usp_UserGroupTablesDetailSelect(null).ToList().ChangeModelList<UserGroupTables, usp_UserGroupTablesDetailSelect_Result>();
        }

        public IUserGroupTables Select(int id)
        {
            usp_UserGroupTablesSelectTop_Result table = entity.usp_UserGroupTablesSelectTop(id, 1).FirstOrDefault();
            IUserGroupTables kullanici = table.ChangeModel<UserGroupTables>();

            return kullanici;
        }

        public IUserGroupTables Insert(int? groupID = null, int? typeID = null, IUserGroupTables kullanici = null)
        {
            if (kullanici == null)
                kullanici = new UserGroupTables();

            List<usp_UserGroupsSelect_Result> tableKullaniciGrup = entity.usp_UserGroupsSelect(null).ToList();
            kullanici.UserGroupsList = tableKullaniciGrup.ToSelectList<usp_UserGroupsSelect_Result, SelectListItem>("ID", "Name", groupID);

            List<usp_TypesSelect_Result> tableTipler = entity.usp_TypesSelect(null).ToList();
            kullanici.TypesList = tableTipler.ToSelectList<usp_TypesSelect_Result, SelectListItem>("ID", "TypeName", typeID);

            return kullanici;
        }

        public bool Insert(IUserGroupTables kullanici)
        {
            var result = entity.usp_UserGroupTablesCheckInsert(kullanici.TypeID, kullanici.UserGroupID);

            if (result != null)
                return true;
            else
                return false;
        }

        public IUserGroupTables Update(int id, IUserGroupTables kullanici = null)
        {
            if (kullanici == null)
                kullanici = Select(id);

            List<usp_UserGroupsSelect_Result> tableKullaniciGrup = entity.usp_UserGroupsSelect(null).ToList();
            kullanici.UserGroupsList = tableKullaniciGrup.ToSelectList<usp_UserGroupsSelect_Result, SelectListItem>("ID", "Name", kullanici.UserGroupID);

            List<usp_TypesSelect_Result> tableTipler = entity.usp_TypesSelect(null).ToList();
            kullanici.TypesList = tableTipler.ToSelectList<usp_TypesSelect_Result, SelectListItem>("ID", "TypeName", kullanici.TypeID);


            return kullanici;
        }

        public bool Update(IUserGroupTables kullanici)
        {
            var result = entity.usp_UserGroupTablesCheckUpdate(kullanici.ID, kullanici.TypeID, kullanici.UserGroupID);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Delete(int id)
        {
            try
            {
                entity.usp_UserGroupTablesCheckDelete(id);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
