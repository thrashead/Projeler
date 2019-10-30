using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using Emlak.Data;
using TDLibrary;

namespace Models
{
	public class EmlakOzellik
	{
		readonly EmlakEntities entity = new EmlakEntities();

		#region Model

		public EmlakOzellik()
		{
			PropertyList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int PropID { get; set; }
		public bool BackSide { get; set; }
		public bool Frontage { get; set; }
		public bool NearStreet { get; set; }
		public bool NextSeashore { get; set; }
		public bool NearSea { get; set; }
		public bool Scenic { get; set; }
		public bool Central { get; set; }
		public bool Metro { get; set; }
		public bool NearHighway { get; set; }
		public bool NearTransport { get; set; }
		public bool Elevator { get; set; }
		public bool Garden { get; set; }
		public bool Security { get; set; }
		public bool Booster { get; set; }
		public bool Sheathing { get; set; }
		public bool Generator { get; set; }
		public bool Doorman { get; set; }
		public bool Carpark { get; set; }
		public bool Playground { get; set; }
		public bool PVC { get; set; }
		public bool Insite { get; set; }
		public bool FireEscape { get; set; }
		public bool SwimmingPool { get; set; }
		public bool Alarm { get; set; }
		public bool Balcony { get; set; }
		public bool SteelDoor { get; set; }
		public bool VideoIntercom { get; set; }
		public bool Jacuzzi { get; set; }
		public bool CableTVSatellite { get; set; }
		public bool AirCondition { get; set; }

		public string Mesaj { get; set; }

		public List<SelectListItem> PropertyList { get; set; }

		public string PropertyAdi { get; set; }

		#endregion

		#region Methods

		public List<EmlakOzellik> List(int? id = null, int? top = null, bool relation = true)
		{
			List<EmlakOzellik> table;

			List<usp_PropertyFeaturesLinkedSelect_Result> tableTemp;
			List<usp_PropertyFeaturesSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_PropertyFeaturesLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<EmlakOzellik, usp_PropertyFeaturesLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_PropertyFeaturesSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<EmlakOzellik, usp_PropertyFeaturesSelectTop_Result>();
			}

			if (relation)
			{
				foreach(EmlakOzellik item in table)
				{
					List<usp_PropertySelect_Result> tableProperty = entity.usp_PropertySelect(null).ToList();
					item.PropertyList = tableProperty.ToSelectList<usp_PropertySelect_Result, SelectListItem>("ID", "Title", item.PropID);
				}
			}

			return table;
		}

		public List<EmlakOzellik> ListAll(int? id = null, bool relation = true)
		{
			List<EmlakOzellik> table;

			List<usp_PropertyFeaturesSelectAll_Result> tableTemp;

			tableTemp = entity.usp_PropertyFeaturesSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<EmlakOzellik, usp_PropertyFeaturesSelectAll_Result>();

			if (relation)
			{
				foreach(EmlakOzellik item in table)
				{
					List<usp_PropertySelect_Result> tableProperty = entity.usp_PropertySelect(null).ToList();
					item.PropertyList = tableProperty.ToSelectList<usp_PropertySelect_Result, SelectListItem>("ID", "Title", item.PropID);
				}
			}

			return table;
		}

		public EmlakOzellik Select(int? id, bool relation = true)
		{
			usp_PropertyFeaturesSelectTop_Result tableTemp = entity.usp_PropertyFeaturesSelectTop(id, 1).FirstOrDefault();
			EmlakOzellik table = tableTemp.ChangeModel<EmlakOzellik>();

			if (relation)
			{
				List<usp_PropertySelect_Result> tableProperty = entity.usp_PropertySelect(null).ToList();
				table.PropertyList = tableProperty.ToSelectList<usp_PropertySelect_Result, SelectListItem>("ID", "Title", table.PropID);
			}

			return table;
		}

		public EmlakOzellik Insert(EmlakOzellik table = null, int? propID = null)
		{
			if (table == null)
				table = new EmlakOzellik();

			List<usp_PropertySelect_Result> tableProperty = entity.usp_PropertySelect(null).ToList();
			table.PropertyList = tableProperty.ToSelectList<usp_PropertySelect_Result, SelectListItem>("ID",  "Title", propID);

			return table;
		}

		public bool Insert(EmlakOzellik table)
		{
			var result = entity.usp_PropertyFeaturesInsert(table.PropID, table.BackSide, table.Frontage, table.NearStreet, table.NextSeashore, table.NearSea, table.Scenic, table.Central, table.Metro, table.NearHighway, table.NearTransport, table.Elevator, table.Garden, table.Security, table.Booster, table.Sheathing, table.Generator, table.Doorman, table.Carpark, table.Playground, table.PVC, table.Insite, table.FireEscape, table.SwimmingPool, table.Alarm, table.Balcony, table.SteelDoor, table.VideoIntercom, table.Jacuzzi, table.CableTVSatellite, table.AirCondition).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public EmlakOzellik Update(int? id = null, EmlakOzellik table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_PropertySelect_Result> tableProperty = entity.usp_PropertySelect(null).ToList();
				table.PropertyList = tableProperty.ToSelectList<usp_PropertySelect_Result, SelectListItem>("ID", "Title", table.PropID);
			}

			return table;
		}

		public bool Update(EmlakOzellik table)
		{
			var result = entity.usp_PropertyFeaturesUpdate(table.ID, table.PropID, table.BackSide, table.Frontage, table.NearStreet, table.NextSeashore, table.NearSea, table.Scenic, table.Central, table.Metro, table.NearHighway, table.NearTransport, table.Elevator, table.Garden, table.Security, table.Booster, table.Sheathing, table.Generator, table.Doorman, table.Carpark, table.Playground, table.PVC, table.Insite, table.FireEscape, table.SwimmingPool, table.Alarm, table.Balcony, table.SteelDoor, table.VideoIntercom, table.Jacuzzi, table.CableTVSatellite, table.AirCondition).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_PropertyFeaturesCopy(id).FirstOrDefault();

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
				entity.usp_PropertyFeaturesDelete(id);

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
