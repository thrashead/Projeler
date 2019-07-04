using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Models;
using static Models.BagliTipler;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class BagliTiplerController : Controller
    {
        readonly EmlakEntities _entity = new EmlakEntities();
        Kullanicilar curUser = AppTools.User;

        public ActionResult Index()
        {
            if (!curUser.HasRight("BagliTipler"))
                return RedirectToAction("AnaSayfa", "Giris");

            List<usp_LinkTypesDetailSelect_Result> link = _entity.usp_LinkTypesDetailSelect().ToList();

            curUser.Log<BagliTipler>(null, "s", "Baðlý Tipler");

            return View(link);
        }

        public ActionResult Ekle()
        {
            if (!curUser.HasRight("BagliTipler", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            BagliTipler link = new BagliTipler();

            link.MainTypeList.AddRange(ReturnList(0));
            link.LinkedTypeList.AddRange(ReturnList(0, 2));
            link.MainList.AddRange(ReturnList(1));

            return View(link);
        }

        [HttpPost]
        public ActionResult Ekle(BagliTipler link)
        {
            if (!curUser.HasRight("BagliTipler", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                link.Url = link.Title.ToHyperLinkText();

                var result = _entity.usp_LinkTypesInsert(link.Title, link.MainTypeID, link.MainID, link.LinkedTypeID, link.Url);

                if (result != null)
                {
                    curUser.Log(link, "i", "Baðlý Tipler");

                    return RedirectToAction("Index");
                }
                else
                    link.Mesaj = "Kayýt eklenemedi.";
            }
            else
                link.Mesaj = "Model uygun deðil.";

            link.MainTypeList.AddRange(ReturnList(0, link.MainTypeID));
            link.LinkedTypeList.AddRange(ReturnList(0, link.LinkedTypeID));
            link.MainList.AddRange(ReturnList(link.MainTypeID, link.MainID));

            return View("Ekle", link);
        }

        [HttpGet]
        public ActionResult Duzenle(int id)
        {
            if (!curUser.HasRight("BagliTipler", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            usp_LinkTypesSelectTop_Result table = _entity.usp_LinkTypesSelectTop(id, 1).FirstOrDefault();

            BagliTipler link = table.ChangeModel<BagliTipler>();

            link.MainTypeList.AddRange(ReturnList(0, link.MainTypeID));
            link.LinkedTypeList.AddRange(ReturnList(0, link.LinkedTypeID));
            link.MainList.AddRange(ReturnList(link.MainTypeID, link.MainID));
            link.LinkList = _entity.usp_LinksDetailByLinkTypeIDSelect(id).ToList().ChangeModelList<Baglantilar, usp_LinksDetailByLinkTypeIDSelect_Result>();

            return View(link);
        }

        [HttpPost]
        public ActionResult Duzenle(BagliTipler link)
        {
            if (!curUser.HasRight("BagliTipler", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                link.Url = link.Title.ToHyperLinkText();

                var result = _entity.usp_LinkTypesCheckUpdate(link.ID, link.Title, link.MainTypeID, link.MainID, link.LinkedTypeID, link.Url);

                if (result != null)
                {
                    curUser.Log(link, "u", "Baðlý Tipler");

                    return RedirectToAction("Index");
                }
                else
                    link.Mesaj = "Kayýt düzenlenemedi.";
            }
            else
                link.Mesaj = "Model uygun deðil.";

            link.MainTypeList.AddRange(ReturnList(0, link.MainTypeID));
            link.LinkedTypeList.AddRange(ReturnList(0, link.LinkedTypeID));
            link.MainList.AddRange(ReturnList(link.MainTypeID, link.MainID));
            link.LinkList = _entity.usp_LinksDetailByLinkTypeIDSelect(link.ID).ToList().ChangeModelList<Baglantilar, usp_LinksDetailByLinkTypeIDSelect_Result>();

            return View("Duzenle", link);
        }

        [HttpPost]
        public JsonResult Sil(int id)
        {
            try
            {
                if (curUser.HasRight("BagliTipler", "d"))
                {
                    _entity.usp_LinkTypesCheckDelete(id);

                    curUser.Log(id, "rd", "Baðlý Tipler");

                    return Json(true);
                }
            }
            catch
            {
                return Json(false);
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kopyala(int id)
        {
            try
            {
                if (curUser.HasRight("BagliTipler", "c"))
                {
                    var result = _entity.usp_LinkTypesCopy(id);

                    if (result != null)
                        curUser.Log(id, "c", "Baðlý Tipler");

                    return Json(result == null ? false : true);
                }
            }
            catch
            {
                return Json(false);
            }

            return Json(false);
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
                    List<usp_CategorySelect_Result> kategoriler = _entity.usp_CategorySelect(null).ToList();
                    return ListeDoldur(kategoriler, BaglantiTipi.Tablo, selectedID);
                case 2:
                    List<usp_ContentSelect_Result> icerikler = _entity.usp_ContentSelect(null).ToList();
                    return ListeDoldur(icerikler, BaglantiTipi.Tablo, selectedID);
                case 3:
                    List<usp_ProductSelect_Result> urunler = _entity.usp_ProductSelect(null).ToList();
                    return ListeDoldur(urunler, BaglantiTipi.Tablo, selectedID);
                case 4:
                    List<usp_GallerySelect_Result> galeriler = _entity.usp_GallerySelect(null).ToList();
                    return ListeDoldur(galeriler, BaglantiTipi.Tablo, selectedID);
                case 5:
                    List<usp_PictureSelect_Result> resimler = _entity.usp_PictureSelect(null).ToList();
                    return ListeDoldur(resimler, BaglantiTipi.Tablo, selectedID);
                case 6:
                    List<usp_FileSelect_Result> dosyalar = _entity.usp_FileSelect(null).ToList();
                    return ListeDoldur(dosyalar, BaglantiTipi.Tablo, selectedID);
                case 7:
                    List<usp_MetaSelect_Result> metalar = _entity.usp_MetaSelect(null).ToList();
                    return ListeDoldur(metalar, BaglantiTipi.Tablo, selectedID);
                case 8:
                    List<usp_PropertyGroupSelect_Result> formelemanlar = _entity.usp_PropertyGroupSelect(null).ToList();
                    return ListeDoldur(formelemanlar, BaglantiTipi.Tablo, selectedID);
                default:
                    List<usp_TypesLinkableSelect_Result> tipler = _entity.usp_TypesLinkableSelect(null).ToList();
                    return ListeDoldur(tipler, BaglantiTipi.Tip, selectedID);
            }
        }
    }
}
