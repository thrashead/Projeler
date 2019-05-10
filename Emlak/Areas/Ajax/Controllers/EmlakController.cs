using Newtonsoft.Json;
using System.Linq;
using System.Web.Mvc;
using TDLibrary;

namespace Emlak.Areas.Ajax.Controllers
{
    public class EmlakController : Controller
    {
        EmlakSiteEntities entity = new EmlakSiteEntities();

        [HttpPost]
        public JsonResult Login([System.Web.Http.FromBody] UserJson login)
        {
            string pass = login.Password.ToMD5();

            var rb = entity.Users.Where(a => a.Active == true && a.Username == login.Username && a.Password == pass).FirstOrDefault();

            if (rb != null)
            {
                Session["CurrentUser"] = rb;

                return Json(true);
            }
            else
            {
                return Json(false);
            }
        }

        public JsonResult Log(string login)
        {
            UserJson user = JsonConvert.DeserializeObject<UserJson>(login);

            string pass = user.Password.ToMD5();

            var rb = entity.Users.Where(a => a.Active == true && a.Username == user.Username && a.Password == pass).FirstOrDefault();

            if (rb != null)
            {
                Session["CurrentUser"] = rb;

                return Json(true);
            }
            else
            {
                return Json(false);
            }
        }

        [HttpGet]
        public JsonResult Logout()
        {
            Session["CurrentUser"] = null;

            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public class UserJson
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }
    }
}