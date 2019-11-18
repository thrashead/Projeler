using System.Web.Mvc;
using System.Collections.Generic;
using TDLibrary;
using Repository.FilesModel;
using Repository.UsersModel;

namespace HumanResources.Areas.Ajax.Controllers
{
	public class FilesController : Controller
	{
		readonly Files model = new Files();
		readonly Users curUser = AppTools.User;

		[HttpGet]
		public JsonResult Index(int? id)
		{
			if (!curUser.HasRight("Files"))
				return Json(null, JsonRequestBehavior.AllowGet);

			return Json(model.List(id, null, false), JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult Insert([System.Web.Http.FromBody] Files table)
		{
			if (!curUser.HasRight("Files", "i"))
				return Json(null);

			bool result = model.Insert(table);

			if (result)
			{
				curUser.Log(table, "i", "Dosya");

				return Json(table);
			}
			else
			{
				table.Mesaj = "Kayıt eklenemedi.";
			}

			table = (Files)model.Insert(table, null);

			return Json(table);
		}

		[HttpPost]
		public JsonResult InsertUpload([System.Web.Http.FromBody] Files table)
		{
			if (!curUser.HasRight("Files", "i"))
				return Json(null);

			List<Uploader> files = Uploader.UploadFiles(false);

			foreach (var item in files)
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
			if (!curUser.HasRight("Files", "u"))
				return Json(null, JsonRequestBehavior.AllowGet);

			return Json(model.Update(id), JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult Update([System.Web.Http.FromBody] Files table)
		{
			if (!curUser.HasRight("Files", "u"))
				return Json(null);

			if (table.FileUrlHasFile)
			{
				try
				{
					System.IO.File.Delete(Server.MapPath("~/" + AppMgr.UploadPath.Replace(AppMgr.MainPath, "") + "/" + table.OldFileUrl));
				}
				catch
				{
					table.Mesaj = "Eski (" + table.OldFileUrl + ") dosyası silinemedi.";

					return Json(table);
				}
			}

			bool result = model.Update(table);

			if (result)
			{
				curUser.Log(table, "u", "Dosya");

				return Json(table);
			}
			else
			{
				table.Mesaj = "Kayıt düzenlenemedi.";
			}

			table = (Files)model.Update(table.ID, table);

			return Json(table);
		}

		[HttpPost]
		public JsonResult UpdateUpload([System.Web.Http.FromBody] Files table)
		{
			if (!curUser.HasRight("Files", "u"))
				return Json(null);

			List<Uploader> files = Uploader.UploadFiles(false);

			foreach (var item in files)
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
			if (!curUser.HasRight("Files", "c"))
				return Json(false, JsonRequestBehavior.AllowGet);

			try
			{
				Files table = (Files)model.Select(id, false);

				System.IO.File.Copy(Server.MapPath("~/" + AppMgr.UploadPath.Replace(AppMgr.MainPath, "") + "/" + table.FileUrl), Server.MapPath("~/" + AppMgr.UploadPath.Replace(AppMgr.MainPath, "") + "/Kopya_" + table.FileUrl));
			}
			catch
			{
				return Json(false, JsonRequestBehavior.AllowGet);
			}

			bool result = model.Copy(id);

			if (result)
			{
				curUser.Log(id, "c", "Dosya");

				return Json(true, JsonRequestBehavior.AllowGet);
			}

			return Json(false, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult Delete(int? id)
		{
			if (!curUser.HasRight("Files", "d"))
				return Json(false, JsonRequestBehavior.AllowGet);

			try
			{
				Files table = (Files)model.Select(id, false);

				System.IO.File.Delete(Server.MapPath("~/" + AppMgr.UploadPath.Replace(AppMgr.MainPath, "") + "/" + table.FileUrl));
			}
			catch
			{
				return Json(false, JsonRequestBehavior.AllowGet);
			}

			bool result = model.Delete(id);

			if (result)
			{
				curUser.Log(id, "d", "Dosya");

				return Json(true, JsonRequestBehavior.AllowGet);
			}

			return Json(false, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult Remove(int? id)
		{
			if (!curUser.HasRight("Files", "r"))
				return Json(false, JsonRequestBehavior.AllowGet);

			try
			{
				Files table = (Files)model.Select(id, false);

				System.IO.File.Move(Server.MapPath("~/" + AppMgr.UploadPath.Replace(AppMgr.MainPath, "") + "/" + table.FileUrl), Server.MapPath("~/" + AppMgr.UploadPath.Replace(AppMgr.MainPath, "") + "/Deleted/" + table.FileUrl));
			}
			catch
			{
				return Json(false, JsonRequestBehavior.AllowGet);
			}

			bool result = model.Remove(id);

			if (result)
			{
				curUser.Log(id, "r", "Dosya");

				return Json(true, JsonRequestBehavior.AllowGet);
			}

			return Json(false, JsonRequestBehavior.AllowGet);
		}
	}
}
