using System;
using System.Linq;
using System.Web.Mvc;
using System.Data;
using TDLibrary;
using Lib;
using System.Collections.Generic;

namespace Emlak.Areas.Ajax.Controllers
{
    public class UsersController : Controller
    {
        EmlakSiteEntities entity = new EmlakSiteEntities();

        #region Users

        public JsonResult List(string userName = null, string active = null, int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null)
        {
            try
            {
                var list = entity.Users.ToList();

                if (!userName.IsNull())
                    list = list.Where(a => a.Username.Contains(userName)).ToList();

                if (active.ToLower() == "active")
                    list = list.Where(a => a.Active == true).ToList();
                else if (active.ToLower() == "passive")
                    list = list.Where(a => a.Active == false).ToList();

                int _recordCount = 0;

                if (list.Count > 0)
                {
                    _recordCount = list.Count;

                    if (jtSorting != null && jtSorting.Split(' ').Length >= 2)
                    {
                        string _orderBy = jtSorting.Split(' ')[0];
                        string _orderDirection = jtSorting.Split(' ')[1].ToLower();

                        if (_orderDirection == "asc")
                        {
                            list = list.OrderBy(a => a.GetType().GetProperty(_orderBy).GetValue(a, null)).Skip(jtStartIndex).Take(jtPageSize).ToList();
                        }
                        else
                        {
                            list = list.OrderByDescending(a => a.GetType().GetProperty(_orderBy).GetValue(a, null)).Skip(jtStartIndex).Take(jtPageSize).ToList();
                        }
                    }
                }

                return Json(new { Result = "OK", Records = list.JsonConverter<List<Users>>(), TotalRecordCount = _recordCount });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult Insert(Users record)
        {
            try
            {
                if (record.Username.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Kullanıcı Adı Boş Olamaz." });
                }

                if (record.Password.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Şifre Boş Olamaz." });
                }

                entity.Users.Add(record);

                bool result = entity.SaveChanges() >= 0 ? true : false;

                if (result == true)
                {
                    return Json(new { Result = "OK", Record = record });
                }
                else
                    return Json(new { Result = "ERROR", Message = result });

            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult Update(Users record)
        {
            try
            {
                if (record.Username.IsNull())
                {
                    return Json(new { Result = "ERROR", Message = "Kullanıcı Adı Boş Olamaz." });
                }

                var users = entity.Users.Where(a => a.ID == record.ID).FirstOrDefault();

                if (record.Password.IsNull())
                {
                    users.Active = record.Active;
                    users.Username = record.Username;
                    users.Queue = record.Queue;
                }
                else
                {
                    users.Active = record.Active;
                    users.Username = record.Username;
                    users.Queue = record.Queue;
                    users.Password = record.Password.ToMD5();
                }

                bool result = entity.SaveChanges() >= 0 ? true : false;

                if (result == true)
                {
                    return Json(new { Result = "OK" });
                }
                else
                    return Json(new { Result = "ERROR", Message = result });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public JsonResult Delete(int? ID)
        {
            try
            {
                if (ID != null)
                {
                    var user = entity.Users.Where(a => a.ID == ID).FirstOrDefault();

                    entity.Users.Remove(user);

                    bool result = entity.SaveChanges() >= 0 ? true : false;

                    if (result == true)
                        return Json(new { Result = "OK" });
                    else
                        return Json(new { Result = "ERROR", Message = result });
                }
                else
                {
                    return Json(new { Result = "ERROR", Message = "ID Boş" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        #endregion
    }
}
