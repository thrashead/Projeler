using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Lib
{
    public class GirisYonetimi
    {
        public static bool Durum
        { 
            get 
            {
                if (HttpContext.Current.Session["Aday"] == null && HttpContext.Current.Session["Sirket"] == null)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            } 
        }

        public static void CikisYap()
        {
            HttpContext.Current.Session["Aday"] = null;
            HttpContext.Current.Session["Sirket"] = null;
        }

        public static GirisTipi Tip
        {
            get
            {
                if (HttpContext.Current.Session["Aday"] != null)
                {
                    return GirisTipi.Aday;
                }
                else if (HttpContext.Current.Session["Sirket"] != null)
                {
                    return GirisTipi.Sirket;
                }
                else
                {
                    return GirisTipi.None;
                }
            }
        }
    }
}