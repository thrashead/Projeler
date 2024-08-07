using System.Web.Mvc;
using Repository.UserGroupProcessModel;
using Repository.UsersModel;

namespace HumanResources.Areas.Ajax.Controllers
{
	public class UserGroupProcessController : Controller
	{
		readonly UserGroupProcess model = new UserGroupProcess();
		readonly Users curUser = AppTools.User;

		[HttpGet]
		public JsonResult Index(int? id)
		{
			if (!curUser.HasRight("Users"))
				return Json(null, JsonRequestBehavior.AllowGet);

			return Json(model.List(id, null, false), JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult Insert([System.Web.Http.FromBody] UserGroupProcess table)
		{
			if (!curUser.HasRight("Users", "i"))
				return Json(null);

			bool result = model.Insert(table);

			if (result)
			{
				curUser.Log(table, "i", "Kullanıcı Grubu İşlemi");

				return Json(table);
			}
			else
			{
				table.Mesaj = "Kayıt eklenemedi.";
			}

			table = (UserGroupProcess)model.Insert(table, null);

			return Json(table);
		}

		[HttpGet]
		public JsonResult Update(int? id)
		{
			if (!curUser.HasRight("Users", "u"))
				return Json(null, JsonRequestBehavior.AllowGet);

			return Json(model.Update(id), JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult Update([System.Web.Http.FromBody] UserGroupProcess table)
		{
			if (!curUser.HasRight("Users", "u"))
				return Json(null);

			bool result = model.Update(table);

			if (result)
			{
				curUser.Log(table, "u", "Kullanıcı Grubu İşlemi");

				return Json(table);
			}
			else
			{
				table.Mesaj = "Kayıt düzenlenemedi.";
			}

			table = (UserGroupProcess)model.Update(table.ID, table);

			return Json(table);
		}

		[HttpGet]
		public JsonResult Copy(int id)
		{
			if (!curUser.HasRight("Users", "c"))
				return Json(false, JsonRequestBehavior.AllowGet);

			bool result = model.Copy(id);

			if (result)
			{
				curUser.Log(id, "c", "Kullanıcı Grubu İşlemi");

				return Json(true, JsonRequestBehavior.AllowGet);
			}

			return Json(false, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult Delete(int? id)
		{
			if (!curUser.HasRight("Users", "d"))
				return Json(false, JsonRequestBehavior.AllowGet);

			bool result = model.Delete(id);

			if (result)
			{
				curUser.Log(id, "d", "Kullanıcı Grubu İşlemi");

				return Json(true, JsonRequestBehavior.AllowGet);
			}

			return Json(false, JsonRequestBehavior.AllowGet);
		}
	}
}
