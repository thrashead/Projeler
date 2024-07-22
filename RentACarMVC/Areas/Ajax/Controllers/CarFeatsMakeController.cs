using System.Web.Mvc;
using TDLibrary;
using Repository.UsersModel;
using Repository.CarFeatsMakeModel;

namespace RentACarMVC.Areas.Ajax.Controllers
{
	public class CarFeatsMakeController : Controller
	{
		readonly CarFeatsMake model = new CarFeatsMake();
        readonly Users curUser = AppTools.User;

        [HttpGet]
		public JsonResult Index(int? id)
		{
            if (!curUser.HasRight("Website"))
                return Json(null, JsonRequestBehavior.AllowGet);

            return Json(model.List(id, null, false), JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult Insert([System.Web.Http.FromBody] CarFeatsMake table)
		{
            if (!curUser.HasRight("Website", "i"))
                return Json(null);

            bool result = model.Insert(table);

			if (result)
			{
                curUser.Log(table, "i", "Araç Özellik (Marka)");

                return Json(table);
			}
			else
			{
				table.Mesaj = "Kayıt eklenemedi.";
			}

			table = (CarFeatsMake)model.Insert(table, null);

			return Json(table);
		}

		[HttpPost]
		public JsonResult InsertUpload([System.Web.Http.FromBody] CarFeatsMake table)
		{
            if (!curUser.HasRight("Website", "i"))
                return Json(null);

            Uploader pic = Uploader.UploadPicture(false);

            if (pic.Control)
            {
                table.HasFile = true;
                table.PictureUrl = pic.FileName;
            }
            else
            {
                table.HasFile = false;
                table.Mesaj = pic.ErrorMessage;
            }

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
		public JsonResult Update([System.Web.Http.FromBody] CarFeatsMake table)
		{
            if (!curUser.HasRight("Website", "u"))
                return Json(null);

            if (table.HasFile == true)
			{
				try
				{
					System.IO.File.Delete(Server.MapPath("~/" + AppMgr.UploadPath.Replace(AppMgr.MainPath, "") + "/" + table.OldPictureUrl));
					System.IO.File.Delete(Server.MapPath("~/" + AppMgr.UploadPath.Replace(AppMgr.MainPath, "") + "/thumb_" + table.OldPictureUrl));
				}
				catch
				{
					table.Mesaj = "Eski (" + table.OldPictureUrl + ") dosyası silinemedi.";

					return Json(table);
				}
			}

			bool result = model.Update(table);

			if (result)
			{
                curUser.Log(table, "u", "Araç Özellik (Marka)");

                return Json(table);
			}
			else
			{
				table.Mesaj = "Kayıt düzenlenemedi.";
			}

			table = (CarFeatsMake)model.Update(table.ID, table);

			return Json(table);
		}

		[HttpPost]
		public JsonResult UpdateUpload([System.Web.Http.FromBody] CarFeatsMake table)
		{
            if (!curUser.HasRight("Website", "u"))
                return Json(null);

            Uploader pic = Uploader.UploadPicture(false);

            table.HasFile = pic.HasFile;

            if (pic.UploadError == null)
            {
                if (pic.HasFile == true)
                {
                    table.PictureUrl = pic.FileName;
                }
            }
            else
            {
                table.Mesaj = pic.ErrorMessage;
            }

            return Json(table);
        }

		[HttpGet]
		public JsonResult Copy(int id)
		{
            if (!curUser.HasRight("Website", "c"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
				CarFeatsMake table = (CarFeatsMake)model.Select(id, false);

				System.IO.File.Copy(Server.MapPath("~/" + AppMgr.UploadPath.Replace(AppMgr.MainPath, "") + "/" + table.PictureUrl), Server.MapPath("~/" + AppMgr.UploadPath.Replace(AppMgr.MainPath, "") + "/Kopya_" + table.PictureUrl));
				System.IO.File.Copy(Server.MapPath("~/" + AppMgr.UploadPath.Replace(AppMgr.MainPath, "") + "/thumb_" + table.PictureUrl), Server.MapPath("~/" + AppMgr.UploadPath.Replace(AppMgr.MainPath, "") + "/thumb_Kopya_" + table.PictureUrl));
			}
			catch
			{
				return Json(false, JsonRequestBehavior.AllowGet);
			}

			bool result = model.Copy(id);

			if (result)
			{
                curUser.Log(id, "c", "Araç Özellik (Marka)");

                return Json(true, JsonRequestBehavior.AllowGet);
			}

			return Json(false, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult Delete(int? id)
		{
            if (!curUser.HasRight("Website", "d"))
                return Json(false, JsonRequestBehavior.AllowGet);

            try
            {
				CarFeatsMake table = (CarFeatsMake)model.Select(id, false);

				System.IO.File.Delete(Server.MapPath("~/" + AppMgr.UploadPath.Replace(AppMgr.MainPath, "") + "/" + table.PictureUrl));
				System.IO.File.Delete(Server.MapPath("~/" + AppMgr.UploadPath.Replace(AppMgr.MainPath, "") + "/thumb_" + table.PictureUrl));
			}
			catch
			{
				return Json(false, JsonRequestBehavior.AllowGet);
			}

			bool result = model.Delete(id);

			if (result)
			{
                curUser.Log(id, "d", "Araç Özellik (Marka)");

                return Json(true, JsonRequestBehavior.AllowGet);
			}

			return Json(false, JsonRequestBehavior.AllowGet);
		}
	}
}
