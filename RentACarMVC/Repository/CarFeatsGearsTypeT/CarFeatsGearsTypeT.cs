using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACarMVC.Data;
using TDLibrary;

namespace Repository.CarFeatsGearsTypeTModel
{
	public class CarFeatsGearsTypeT : ICarFeatsGearsTypeT
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public CarFeatsGearsTypeT()
		{
			CarFeatsGearsTypeList = new List<SelectListItem>();
			TranslationList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int GearsTypeID { get; set; }
		public int TransID { get; set; }
		public string Name { get; set; }

		public string Mesaj { get; set; }

		public List<SelectListItem> CarFeatsGearsTypeList { get; set; }
		public List<SelectListItem> TranslationList { get; set; }

		public string CarFeatsGearsTypeAdi { get; set; }
		public string TranslationAdi { get; set; }

		#endregion

		#region Methods

		public List<CarFeatsGearsTypeT> List(int? id = null, int? top = null, bool relation = true)
		{
			List<CarFeatsGearsTypeT> table;

			List<usp_CarFeatsGearsTypeTLinkedSelect_Result> tableTemp;
			List<usp_CarFeatsGearsTypeTSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_CarFeatsGearsTypeTLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<CarFeatsGearsTypeT, usp_CarFeatsGearsTypeTLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_CarFeatsGearsTypeTSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<CarFeatsGearsTypeT, usp_CarFeatsGearsTypeTSelectTop_Result>();
			}

			if (relation)
			{
				foreach(CarFeatsGearsTypeT item in table)
				{
					List<usp_CarFeatsGearsTypeSelect_Result> tableCarFeatsGearsType = entity.usp_CarFeatsGearsTypeSelect(null).ToList();
					item.CarFeatsGearsTypeList = tableCarFeatsGearsType.ToSelectList<usp_CarFeatsGearsTypeSelect_Result, SelectListItem>("ID", "Title", item.GearsTypeID);

					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);
				}
			}

			return table;
		}

		public List<CarFeatsGearsTypeT> ListAll(int? id = null, bool relation = true)
		{
			List<CarFeatsGearsTypeT> table;

			List<usp_CarFeatsGearsTypeTSelectAll_Result> tableTemp;

			tableTemp = entity.usp_CarFeatsGearsTypeTSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<CarFeatsGearsTypeT, usp_CarFeatsGearsTypeTSelectAll_Result>();

			if (relation)
			{
				foreach(CarFeatsGearsTypeT item in table)
				{
					List<usp_CarFeatsGearsTypeSelect_Result> tableCarFeatsGearsType = entity.usp_CarFeatsGearsTypeSelect(null).ToList();
					item.CarFeatsGearsTypeList = tableCarFeatsGearsType.ToSelectList<usp_CarFeatsGearsTypeSelect_Result, SelectListItem>("ID", "Title", item.GearsTypeID);

					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);
				}
			}

			return table;
		}

		public ICarFeatsGearsTypeT Select(int? id, bool relation = true)
		{
			usp_CarFeatsGearsTypeTSelectTop_Result tableTemp = entity.usp_CarFeatsGearsTypeTSelectTop(id, 1).FirstOrDefault();
			CarFeatsGearsTypeT table = tableTemp.ChangeModel<CarFeatsGearsTypeT>();

			if (relation)
			{
				List<usp_CarFeatsGearsTypeSelect_Result> tableCarFeatsGearsType = entity.usp_CarFeatsGearsTypeSelect(null).ToList();
				table.CarFeatsGearsTypeList = tableCarFeatsGearsType.ToSelectList<usp_CarFeatsGearsTypeSelect_Result, SelectListItem>("ID", "Title", table.GearsTypeID);

				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);
			}

			return table;
		}

		public ICarFeatsGearsTypeT Insert(ICarFeatsGearsTypeT table = null, int? gearsTypeID = null, int? transID = null)
		{
			if (table == null)
				table = new CarFeatsGearsTypeT();

			List<usp_CarFeatsGearsTypeSelect_Result> tableCarFeatsGearsType = entity.usp_CarFeatsGearsTypeSelect(null).ToList();
			table.CarFeatsGearsTypeList = tableCarFeatsGearsType.ToSelectList<usp_CarFeatsGearsTypeSelect_Result, SelectListItem>("ID",  "Title", gearsTypeID);

			List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
			table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID",  "TransName", transID);

			return table;
		}

		public bool Insert(ICarFeatsGearsTypeT table)
		{
			var result = entity.usp_CarFeatsGearsTypeTInsert(table.GearsTypeID, table.TransID, table.Name).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ICarFeatsGearsTypeT Update(int? id = null, ICarFeatsGearsTypeT table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_CarFeatsGearsTypeSelect_Result> tableCarFeatsGearsType = entity.usp_CarFeatsGearsTypeSelect(null).ToList();
				table.CarFeatsGearsTypeList = tableCarFeatsGearsType.ToSelectList<usp_CarFeatsGearsTypeSelect_Result, SelectListItem>("ID", "Title", table.GearsTypeID);

				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);
			}

			return table;
		}

		public bool Update(ICarFeatsGearsTypeT table)
		{
			var result = entity.usp_CarFeatsGearsTypeTUpdate(table.ID, table.GearsTypeID, table.TransID, table.Name).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_CarFeatsGearsTypeTCopy(id).FirstOrDefault();

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
				entity.usp_CarFeatsGearsTypeTDelete(id);

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
