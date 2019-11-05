using HumanResources.Data;
using System.Web;
using System.Linq;
using System.Web.Configuration;
using System;
using System.Reflection;
using TDLibrary;
using System.Collections.Generic;
using System.Web.Caching;
using Cacher = System.Web.HttpRuntime;
using Repository.UsersModel;
using System.Web.Mvc;

namespace HumanResources
{
    public class AppTools
    {
        public static string UploadPath
        {
            get
            {
                return WebConfigurationManager.AppSettings["UploadPath"] != null ? WebConfigurationManager.AppSettings["UploadPath"].ToString() : string.Empty;
            }
        }

        public static Users User
        {
            get
            {
                return HttpContext.Current.Session["CurrentUser"] != null ? HttpContext.Current.Session["CurrentUser"] as Users : null;
            }
        }

        public static string GetTime
        {
            get
            {
                return DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString();
            }
        }

        public static string GetIPAddress
        {
            get
            {
                HttpContext context = HttpContext.Current;
                string ipAddress = context.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

                if (!string.IsNullOrEmpty(ipAddress))
                {
                    string[] addresses = ipAddress.Split(',');
                    if (addresses.Length != 0)
                    {
                        return addresses[0];
                    }
                }

                return context.Request.ServerVariables["REMOTE_ADDR"];
            }
        }
    }

    public static class UserProcesses
    {
        public static List<usp_UserGroupRightsByUserIDAndUrl_Result> UserRights(this Users user, string url = null, string process = null)
        {
            HumanResourcesEntities entity = new HumanResourcesEntities();

            List<usp_UserGroupRightsByUserIDAndUrl_Result> result;

            if (Cacher.Cache["CurrentUserRights_" + user.ID.ToString()] == null)
            {
                List<usp_UserGroupRightsByUserIDAndUrl_Result> userRights = entity.usp_UserGroupRightsByUserIDAndUrl(user.ID, null, null).ToList();

                Cacher.Cache.Insert("CurrentUserRights_" + user.ID.ToString(), userRights, null, DateTime.Now.AddMinutes(15), Cache.NoSlidingExpiration, CacheItemPriority.Default, null);
            }

            result = Cacher.Cache["CurrentUserRights_" + user.ID.ToString()] as List<usp_UserGroupRightsByUserIDAndUrl_Result>;

            if (url.ToNull() != null)
                result = result.Where(a => a.Url == url).ToList();

            if (process.ToNull() != null)
                result = result.Where(a => a.ShortName == process).ToList();

            return result;
        }

        public static bool HasRight(this Users user, string url, string process = "s")
        {
            if (user == null)
                return false;

            List<usp_UserGroupRightsByUserIDAndUrl_Result> list = user.UserRights(url, process);

            bool result = list.Count > 0 ? true : false;

            return result;
        }

        public static void Log<T>(this Users user, T model, string processShortName, string description = null, string idName = "ID")
        {
            if (user != null)
            {
                HumanResourcesEntities entity = new HumanResourcesEntities();

                if (model != null)
                {
                    if (model.GetType() == typeof(int))
                        description += CreateLogValues(model.ToString(), idName);
                    else
                        description += model.CreateLogValues(idName);
                }

                description = description == null ? null : description.SplitText(0, 255);

                entity.usp_LogsByProcessShortNameInsert(processShortName, user.ID, AppTools.GetTime, description);
            }
        }

        public static void Log(this Users user, string processShortName, string description = null)
        {
            if (user != null)
            {
                HumanResourcesEntities entity = new HumanResourcesEntities();

                description = description == null ? null : description.SplitText(0, 255);

                entity.usp_LogsByProcessShortNameInsert(processShortName, user.ID, AppTools.GetTime, description);
            }
        }

        private static string CreateLogValues<T>(this T model, string idName)
        {
            string result = " [";

            foreach (PropertyInfo item in model.GetType().GetProperties())
            {
                if (idName == item.Name && item.GetValue(model).ToString() == "0")
                    goto devam;

                if (item.Name == "Mesaj")
                    break;

                result += item.Name + ": " + item.GetValue(model) + ", ";

                devam:;
            }

            return result.TrimEnd(' ').TrimEnd(',') + "]";
        }

        private static string CreateLogValues(string model, string idName)
        {
            return " [" + idName + ": " + model.ToString() + "]";
        }
    }

    public static class ExtMethods
    {
        public static bool? ShowType(this string url)
        {
            List<usp_TypesShowSelect_Result> list = Lib.ShowTypes().Where(a=> a.Url == url).ToList();

            bool result = list.Count > 0 ? list.FirstOrDefault().Show : false;

            return result;
        }

        public static string ToNull(this string value)
        {
            return value == "null" ? null : value;
        }

        public static List<SelectListItem> ToSelectList(this List<string> items, bool addEmpty = false, string emptyText = "-", string emptyValue = "all")
        {
            List<SelectListItem> returnList = new List<SelectListItem>();

            if (addEmpty)
            {
                returnList.Add(new SelectListItem()
                {
                    Text = emptyText,
                    Value = emptyValue
                });
            }

            foreach (string item in items)
            {
                returnList.Add(new SelectListItem()
                {
                    Text = item,
                    Value = item
                });
            }

            return returnList;
        }

        public static bool CheckDatesToSend(this DateTime item, DateTime? dateTime)
        {
            if (dateTime != null)
            {
                if (dateTime.Value.Year == item.Year)
                    if (dateTime.Value.Month == item.Month)
                        if (dateTime.Value.Day == item.Day)
                        {
                            return false;
                        }
            }

            return true;
        }
    }

    public class Lib
    {
        public static List<usp_TypesShowSelect_Result> ShowTypes()
        {
            HumanResourcesEntities entity = new HumanResourcesEntities();

            List<usp_TypesShowSelect_Result> result;

            if (Cacher.Cache["ShowTypes"] == null)
            {
                List<usp_TypesShowSelect_Result> showTypes = entity.usp_TypesShowSelect(null).ToList();

                Cacher.Cache.Insert("ShowTypes", showTypes, null, DateTime.Now.AddMinutes(15), Cache.NoSlidingExpiration, CacheItemPriority.Default, null);
            }

            result = Cacher.Cache["ShowTypes"] as List<usp_TypesShowSelect_Result>;

            return result;
        }
    }
}