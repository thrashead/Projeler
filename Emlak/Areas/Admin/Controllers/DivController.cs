using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Emlak.Areas.Admin.Controllers
{
    public class DivController : Controller
    {
        EmlakSiteEntities entity = new EmlakSiteEntities();

        public ActionResult Menu()
        {
            List<PanelMenu> _menuItemList = new List<PanelMenu>();

            var panelmenus = entity.PanelMenu.Where(a=> a.Active == true && a.ParentID == 0).OrderBy(a=> a.OrderNo).ToList();

            if (panelmenus.Count > 0)
            {
                foreach (var item in panelmenus)
                {
                    PanelMenu panelMenu = item;

                    var panelmenussubs = entity.PanelMenu.Where(a=> a.Active == true && a.ParentID == item.ID).OrderBy(a => a.OrderNo).ToList();

                    if (panelmenussubs.Count > 0)
                    {
                        panelMenu.SubMenuItems.AddRange(panelmenussubs);
                    }

                    _menuItemList.Add(panelMenu);
                }
            }

            return View("_Menu", _menuItemList);
        }
    }
}
