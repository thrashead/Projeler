using System.Web.Mvc;
using Repository.UsersModel;
using Repository.CarDetailsExtIntModel;

namespace RentACar.Areas.Ajax.Controllers
{
	public class CarDetailsExtIntController : Controller
	{
		readonly CarDetailsExtInt model = new CarDetailsExtInt();
        readonly Users curUser = AppTools.User;

        [HttpGet]
		public JsonResult Index(int? id)
		{
            if (!curUser.HasRight("Website"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(id, null, false), JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult Insert()
		{
            if (!curUser.HasRight("Website", "i"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.Insert(), JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult Insert([System.Web.Http.FromBody] CarDetailsExtInt table)
		{
            if (!curUser.HasRight("Website", "i"))
                return Json(null);

            bool result = model.Insert(table);

			if (result)
			{
                curUser.Log(table, "i", "Araç Detay (İç-Dış)");

                return Json(table);
			}
			else
			{
				table.Mesaj = "Kayıt eklenemedi.";
			}

			table = (CarDetailsExtInt)model.Insert(table, table.BodyTypeID, table.DriveTypeID, table.CarID);

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
		public JsonResult Update([System.Web.Http.FromBody] CarDetailsExtInt table)
		{
            if (!curUser.HasRight("Website", "u"))
                return Json(null);

            bool result = model.Update(table);

			if (result)
			{
                curUser.Log(table, "u", "Araç Detay (İç-Dış)");

                return Json(table);
			}
			else
			{
				table.Mesaj = "Kayıt düzenlenemedi.";
			}

			table = (CarDetailsExtInt)model.Update(table.ID, table);

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
                curUser.Log(id, "c", "Araç Detay (İç-Dış)");

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
                curUser.Log(id, "d", "Araç Detay (İç-Dış)");

                return Json(true, JsonRequestBehavior.AllowGet);
			}

			return Json(false, JsonRequestBehavior.AllowGet);
		}
	}
}
