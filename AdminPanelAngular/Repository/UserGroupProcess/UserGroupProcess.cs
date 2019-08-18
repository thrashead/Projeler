using System.Collections.Generic;
using System.Linq;
using AdminPanelAngular.Data;
using TDLibrary;

namespace Repository.UserGroupProcessModel
{
    public class UserGroupProcess : IUserGroupProcess
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        public int ID { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public string Description { get; set; }

        public string Mesaj { get; set; }


        public List<UserGroupProcess> List()
        {
            return entity.usp_UserGroupProcessSelect(null).ToList().ChangeModelList<UserGroupProcess, usp_UserGroupProcessSelect_Result>();
        }

        public IUserGroupProcess Select(int id)
        {
            usp_UserGroupProcessSelectTop_Result model = entity.usp_UserGroupProcessSelectTop(id, 1).FirstOrDefault();
            IUserGroupProcess table = model.ChangeModel<UserGroupProcess>();

            return table;
        }

        public bool Insert(IUserGroupProcess table)
        {
            var result = entity.usp_UserGroupProcessInsert(table.Name, table.ShortName, table.Description);

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Update(IUserGroupProcess table)
        {
            var result = entity.usp_UserGroupProcessUpdate(table.ID, table.Name, table.ShortName, table.Description);

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
