using System.Web.Mvc;
using Repository.UsersModel;

namespace HumanResources.Areas.Ajax.Controllers
{
	public class UsersController : Controller
	{
		readonly Users model = new Users();
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
		public JsonResult Insert([System.Web.Http.FromBody] Users table)
		{
			if (!curUser.HasRight("Users", "i"))
				return Json(null);

			bool result = model.Insert(table);

			if (result)
			{
				curUser.Log(table, "i", "Kullanıcı");

				return Json(table);
			}
			else
			{
				table.Mesaj = "Kayıt eklenemedi.";
			}

			table = (Users)model.Insert(table, table.GroupID);

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
		public JsonResult Update([System.Web.Http.FromBody] Users table)
		{
			if (!curUser.HasRight("Users", "u"))
				return Json(null);

			if (curUser?.ID == table.ID)
			{

				bool result = model.Update(table, curUser.ID);

				if (result)
				{
					curUser.Log(table, "u", "Kullanıcı");
	
					return Json(table);
				}
				else
				{
					table.Mesaj = "Kayıt düzenlenemedi.";
				}
			}
			else
			{
				table.Mesaj = "Sadece kendi kullanıcı bilgilerinizi düzenleyebilirsiniz.";
			}

			table = (Users)model.Update(table.ID, table);

			return Json(table);
		}

		[HttpGet]
		public JsonResult Copy(int id)
		{
			if (!curUser.HasRight("Users", "c") || curUser?.ID == id)
				return Json(false, JsonRequestBehavior.AllowGet);

			bool result = model.Copy(id);

			if (result)
			{
				curUser.Log(id, "c", "Kullanıcı");

				return Json(true, JsonRequestBehavior.AllowGet);
			}

			return Json(false, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult Delete(int? id)
		{
			if (!curUser.HasRight("Users", "d") || curUser?.ID == id)
				return Json(false, JsonRequestBehavior.AllowGet);

			bool result = model.Delete(id);

			if (result)
			{
				curUser.Log(id, "d", "Kullanıcı");

				return Json(true, JsonRequestBehavior.AllowGet);
			}

			return Json(false, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult Remove(int? id)
		{
			if (!curUser.HasRight("Users", "r") || curUser?.ID == id)
				return Json(false, JsonRequestBehavior.AllowGet);

			bool result = model.Remove(id);

			if (result)
			{
				curUser.Log(id, "r", "Kullanıcı");

				return Json(true, JsonRequestBehavior.AllowGet);
			}

			return Json(false, JsonRequestBehavior.AllowGet);
		}

		[HttpGet]
		public JsonResult ChangeGroup(int id)
		{
			if (!curUser.HasRight("Users", "cg"))
				return Json(null, JsonRequestBehavior.AllowGet);

			return Json(model.ChangeGroup(id), JsonRequestBehavior.AllowGet);
		}

		[HttpPost]
		public JsonResult ChangeGroup([System.Web.Http.FromBody] Users table)
		{
			if (!curUser.HasRight("Users", "cg"))
				return Json(null);

			try
			{
				bool result = model.ChangeGroup(table);

				if (result)
				{
					curUser.Log(table, "cg", "Users");

					return Json(table);
				}
				else
					table.Mesaj = "Grup değiştirilemedi.";
			}
			catch
			{
				table.Mesaj = "Grup değiştirilemedi.";
			}

			table = (Users)model.ChangeGroup(table.ID, table);

			return Json(table);
		}
	}
}
