using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TDFramework;
using TDFramework.Common;
using Models.SehirModel;
using Models.CinsiyetModel;

namespace IKProje.Areas.Aday.Controllers
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
        public JsonResult SehirlerJson()
        {
            List<Sehir> sehirler = new List<Sehir>();
            Table<Sehir> tablo = new Table<Sehir>();
            tablo.SelectSettings.OrderColumn = SehirColumns.Sira;
            tablo.WhereList.Add(new Where(SehirColumns.Kod, 99, true));
            tablo.WhereList.Add(new Where(SehirColumns.Kod, 340, true));
            tablo.WhereList.Add(new Where(SehirColumns.Kod, 34, true));

            tablo.Select();

            if(tablo.HasData)
            {
                sehirler = tablo.Data as List<Sehir>;
            }

            return Json(sehirler, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult CinsiyetJson()
        {
            List<Cinsiyet> cinsiyetler = new List<Cinsiyet>();
            Table<Cinsiyet> tablo = new Table<Cinsiyet>();
            tablo.WhereList.Add(new Where(CinsiyetColumns.Aktif, true));
            tablo.WhereList.Add(new Where(CinsiyetColumns.Kod, 0, true));
            tablo.SelectSettings.OrderColumn = CinsiyetColumns.Kod;

            tablo.Select();

            if (tablo.HasData)
            {
                cinsiyetler = tablo.Data as List<Cinsiyet>;
            }

            return Json(cinsiyetler, JsonRequestBehavior.AllowGet);
        }
    }
}
