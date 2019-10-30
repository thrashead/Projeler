using System;
using System.Collections.Generic;
using System.Linq;
using Emlak.Data;
using TDLibrary;

namespace Models
{
	public class YakitTipi
	{
		readonly EmlakEntities entity = new EmlakEntities();

		#region Model

		public YakitTipi()
		{
			FuelTypeTList = new List<YakitTipiDil>();
			PropertyDetailsList = new List<EmlakDetay>();
		}

		public int ID { get; set; }
		public string Title { get; set; }
		public string Code { get; set; }

		public string Mesaj { get; set; }

		public List<YakitTipiDil> FuelTypeTList { get; set; }
		public List<EmlakDetay> PropertyDetailsList { get; set; }

		#endregion

		#region Methods

		public List<YakitTipi> List(int? id = null, int? top = null, bool relation = true)
		{
			List<YakitTipi> table;

			List<usp_FuelTypeSelect_Result> tableTemp;
			List<usp_FuelTypeSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_FuelTypeSelect(id).ToList();
				table = tableTemp.ChangeModelList<YakitTipi, usp_FuelTypeSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_FuelTypeSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<YakitTipi, usp_FuelTypeSelectTop_Result>();
			}

			if (relation)
			{
				foreach(YakitTipi item in table)
				{
					List<usp_FuelTypeT_FuelTypeByLinkedIDSelect_Result> fueltypetModelList = entity.usp_FuelTypeT_FuelTypeByLinkedIDSelect(item.ID).ToList();
					item.FuelTypeTList.AddRange(fueltypetModelList.ChangeModelList<YakitTipiDil, usp_FuelTypeT_FuelTypeByLinkedIDSelect_Result>());

					List<usp_PropertyDetails_FuelTypeByLinkedIDSelect_Result> propertydetailsModelList = entity.usp_PropertyDetails_FuelTypeByLinkedIDSelect(item.ID).ToList();
					item.PropertyDetailsList.AddRange(propertydetailsModelList.ChangeModelList<EmlakDetay, usp_PropertyDetails_FuelTypeByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public List<YakitTipi> ListAll(int? id = null, bool relation = true)
		{
			List<YakitTipi> table;

			List<usp_FuelTypeSelectAll_Result> tableTemp;

			tableTemp = entity.usp_FuelTypeSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<YakitTipi, usp_FuelTypeSelectAll_Result>();

			if (relation)
			{
				foreach(YakitTipi item in table)
				{
					List<usp_FuelTypeT_FuelTypeByLinkedIDSelect_Result> fueltypetModelList = entity.usp_FuelTypeT_FuelTypeByLinkedIDSelect(item.ID).ToList();
					item.FuelTypeTList.AddRange(fueltypetModelList.ChangeModelList<YakitTipiDil, usp_FuelTypeT_FuelTypeByLinkedIDSelect_Result>());

					List<usp_PropertyDetails_FuelTypeByLinkedIDSelect_Result> propertydetailsModelList = entity.usp_PropertyDetails_FuelTypeByLinkedIDSelect(item.ID).ToList();
					item.PropertyDetailsList.AddRange(propertydetailsModelList.ChangeModelList<EmlakDetay, usp_PropertyDetails_FuelTypeByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public YakitTipi Select(int? id, bool relation = true)
		{
			usp_FuelTypeSelectTop_Result tableTemp = entity.usp_FuelTypeSelectTop(id, 1).FirstOrDefault();
			YakitTipi table = tableTemp.ChangeModel<YakitTipi>();

			if (relation)
			{
				List<usp_FuelTypeT_FuelTypeByLinkedIDSelect_Result> fueltypetModelList = entity.usp_FuelTypeT_FuelTypeByLinkedIDSelect(id).ToList();
				table.FuelTypeTList.AddRange(fueltypetModelList.ChangeModelList<YakitTipiDil, usp_FuelTypeT_FuelTypeByLinkedIDSelect_Result>());

				List<usp_PropertyDetails_FuelTypeByLinkedIDSelect_Result> propertydetailsModelList = entity.usp_PropertyDetails_FuelTypeByLinkedIDSelect(id).ToList();
				table.PropertyDetailsList.AddRange(propertydetailsModelList.ChangeModelList<EmlakDetay, usp_PropertyDetails_FuelTypeByLinkedIDSelect_Result>());
			}

			return table;
		}

		public List<YakitTipi> SelectByCode(string code, bool relation = true)
		{
			List<usp_FuelTypeSelectByCode_Result> tableTemp = entity.usp_FuelTypeSelectByCode(code).ToList();
			List<YakitTipi> table = tableTemp.ChangeModelList<YakitTipi, usp_FuelTypeSelectByCode_Result>();

			if (relation)
			{
				foreach(YakitTipi item in table)
				{
					List<usp_FuelTypeT_FuelTypeByLinkedIDSelect_Result> fueltypetModelList = entity.usp_FuelTypeT_FuelTypeByLinkedIDSelect(item.ID).ToList();
					item.FuelTypeTList.AddRange(fueltypetModelList.ChangeModelList<YakitTipiDil, usp_FuelTypeT_FuelTypeByLinkedIDSelect_Result>());

					List<usp_PropertyDetails_FuelTypeByLinkedIDSelect_Result> propertydetailsModelList = entity.usp_PropertyDetails_FuelTypeByLinkedIDSelect(item.ID).ToList();
					item.PropertyDetailsList.AddRange(propertydetailsModelList.ChangeModelList<EmlakDetay, usp_PropertyDetails_FuelTypeByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public YakitTipi Insert(YakitTipi table = null, bool? none = null)
		{
			if (table == null)
				table = new YakitTipi();

			return table;
		}

		public bool Insert(YakitTipi table)
		{
			var result = entity.usp_FuelTypeInsert(table.Title, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public YakitTipi Update(int? id = null, YakitTipi table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_FuelTypeT_FuelTypeByLinkedIDSelect_Result> fueltypetModelList = entity.usp_FuelTypeT_FuelTypeByLinkedIDSelect(table.ID).ToList();
				table.FuelTypeTList.AddRange(fueltypetModelList.ChangeModelList<YakitTipiDil, usp_FuelTypeT_FuelTypeByLinkedIDSelect_Result>());

				List<usp_PropertyDetails_FuelTypeByLinkedIDSelect_Result> propertydetailsModelList = entity.usp_PropertyDetails_FuelTypeByLinkedIDSelect(table.ID).ToList();
				table.PropertyDetailsList.AddRange(propertydetailsModelList.ChangeModelList<EmlakDetay, usp_PropertyDetails_FuelTypeByLinkedIDSelect_Result>());

			}

			return table;
		}

		public bool Update(YakitTipi table)
		{
			var result = entity.usp_FuelTypeUpdate(table.ID, table.Title, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_FuelTypeCopy(id).FirstOrDefault();

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
				entity.usp_FuelTypeDelete(id);

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
