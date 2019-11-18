using System.Web.Mvc;
using Repository.UserGroupTablesModel;
using Repository.UsersModel;

namespace HumanResources.Areas.Ajax.Controllers
{
	public class UserGroupTablesController : Controller
	{
		readonly UserGroupTables model = new UserGroupTables();
		readonly Users curUser = AppTools.User;

		[HttpGet]
		public JsonResult Index(int? id)
		{
			if (!curUser.HasRight("Users"))
				return Json(null, JsonRequestBehavior.AllowGet);

			return Json(model.List(id, null, false), JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult Insert()
		{
			if (!curUser.HasRight("Users", "i"))
				return Json(null, JsonRequestBehavior.AllowGet);

			return Json(model.Insert(), JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult Insert([System.Web.Http.FromBody] UserGroupTables table)
		{
			if (!curUser.HasRight("Users", "i"))
				return Json(null);

			bool result = model.Insert(table);

			if (result)
			{
				curUser.Log(table, "i", "Kullanıcı Grubu Tablosu");

				return Json(table);
			}
			else
			{
				table.Mesaj = "Kayıt eklenemedi.";
			}

			table = (UserGroupTables)model.Insert(table, table.TypeID, table.UserGroupID);

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
		public JsonResult Update([System.Web.Http.FromBody] UserGroupTables table)
		{
			if (!curUser.HasRight("Users", "u"))
				return Json(null);

			bool result = model.Update(table);

			if (result)
			{
				curUser.Log(table, "u", "Kullanıcı Grubu Tablosu");

				return Json(table);
			}
			else
			{
				table.Mesaj = "Kayıt düzenlenemedi.";
			}

			table = (UserGroupTables)model.Update(table.ID, table);

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
				curUser.Log(id, "c", "Kullanıcı Grubu Tablosu");

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
				curUser.Log(id, "d", "Kullanıcı Grubu Tablosu");

				return Json(true, JsonRequestBehavior.AllowGet);
			}

			return Json(false, JsonRequestBehavior.AllowGet);
		}
	}
}
