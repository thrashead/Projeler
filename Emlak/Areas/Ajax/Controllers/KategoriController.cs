using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;
using Emlak.Data;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
    public class KategoriController : Controller
    {
        readonly EmlakEntities entity = new EmlakEntities();
        Users curUser = AppTools.User;

        [HttpGet]
        public JsonResult Index()
        {
            if (!curUser.HasRight("Kategori"))
                return Json(null, JsonRequestBehavior.AllowGet);

            List<usp_CategorySelect_Result> kategori = entity.usp_CategorySelect(null).ToList();

            curUser.Log<Kategori>(null, "s", "Kategoriler");

            return Json(kategori, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Ekle()
        {
            if (!curUser.HasRight("Kategori", "i"))
                return Json(null, JsonRequestBehavior.AllowGet);

            Kategori kategori = new Kategori();

            List<usp_CategoryParentSelect_Result> parentList = entity.usp_CategoryParentSelect(null).ToList();
            kategori.ParentCategories = parentList.ToSelectList("ID", "Title", null, true);

            return Json(kategori, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Ekle([System.Web.Http.FromBody] Kategori kategori)
        {
            if (!curUser.HasRight("Kategori", "i"))
                return Json(null);

            kategori.Url = kategori.Title.ToHyperLinkText();

            var result = entity.usp_CategoryInsert(kategori.ParentID, kategori.Title, kategori.Url, kategori.Code, kategori.Active).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(kategori, "i", "Kategoriler");

                return Json(kategori);
            }
            else
                kategori.Mesaj = "Kayýt eklenemedi.";

            List<usp_CategoryParentSelect_Result> parentList = entity.usp_CategoryParentSelect(null).ToList();
            kategori.ParentCategories = parentList.ToSelectList("ID", "Title", kategori.ParentID, true);

            return Json(kategori);
        }

        [HttpGet]
        public JsonResult Duzenle(int id)
        {
            if (!curUser.HasRight("Kategori", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            usp_CategorySelectTop_Result table = entity.usp_CategorySelectTop(id, 1).FirstOrDefault();
            Kategori kategori = table.ChangeModel<Kategori>();

            List<usp_CategoryTByLinkedIDSelect_Result> kategoriDilList = entity.usp_CategoryTByLinkedIDSelect(id).ToList();
            kategori.CategoryTList.AddRange(kategoriDilList.ChangeModelList<KategoriDil, usp_CategoryTByLinkedIDSelect_Result>());

            List<usp_CategoryParentSelect_Result> parentList = entity.usp_CategoryParentSelect(id).ToList();
            kategori.ParentCategories = parentList.ToSelectList("ID", "Title", kategori.ParentID, true);

            return Json(kategori, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Duzenle([System.Web.Http.FromBody] Kategori kategori)
        {
            if (!curUser.HasRight("Kategori", "u"))
                return Json(null);

            kategori.Url = kategori.Title.ToHyperLinkText();

            var result = entity.usp_CategoryUpdate(kategori.ID, kategori.ParentID, kategori.Title, kategori.Url, kategori.Code, kategori.Active).FirstOrDefault();

            if (result != null)
            {
                curUser.Log(kategori, "u", "Kategoriler");

                return Json(kategori);
            }
            else
                kategori.Mesaj = "Kayýt düzenlenemedi.";

            List<usp_CategoryTByLinkedIDSelect_Result> kategoriDilList = entity.usp_CategoryTByLinkedIDSelect(kategori.ID).ToList();
            kategori.CategoryTList.AddRange(kategoriDilList.ChangeModelList<KategoriDil, usp_CategoryTByLinkedIDSelect_Result>());

            List<usp_CategoryParentSelect_Result> parentList = entity.usp_CategoryParentSelect(kategori.ID).ToList();
            kategori.ParentCategories = parentList.ToSelectList("ID", "Title", kategori.ParentID, true);

            return Json(kategori);
        }

        [HttpGet]
        public JsonResult Sil(int id)
        {
            if (!curUser.HasRight("Kategori", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_CategoryCheckSetDeleted(id);

                curUser.Log(id, "d", "Kategoriler");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult Kaldir(int id)
        {
            if (!curUser.HasRight("Kategori", "rd"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                entity.usp_CategoryCheckDelete(id);

                curUser.Log(id, "rd", "Kategoriler");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult Kopyala(int id)
        {
            if (!curUser.HasRight("Kategori", "c"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
                var result = entity.usp_CategoryCopy(id);

                if (result != null)
                    curUser.Log(id, "c", "Kategoriler");

                return Json(result == null ? false : true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
