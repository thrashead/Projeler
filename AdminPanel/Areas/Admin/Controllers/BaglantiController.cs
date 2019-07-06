using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using AdminPanel.Data;
using TDLibrary;
using Models;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class BaglantiController : Controller
    {
        readonly AdminPanelEntities _entity = new AdminPanelEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("BagliTipler"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_LinksDetailSelect_Result> link = _entity.usp_LinksDetailSelect().ToList();

            return View(link);
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("BagliTipler", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            Baglantilar link = new Baglantilar();

            List<LinkTypes> tableLinkTypes = _entity.LinkTypes.ToList();

            if (tableLinkTypes.Count > 0)
            {
                link.LinkedItemList = ReturnList(_entity, tableLinkTypes.FirstOrDefault().LinkedTypeID);
                link.LinkTypesList = tableLinkTypes.ToSelectList("ID", "Title");
            }
            else
            {
                link.Mesaj = "Bağlantı oluşturabilmek için önce Bağlı Tip ekleyiniz.";
            }

            return View(link);
        }

        [HttpPost]
        public ActionResult Ekle(Baglantilar link)
        {
            if (!curUser.HasRight("BagliTipler", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid && link.LinkID > 0 && link.LinkTypeID > 0)
            {
                var result = _entity.usp_LinksCheckInsert(link.LinkID, link.LinkTypeID).FirstOrDefault();

                if (result != null)
                {
                    curUser.Log(link, "i", "Bağlantılar");

                    return RedirectToAction("Index");
                }
                else
                    link.Mesaj = "Kayıt eklenemedi yada zaten daha önce eklenmiş.";
            }
            else
                link.Mesaj = "Model uygun değil.";

            List<LinkTypes> tableLinkTypes = _entity.LinkTypes.ToList();

            if (tableLinkTypes.Count > 0)
            {
                link.LinkedItemList = ReturnList(_entity, null, link.LinkID, link.LinkTypeID);
                link.LinkTypesList = tableLinkTypes.ToSelectList("ID", "Title", link.LinkTypeID);
            }
            else
            {
                link.Mesaj = "Model uygun değil. Bağlantı oluşturabilmek için önce Bağlı Tip ekleyiniz.";
            }

            return View("Ekle", link);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("BagliTipler", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            usp_LinksDetailSelectTop_Result table = _entity.usp_LinksDetailSelectTop(id, 1).FirstOrDefault();

            Baglantilar link = table.ChangeModel<Baglantilar>();

            usp_LinkTypesSelectTop_Result tableLinkTypes = _entity.usp_LinkTypesSelectTop(table.LinkTypeID, 1).FirstOrDefault();
            link.LinkedItemList = ReturnList(_entity, table.LinkedTypeID, table.LinkID);
            link.LinkedTypeAdi = tableLinkTypes.Title;

            return View(link);
        }

        [HttpPost]
        public ActionResult Duzenle(Baglantilar link)
        {
            if (!curUser.HasRight("BagliTipler", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                var result = _entity.usp_LinksCheckUpdate(link.ID, link.LinkID, link.LinkTypeID).FirstOrDefault();

                if (result != null)
                {
                    curUser.Log(link, "u", "Bağlantılar");

                    return RedirectToAction("Index");
                }
                else
                    link.Mesaj = "Kayıt düzenlenemedi yada zaten daha önce eklenmiş.";
            }
            else
                link.Mesaj = "Model uygun değil.";

            usp_LinkTypesSelectTop_Result tableLinkTypes = _entity.usp_LinkTypesSelectTop(link.LinkTypeID, 1).FirstOrDefault();
            link.LinkedItemList = ReturnList(_entity, null, link.LinkID, link.LinkTypeID);
            link.LinkedTypeAdi = tableLinkTypes.Title;

            return View("Duzenle", link);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            try
            {
                if (curUser.HasRight("BagliTipler", "d"))
                {
                    _entity.usp_LinksDelete(id);

                    curUser.Log(id, "rd", "Bağlantılar");

                    return Json(true);
                }
            }
            catch
            {
                return Json(false);
            }

            return Json(false);
        }

        [HttpGet]
        public JsonResult FillObject(string linkTypeID)
        {
            return Json(ReturnList(_entity, null, null, linkTypeID.ToInteger()), JsonRequestBehavior.AllowGet);
        }

        private static List<SelectListItem> ReturnList(AdminPanelEntities entity, int? linkedTypeID = 1, int? linkID = null, int? linkTypeID = null)
        {
            List<SelectListItem> linkItems = new List<SelectListItem>();

            int? _linkedTypeID = linkTypeID == null ? linkedTypeID : linkTypeID;

            if (linkTypeID == null)
                _linkedTypeID = linkedTypeID;
            else
            {
                usp_LinkTypesSelectTop_Result table = entity.usp_LinkTypesSelectTop(linkTypeID, 1).FirstOrDefault();

                _linkedTypeID = table.LinkedTypeID;
            }

            switch (_linkedTypeID)
            {
                case 1:
                    List<usp_CategorySelect_Result> tableCatItems = entity.usp_CategorySelect(null).ToList();

                    foreach (var item in tableCatItems)
                        if (item.ID == linkID)
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Title, Selected = true });
                        else
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Title });
                    break;
                case 2:
                    List<usp_ContentSelect_Result> tableContItems = entity.usp_ContentSelect(null).ToList();

                    foreach (var item in tableContItems)
                        if (item.ID == linkID)
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Title, Selected = true });
                        else
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Title });
                    break;
                case 3:
                    List<usp_ProductSelect_Result> tableProdItems = entity.usp_ProductSelect(null).ToList();

                    foreach (var item in tableProdItems)
                        if (item.ID == linkID)
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Title, Selected = true });
                        else
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Title });
                    break;
                case 4:
                    List<usp_GallerySelect_Result> tableGalItems = entity.usp_GallerySelect(null).ToList();

                    foreach (var item in tableGalItems)
                        if (item.ID == linkID)
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Title, Selected = true });
                        else
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Title });
                    break;
                case 5:
                    List<usp_PictureSelect_Result> tablePicItems = entity.usp_PictureSelect(null).ToList();

                    foreach (var item in tablePicItems)
                        if (item.ID == linkID)
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Title, Selected = true });
                        else
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Title });
                    break;
                case 6:
                    List<usp_FileSelect_Result> tableFileItems = entity.usp_FileSelect(null).ToList();

                    foreach (var item in tableFileItems)
                        if (item.ID == linkID)
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Title, Selected = true });
                        else
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Title });
                    break;
                case 7:
                    List<usp_MetaSelect_Result> tableMetaItems = entity.usp_MetaSelect(null).ToList();

                    foreach (var item in tableMetaItems)
                        if (item.ID == linkID)
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Title, Selected = true });
                        else
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Title });
                    break;
                case 8:
                    List<usp_PropertyGroupSelect_Result> tablePropertyGroupItems = entity.usp_PropertyGroupSelect(null).ToList();

                    foreach (var item in tablePropertyGroupItems)
                        if (item.ID == linkID)
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Title, Selected = true });
                        else
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Title });
                    break;
            }

            return linkItems;
        }
    }
}