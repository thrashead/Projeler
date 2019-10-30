using System.Web.Mvc;
using System.Collections.Generic;
using TDLibrary;
using Models;

namespace Emlak.Areas.Ajax.Controllers
{
	public class PropertyPicturesController : Controller
	{
		readonly EmlakResim model = new EmlakResim();

		[HttpGet]
		public JsonResult Index(int? id)
		{
			return Json(model.List(id, null, false), JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult Insert()
		{
			return Json(model.Insert(), JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult Insert([System.Web.Http.FromBody] EmlakResim table)
		{
			bool result = model.Insert(table);

			if (result)
			{
				return Json(table);
			}
			else
			{
				table.Mesaj = "Kayıt eklenemedi.";
			}

			table = (EmlakResim)model.Insert(table, table.PropID);

			return Json(table);
		}

		[HttpPost]
		public JsonResult InsertUpload([System.Web.Http.FromBody] EmlakResim table)
		{
			List<Uploader> pictures = Uploader.UploadPictures(false);

			foreach (var item in pictures)
			{
				if (!item.Control)
				{
					table.Mesaj = item.ErrorMessage;

					return Json(table);
				}
			}

			return Json(table);
		}

		[HttpGet]
		public JsonResult Update(int? id)
		{
			return Json(model.Update(id), JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult Update([System.Web.Http.FromBody] EmlakResim table)
		{
			if (table.PictureUrlHasFile)
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
				return Json(table);
			}
			else
			{
				table.Mesaj = "Kayıt düzenlenemedi.";
			}

			table = (EmlakResim)model.Update(table.ID, table);

			return Json(table);
		}

		[HttpPost]
		public JsonResult UpdateUpload([System.Web.Http.FromBody] EmlakResim table)
		{
			List<Uploader> pictures = Uploader.UploadPictures(false);

			foreach (var item in pictures)
			{
				if (item.UploadError != null)
				{
					table.Mesaj = item.ErrorMessage;

					return Json(table);
				}
			}

			return Json(table);
		}

		[HttpGet]
		public JsonResult Copy(int id)
		{
			try
			{
				EmlakResim table = (EmlakResim)model.Select(id, false);

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
				return Json(true, JsonRequestBehavior.AllowGet);
			}

			return Json(false, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult Delete(int? id)
		{
			try
			{
				EmlakResim table = (EmlakResim)model.Select(id, false);

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
				return Json(true, JsonRequestBehavior.AllowGet);
			}

			return Json(false, JsonRequestBehavior.AllowGet);
		}
	}
}
