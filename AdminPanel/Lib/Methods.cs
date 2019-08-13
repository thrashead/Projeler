using Repository.Data;
using System.Web;
using System.Linq;
using System.Web.Configuration;
using System;
using System.Reflection;
using TDLibrary;
using Repository.UsersModel;

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
        public static bool HasRight(this Users user, string url, string islem = "s")
        {
            if (user == null)
                return false;

            int? result = null;

            using (AdminPanelEntities entity = new AdminPanelEntities())
            {
                result = entity.usp_UserTablesSelect(user.ID, url, islem).FirstOrDefault();
            }

            return result == 1 ? true : false;
        }

        public static void Log<T>(this Users user, T model, string processShortName, string description = null, string idName = "ID")
        {
            if (user != null)
            {
                using (AdminPanelEntities entity = new AdminPanelEntities())
                {
                    if (model != null)
                    {
                        if (model.GetType() == typeof(int))
                            description += CreateLogValues(model.ToString(), idName);
                        else
                            description += model.CreateLogValues(idName);
                    }

                    description = description?.SplitText(0, 255);

                    entity.usp_LogsByProcessShortNameInsert(processShortName, user.ID, AppTools.GetTime, description);
                }
            }
        }

        public static void Log(this Users user, string processShortName, string description = null)
        {
            if (user != null)
            {
                using (AdminPanelEntities entity = new AdminPanelEntities())
                {
                    description = description?.SplitText(0, 255);

                    entity.usp_LogsByProcessShortNameInsert(processShortName, user.ID, AppTools.GetTime, description);
                }
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
            using (AdminPanelEntities entity = new AdminPanelEntities())
            {
                return entity.usp_TypesShowByUrlSelect(url).FirstOrDefault();
            }
        }
    }
}