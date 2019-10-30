using System;
using System.Collections.Generic;
using System.Linq;
using Emlak.Data;
using TDLibrary;

namespace Models
{
	public class Sehir
	{
		readonly EmlakEntities entity = new EmlakEntities();

		#region Model

		public Sehir()
		{
			PropertyDetailsList = new List<EmlakDetay>();
		}

		public int ID { get; set; }
		public string Title { get; set; }
		public string Code { get; set; }

		public string Mesaj { get; set; }

		public List<EmlakDetay> PropertyDetailsList { get; set; }

		#endregion

		#region Methods

		public List<Sehir> List(int? id = null, int? top = null, bool relation = true)
		{
			List<Sehir> table;

			List<usp_CitySelect_Result> tableTemp;
			List<usp_CitySelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_CitySelect(id).ToList();
				table = tableTemp.ChangeModelList<Sehir, usp_CitySelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_CitySelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<Sehir, usp_CitySelectTop_Result>();
			}

			if (relation)
			{
				foreach(Sehir item in table)
				{
					List<usp_PropertyDetails_CityByLinkedIDSelect_Result> propertydetailsModelList = entity.usp_PropertyDetails_CityByLinkedIDSelect(item.ID).ToList();
					item.PropertyDetailsList.AddRange(propertydetailsModelList.ChangeModelList<EmlakDetay, usp_PropertyDetails_CityByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public List<Sehir> ListAll(int? id = null, bool relation = true)
		{
			List<Sehir> table;

			List<usp_CitySelectAll_Result> tableTemp;

			tableTemp = entity.usp_CitySelectAll(id).ToList();
			table = tableTemp.ChangeModelList<Sehir, usp_CitySelectAll_Result>();

			if (relation)
			{
				foreach(Sehir item in table)
				{
					List<usp_PropertyDetails_CityByLinkedIDSelect_Result> propertydetailsModelList = entity.usp_PropertyDetails_CityByLinkedIDSelect(item.ID).ToList();
					item.PropertyDetailsList.AddRange(propertydetailsModelList.ChangeModelList<EmlakDetay, usp_PropertyDetails_CityByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public Sehir Select(int? id, bool relation = true)
		{
			usp_CitySelectTop_Result tableTemp = entity.usp_CitySelectTop(id, 1).FirstOrDefault();
			Sehir table = tableTemp.ChangeModel<Sehir>();

			if (relation)
			{
				List<usp_PropertyDetails_CityByLinkedIDSelect_Result> propertydetailsModelList = entity.usp_PropertyDetails_CityByLinkedIDSelect(id).ToList();
				table.PropertyDetailsList.AddRange(propertydetailsModelList.ChangeModelList<EmlakDetay, usp_PropertyDetails_CityByLinkedIDSelect_Result>());
			}

			return table;
		}

		public List<Sehir> SelectByCode(string code, bool relation = true)
		{
			List<usp_CitySelectByCode_Result> tableTemp = entity.usp_CitySelectByCode(code).ToList();
			List<Sehir> table = tableTemp.ChangeModelList<Sehir, usp_CitySelectByCode_Result>();

			if (relation)
			{
				foreach(Sehir item in table)
				{
					List<usp_PropertyDetails_CityByLinkedIDSelect_Result> propertydetailsModelList = entity.usp_PropertyDetails_CityByLinkedIDSelect(item.ID).ToList();
					item.PropertyDetailsList.AddRange(propertydetailsModelList.ChangeModelList<EmlakDetay, usp_PropertyDetails_CityByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public Sehir Insert(Sehir table = null, bool? none = null)
		{
			if (table == null)
				table = new Sehir();

			return table;
		}

		public bool Insert(Sehir table)
		{
			var result = entity.usp_CityInsert(table.Title, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public Sehir Update(int? id = null, Sehir table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_PropertyDetails_CityByLinkedIDSelect_Result> propertydetailsModelList = entity.usp_PropertyDetails_CityByLinkedIDSelect(table.ID).ToList();
				table.PropertyDetailsList.AddRange(propertydetailsModelList.ChangeModelList<EmlakDetay, usp_PropertyDetails_CityByLinkedIDSelect_Result>());
			}

			return table;
		}

		public bool Update(Sehir table)
		{
			var result = entity.usp_CityUpdate(table.ID, table.Title, table.Code).FirstOrDefault();

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
