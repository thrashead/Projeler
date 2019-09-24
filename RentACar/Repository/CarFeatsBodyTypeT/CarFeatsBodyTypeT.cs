using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACar.Data;
using TDLibrary;

namespace Repository.CarFeatsBodyTypeTModel
{
	public class CarFeatsBodyTypeT : ICarFeatsBodyTypeT
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public CarFeatsBodyTypeT()
		{
			CarFeatsBodyTypeList = new List<SelectListItem>();
			TranslationList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int BodyTypeID { get; set; }
		public int TransID { get; set; }
		public string Name { get; set; }

		public string Mesaj { get; set; }

		public List<SelectListItem> CarFeatsBodyTypeList { get; set; }
		public List<SelectListItem> TranslationList { get; set; }

		public string CarFeatsBodyTypeAdi { get; set; }
		public string TranslationAdi { get; set; }

		#endregion

		#region Methods

		public List<CarFeatsBodyTypeT> List(int? id = null, int? top = null, bool relation = true)
		{
			List<CarFeatsBodyTypeT> table;

			List<usp_CarFeatsBodyTypeTLinkedSelect_Result> tableTemp;
			List<usp_CarFeatsBodyTypeTSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_CarFeatsBodyTypeTLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<CarFeatsBodyTypeT, usp_CarFeatsBodyTypeTLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_CarFeatsBodyTypeTSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<CarFeatsBodyTypeT, usp_CarFeatsBodyTypeTSelectTop_Result>();
			}

			if (relation)
			{
				foreach(CarFeatsBodyTypeT item in table)
				{
					List<usp_CarFeatsBodyTypeSelect_Result> tableCarFeatsBodyType = entity.usp_CarFeatsBodyTypeSelect(null).ToList();
					item.CarFeatsBodyTypeList = tableCarFeatsBodyType.ToSelectList<usp_CarFeatsBodyTypeSelect_Result, SelectListItem>("ID", "Title", item.BodyTypeID);

					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);
				}
			}

			return table;
		}

		public List<CarFeatsBodyTypeT> ListAll(int? id = null, bool relation = true)
		{
			List<CarFeatsBodyTypeT> table;

			List<usp_CarFeatsBodyTypeTSelectAll_Result> tableTemp;

			tableTemp = entity.usp_CarFeatsBodyTypeTSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<CarFeatsBodyTypeT, usp_CarFeatsBodyTypeTSelectAll_Result>();

			if (relation)
			{
				foreach(CarFeatsBodyTypeT item in table)
				{
					List<usp_CarFeatsBodyTypeSelect_Result> tableCarFeatsBodyType = entity.usp_CarFeatsBodyTypeSelect(null).ToList();
					item.CarFeatsBodyTypeList = tableCarFeatsBodyType.ToSelectList<usp_CarFeatsBodyTypeSelect_Result, SelectListItem>("ID", "Title", item.BodyTypeID);

					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);
				}
			}

			return table;
		}

		public ICarFeatsBodyTypeT Select(int? id, bool relation = true)
		{
			usp_CarFeatsBodyTypeTSelectTop_Result tableTemp = entity.usp_CarFeatsBodyTypeTSelectTop(id, 1).FirstOrDefault();
			CarFeatsBodyTypeT table = tableTemp.ChangeModel<CarFeatsBodyTypeT>();

			if (relation)
			{
				List<usp_CarFeatsBodyTypeSelect_Result> tableCarFeatsBodyType = entity.usp_CarFeatsBodyTypeSelect(null).ToList();
				table.CarFeatsBodyTypeList = tableCarFeatsBodyType.ToSelectList<usp_CarFeatsBodyTypeSelect_Result, SelectListItem>("ID", "Title", table.BodyTypeID);

				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);
			}

			return table;
		}

		public ICarFeatsBodyTypeT Insert(ICarFeatsBodyTypeT table = null, int? bodyTypeID = null, int? transID = null)
		{
			if (table == null)
				table = new CarFeatsBodyTypeT();

			List<usp_CarFeatsBodyTypeSelect_Result> tableCarFeatsBodyType = entity.usp_CarFeatsBodyTypeSelect(null).ToList();
			table.CarFeatsBodyTypeList = tableCarFeatsBodyType.ToSelectList<usp_CarFeatsBodyTypeSelect_Result, SelectListItem>("ID",  "Title", bodyTypeID);

			List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
			table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID",  "TransName", transID);

			return table;
		}

		public bool Insert(ICarFeatsBodyTypeT table)
		{
			var result = entity.usp_CarFeatsBodyTypeTInsert(table.BodyTypeID, table.TransID, table.Name).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ICarFeatsBodyTypeT Update(int? id = null, ICarFeatsBodyTypeT table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_CarFeatsBodyTypeSelect_Result> tableCarFeatsBodyType = entity.usp_CarFeatsBodyTypeSelect(null).ToList();
				table.CarFeatsBodyTypeList = tableCarFeatsBodyType.ToSelectList<usp_CarFeatsBodyTypeSelect_Result, SelectListItem>("ID", "Title", table.BodyTypeID);

				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);
			}

			return table;
		}

		public bool Update(ICarFeatsBodyTypeT table)
		{
			var result = entity.usp_CarFeatsBodyTypeTUpdate(table.ID, table.BodyTypeID, table.TransID, table.Name).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_CarFeatsBodyTypeTCopy(id).FirstOrDefault();

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
				entity.usp_CarFeatsBodyTypeTDelete(id);

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
