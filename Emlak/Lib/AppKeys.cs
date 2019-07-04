using System.Web.Configuration;

namespace Lib
{
    public class AppKeys
    {
        public static string UploadPath
        {
            get
            {
                return WebConfigurationManager.AppSettings["UploadPath"] != null ? WebConfigurationManager.AppSettings["UploadPath"].ToString() : string.Empty;
            }
        }
    }
}