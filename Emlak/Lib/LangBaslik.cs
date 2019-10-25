using Emlak.Data;
using TDLibrary;
using System.Collections.Generic;
using System.Linq;
using System.Web.Caching;
using Cacher = System.Web.HttpRuntime;
using System;
using Lib;

namespace Emlak
{
    public class LangBaslik
    {
        public string TransCode { get; set; }
        public string Code { get; set; }
        public string Text { get; set; }

        public static List<LangBaslik> Liste()
        {
            EmlakEntities entity = new EmlakEntities();

            List<LangBaslik> list;

            if (Cacher.Cache["LangContent"] == null)
            {
                list = entity.sp_LangContent(null, null).ToList().ChangeModelList<LangBaslik, sp_LangContent_Result>();

                Cacher.Cache.Insert("LangContent", list, null, DateTime.Now.AddMinutes(15), Cache.NoSlidingExpiration, CacheItemPriority.Default, null);
            }

            list = Cacher.Cache["LangContent"] as List<LangBaslik>;

            return list;
        }

        public static LangBaslik KodlaGetir(string kod)
        {
            return Liste().Where(a => a.Code == kod && a.TransCode == ToolBox.LangCode)?.FirstOrDefault();
        }
    }
}