using Lib;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SinaSalik.Controllers
{
    public class AjaxController : Controller
    {
        [HttpGet]
        public JsonResult MailGonder(string mail)
        {
            Mailci _mail = JsonConvert.DeserializeObject<Mailci>(mail);

            MailDurum durum = Mailci.MailAt(_mail.Gonderen, _mail.Konu, _mail.Icerik);

            return Json(durum, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Resimler()
        {
            return Json(Lib.Resimler.ResimList(), JsonRequestBehavior.AllowGet);
        }
    }
}