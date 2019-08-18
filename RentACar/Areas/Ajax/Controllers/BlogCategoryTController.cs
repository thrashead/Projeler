using System.Web.Mvc;
using Repository.UsersModel;
using Repository.BlogCategoryTModel;

namespace RentACar.Areas.Ajax.Controllers
{
	public class BlogCategoryTController : Controller
	{
		readonly BlogCategoryT model = new BlogCategoryT();
        readonly Users curUser = AppTools.User;

        [HttpGet]
		public JsonResult Index(int? id)
        {
            if (!curUser.HasRight("Website"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(id), JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult Insert(int? linkID)
        {
            if (!curUser.HasRight("Website", "i"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Insert(null, linkID, null), JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult Insert([System.Web.Http.FromBody] BlogCategoryT table)
        {
            if (!curUser.HasRight("Website", "i"))
                return Json(null);

            bool result = model.Insert(table);

            if (result)
            {
                curUser.Log(table, "i", "Blog Kategorileri (Dil)");

                return Json(table);
            }
            else
                table.Mesaj = "Kayıt eklenemedi.";

            table = (BlogCategoryT)model.Insert(table, table.BlogCatID, table.TransID);

			return Json(table);
		}

		[HttpGet]
		public JsonResult Update(int? id)
        {
            if (!curUser.HasRight("Website", "u"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Update(id), JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult Update([System.Web.Http.FromBody] BlogCategoryT table)
        {
            if (!curUser.HasRight("Website", "u"))
                return Json(null);

            bool result = model.Update(table);

            if (result)
            {
                curUser.Log(table, "u", "Blog Kategorileri (Dil)");

                return Json(table);
            }
            else
                table.Mesaj = "Kayıt düzenlenemedi.";

            table = (BlogCategoryT)model.Update(table.ID, table);

			return Json(table);
		}

		[HttpGet]
		public JsonResult Copy(int id)
        {
            if (!curUser.HasRight("Website", "c"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Copy(id);

            if (result)
            {
                curUser.Log(id, "c", "Blog Kategorileri (Dil)");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }

		[HttpGet]
		public JsonResult Delete(int? id)
        {
            if (!curUser.HasRight("Website", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            bool result = model.Delete(id);

            if (result)
            {
                curUser.Log(id, "d", "Blog Kategorileri (Dil)");

                return Json(true, JsonRequestBehavior.AllowGet);
            }

            return Json(false, JsonRequestBehavior.AllowGet);
        }
	}
}
