using AdminPanel.Data;
using System.Web;
using System.Linq;
using System.Web.Configuration;
using System;
using System.Reflection;
using Models;
using TDLibrary;
using System.Web.Mvc;
using System.Collections.Generic;

namespace AdminPanel
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
        public static bool HasRight(this Kullanicilar user, string url, string islem = "s")
        {
            if (user == null)
                return false;

            AdminPanelEntities _entity = new AdminPanelEntities();

            int? result = _entity.usp_UserTablesSelect(user.ID, url, islem).FirstOrDefault();

            return result == 1 ? true : false;
        }

        public static void Log<T>(this Kullanicilar user, T model, string processShortName, string description = null, string idName = "ID")
        {
            if (user != null)
            {
                AdminPanelEntities _entity = new AdminPanelEntities();

                if (model != null)
                {
                    if (model.GetType() == typeof(int))
                        description += CreateLogValues(model.ToString(), idName);
                    else
                        description += model.CreateLogValues(idName);
                }

                description = description == null ? null : description.SplitText(0, 255);

                _entity.usp_LogsByProcessShortNameInsert(processShortName, user.ID, AppTools.GetTime, description);
            }
        }

        public static void Log(this Kullanicilar user, string processShortName, string description = null)
        {
            if (user != null)
            {
                AdminPanelEntities _entity = new AdminPanelEntities();

                description = description == null ? null : description.SplitText(0, 255);

                _entity.usp_LogsByProcessShortNameInsert(processShortName, user.ID, AppTools.GetTime, description);
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

            int i = 0;

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
                    if (i == 0)
                        list.Add(new SelectListItem() { Value = _value.ToString(), Text = _text, Selected = true });
                    else
                        list.Add(new SelectListItem() { Value = _value.ToString(), Text = _text });
                }

                i++;
            }

            return list;
        }

        public static bool? ShowType(this string url)
        {
            AdminPanelEntities _entity = new AdminPanelEntities();

            return _entity.usp_TypesShowByUrlSelect(url).FirstOrDefault();
        }
    }
}