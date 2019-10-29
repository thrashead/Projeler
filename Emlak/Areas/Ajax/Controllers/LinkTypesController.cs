using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;
using static Models.BagliTipler;

namespace Emlak.Areas.Ajax.Controllers
{
    public class LinkTypesController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("LinkTypes"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_LinkTypesDetailSelect_Result> link = entity.usp_LinkTypesDetailSelect().ToList();

            return Json(link, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Insert()
        {
            if (!curUser.HasRight("LinkTypes", "i"))
                return Json(null, JsonRequestBehavior.AllowGet);

            BagliTipler link = new BagliTipler();

            link.MainTypeList.AddRange(ReturnList(0));
            link.LinkedTypeList.AddRange(ReturnList(0, 2));
            link.MainList.AddRange(ReturnList(1));

            return Json(link, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Insert([System.Web.Http.FromBody] BagliTipler link)
        {
            if (!curUser.HasRight("LinkTypes", "i"))
                return Json(null);

            link.Url = link.Title.ToUrl();

            var result = entity.usp_LinkTypesInsert(link.Title, link.MainTypeID, link.MainID, link.LinkedTypeID, link.Url).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(link, "i", "Baðlý Tipler");

                return Json(link);
            }
            else
                link.Mesaj = "Kayýt eklenemedi.";

            link.MainTypeList.AddRange(ReturnList(0, link.MainTypeID));
            link.LinkedTypeList.AddRange(ReturnList(0, link.LinkedTypeID));
            link.MainList.AddRange(ReturnList(link.MainTypeID, link.MainID));

            return Json(link);
        }

        [HttpGet]
        public JsonResult Update(int id)
        {
            if (!curUser.HasRight("LinkTypes", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_LinkTypesSelectTop_Result table = entity.usp_LinkTypesSelectTop(id, 1).FirstOrDefault();

            BagliTipler link = table.ChangeModel<BagliTipler>();

            link.MainTypeList.AddRange(ReturnList(0, link.MainTypeID));
            link.LinkedTypeList.AddRange(ReturnList(0, link.LinkedTypeID));
            link.MainList.AddRange(ReturnList(link.MainTypeID, link.MainID));
            link.LinkList = entity.usp_LinksDetailByLinkTypeIDSelect(id).ToList().ChangeModelList<Baglantilar, usp_LinksDetailByLinkTypeIDSelect_Result>();

            return Json(link, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Update([System.Web.Http.FromBody] BagliTipler link)
        {
            if (!curUser.HasRight("LinkTypes", "u"))
                return Json(null);

            link.Url = link.Title.ToUrl();

            var result = entity.usp_LinkTypesCheckUpdate(link.ID, link.Title, link.MainTypeID, link.MainID, link.LinkedTypeID, link.Url).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(link, "u", "Baðlý Tipler");

                return Json(link);
            }
            else
                link.Mesaj = "Kayýt düzenlenemedi.";

            link.MainTypeList.AddRange(ReturnList(0, link.MainTypeID));
            link.LinkedTypeList.AddRange(ReturnList(0, link.LinkedTypeID));
            link.MainList.AddRange(ReturnList(link.MainTypeID, link.MainID));
            link.LinkList = entity.usp_LinksDetailByLinkTypeIDSelect(link.ID).ToList().ChangeModelList<Baglantilar, usp_LinksDetailByLinkTypeIDSelect_Result>();

            return Json(link);
        }

        [HttpGet]
        public JsonResult Delete(int id)
        {
            if (!curUser.HasRight("LinkTypes", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_LinkTypesCheckDelete(id);

                curUser.Log(id, "d", "Baðlý Tipler");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult Copy(int id)
        {
            if (!curUser.HasRight("LinkTypes", "c"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                var result = entity.usp_LinkTypesCopy(id);

                if (result != null)
                    curUser.Log(id, "c", "Baðlý Tipler");

                return Json(result == null ? false : true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult FillTypes(int? typeID)
        {
            return Json(ReturnList(typeID), JsonRequestBehavior.AllowGet);
        }

        public List<SelectListItem> ReturnList(int? typeID, int selectedID = 0)
        {
            switch (typeID)
            {
                case 1:
                    List<usp_CategorySelect_Result> kategoriler = entity.usp_CategorySelect(null).ToList();
                    return ListeDoldur(kategoriler, BaglantiTipi.Tablo, selectedID);
                case 2:
                    List<usp_ContentSelect_Result> icerikler = entity.usp_ContentSelect(null).ToList();
                    return ListeDoldur(icerikler, BaglantiTipi.Tablo, selectedID);
                case 4:
                    List<usp_GallerySelect_Result> galeriler = entity.usp_GallerySelect(null).ToList();
                    return ListeDoldur(galeriler, BaglantiTipi.Tablo, selectedID);
                case 5:
                    List<usp_PictureSelect_Result> resimler = entity.usp_PictureSelect(null).ToList();
                    return ListeDoldur(resimler, BaglantiTipi.Tablo, selectedID);
                case 6:
                    List<usp_FileSelect_Result> dosyalar = entity.usp_FileSelect(null).ToList();
                    return ListeDoldur(dosyalar, BaglantiTipi.Tablo, selectedID);
                case 7:
                    List<usp_MetaSelect_Result> metalar = entity.usp_MetaSelect(null).ToList();
                    return ListeDoldur(metalar, BaglantiTipi.Tablo, selectedID);
                case 17:
                    List<usp_RealEstatesSelect_Result> emlaklar = entity.usp_RealEstatesSelect(null).ToList();
                    return ListeDoldur(emlaklar, BaglantiTipi.Emlak, selectedID);
                case 18:
                    List<usp_PropertySelect_Result> properties = entity.usp_PropertySelect(null).ToList();
                    return ListeDoldur(properties, BaglantiTipi.Tablo, selectedID);
                default:
                    List<usp_TypesLinkableSelect_Result> tipler = entity.usp_TypesLinkableSelect(null).ToList();
                    return ListeDoldur(tipler, BaglantiTipi.Tip, selectedID);
            }
        }
    }
}
