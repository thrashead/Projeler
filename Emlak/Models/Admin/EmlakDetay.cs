using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using Emlak.Data;
using TDLibrary;

namespace Models
{
	public class EmlakDetay
	{
		readonly EmlakEntities entity = new EmlakEntities();

		#region Model

		public EmlakDetay()
		{
			WarmTypeList = new List<SelectListItem>();
			CityList = new List<SelectListItem>();
			FuelTypeList = new List<SelectListItem>();
			PropertyList = new List<SelectListItem>();
			PropertyStatusList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int PropID { get; set; }
		public int StatusID { get; set; }
		public string Owner { get; set; }
		public int CityID { get; set; }
		public string County { get; set; }
		public string District { get; set; }
		public int WarmTypeID { get; set; }
		public int FuelTypeID { get; set; }
		public int? Age { get; set; }
		public int? Rooms { get; set; }
		public int? LivingRooms { get; set; }
		public int? Floors { get; set; }
		public int? FloorNumber { get; set; }
		public int? Area { get; set; }
		public string Latitude { get; set; }
		public string Longitude { get; set; }

		public string Mesaj { get; set; }

		public List<SelectListItem> WarmTypeList { get; set; }
		public List<SelectListItem> CityList { get; set; }
		public List<SelectListItem> FuelTypeList { get; set; }
		public List<SelectListItem> PropertyList { get; set; }
		public List<SelectListItem> PropertyStatusList { get; set; }

		public string WarmTypeAdi { get; set; }
		public string CityAdi { get; set; }
		public string FuelTypeAdi { get; set; }
		public string PropertyAdi { get; set; }
		public string PropertyStatusAdi { get; set; }

		#endregion

		#region Methods

		public List<EmlakDetay> List(int? id = null, int? top = null, bool relation = true)
		{
			List<EmlakDetay> table;

			List<usp_PropertyDetailsLinkedSelect_Result> tableTemp;
			List<usp_PropertyDetailsSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_PropertyDetailsLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<EmlakDetay, usp_PropertyDetailsLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_PropertyDetailsSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<EmlakDetay, usp_PropertyDetailsSelectTop_Result>();
			}

			if (relation)
			{
				foreach(EmlakDetay item in table)
				{
					List<usp_WarmTypeSelect_Result> tableWarmType = entity.usp_WarmTypeSelect(null).ToList();
					item.WarmTypeList = tableWarmType.ToSelectList<usp_WarmTypeSelect_Result, SelectListItem>("ID", "Title", item.WarmTypeID);

					List<usp_CitySelect_Result> tableCity = entity.usp_CitySelect(null).ToList();
					item.CityList = tableCity.ToSelectList<usp_CitySelect_Result, SelectListItem>("ID", "Title", item.CityID);

					List<usp_FuelTypeSelect_Result> tableFuelType = entity.usp_FuelTypeSelect(null).ToList();
					item.FuelTypeList = tableFuelType.ToSelectList<usp_FuelTypeSelect_Result, SelectListItem>("ID", "Title", item.FuelTypeID);

					List<usp_PropertySelect_Result> tableProperty = entity.usp_PropertySelect(null).ToList();
					item.PropertyList = tableProperty.ToSelectList<usp_PropertySelect_Result, SelectListItem>("ID", "Title", item.PropID);

					List<usp_PropertyStatusSelect_Result> tablePropertyStatus = entity.usp_PropertyStatusSelect(null).ToList();
					item.PropertyStatusList = tablePropertyStatus.ToSelectList<usp_PropertyStatusSelect_Result, SelectListItem>("ID", "Title", item.StatusID);
				}
			}

			return table;
		}

		public List<EmlakDetay> ListAll(int? id = null, bool relation = true)
		{
			List<EmlakDetay> table;

			List<usp_PropertyDetailsSelectAll_Result> tableTemp;

			tableTemp = entity.usp_PropertyDetailsSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<EmlakDetay, usp_PropertyDetailsSelectAll_Result>();

			if (relation)
			{
				foreach(EmlakDetay item in table)
				{
					List<usp_WarmTypeSelect_Result> tableWarmType = entity.usp_WarmTypeSelect(null).ToList();
					item.WarmTypeList = tableWarmType.ToSelectList<usp_WarmTypeSelect_Result, SelectListItem>("ID", "Title", item.WarmTypeID);

					List<usp_CitySelect_Result> tableCity = entity.usp_CitySelect(null).ToList();
					item.CityList = tableCity.ToSelectList<usp_CitySelect_Result, SelectListItem>("ID", "Title", item.CityID);

					List<usp_FuelTypeSelect_Result> tableFuelType = entity.usp_FuelTypeSelect(null).ToList();
					item.FuelTypeList = tableFuelType.ToSelectList<usp_FuelTypeSelect_Result, SelectListItem>("ID", "Title", item.FuelTypeID);

					List<usp_PropertySelect_Result> tableProperty = entity.usp_PropertySelect(null).ToList();
					item.PropertyList = tableProperty.ToSelectList<usp_PropertySelect_Result, SelectListItem>("ID", "Title", item.PropID);

					List<usp_PropertyStatusSelect_Result> tablePropertyStatus = entity.usp_PropertyStatusSelect(null).ToList();
					item.PropertyStatusList = tablePropertyStatus.ToSelectList<usp_PropertyStatusSelect_Result, SelectListItem>("ID", "Title", item.StatusID);
				}
			}

			return table;
		}

