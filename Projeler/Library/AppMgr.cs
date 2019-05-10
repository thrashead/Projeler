using System.Web.Configuration;

namespace Library
{
    public class AppMgr
	{
		public static string MainPath
		{
			get
			{
				return WebConfigurationManager.AppSettings["MainPath"] != null ? WebConfigurationManager.AppSettings["MainPath"].ToString() : string.Empty;
			}
		}
    }
}