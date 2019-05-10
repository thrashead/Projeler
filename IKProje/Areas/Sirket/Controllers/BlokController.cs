using Lib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IKProje.Areas.Sirket.Controllers
{
    public class BlokController : Controller
    {
        public ActionResult Adaylar()
        {
            if (SabitDegerler.AktifFirma != null)
            {
                return View();
            }
            else
            {
                return SabitSayfalar.Sirket.SirketGiris;
            } return View();
        }
    }
}
