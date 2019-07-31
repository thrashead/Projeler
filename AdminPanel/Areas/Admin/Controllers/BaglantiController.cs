using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using Repository.BaglantilarModel;
using Repository.KullanicilarModel;
using TDLibrary;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class BaglantiController : Controller
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();
        Baglantilar table = new Baglantilar();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("BagliTipler"))
                return RedirectToAction("AnaSayfa", "Giris");

            return View(table.List());
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("BagliTipler", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_LinkTypesSelect_Result> tableBagliTipler = entity.usp_LinkTypesSelect(null).ToList();

            if (tableBagliTipler.Count > 0)
            {
                table.LinkedItemList = ReturnList(entity, tableBagliTipler.FirstOrDefault().LinkedTypeID);
                table.LinkTypesList = tableBagliTipler.ToSelectList<usp_LinkTypesSelect_Result, SelectListItem>("ID", "Title");
            }
            else
            {
                table.Mesaj = "Bağlantı oluşturabilmek için önce Bağlı Tip ekleyiniz.";
            }

            return View(table);
        }

        [HttpPost]
        public ActionResult Ekle(Baglantilar link)
        {
            if (!curUser.HasRight("BagliTipler", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid && link.LinkID > 0 && link.LinkTypeID > 0)
            {
                bool result = table.Insert(link);

                if (result)
                {
                    curUser.Log(link, "i", "Bağlantılar");

                    return RedirectToAction("Index");
                }
                else
                    link.Mesaj = "Kayıt eklenemedi yada zaten daha önce eklenmiş.";
            }
            else
                link.Mesaj = "Model uygun değil.";

            List<usp_LinkTypesSelect_Result> tableBagliTipler = entity.usp_LinkTypesSelect(null).ToList();

            if (tableBagliTipler.Count > 0)
            {
                link.LinkedItemList = ReturnList(entity, null, link.LinkID, link.LinkTypeID);
                link.LinkTypesList = tableBagliTipler.ToSelectList<usp_LinkTypesSelect_Result, SelectListItem>("ID", "Title", link.LinkTypeID);
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

            IBaglantilar link = table.Select(id);

            usp_LinkTypesSelectTop_Result tableLinkTypes = entity.usp_LinkTypesSelectTop(link.LinkTypeID, 1).FirstOrDefault();
            link.LinkedItemList = ReturnList(entity, link.LinkedTypeID, link.LinkID);
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
                bool result = table.Update(link);

                if (result)
                {
                    curUser.Log(link, "u", "Bağlantılar");

                    return RedirectToAction("Index");
                }
                else
                    link.Mesaj = "Kayıt düzenlenemedi yada zaten daha önce eklenmiş.";
            }
            else
                link.Mesaj = "Model uygun değil.";

            usp_LinkTypesSelectTop_Result tableLinkTypes = entity.usp_LinkTypesSelectTop(link.LinkTypeID, 1).FirstOrDefault();
            link.LinkedItemList = ReturnList(entity, null, link.LinkID, link.LinkTypeID);
            link.LinkedTypeAdi = tableLinkTypes.Title;

            return View("Duzenle", link);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            if (curUser.HasRight("BagliTipler", "d"))
            {
                bool result = table.Delete(id);

                if (result)
                {
                    curUser.Log(id, "d", "Bağlantılar");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpGet]
        public JsonResult FillObject(string linkTypeID)
        {
            return Json(ReturnList(entity, null, null, linkTypeID.ToInteger()), JsonRequestBehavior.AllowGet);
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