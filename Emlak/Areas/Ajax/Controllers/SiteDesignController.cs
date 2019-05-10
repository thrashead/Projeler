using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Newtonsoft.Json;
using Lib;
using System.Collections.Generic;

namespace Emlak.Areas.Ajax.Controllers
{
    public class SiteDesignController : Controller
    {
        EmlakSiteEntities entity = new EmlakSiteEntities();

        public JsonResult GetData()
        {
            List<SiteDesign> siteDesignList = new List<SiteDesign>();

            var siteDesign = entity.SiteDesign.ToList();

            if (siteDesign.Count > 0)
            {
                siteDesignList = siteDesign;
            }

            return Json(siteDesignList);
        }

        public JsonResult GetWhichSide()
        {
            bool result = false;

            var siteDesign = entity.SiteDesign.FirstOrDefault();

            if (siteDesign != null)
            {
                result = siteDesign.LeftSide;
            }

            return Json(result);
        }

        public JsonResult ChangeSide(string data)
        {
            SiteDesignJson _data = JsonConvert.DeserializeObject<SiteDesignJson>(data);

            Session["yon"] = _data.Yon;

            if (_data.Yon == "sol")
            {
                foreach (var item in entity.SiteDesign.ToList())
                {
                    item.LeftSide = true;
                }

                entity.SaveChanges();

                return Json(true);
            }
            else
            {
                foreach (var item in entity.SiteDesign.ToList())
                {
                    item.LeftSide = false;
                }

                entity.SaveChanges();

                return Json(false);
            }
        }

        public JsonResult SaveData(string data)
        {
            SiteDesignJson _data = JsonConvert.DeserializeObject<SiteDesignJson>(data);

            foreach (var item in entity.SiteDesign.Where(a => a.ID == _data.ID).ToList())
            {
                item.Order = _data.Order;
                item.Show = _data.Show;
            }

            entity.SaveChanges();

            bool result = entity.SaveChanges() >= 0 ? true : false;

            return Json(result);
        }

        public class SiteDesignJson
        {
            public int ID { get; set; }
            public string Yon { get; set; }
            public int Order { get; set; }
            public bool Show { get; set; }
        }
    }
}
