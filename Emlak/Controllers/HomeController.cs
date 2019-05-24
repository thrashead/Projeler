using Emlak.Data;
using Lib;
using Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using TDLibrary;

namespace Emlak.Controllers
{
    public class HomeController : Controller
    {
        EmlakEntities entity = new EmlakEntities();

        [HttpGet]
        public JsonResult Slider()
        {
            List<Resim> pictures = entity.sp_PictureByCodeSelect("slider").ToList().ChangeModelList<Resim, sp_PictureByCodeSelect_Result>();

            return Json(pictures, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult VitrinIlanlar(int adet = 0)
        {
            var modelList = entity.sp_RealEstatesForListSelect(ToolBox.LangCode, null, null, null, null, null, null, true, adet).ToList();

            foreach (var item in modelList)
            {
                if (item.Picture != null)
                {
                    item.Picture = AppMgr.UploadPath + "/" + item.Picture;
                }
                else
                {
                    item.Picture = AppMgr.ImagePath + "/resimyok.png";
                }
            }

            return Json(modelList, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Index()
        {
            return View();
        }
    }
}