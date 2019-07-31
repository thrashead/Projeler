using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using AdminPanel.Data;
using TDLibrary;
using Repository.KullanicilarModel;
using Repository.BagliTiplerModel;
using Repository.BaglantilarModel;
using static Repository.BagliTiplerModel.BagliTipler;

namespace AdminPanel.Areas.Admin.Controllers
{
    public class BagliTiplerController : Controller
    {
        readonly AdminPanelEntities entity = new AdminPanelEntities();
        BagliTipler table = new BagliTipler();
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

            table.MainTypeList.AddRange(ReturnList(0));
            table.LinkedTypeList.AddRange(ReturnList(0, 2));
            table.MainList.AddRange(ReturnList(1));

            return View(table);
        }

        [HttpPost]
        public ActionResult Ekle(BagliTipler link)
        {
            if (!curUser.HasRight("BagliTipler", "i"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Insert(link);

                if (result)
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

            IBagliTipler link = table.Select(id);

            link.MainTypeList.AddRange(ReturnList(0, link.MainTypeID));
            link.LinkedTypeList.AddRange(ReturnList(0, link.LinkedTypeID));
            link.MainList.AddRange(ReturnList(link.MainTypeID, link.MainID));
            link.LinkList = entity.usp_LinksDetailByLinkTypeIDSelect(id).ToList().ChangeModelList<Baglantilar, usp_LinksDetailByLinkTypeIDSelect_Result>();

            return View(link);
        }

        [HttpPost]
        public ActionResult Duzenle(BagliTipler link)
        {
            if (!curUser.HasRight("BagliTipler", "u"))
                return RedirectToAction("AnaSayfa", "Giris");

            if (ModelState.IsValid)
            {
                bool result = table.Update(link);

                if (result)
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
            link.LinkList = entity.usp_LinksDetailByLinkTypeIDSelect(link.ID).ToList().ChangeModelList<Baglantilar, usp_LinksDetailByLinkTypeIDSelect_Result>();

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
                    curUser.Log(id, "d", "Baðlý Tipler");

                    return Json(true);
                }
            }

            return Json(false);
        }

        [HttpPost]
        public JsonResult Kopyala(int id)
        {
            if (curUser.HasRight("BagliTipler", "c"))
            {
                bool result = table.Copy(id);

                if (result)
                {
                    curUser.Log(id, "c", "Baðlý Tipler");

                    return Json(true);
                }
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
                    List<usp_CategorySelect_Result> kategoriler = entity.usp_CategorySelect(null).ToList();
                    return ListeDoldur(kategoriler, BaglantiTipi.Tablo, selectedID);
                case 2:
                    List<usp_ContentSelect_Result> icerikler = entity.usp_ContentSelect(null).ToList();
                    return ListeDoldur(icerikler, BaglantiTipi.Tablo, selectedID);
                case 3:
                    List<usp_ProductSelect_Result> urunler = entity.usp_ProductSelect(null).ToList();
                    return ListeDoldur(urunler, BaglantiTipi.Tablo, selectedID);
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
                case 8:
                    List<usp_PropertyGroupSelect_Result> formelemanlar = entity.usp_PropertyGroupSelect(null).ToList();
                    return ListeDoldur(formelemanlar, BaglantiTipi.Tablo, selectedID);
                default:
                    List<usp_TypesLinkableSelect_Result> tipler = entity.usp_TypesLinkableSelect(null).ToList();
                    return ListeDoldur(tipler, BaglantiTipi.Tip, selectedID);
            }
        }
    }
}
