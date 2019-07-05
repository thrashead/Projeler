﻿using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class BaglantiController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("BagliTipler"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_LinksDetailSelect_Result> link = entity.usp_LinksDetailSelect().ToList();

            curUser.Log<Baglantilar>(null, "s", "Bağlantılar");

            return Json(link, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Ekle()
        {
            if (!curUser.HasRight("BagliTipler", "i"))
                return Json(null, JsonRequestBehavior.AllowGet);

            Baglantilar link = new Baglantilar();

            List<LinkTypes> tableLinkTypes = entity.LinkTypes.ToList();

            if (tableLinkTypes.Count > 0)
            {
                link.LinkedItemList = ReturnList(entity, tableLinkTypes.FirstOrDefault().LinkedTypeID);
                link.LinkTypesList = tableLinkTypes.ToSelectList("ID", "Title");
            }
            else
            {
                link.Mesaj = "Bağlantı oluşturabilmek için önce Bağlı Tip ekleyiniz.";
            }

            return Json(link, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Ekle([System.Web.Http.FromBody] Baglantilar link)
        {
            if (!curUser.HasRight("BagliTipler", "i"))
                return Json(null);

            if (link.LinkID > 0 && link.LinkTypeID > 0)
            {
                var result = entity.usp_LinksCheckInsert(link.LinkID, link.LinkTypeID).FirstOrDefault();

                if (result != null)
                {
                    curUser.Log(link, "i", "Bağlantılar");

                    return Json(link);
                }
                else
                    link.Mesaj = "Kayıt eklenemedi yada zaten daha önce eklenmiş.";
            }
            else
                link.Mesaj = "Model uygun değil.";

            List<LinkTypes> tableLinkTypes = entity.LinkTypes.ToList();

            if (tableLinkTypes.Count > 0)
            {
                link.LinkedItemList = ReturnList(entity, null, link.LinkID, link.LinkTypeID);
                link.LinkTypesList = tableLinkTypes.ToSelectList("ID", "Title", link.LinkTypeID);
            }
            else
            {
                link.Mesaj = "Model uygun değil. Bağlantı oluşturabilmek için önce Bağlı Tip ekleyiniz.";
            }

            return Json(link);
        }

        [HttpGet]
        public JsonResult Duzenle(int id)
        {
            if (!curUser.HasRight("BagliTipler", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_LinksDetailSelectTop_Result table = entity.usp_LinksDetailSelectTop(id, 1).FirstOrDefault();

            Baglantilar link = table.ChangeModel<Baglantilar>();

            usp_LinkTypesSelectTop_Result tableLinkTypes = entity.usp_LinkTypesSelectTop(table.LinkTypeID, 1).FirstOrDefault();
            link.LinkedItemList = ReturnList(entity, table.LinkedTypeID, table.LinkID);
            link.LinkedTypeAdi = tableLinkTypes.Title;

            return Json(link, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Duzenle([System.Web.Http.FromBody] Baglantilar link)
        {
            if (!curUser.HasRight("BagliTipler", "u"))
                return Json(null);

            var result = entity.usp_LinksCheckUpdate(link.ID, link.LinkID, link.LinkTypeID).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(link, "u", "Bağlantılar");

                return Json(link);
            }
            else
                link.Mesaj = "Kayıt düzenlenemedi yada zaten daha önce eklenmiş.";

            usp_LinkTypesSelectTop_Result tableLinkTypes = entity.usp_LinkTypesSelectTop(link.LinkTypeID, 1).FirstOrDefault();
            link.LinkedItemList = ReturnList(entity, null, link.LinkID, link.LinkTypeID);
            link.LinkedTypeAdi = tableLinkTypes.Title;

            return Json(link);
        }

        [HttpGet]
        public JsonResult Sil(int id)
        {
            if (!curUser.HasRight("BagliTipler", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_LinksDelete(id);

                curUser.Log(id, "rd", "Bağlantılar");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult NesneDoldur(string linkTypeID)
        {
            return Json(ReturnList(entity, null, null, linkTypeID.ToInteger()), JsonRequestBehavior.AllowGet);
        }

        private static List<SelectListItem> ReturnList(EmlakEntities entity, int? linkedTypeID = 1, int? linkID = null, int? linkTypeID = null)
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
                case 17:
                    List<usp_RealEstatesSelect_Result> tableRealEstatesItems = entity.usp_RealEstatesSelect(null).ToList();

                    foreach (var item in tableRealEstatesItems)
                        if (item.ID == linkID)
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Baslik, Selected = true });
                        else
                            linkItems.Add(new SelectListItem() { Value = item.ID.ToString(), Text = item.Baslik });
                    break;
            }

            return linkItems;
        }
    }
}