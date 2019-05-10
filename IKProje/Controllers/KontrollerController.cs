using Models.SehirModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TDFramework;
using TDFramework.Common;

namespace IKProje.Controllers
{
    public class KontrollerController : Controller
    {
        [HttpGet]
        public JsonResult AraJson()
        {
            Table<Sehir> tablo = new Table<Sehir>();
            tablo.SelectSettings = new Select();
            tablo.SelectSettings.OrderColumn = SehirColumns.Sira;
            tablo.WhereList.Add(new Where(SehirColumns.Kod, 9999, true));
            tablo.WhereList.Add(new Where(SehirColumns.Kod, 34, true));

            tablo.Select();

            if (tablo.HasData)
            {
                return Json(tablo.Data as List<Sehir>, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new List<Sehir>(), JsonRequestBehavior.AllowGet);
            }
        }

    }
}
