using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACarMVC.Data;
using TDLibrary;

namespace Repository.CarFeatsEngineTypeTModel
{
	public class CarFeatsEngineTypeT : ICarFeatsEngineTypeT
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public CarFeatsEngineTypeT()
		{
			CarFeatsEngineTypeList = new List<SelectListItem>();
			TranslationList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int EngineTypeID { get; set; }
		public int TransID { get; set; }
		public string Name { get; set; }

		public string Mesaj { get; set; }

		public List<SelectListItem> CarFeatsEngineTypeList { get; set; }
		public List<SelectListItem> TranslationList { get; set; }

		public string CarFeatsEngineTypeAdi { get; set; }
		public string TranslationAdi { get; set; }

		#endregion

		#region Methods

		public List<CarFeatsEngineTypeT> List(int? id = null, int? top = null, bool relation = true)
		{
			List<CarFeatsEngineTypeT> table;

			List<usp_CarFeatsEngineTypeTLinkedSelect_Result> tableTemp;
			List<usp_CarFeatsEngineTypeTSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_CarFeatsEngineTypeTLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<CarFeatsEngineTypeT, usp_CarFeatsEngineTypeTLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_CarFeatsEngineTypeTSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<CarFeatsEngineTypeT, usp_CarFeatsEngineTypeTSelectTop_Result>();
			}

			if (relation)
			{
				foreach(CarFeatsEngineTypeT item in table)
				{
					List<usp_CarFeatsEngineTypeSelect_Result> tableCarFeatsEngineType = entity.usp_CarFeatsEngineTypeSelect(null).ToList();
					item.CarFeatsEngineTypeList = tableCarFeatsEngineType.ToSelectList<usp_CarFeatsEngineTypeSelect_Result, SelectListItem>("ID", "Title", item.EngineTypeID);

					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);
				}
			}

			return table;
		}

		public List<CarFeatsEngineTypeT> ListAll(int? id = null, bool relation = true)
		{
			List<CarFeatsEngineTypeT> table;

			List<usp_CarFeatsEngineTypeTSelectAll_Result> tableTemp;

			tableTemp = entity.usp_CarFeatsEngineTypeTSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<CarFeatsEngineTypeT, usp_CarFeatsEngineTypeTSelectAll_Result>();

			if (relation)
			{
				foreach(CarFeatsEngineTypeT item in table)
				{
					List<usp_CarFeatsEngineTypeSelect_Result> tableCarFeatsEngineType = entity.usp_CarFeatsEngineTypeSelect(null).ToList();
					item.CarFeatsEngineTypeList = tableCarFeatsEngineType.ToSelectList<usp_CarFeatsEngineTypeSelect_Result, SelectListItem>("ID", "Title", item.EngineTypeID);

					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);
				}
			}

			return table;
		}

		public ICarFeatsEngineTypeT Select(int? id, bool relation = true)
		{
			usp_CarFeatsEngineTypeTSelectTop_Result tableTemp = entity.usp_CarFeatsEngineTypeTSelectTop(id, 1).FirstOrDefault();
			CarFeatsEngineTypeT table = tableTemp.ChangeModel<CarFeatsEngineTypeT>();

			if (relation)
			{
				List<usp_CarFeatsEngineTypeSelect_Result> tableCarFeatsEngineType = entity.usp_CarFeatsEngineTypeSelect(null).ToList();
				table.CarFeatsEngineTypeList = tableCarFeatsEngineType.ToSelectList<usp_CarFeatsEngineTypeSelect_Result, SelectListItem>("ID", "Title", table.EngineTypeID);

				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);
			}

			return table;
		}

		public ICarFeatsEngineTypeT Insert(ICarFeatsEngineTypeT table = null, int? engineTypeID = null, int? transID = null)
		{
			if (table == null)
				table = new CarFeatsEngineTypeT();

			List<usp_CarFeatsEngineTypeSelect_Result> tableCarFeatsEngineType = entity.usp_CarFeatsEngineTypeSelect(null).ToList();
			table.CarFeatsEngineTypeList = tableCarFeatsEngineType.ToSelectList<usp_CarFeatsEngineTypeSelect_Result, SelectListItem>("ID",  "Title", engineTypeID);

			List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
			table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID",  "TransName", transID);

			return table;
		}

		public bool Insert(ICarFeatsEngineTypeT table)
		{
			var result = entity.usp_CarFeatsEngineTypeTInsert(table.EngineTypeID, table.TransID, table.Name).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ICarFeatsEngineTypeT Update(int? id = null, ICarFeatsEngineTypeT table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_CarFeatsEngineTypeSelect_Result> tableCarFeatsEngineType = entity.usp_CarFeatsEngineTypeSelect(null).ToList();
				table.CarFeatsEngineTypeList = tableCarFeatsEngineType.ToSelectList<usp_CarFeatsEngineTypeSelect_Result, SelectListItem>("ID", "Title", table.EngineTypeID);

				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);
			}

			return table;
		}

		public bool Update(ICarFeatsEngineTypeT table)
		{
			var result = entity.usp_CarFeatsEngineTypeTUpdate(table.ID, table.EngineTypeID, table.TransID, table.Name).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_CarFeatsEngineTypeTCopy(id).FirstOrDefault();

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
				entity.usp_CarFeatsEngineTypeTDelete(id);

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
