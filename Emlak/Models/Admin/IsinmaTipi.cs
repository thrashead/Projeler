using System;
using System.Collections.Generic;
using System.Linq;
using Emlak.Data;
using TDLibrary;

namespace Models
{
	public class IsinmaTipi
	{
		readonly EmlakEntities entity = new EmlakEntities();

		#region Model

		public IsinmaTipi()
		{
			PropertyDetailsList = new List<EmlakDetay>();
			WarmTypeTList = new List<IsinmaTipiDil>();
		}

		public int ID { get; set; }
		public string Title { get; set; }
		public string Code { get; set; }

		public string Mesaj { get; set; }

		public List<EmlakDetay> PropertyDetailsList { get; set; }
		public List<IsinmaTipiDil> WarmTypeTList { get; set; }

		#endregion

		#region Methods

		public List<IsinmaTipi> List(int? id = null, int? top = null, bool relation = true)
		{
			List<IsinmaTipi> table;

			List<usp_WarmTypeSelect_Result> tableTemp;
			List<usp_WarmTypeSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_WarmTypeSelect(id).ToList();
				table = tableTemp.ChangeModelList<IsinmaTipi, usp_WarmTypeSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_WarmTypeSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<IsinmaTipi, usp_WarmTypeSelectTop_Result>();
			}

			if (relation)
			{
				foreach(IsinmaTipi item in table)
				{
					List<usp_PropertyDetails_WarmTypeByLinkedIDSelect_Result> propertydetailsModelList = entity.usp_PropertyDetails_WarmTypeByLinkedIDSelect(item.ID).ToList();
					item.PropertyDetailsList.AddRange(propertydetailsModelList.ChangeModelList<EmlakDetay, usp_PropertyDetails_WarmTypeByLinkedIDSelect_Result>());

					List<usp_WarmTypeT_WarmTypeByLinkedIDSelect_Result> warmtypetModelList = entity.usp_WarmTypeT_WarmTypeByLinkedIDSelect(item.ID).ToList();
					item.WarmTypeTList.AddRange(warmtypetModelList.ChangeModelList<IsinmaTipiDil, usp_WarmTypeT_WarmTypeByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public List<IsinmaTipi> ListAll(int? id = null, bool relation = true)
		{
			List<IsinmaTipi> table;

			List<usp_WarmTypeSelectAll_Result> tableTemp;

			tableTemp = entity.usp_WarmTypeSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<IsinmaTipi, usp_WarmTypeSelectAll_Result>();

			if (relation)
			{
				foreach(IsinmaTipi item in table)
				{
					List<usp_PropertyDetails_WarmTypeByLinkedIDSelect_Result> propertydetailsModelList = entity.usp_PropertyDetails_WarmTypeByLinkedIDSelect(item.ID).ToList();
					item.PropertyDetailsList.AddRange(propertydetailsModelList.ChangeModelList<EmlakDetay, usp_PropertyDetails_WarmTypeByLinkedIDSelect_Result>());

					List<usp_WarmTypeT_WarmTypeByLinkedIDSelect_Result> warmtypetModelList = entity.usp_WarmTypeT_WarmTypeByLinkedIDSelect(item.ID).ToList();
					item.WarmTypeTList.AddRange(warmtypetModelList.ChangeModelList<IsinmaTipiDil, usp_WarmTypeT_WarmTypeByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public IsinmaTipi Select(int? id, bool relation = true)
		{
			usp_WarmTypeSelectTop_Result tableTemp = entity.usp_WarmTypeSelectTop(id, 1).FirstOrDefault();
			IsinmaTipi table = tableTemp.ChangeModel<IsinmaTipi>();

			if (relation)
			{
				List<usp_PropertyDetails_WarmTypeByLinkedIDSelect_Result> propertydetailsModelList = entity.usp_PropertyDetails_WarmTypeByLinkedIDSelect(id).ToList();
				table.PropertyDetailsList.AddRange(propertydetailsModelList.ChangeModelList<EmlakDetay, usp_PropertyDetails_WarmTypeByLinkedIDSelect_Result>());

				List<usp_WarmTypeT_WarmTypeByLinkedIDSelect_Result> warmtypetModelList = entity.usp_WarmTypeT_WarmTypeByLinkedIDSelect(id).ToList();
				table.WarmTypeTList.AddRange(warmtypetModelList.ChangeModelList<IsinmaTipiDil, usp_WarmTypeT_WarmTypeByLinkedIDSelect_Result>());
			}

			return table;
		}

		public List<IsinmaTipi> SelectByCode(string code, bool relation = true)
		{
			List<usp_WarmTypeSelectByCode_Result> tableTemp = entity.usp_WarmTypeSelectByCode(code).ToList();
			List<IsinmaTipi> table = tableTemp.ChangeModelList<IsinmaTipi, usp_WarmTypeSelectByCode_Result>();

			if (relation)
			{
				foreach(IsinmaTipi item in table)
				{
					List<usp_PropertyDetails_WarmTypeByLinkedIDSelect_Result> propertydetailsModelList = entity.usp_PropertyDetails_WarmTypeByLinkedIDSelect(item.ID).ToList();
					item.PropertyDetailsList.AddRange(propertydetailsModelList.ChangeModelList<EmlakDetay, usp_PropertyDetails_WarmTypeByLinkedIDSelect_Result>());

					List<usp_WarmTypeT_WarmTypeByLinkedIDSelect_Result> warmtypetModelList = entity.usp_WarmTypeT_WarmTypeByLinkedIDSelect(item.ID).ToList();
					item.WarmTypeTList.AddRange(warmtypetModelList.ChangeModelList<IsinmaTipiDil, usp_WarmTypeT_WarmTypeByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public IsinmaTipi Insert(IsinmaTipi table = null, bool? none = null)
		{
			if (table == null)
				table = new IsinmaTipi();

			return table;
		}

		public bool Insert(IsinmaTipi table)
		{
			var result = entity.usp_WarmTypeInsert(table.Title, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public IsinmaTipi Update(int? id = null, IsinmaTipi table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_PropertyDetails_WarmTypeByLinkedIDSelect_Result> propertydetailsModelList = entity.usp_PropertyDetails_WarmTypeByLinkedIDSelect(table.ID).ToList();
				table.PropertyDetailsList.AddRange(propertydetailsModelList.ChangeModelList<EmlakDetay, usp_PropertyDetails_WarmTypeByLinkedIDSelect_Result>());

				List<usp_WarmTypeT_WarmTypeByLinkedIDSelect_Result> warmtypetModelList = entity.usp_WarmTypeT_WarmTypeByLinkedIDSelect(table.ID).ToList();
				table.WarmTypeTList.AddRange(warmtypetModelList.ChangeModelList<IsinmaTipiDil, usp_WarmTypeT_WarmTypeByLinkedIDSelect_Result>());

			}

			return table;
		}

		public bool Update(IsinmaTipi table)
		{
			var result = entity.usp_WarmTypeUpdate(table.ID, table.Title, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_WarmTypeCopy(id).FirstOrDefault();

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
				entity.usp_WarmTypeDelete(id);

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
