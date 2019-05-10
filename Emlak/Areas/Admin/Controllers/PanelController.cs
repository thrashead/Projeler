using Lib;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Emlak.Areas.Admin.Controllers
{
    public class PanelController : Controller
    {
        EmlakSiteEntities entity = new EmlakSiteEntities();

        public ActionResult Index()
        {
            List<PanelMenu> _menuItemList = new List<PanelMenu>();

            var panelmenus = entity.PanelMenu.Where(a => a.Active == true && a.MenuLink != "javascript:;" && a.MenuLink != "" && a.OrderNo != 1).OrderBy(a => a.OrderNo).ToList();

            if (panelmenus.Count > 0)
            {
                foreach (var item in panelmenus)
                {
                    PanelMenu panelMenu = item;

                    var panelmenussubs = entity.PanelMenu.Where(a => a.Active == true && a.ParentID == item.ID).OrderBy(a => a.OrderNo).ToList();

                    if (panelmenussubs.Count > 0)
                    {
                        panelMenu.SubMenuItems.AddRange(panelmenussubs);
                    }

                    _menuItemList.Add(panelMenu);
                }
            }

            return View(_menuItemList);
        }

        public ActionResult Assignments()
        {
            return View();
        }

        public ActionResult Category()
        {
            return View();
        }

        public ActionResult Content()
        {
            return View();
        }

        public ActionResult Files()
        {
            return View();
        }

        public ActionResult FilesNoLang()
        {
            return View();
        }

        public ActionResult Gallery()
        {
            return View();
        }

        public ActionResult Lang()
        {
            return View();
        }

        public ActionResult Pictures()
        {
            return View();
        }

        public ActionResult PicturesNoLang()
        {
            return View();
        }

        public ActionResult Rank()
        {
            return View();
        }

        public ActionResult RealEstateAds()
        {
            return View();
        }

        public ActionResult URLink()
        {
            return View();
        }

        public ActionResult URLinkNoLang()
        {
            return View();
        }

        public ActionResult Users()
        {
            return View();
        }

        public ActionResult SiteDesign()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }
    }
}
