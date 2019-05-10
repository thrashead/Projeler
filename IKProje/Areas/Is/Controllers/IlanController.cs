using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TDLibrary;

namespace IKProje.Areas.Is.Controllers
{
    public class IlanController : Controller
    {
        public ActionResult Detay()
        {
            return View();
        }

        public ActionResult Ara()
        {
            return View();
        }

        public ActionResult Sehir(string id)
        {
            switch (id)
            {
                case "Istanbul": id = "340" ; break;
                case "Ankara": id = "6"; break;
                case "Izmir": id = "35"; break;
                case "Kocaeli": id = "41"; break;
                case "Antalya": id = "7"; break;
                case "Sivas": id = "58"; break;
                case "Kayseri": id = "38"; break;
                case "Konya": id = "42"; break;
                case "Trabzon": id = "61"; break;
                case "Bursa": id = "16"; break;
                case "Samsun": id = "55"; break;
                case "Manisa": id = "45"; break;
                case "Erzurum": id = "25"; break;
                case "Adana": id = "1"; break;
                case "Mersin": id = "33"; break;
                case "Diyarbakir": id = "21"; break;
                default: id = "340"; break;
            }

            ViewBag.Sehir = id.ToInteger();

            return View();
        }

        public ActionResult IsTuru(string id)
        {
            switch (id)
            {
                case "Tam-Zamanli": id = "1"; break;
                case "Part-Time": id = "4"; break;
                case "Freelance": id = "3"; break;
                case "Donemsel": id = "2"; break;
                case "Staj": id = "5"; break;
                default: id = "1"; break;
            }

            ViewBag.IsTuru = id.ToInteger();

            return View();
        }
    }
}
