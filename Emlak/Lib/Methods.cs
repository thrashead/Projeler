using Emlak.Data;
using System.Web;
using System.Linq;
using System.Web.Configuration;
using System;
using System.Reflection;
using TDLibrary;
using System.Web.Mvc;
using System.Collections.Generic;
using System.Web.Caching;
using Cacher = System.Web.HttpRuntime;
using Models;

namespace Emlak
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

        public static Kullanicilar User
        {
            get
            {
                return HttpContext.Current.Session["CurrentUser"] != null ? HttpContext.Current.Session["CurrentUser"] as Kullanicilar : null;
            }
        }

        public static string GetTime
        {
            get
            {
                return DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString();
            }
        }
    }

    public static class UserProcesses
    {
        public static List<usp_UserGroupRightsByUserIDAndUrl_Result> UserRights(this Kullanicilar user, string url = null, string process = null)
        {
            EmlakEntities entity = new EmlakEntities();

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

        public static bool HasRight(this Kullanicilar user, string url, string process = "s")
        {
            if (user == null)
                return false;

            List<usp_UserGroupRightsByUserIDAndUrl_Result> list = user.UserRights(url, process);

            bool result = list.Count > 0 ? true : false;

            return result;
        }

        public static void Log<T>(this Kullanicilar user, T model, string processShortName, string description = null, string idName = "ID")
        {
            if (user != null)
            {
                EmlakEntities entity = new EmlakEntities();

                if (model != null)
                {
                    if (model.GetType() == typeof(int))
                    {
                        description += CreateLogValues(model.ToString(), idName);
                    }
                    else
                    {
                        description += model.CreateLogValues(idName);
                    }
                }

                description = description == null ? null : description.SplitText(0, 255);

                entity.usp_LogsByProcessShortNameInsert(processShortName, user.ID, AppTools.GetTime, description);
            }
        }

        public static void Log(this Kullanicilar user, string processShortName, string description = null)
        {
            if (user != null)
            {
                EmlakEntities entity = new EmlakEntities();

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
        public static List<SelectListItem> ToSelectList<T>(this List<T> itemList, string value, string text, int? selectedItem = null, bool addEmpty = false, string emptyText = "-", string emptyValue = "0")
        {
            List<SelectListItem> list = new List<SelectListItem>();

            if (addEmpty)
            {
                list.Add(new SelectListItem()
                {
                    Text = emptyText,
                    Value = emptyValue
                });
            }

            foreach (var item in itemList)
            {
                string _value = item.GetType().GetProperties().Where(a => a.Name == value).FirstOrDefault().GetValue(item).ToString();
                string _text = item.GetType().GetProperties().Where(a => a.Name == text).FirstOrDefault().GetValue(item).ToString();

                if (selectedItem != null)
                {
                    if (_value == selectedItem.ToString())
                        list.Add(new SelectListItem() { Value = _value.ToString(), Text = _text, Selected = true });
                    else
                        list.Add(new SelectListItem() { Value = _value.ToString(), Text = _text });
                }
                else
                {
                    list.Add(new SelectListItem() { Value = _value.ToString(), Text = _text });
                }
            }

            return list;
        }

        public static bool? ShowType(this string url)
        {
            List<usp_TypesShowSelect_Result> list = Lib.ShowTypes().Where(a => a.Url == url).ToList();

            bool result = list.Count > 0 ? list.FirstOrDefault().Show : false;

            return result;
        }

        public static string ToNull(this string value)
        {
            return value == "null" ? null : value;
        }
    }

    public class Lib
    {
        public static List<usp_TypesShowSelect_Result> ShowTypes()
        {
            EmlakEntities entity = new EmlakEntities();

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