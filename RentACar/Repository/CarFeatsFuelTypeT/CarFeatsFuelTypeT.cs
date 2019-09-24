using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACar.Data;
using TDLibrary;

namespace Repository.CarFeatsFuelTypeTModel
{
	public class CarFeatsFuelTypeT : ICarFeatsFuelTypeT
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public CarFeatsFuelTypeT()
		{
			CarFeatsFuelTypeList = new List<SelectListItem>();
			TranslationList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int FuelTypeID { get; set; }
		public int TransID { get; set; }
		public string Name { get; set; }

		public string Mesaj { get; set; }

		public List<SelectListItem> CarFeatsFuelTypeList { get; set; }
		public List<SelectListItem> TranslationList { get; set; }

		public string CarFeatsFuelTypeAdi { get; set; }
		public string TranslationAdi { get; set; }

		#endregion

		#region Methods

		public List<CarFeatsFuelTypeT> List(int? id = null, int? top = null, bool relation = true)
		{
			List<CarFeatsFuelTypeT> table;

			List<usp_CarFeatsFuelTypeTLinkedSelect_Result> tableTemp;
			List<usp_CarFeatsFuelTypeTSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_CarFeatsFuelTypeTLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<CarFeatsFuelTypeT, usp_CarFeatsFuelTypeTLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_CarFeatsFuelTypeTSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<CarFeatsFuelTypeT, usp_CarFeatsFuelTypeTSelectTop_Result>();
			}

			if (relation)
			{
				foreach(CarFeatsFuelTypeT item in table)
				{
					List<usp_CarFeatsFuelTypeSelect_Result> tableCarFeatsFuelType = entity.usp_CarFeatsFuelTypeSelect(null).ToList();
					item.CarFeatsFuelTypeList = tableCarFeatsFuelType.ToSelectList<usp_CarFeatsFuelTypeSelect_Result, SelectListItem>("ID", "Title", item.FuelTypeID);

					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);
				}
			}

			return table;
		}

		public List<CarFeatsFuelTypeT> ListAll(int? id = null, bool relation = true)
		{
			List<CarFeatsFuelTypeT> table;

			List<usp_CarFeatsFuelTypeTSelectAll_Result> tableTemp;

			tableTemp = entity.usp_CarFeatsFuelTypeTSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<CarFeatsFuelTypeT, usp_CarFeatsFuelTypeTSelectAll_Result>();

			if (relation)
			{
				foreach(CarFeatsFuelTypeT item in table)
				{
					List<usp_CarFeatsFuelTypeSelect_Result> tableCarFeatsFuelType = entity.usp_CarFeatsFuelTypeSelect(null).ToList();
					item.CarFeatsFuelTypeList = tableCarFeatsFuelType.ToSelectList<usp_CarFeatsFuelTypeSelect_Result, SelectListItem>("ID", "Title", item.FuelTypeID);

					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);
				}
			}

			return table;
		}

		public ICarFeatsFuelTypeT Select(int? id, bool relation = true)
		{
			usp_CarFeatsFuelTypeTSelectTop_Result tableTemp = entity.usp_CarFeatsFuelTypeTSelectTop(id, 1).FirstOrDefault();
			CarFeatsFuelTypeT table = tableTemp.ChangeModel<CarFeatsFuelTypeT>();

			if (relation)
			{
				List<usp_CarFeatsFuelTypeSelect_Result> tableCarFeatsFuelType = entity.usp_CarFeatsFuelTypeSelect(null).ToList();
				table.CarFeatsFuelTypeList = tableCarFeatsFuelType.ToSelectList<usp_CarFeatsFuelTypeSelect_Result, SelectListItem>("ID", "Title", table.FuelTypeID);

				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);
			}

			return table;
		}

		public ICarFeatsFuelTypeT Insert(ICarFeatsFuelTypeT table = null, int? fuelTypeID = null, int? transID = null)
		{
			if (table == null)
				table = new CarFeatsFuelTypeT();

			List<usp_CarFeatsFuelTypeSelect_Result> tableCarFeatsFuelType = entity.usp_CarFeatsFuelTypeSelect(null).ToList();
			table.CarFeatsFuelTypeList = tableCarFeatsFuelType.ToSelectList<usp_CarFeatsFuelTypeSelect_Result, SelectListItem>("ID",  "Title", fuelTypeID);

			List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
			table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID",  "TransName", transID);

			return table;
		}

		public bool Insert(ICarFeatsFuelTypeT table)
		{
			var result = entity.usp_CarFeatsFuelTypeTInsert(table.FuelTypeID, table.TransID, table.Name).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ICarFeatsFuelTypeT Update(int? id = null, ICarFeatsFuelTypeT table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_CarFeatsFuelTypeSelect_Result> tableCarFeatsFuelType = entity.usp_CarFeatsFuelTypeSelect(null).ToList();
				table.CarFeatsFuelTypeList = tableCarFeatsFuelType.ToSelectList<usp_CarFeatsFuelTypeSelect_Result, SelectListItem>("ID", "Title", table.FuelTypeID);

				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);
			}

			return table;
		}

		public bool Update(ICarFeatsFuelTypeT table)
		{
			var result = entity.usp_CarFeatsFuelTypeTUpdate(table.ID, table.FuelTypeID, table.TransID, table.Name).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_CarFeatsFuelTypeTCopy(id).FirstOrDefault();

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
				entity.usp_CarFeatsFuelTypeTDelete(id);

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
