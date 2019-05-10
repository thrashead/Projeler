using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Lib;

namespace IKProje.Areas.Aday.Controllers
{
    public class BlokController : Controller
    {
        public ActionResult Sirketler()
        {
            if (SabitDegerler.AktifKullanici != null)
            {
                return View();
            }
            else
            {
                return SabitSayfalar.Aday.AdayGiris;
            }
        }
    }
}
