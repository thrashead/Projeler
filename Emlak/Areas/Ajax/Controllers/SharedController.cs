using Emlak.Data;
using System.Web.Mvc;
using System;
using TDLibrary;
using System.Globalization;
using System.Linq;

namespace Emlak.Areas.Ajax.Controllers
{
    public class SharedController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpPost]
        public JsonResult Login([System.Web.Http.FromBody] Users user)
        {
            usp_UsersSelectLogin_Result rb = entity.usp_UsersSelectLogin(user.Username, user.Password.ToMD5()).FirstOrDefault();

            if (rb != null)
            {
                user = rb.ChangeModel<Users>();

                Session["CurrentUser"] = user;

                entity.usp_UsersLoginTimeUpdate(user.ID, DateTime.Now.ToString(CultureInfo.CurrentCulture));

                AppTools.User.Log("grs");

                return Json(true);
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

        [HttpGet]
        public JsonResult LoginControl()
        {
            if (Session["CurrentUser"] == null)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                    Users user = Session["CurrentUser"] as Users;

                    usp_UsersSelectLogin_Result rb = entity.usp_UsersSelectLogin(user.Username, user.Password).FirstOrDefault();

                    if (rb != null)
                    {
                        return Json(true, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(false, JsonRequestBehavior.AllowGet);
                    }
                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [HttpGet]
        public JsonResult CurrentUser()
        {
            return Json((Users)Session["CurrentUser"], JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult CurrentUserRights()
        {
            return Json(curUser.UserRights(null, null), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult ShowType(string url)
        {
            return Json(Lib.ShowTypes(url), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult HasRight(string url, string process)
        {
            return Json(curUser.HasRight(url, process), JsonRequestBehavior.AllowGet);
        }
    }
}