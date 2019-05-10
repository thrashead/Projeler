using System.Web.Configuration;
using TDLibrary;

namespace Lib
{
    public class ConfigGrabber
    {
        public static string Baslik
        {
            get
            {
                return WebConfigurationManager.AppSettings["Baslik"] != null ? WebConfigurationManager.AppSettings["Baslik"].ToString() : string.Empty;
            }
        }

        public static string Hosgeldiniz
        {
            get
            {
                return WebConfigurationManager.AppSettings["Hosgeldiniz"] != null ? WebConfigurationManager.AppSettings["Hosgeldiniz"].ToString() : string.Empty;
            }
        }

        public static string MailGonderen
        {
            get
            {
                return WebConfigurationManager.AppSettings["MailGonderen"] != null ? WebConfigurationManager.AppSettings["MailGonderen"].ToString() : string.Empty;
            }
        }

        public static string MailAlan
        {
            get
            {
                return WebConfigurationManager.AppSettings["MailAlan"] != null ? WebConfigurationManager.AppSettings["MailAlan"].ToString() : string.Empty;
            }
        }

        public static string MailSunucu
        {
            get
            {
                return WebConfigurationManager.AppSettings["MailSunucu"] != null ? WebConfigurationManager.AppSettings["MailSunucu"].ToString() : string.Empty;
            }
        }

        public static int MailPort
        {
            get
            {
                return WebConfigurationManager.AppSettings["MailPort"] != null ? WebConfigurationManager.AppSettings["MailPort"].ToString().ToInteger() : 587;
            }
        }

        public static string MailSifre
        {
            get
            {
                return WebConfigurationManager.AppSettings["MailSifre"] != null ? WebConfigurationManager.AppSettings["MailSifre"].ToString() : string.Empty;
            }
        }
    }
}