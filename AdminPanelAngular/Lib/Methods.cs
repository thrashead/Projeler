﻿using Repository.Data;
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

namespace AdminPanelAngular
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
    }

    public static class UserProcesses
    {
        public static List<usp_UserGroupRightsByUserIDAndUrl_Result> UserRights(this Users user, string url = null, string process = null)
        {
            AdminPanelEntities entity = new AdminPanelEntities();

            List<usp_UserGroupRightsByUserIDAndUrl_Result> result;

            if (Cacher.Cache["CurrentUserRights_" + user.ID.ToString()] == null)
            {
                List<usp_UserGroupRightsByUserIDAndUrl_Result> userRights = entity.usp_UserGroupRightsByUserIDAndUrl().Where(a => a.UserID == user.ID).ToList();

                Cacher.Cache.Insert("CurrentUserRights_" + user.ID.ToString(), userRights, null, DateTime.Now.AddMinutes(15), Cache.NoSlidingExpiration, CacheItemPriority.Default, null);
            }

            result = Cacher.Cache["CurrentUserRights_" + user.ID.ToString()] as List<usp_UserGroupRightsByUserIDAndUrl_Result>;

            if (url != null)
                result = result.Where(a => a.Url == url).ToList();

            if (process != null)
                result = result.Where(a => a.ShortName == process).ToList();

            return result;
        }

        public static bool HasRight(this Users user, string url, string process = "s")
        {
            if (user == null)
                return false;

            List<usp_UserGroupRightsByUserIDAndUrl_Result> list = user.UserRights(url, process);

            bool result = list.Count > 0 ? list.FirstOrDefault().Allow : false;

            return result;
        }

        public static void Log<T>(this Users user, T model, string processShortName, string description = null, string idName = "ID")
        {
            if (user != null)
            {
                AdminPanelEntities entity = new AdminPanelEntities();

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
                AdminPanelEntities entity = new AdminPanelEntities();

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
            List<usp_TypesSelect_Result> list = Lib.ShowTypes(url);

            bool result = list.Count > 0 ? list.FirstOrDefault().Show : false;

            return result;
        }
    }

    public class Lib
    {
        public static List<usp_TypesSelect_Result> ShowTypes(string url = null)
        {
            AdminPanelEntities entity = new AdminPanelEntities();

            List<usp_TypesSelect_Result> result;

            if (Cacher.Cache["ShowTypes"] == null)
            {
                List<usp_TypesSelect_Result> showTypes = entity.usp_TypesSelect(null).ToList();

                Cacher.Cache.Insert("ShowTypes", showTypes, null, DateTime.Now.AddMinutes(15), Cache.NoSlidingExpiration, CacheItemPriority.Default, null);
            }

            result = Cacher.Cache["ShowTypes"] as List<usp_TypesSelect_Result>;

            if (url != null)
            {
                result = result.Where(a => a.TypeName == url).ToList();
            }

            return result;
        }
    }
}