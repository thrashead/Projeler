using Newtonsoft.Json;
using System.Linq;
using System.Web.Mvc;
using AdminPanel.Data;
using TDLibrary;
using Repository.UsersModel;

namespace AdminPanel.Areas.Ajax.Controllers
{
    public class AjaxController : Controller
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();

        [HttpPost]
        public JsonResult Login(string login)
        {
            Users kullanici = JsonConvert.DeserializeObject<Users>(login);

            usp_UsersSelectLogin_Result rb = entity.usp_UsersSelectLogin(kullanici.Username, kullanici.Password.ToMD5()).FirstOrDefault();

            if (rb != null)
            {
                kullanici = rb.ChangeModel<Users>();

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

        [HttpGet]
        public JsonResult Logout()
        {
            AppTools.User.Log("cks");

            Session["CurrentUser"] = null;

            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}