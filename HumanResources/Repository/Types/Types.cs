using System;
using System.Collections.Generic;
using System.Web;
using System.Linq;
using HumanResources.Data;
using TDLibrary;
using Repository.UserGroupTablesModel;

namespace Repository.TypesModel
{
	public class Types : ITypes
	{
		readonly HumanResourcesEntities entity = new HumanResourcesEntities();

		#region Model

		public Types()
		{
			UserGroupTablesList = new List<IUserGroupTables>();
		}

		public int ID { get; set; }
		public string TypeName { get; set; }
		public string Url { get; set; }
		public string TableName { get; set; }
		public bool Show { get; set; }

		public string Mesaj { get; set; }

		public List<IUserGroupTables> UserGroupTablesList { get; set; }

		#endregion

		#region Methods

		public List<Types> List(int? id = null, int? top = null, bool relation = true)
		{
			List<Types> table;

			List<usp_TypesSelect_Result> tableTemp;
			List<usp_TypesSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_TypesSelect(id).ToList();
				table = tableTemp.ChangeModelList<Types, usp_TypesSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_TypesSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<Types, usp_TypesSelectTop_Result>();
			}

			if (relation)
			{
				foreach(Types item in table)
				{
					List<usp_UserGroupTables_TypesByLinkedIDSelect_Result> usergrouptablesModelList = entity.usp_UserGroupTables_TypesByLinkedIDSelect(item.ID).ToList();
					item.UserGroupTablesList.AddRange(usergrouptablesModelList.ChangeModelList<UserGroupTables, usp_UserGroupTables_TypesByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public List<Types> ListAll(bool relation = true)
		{
			List<Types> table;

			List<usp_TypesSelectAll_Result> tableTemp;

			tableTemp = entity.usp_TypesSelectAll().ToList();
			table = tableTemp.ChangeModelList<Types, usp_TypesSelectAll_Result>();

			if (relation)
			{
				foreach(Types item in table)
				{
					List<usp_UserGroupTables_TypesByLinkedIDSelect_Result> usergrouptablesModelList = entity.usp_UserGroupTables_TypesByLinkedIDSelect(item.ID).ToList();
					item.UserGroupTablesList.AddRange(usergrouptablesModelList.ChangeModelList<UserGroupTables, usp_UserGroupTables_TypesByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public ITypes Select(int? id, bool relation = true)
		{
			usp_TypesSelectTop_Result tableTemp = entity.usp_TypesSelectTop(id, 1).FirstOrDefault();
			Types table = tableTemp.ChangeModel<Types>();

			if (relation)
			{
				List<usp_UserGroupTables_TypesByLinkedIDSelect_Result> usergrouptablesModelList = entity.usp_UserGroupTables_TypesByLinkedIDSelect(id).ToList();
				table.UserGroupTablesList.AddRange(usergrouptablesModelList.ChangeModelList<UserGroupTables, usp_UserGroupTables_TypesByLinkedIDSelect_Result>());
			}

			return table;
		}

		public ITypes SelectByUrl(string url, bool relation = true)
		{
			usp_TypesSelectByUrl_Result tableTemp = entity.usp_TypesSelectByUrl(url).FirstOrDefault();
			Types table = tableTemp.ChangeModel<Types>();

			if (relation)
			{
				List<usp_UserGroupTables_TypesByLinkedIDSelect_Result> usergrouptablesModelList = entity.usp_UserGroupTables_TypesByLinkedIDSelect(table.ID).ToList();
				table.UserGroupTablesList.AddRange(usergrouptablesModelList.ChangeModelList<UserGroupTables, usp_UserGroupTables_TypesByLinkedIDSelect_Result>());
			}

			return table;
		}

		public ITypes Insert(ITypes table = null, bool? none = null)
		{
			if (table == null)
				table = new Types();

			return table;
		}

		public bool Insert(ITypes table)
		{
			table.Url = table.TypeName.ToUrl();

			var result = entity.usp_TypesInsert(table.TypeName, table.Url, table.TableName, table.Show).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ITypes Update(int? id = null, ITypes table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_UserGroupTables_TypesByLinkedIDSelect_Result> usergrouptablesModelList = entity.usp_UserGroupTables_TypesByLinkedIDSelect(table.ID).ToList();
				table.UserGroupTablesList.AddRange(usergrouptablesModelList.ChangeModelList<UserGroupTables, usp_UserGroupTables_TypesByLinkedIDSelect_Result>());
			}

			return table;
		}

		public bool Update(ITypes table)
		{
			table.Url = table.TypeName.ToUrl();

			var result = entity.usp_TypesUpdate(table.ID, table.TypeName, table.Url, table.TableName, table.Show).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_TypesCopy(id).FirstOrDefault();

				return result == null ? false : true;
			}
			catch
			{
				return false;
			}
		}

		public bool Delete(int? id = null)
		{
			try
			{
				entity.usp_TypesDelete(id);

				return true;
			}
			catch
			{
				return false;
			}
		}

		#endregion

		#region User Defined


		#endregion
	}
}
