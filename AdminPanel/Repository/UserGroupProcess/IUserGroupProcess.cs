using System.Collections.Generic;

namespace Repository.UserGroupProcessModel
{
    public interface IUserGroupProcess
    {
        int ID { get; set; }
        string Name { get; set; }
        string ShortName { get; set; }
        string Description { get; set; }

        string Mesaj { get; set; }

        List<UserGroupProcess> List();
        IUserGroupProcess Select(int id);
        bool Insert(IUserGroupProcess kullanici);
        bool Update(IUserGroupProcess kullanici);
        bool Delete(int id);
    }
}
