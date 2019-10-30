using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class LinksController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("LinkTypes"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_LinksDetailSelect_Result> link = entity.usp_LinksDetailSelect().ToList();

            return Json(link, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Insert()
        {
            if (!curUser.HasRight("LinkTypes", "i"))
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
        public JsonResult Insert([System.Web.Http.FromBody] Baglantilar link)
        {
            if (!curUser.HasRight("LinkTypes", "i"))
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
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("LinkTypes", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_LinksDetailSelectTop_Result table = entity.usp_LinksDetailSelectTop(id, 1).FirstOrDefault();

            Baglantilar link = table.ChangeModel<Baglantilar>();

            usp_LinkTypesSelectTop_Result tableLinkTypes = entity.usp_LinkTypesSelectTop(table.LinkTypeID, 1).FirstOrDefault();
            link.LinkedItemList = ReturnList(entity, table.LinkedTypeID, table.LinkID);
            link.LinkedTypeAdi = tableLinkTypes.Title;

            return Json(link, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] Baglantilar link)
        {
            if (!curUser.HasRight("LinkTypes", "u"))
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
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("LinkTypes", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_LinksDelete(id);

                curUser.Log(id, "d", "Bağlantılar");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult FillObjects(string linkTypeID)
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
                case 18:
                    List<usp_PropertySelect_Result> tablePropertyItems = entity.usp_PropertySelect(null).ToList();

                    foreach (var item in tablePropertyItems)
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