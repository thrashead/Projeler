using Newtonsoft.Json;
using System.Linq;
using System.Web.Mvc;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class AjaxController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();

        [HttpPost]
        public JsonResult LoginAdmin(string login)
        {
            Kullanicilar kullanici = JsonConvert.DeserializeObject<Kullanicilar>(login);

            usp_UsersSelectLogin_Result rb = entity.usp_UsersSelectLogin(kullanici.Username, kullanici.Password.ToMD5()).FirstOrDefault();

            if (rb != null)
            {
                kullanici = rb.ChangeModel<Kullanicilar>();

                Session["CurrentUser"] = kullanici;

                string loginTime = AppTools.GetTime;

                var result = entity.usp_UsersLoginTimeUpdate(kullanici.ID, loginTime);

                if (result != null)
                {
                    AppTools.User.Log("grs");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Login([System.Web.Http.FromBody] Kullanicilar login)
        {
            usp_UsersSelectLogin_Result rb = entity.usp_UsersSelectLogin(login.Username, login.Password.ToMD5()).FirstOrDefault();

            if (rb != null)
            {
                login = rb.ChangeModel<Kullanicilar>();

                Session["CurrentUser"] = login;

                string loginTime = AppTools.GetTime;

                var result = entity.usp_UsersLoginTimeUpdate(login.ID, loginTime);

                if (result != null)
                {
                    AppTools.User.Log("grs");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpGet]
        public JsonResult Logout()
        {
            AppTools.User.Log("cks");

            Session["CurrentUser"] = null;

            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}