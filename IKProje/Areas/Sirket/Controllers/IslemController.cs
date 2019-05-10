using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TDFramework;
using TDFramework.Common;
using Models.SehirModel;
using Models.SektorModel;

namespace IKProje.Areas.Sirket.Controllers
{
    public class IslemController : Controller
    {
        public ActionResult Giris()
        {
            return View();
        }

        public ActionResult Kayit()
        {
            return View();
        }

        [HttpGet]
        public JsonResult SektorlerJson()
        {
            List<Sektor> sektorler = new List<Sektor>();
            Table<Sektor> tablo = new Table<Sektor>();
            tablo.SelectSettings.OrderColumn = SektorColumns.Kod;
            tablo.WhereList.Add(new Where(SektorColumns.Kod, 0, true));
            tablo.Select();

            if (tablo.HasData)
            {
                sektorler = tablo.Data as List<Sektor>;
            }

            return Json(sektorler, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult SehirlerJson()
        {
            List<Sehir> sehirler = new List<Sehir>();
            Table<Sehir> tablo = new Table<Sehir>();
            tablo.SelectSettings.OrderColumn = SehirColumns.Sira;
            tablo.WhereList.Add(new Where(SehirColumns.Kod, 99, true));
            tablo.WhereList.Add(new Where(SehirColumns.Kod, 340, true));
            tablo.WhereList.Add(new Where(SehirColumns.Kod, 34, true));

            tablo.Select();

            if (tablo.HasData)
            {
                sehirler = tablo.Data as List<Sehir>;
            }

            return Json(sehirler, JsonRequestBehavior.AllowGet);
        }
    }
}
