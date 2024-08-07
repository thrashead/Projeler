using System;
using System.Collections.Generic;
using System.Linq;
using Emlak.Data;
using TDLibrary;

namespace Models
{
	public class EmlakDurum
	{
		readonly EmlakEntities entity = new EmlakEntities();

		#region Model

		public EmlakDurum()
		{
			PropertyDetailsList = new List<EmlakDetay>();
			PropertyStatusTList = new List<EmlakDurumDil>();
		}

		public int ID { get; set; }
		public string Title { get; set; }
		public string Code { get; set; }

		public string Mesaj { get; set; }

		public List<EmlakDetay> PropertyDetailsList { get; set; }
		public List<EmlakDurumDil> PropertyStatusTList { get; set; }

		#endregion

		#region Methods

		public List<EmlakDurum> List(int? id = null, int? top = null, bool relation = true)
		{
			List<EmlakDurum> table;

			List<usp_PropertyStatusSelect_Result> tableTemp;
			List<usp_PropertyStatusSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_PropertyStatusSelect(id).ToList();
				table = tableTemp.ChangeModelList<EmlakDurum, usp_PropertyStatusSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_PropertyStatusSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<EmlakDurum, usp_PropertyStatusSelectTop_Result>();
			}

			if (relation)
			{
				foreach(EmlakDurum item in table)
				{
					List<usp_PropertyDetails_PropertyStatusByLinkedIDSelect_Result> propertydetailsModelList = entity.usp_PropertyDetails_PropertyStatusByLinkedIDSelect(item.ID).ToList();
					item.PropertyDetailsList.AddRange(propertydetailsModelList.ChangeModelList<EmlakDetay, usp_PropertyDetails_PropertyStatusByLinkedIDSelect_Result>());

					List<usp_PropertyStatusT_PropertyStatusByLinkedIDSelect_Result> propertystatustModelList = entity.usp_PropertyStatusT_PropertyStatusByLinkedIDSelect(item.ID).ToList();
					item.PropertyStatusTList.AddRange(propertystatustModelList.ChangeModelList<EmlakDurumDil, usp_PropertyStatusT_PropertyStatusByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public List<EmlakDurum> ListAll(int? id = null, bool relation = true)
		{
			List<EmlakDurum> table;

			List<usp_PropertyStatusSelectAll_Result> tableTemp;

			tableTemp = entity.usp_PropertyStatusSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<EmlakDurum, usp_PropertyStatusSelectAll_Result>();

			if (relation)
			{
				foreach(EmlakDurum item in table)
				{
					List<usp_PropertyDetails_PropertyStatusByLinkedIDSelect_Result> propertydetailsModelList = entity.usp_PropertyDetails_PropertyStatusByLinkedIDSelect(item.ID).ToList();
					item.PropertyDetailsList.AddRange(propertydetailsModelList.ChangeModelList<EmlakDetay, usp_PropertyDetails_PropertyStatusByLinkedIDSelect_Result>());

					List<usp_PropertyStatusT_PropertyStatusByLinkedIDSelect_Result> propertystatustModelList = entity.usp_PropertyStatusT_PropertyStatusByLinkedIDSelect(item.ID).ToList();
					item.PropertyStatusTList.AddRange(propertystatustModelList.ChangeModelList<EmlakDurumDil, usp_PropertyStatusT_PropertyStatusByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public EmlakDurum Select(int? id, bool relation = true)
		{
			usp_PropertyStatusSelectTop_Result tableTemp = entity.usp_PropertyStatusSelectTop(id, 1).FirstOrDefault();
			EmlakDurum table = tableTemp.ChangeModel<EmlakDurum>();

			if (relation)
			{
				List<usp_PropertyDetails_PropertyStatusByLinkedIDSelect_Result> propertydetailsModelList = entity.usp_PropertyDetails_PropertyStatusByLinkedIDSelect(id).ToList();
				table.PropertyDetailsList.AddRange(propertydetailsModelList.ChangeModelList<EmlakDetay, usp_PropertyDetails_PropertyStatusByLinkedIDSelect_Result>());

				List<usp_PropertyStatusT_PropertyStatusByLinkedIDSelect_Result> propertystatustModelList = entity.usp_PropertyStatusT_PropertyStatusByLinkedIDSelect(id).ToList();
				table.PropertyStatusTList.AddRange(propertystatustModelList.ChangeModelList<EmlakDurumDil, usp_PropertyStatusT_PropertyStatusByLinkedIDSelect_Result>());
			}

			return table;
		}

		public List<EmlakDurum> SelectByCode(string code, bool relation = true)
		{
			List<usp_PropertyStatusSelectByCode_Result> tableTemp = entity.usp_PropertyStatusSelectByCode(code).ToList();
			List<EmlakDurum> table = tableTemp.ChangeModelList<EmlakDurum, usp_PropertyStatusSelectByCode_Result>();

			if (relation)
			{
				foreach(EmlakDurum item in table)
				{
					List<usp_PropertyDetails_PropertyStatusByLinkedIDSelect_Result> propertydetailsModelList = entity.usp_PropertyDetails_PropertyStatusByLinkedIDSelect(item.ID).ToList();
					item.PropertyDetailsList.AddRange(propertydetailsModelList.ChangeModelList<EmlakDetay, usp_PropertyDetails_PropertyStatusByLinkedIDSelect_Result>());

					List<usp_PropertyStatusT_PropertyStatusByLinkedIDSelect_Result> propertystatustModelList = entity.usp_PropertyStatusT_PropertyStatusByLinkedIDSelect(item.ID).ToList();
					item.PropertyStatusTList.AddRange(propertystatustModelList.ChangeModelList<EmlakDurumDil, usp_PropertyStatusT_PropertyStatusByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public EmlakDurum Insert(EmlakDurum table = null, bool? none = null)
		{
			if (table == null)
				table = new EmlakDurum();

			return table;
		}

		public bool Insert(EmlakDurum table)
		{
			var result = entity.usp_PropertyStatusInsert(table.Title, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public EmlakDurum Update(int? id = null, EmlakDurum table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_PropertyDetails_PropertyStatusByLinkedIDSelect_Result> propertydetailsModelList = entity.usp_PropertyDetails_PropertyStatusByLinkedIDSelect(table.ID).ToList();
				table.PropertyDetailsList.AddRange(propertydetailsModelList.ChangeModelList<EmlakDetay, usp_PropertyDetails_PropertyStatusByLinkedIDSelect_Result>());

				List<usp_PropertyStatusT_PropertyStatusByLinkedIDSelect_Result> propertystatustModelList = entity.usp_PropertyStatusT_PropertyStatusByLinkedIDSelect(table.ID).ToList();
				table.PropertyStatusTList.AddRange(propertystatustModelList.ChangeModelList<EmlakDurumDil, usp_PropertyStatusT_PropertyStatusByLinkedIDSelect_Result>());

			}

			return table;
		}

		public bool Update(EmlakDurum table)
		{
			var result = entity.usp_PropertyStatusUpdate(table.ID, table.Title, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_PropertyStatusCopy(id).FirstOrDefault();

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
				entity.usp_PropertyStatusDelete(id);

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