		public EmlakDetay Select(int? id, bool relation = true)
		{
			usp_PropertyDetailsSelectTop_Result tableTemp = entity.usp_PropertyDetailsSelectTop(id, 1).FirstOrDefault();
			EmlakDetay table = tableTemp.ChangeModel<EmlakDetay>();

			if (relation)
			{
				List<usp_WarmTypeSelect_Result> tableWarmType = entity.usp_WarmTypeSelect(null).ToList();
				table.WarmTypeList = tableWarmType.ToSelectList<usp_WarmTypeSelect_Result, SelectListItem>("ID", "Title", table.WarmTypeID);

				List<usp_CitySelect_Result> tableCity = entity.usp_CitySelect(null).ToList();
				table.CityList = tableCity.ToSelectList<usp_CitySelect_Result, SelectListItem>("ID", "Title", table.CityID);

				List<usp_FuelTypeSelect_Result> tableFuelType = entity.usp_FuelTypeSelect(null).ToList();
				table.FuelTypeList = tableFuelType.ToSelectList<usp_FuelTypeSelect_Result, SelectListItem>("ID", "Title", table.FuelTypeID);

				List<usp_PropertySelect_Result> tableProperty = entity.usp_PropertySelect(null).ToList();
				table.PropertyList = tableProperty.ToSelectList<usp_PropertySelect_Result, SelectListItem>("ID", "Title", table.PropID);

				List<usp_PropertyStatusSelect_Result> tablePropertyStatus = entity.usp_PropertyStatusSelect(null).ToList();
				table.PropertyStatusList = tablePropertyStatus.ToSelectList<usp_PropertyStatusSelect_Result, SelectListItem>("ID", "Title", table.StatusID);
			}

			return table;
		}

		public EmlakDetay Insert(EmlakDetay table = null, int? warmTypeID = null, int? cityID = null, int? fuelTypeID = null, int? propID = null, int? statusID = null)
		{
			if (table == null)
				table = new EmlakDetay();

			List<usp_WarmTypeSelect_Result> tableWarmType = entity.usp_WarmTypeSelect(null).ToList();
			table.WarmTypeList = tableWarmType.ToSelectList<usp_WarmTypeSelect_Result, SelectListItem>("ID",  "Title", warmTypeID);

			List<usp_CitySelect_Result> tableCity = entity.usp_CitySelect(null).ToList();
			table.CityList = tableCity.ToSelectList<usp_CitySelect_Result, SelectListItem>("ID",  "Title", cityID);

			List<usp_FuelTypeSelect_Result> tableFuelType = entity.usp_FuelTypeSelect(null).ToList();
			table.FuelTypeList = tableFuelType.ToSelectList<usp_FuelTypeSelect_Result, SelectListItem>("ID",  "Title", fuelTypeID);

			List<usp_PropertySelect_Result> tableProperty = entity.usp_PropertySelect(null).ToList();
			table.PropertyList = tableProperty.ToSelectList<usp_PropertySelect_Result, SelectListItem>("ID",  "Title", propID);

			List<usp_PropertyStatusSelect_Result> tablePropertyStatus = entity.usp_PropertyStatusSelect(null).ToList();
			table.PropertyStatusList = tablePropertyStatus.ToSelectList<usp_PropertyStatusSelect_Result, SelectListItem>("ID",  "Title", statusID);

			return table;
		}

		public bool Insert(EmlakDetay table)
		{
			var result = entity.usp_PropertyDetailsInsert(table.PropID, table.StatusID, table.Owner, table.CityID, table.County, table.District, table.WarmTypeID, table.FuelTypeID, table.Age, table.Rooms, table.LivingRooms, table.Floors, table.FloorNumber, table.Area, table.Latitude, table.Longitude).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public EmlakDetay Update(int? id = null, EmlakDetay table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_WarmTypeSelect_Result> tableWarmType = entity.usp_WarmTypeSelect(null).ToList();
				table.WarmTypeList = tableWarmType.ToSelectList<usp_WarmTypeSelect_Result, SelectListItem>("ID", "Title", table.WarmTypeID);

				List<usp_CitySelect_Result> tableCity = entity.usp_CitySelect(null).ToList();
				table.CityList = tableCity.ToSelectList<usp_CitySelect_Result, SelectListItem>("ID", "Title", table.CityID);

				List<usp_FuelTypeSelect_Result> tableFuelType = entity.usp_FuelTypeSelect(null).ToList();
				table.FuelTypeList = tableFuelType.ToSelectList<usp_FuelTypeSelect_Result, SelectListItem>("ID", "Title", table.FuelTypeID);

				List<usp_PropertySelect_Result> tableProperty = entity.usp_PropertySelect(null).ToList();
				table.PropertyList = tableProperty.ToSelectList<usp_PropertySelect_Result, SelectListItem>("ID", "Title", table.PropID);

				List<usp_PropertyStatusSelect_Result> tablePropertyStatus = entity.usp_PropertyStatusSelect(null).ToList();
				table.PropertyStatusList = tablePropertyStatus.ToSelectList<usp_PropertyStatusSelect_Result, SelectListItem>("ID", "Title", table.StatusID);
			}

			return table;
		}

		public bool Update(EmlakDetay table)
		{
			var result = entity.usp_PropertyDetailsUpdate(table.ID, table.PropID, table.StatusID, table.Owner, table.CityID, table.County, table.District, table.WarmTypeID, table.FuelTypeID, table.Age, table.Rooms, table.LivingRooms, table.Floors, table.FloorNumber, table.Area, table.Latitude, table.Longitude).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_PropertyDetailsCopy(id).FirstOrDefault();

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
				entity.usp_PropertyDetailsDelete(id);

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
