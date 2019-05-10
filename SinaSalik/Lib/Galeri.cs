using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using TDLibrary;

namespace Lib
{
    public class Resimler
    {
        public string Resim { get; set; }
        public string Grup { get; set; }
        public string Yol { get; set; }

        public static List<Resimler> ResimList()
        {
            List<Resimler> resimler = new List<Resimler>();

            string[] yollar = Directory.GetDirectories(HttpContext.Current.Server.MapPath("~/Content/files/Galeri"));

            foreach (string dizin in yollar)
            {
                string[] resimList = Directory.GetFiles(HttpContext.Current.Server.MapPath("~/Content/files/Galeri/" + dizin.Split('\\').Last()));

                foreach (var item in resimList)
                {
                    Resimler resim = new Resimler();

                    resim.Grup = dizin.Split('\\').Last().Replace("-", " ");
                    resim.Yol = dizin.Split('\\').Last();
                    resim.Resim = item.Split('\\').Last();

                    resimler.Add(resim);
                }
            }

            return resimler;
        }
    }
}