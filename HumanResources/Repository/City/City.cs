using System;
using System.Collections.Generic;
using System.Web;
using System.Linq;
using HumanResources.Data;
using TDLibrary;

namespace Repository.CityModel
{
	public class City : ICity
	{
		readonly HumanResourcesEntities entity = new HumanResourcesEntities();

		#region Model

		public int ID { get; set; }
		public string Name { get; set; }
		public int Code { get; set; }
		public bool Active { get; set; }
		public bool Show { get; set; }
		public int? Order { get; set; }

		public string Mesaj { get; set; }

		#endregion

		#region Methods

		public List<City> List(int? id = null, int? top = null, bool relation = true)
		{
			List<City> table;

			List<usp_CitySelect_Result> tableTemp;
			List<usp_CitySelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_CitySelect(id).ToList();
				table = tableTemp.ChangeModelList<City, usp_CitySelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_CitySelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<City, usp_CitySelectTop_Result>();
			}

			return table;
		}

		public List<City> ListAll(bool relation = true)
		{
			List<City> table;

			List<usp_CitySelectAll_Result> tableTemp;

			tableTemp = entity.usp_CitySelectAll().ToList();
			table = tableTemp.ChangeModelList<City, usp_CitySelectAll_Result>();

			return table;
		}

		public ICity Select(int? id, bool relation = true)
		{
			usp_CitySelectTop_Result tableTemp = entity.usp_CitySelectTop(id, 1).FirstOrDefault();
			City table = tableTemp.ChangeModel<City>();

			return table;
		}

		public List<City> SelectByCode(int? code, bool relation = true)
		{
			List<usp_CitySelectByCode_Result> tableTemp = entity.usp_CitySelectByCode(code).ToList();
			List<City> table = tableTemp.ChangeModelList<City, usp_CitySelectByCode_Result>();

			return table;
		}

		public ICity Insert(ICity table = null, bool? none = null)
		{
			if (table == null)
				table = new City();

			return table;
		}

		public bool Insert(ICity table)
		{
			var result = entity.usp_CityInsert(table.Name, table.Code, table.Active, table.Show, table.Order).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ICity Update(int? id = null, ICity table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}

			return table;
		}

		public bool Update(ICity table)
		{
			var result = entity.usp_CityUpdate(table.ID, table.Name, table.Code, table.Active, table.Show, table.Order).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_CityCopy(id).FirstOrDefault();

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
				entity.usp_CityDelete(id);

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
