using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACar.Data;
using TDLibrary;

namespace Repository.CarFeatsDriveTypeTModel
{
	public class CarFeatsDriveTypeT : ICarFeatsDriveTypeT
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public CarFeatsDriveTypeT()
		{
			CarFeatsDriveTypeList = new List<SelectListItem>();
			TranslationList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int DriveTypeID { get; set; }
		public int TransID { get; set; }
		public string Name { get; set; }

		public string Mesaj { get; set; }

		public List<SelectListItem> CarFeatsDriveTypeList { get; set; }
		public List<SelectListItem> TranslationList { get; set; }

		public string CarFeatsDriveTypeAdi { get; set; }
		public string TranslationAdi { get; set; }

		#endregion

		#region Methods

		public List<CarFeatsDriveTypeT> List(int? id = null, int? top = null, bool relation = true)
		{
			List<CarFeatsDriveTypeT> table;

			List<usp_CarFeatsDriveTypeTLinkedSelect_Result> tableTemp;
			List<usp_CarFeatsDriveTypeTSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_CarFeatsDriveTypeTLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<CarFeatsDriveTypeT, usp_CarFeatsDriveTypeTLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_CarFeatsDriveTypeTSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<CarFeatsDriveTypeT, usp_CarFeatsDriveTypeTSelectTop_Result>();
			}

			if (relation)
			{
				foreach(CarFeatsDriveTypeT item in table)
				{
					List<usp_CarFeatsDriveTypeSelect_Result> tableCarFeatsDriveType = entity.usp_CarFeatsDriveTypeSelect(null).ToList();
					item.CarFeatsDriveTypeList = tableCarFeatsDriveType.ToSelectList<usp_CarFeatsDriveTypeSelect_Result, SelectListItem>("ID", "Title", item.DriveTypeID);

					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);
				}
			}

			return table;
		}

		public List<CarFeatsDriveTypeT> ListAll(int? id = null, bool relation = true)
		{
			List<CarFeatsDriveTypeT> table;

			List<usp_CarFeatsDriveTypeTSelectAll_Result> tableTemp;

			tableTemp = entity.usp_CarFeatsDriveTypeTSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<CarFeatsDriveTypeT, usp_CarFeatsDriveTypeTSelectAll_Result>();

			if (relation)
			{
				foreach(CarFeatsDriveTypeT item in table)
				{
					List<usp_CarFeatsDriveTypeSelect_Result> tableCarFeatsDriveType = entity.usp_CarFeatsDriveTypeSelect(null).ToList();
					item.CarFeatsDriveTypeList = tableCarFeatsDriveType.ToSelectList<usp_CarFeatsDriveTypeSelect_Result, SelectListItem>("ID", "Title", item.DriveTypeID);

					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);
				}
			}

			return table;
		}

		public ICarFeatsDriveTypeT Select(int? id, bool relation = true)
		{
			usp_CarFeatsDriveTypeTSelectTop_Result tableTemp = entity.usp_CarFeatsDriveTypeTSelectTop(id, 1).FirstOrDefault();
			CarFeatsDriveTypeT table = tableTemp.ChangeModel<CarFeatsDriveTypeT>();

			if (relation)
			{
				List<usp_CarFeatsDriveTypeSelect_Result> tableCarFeatsDriveType = entity.usp_CarFeatsDriveTypeSelect(null).ToList();
				table.CarFeatsDriveTypeList = tableCarFeatsDriveType.ToSelectList<usp_CarFeatsDriveTypeSelect_Result, SelectListItem>("ID", "Title", table.DriveTypeID);

				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);
			}

			return table;
		}

		public ICarFeatsDriveTypeT Insert(ICarFeatsDriveTypeT table = null, int? driveTypeID = null, int? transID = null)
		{
			if (table == null)
				table = new CarFeatsDriveTypeT();

			List<usp_CarFeatsDriveTypeSelect_Result> tableCarFeatsDriveType = entity.usp_CarFeatsDriveTypeSelect(null).ToList();
			table.CarFeatsDriveTypeList = tableCarFeatsDriveType.ToSelectList<usp_CarFeatsDriveTypeSelect_Result, SelectListItem>("ID",  "Title", driveTypeID);

			List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
			table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID",  "TransName", transID);

			return table;
		}

		public bool Insert(ICarFeatsDriveTypeT table)
		{
			var result = entity.usp_CarFeatsDriveTypeTInsert(table.DriveTypeID, table.TransID, table.Name).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ICarFeatsDriveTypeT Update(int? id = null, ICarFeatsDriveTypeT table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_CarFeatsDriveTypeSelect_Result> tableCarFeatsDriveType = entity.usp_CarFeatsDriveTypeSelect(null).ToList();
				table.CarFeatsDriveTypeList = tableCarFeatsDriveType.ToSelectList<usp_CarFeatsDriveTypeSelect_Result, SelectListItem>("ID", "Title", table.DriveTypeID);

				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);
			}

			return table;
		}

		public bool Update(ICarFeatsDriveTypeT table)
		{
			var result = entity.usp_CarFeatsDriveTypeTUpdate(table.ID, table.DriveTypeID, table.TransID, table.Name).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_CarFeatsDriveTypeTCopy(id).FirstOrDefault();

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
				entity.usp_CarFeatsDriveTypeTDelete(id);

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
