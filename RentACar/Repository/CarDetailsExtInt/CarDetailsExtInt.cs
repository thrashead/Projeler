using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACar.Data;
using TDLibrary;

namespace Repository.CarDetailsExtIntModel
{
	public class CarDetailsExtInt : ICarDetailsExtInt
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public CarDetailsExtInt()
		{
			CarFeatsBodyTypeList = new List<SelectListItem>();
			CarFeatsDriveTypeList = new List<SelectListItem>();
			CarsList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int CarID { get; set; }
		public int BodyTypeID { get; set; }
		public int DriveTypeID { get; set; }
		public string Tires { get; set; }
		public int? Seats { get; set; }
		public int? Doors { get; set; }
		public string ExtColor { get; set; }
		public string IntColor { get; set; }
		public string TrimStyle { get; set; }

		public string Mesaj { get; set; }

		public List<SelectListItem> CarFeatsBodyTypeList { get; set; }
		public List<SelectListItem> CarFeatsDriveTypeList { get; set; }
		public List<SelectListItem> CarsList { get; set; }

		public string CarFeatsBodyTypeAdi { get; set; }
		public string CarFeatsDriveTypeAdi { get; set; }
		public string CarsAdi { get; set; }

		#endregion

		#region Methods

		public List<CarDetailsExtInt> List(int? id = null, int? top = null, bool relation = true)
		{
			List<CarDetailsExtInt> table;

			List<usp_CarDetailsExtIntLinkedSelect_Result> tableTemp;
			List<usp_CarDetailsExtIntSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_CarDetailsExtIntLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<CarDetailsExtInt, usp_CarDetailsExtIntLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_CarDetailsExtIntSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<CarDetailsExtInt, usp_CarDetailsExtIntSelectTop_Result>();
			}

			if (relation)
			{
				foreach(CarDetailsExtInt item in table)
				{
					List<usp_CarFeatsBodyTypeSelect_Result> tableCarFeatsBodyType = entity.usp_CarFeatsBodyTypeSelect(null).ToList();
					item.CarFeatsBodyTypeList = tableCarFeatsBodyType.ToSelectList<usp_CarFeatsBodyTypeSelect_Result, SelectListItem>("ID", "Title", item.BodyTypeID);

					List<usp_CarFeatsDriveTypeSelect_Result> tableCarFeatsDriveType = entity.usp_CarFeatsDriveTypeSelect(null).ToList();
					item.CarFeatsDriveTypeList = tableCarFeatsDriveType.ToSelectList<usp_CarFeatsDriveTypeSelect_Result, SelectListItem>("ID", "Title", item.DriveTypeID);

					List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
					item.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", item.CarID);
				}
			}

			return table;
		}

		public List<CarDetailsExtInt> ListAll(int? id = null, bool relation = true)
		{
			List<CarDetailsExtInt> table;

			List<usp_CarDetailsExtIntSelectAll_Result> tableTemp;

			tableTemp = entity.usp_CarDetailsExtIntSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<CarDetailsExtInt, usp_CarDetailsExtIntSelectAll_Result>();

			if (relation)
			{
				foreach(CarDetailsExtInt item in table)
				{
					List<usp_CarFeatsBodyTypeSelect_Result> tableCarFeatsBodyType = entity.usp_CarFeatsBodyTypeSelect(null).ToList();
					item.CarFeatsBodyTypeList = tableCarFeatsBodyType.ToSelectList<usp_CarFeatsBodyTypeSelect_Result, SelectListItem>("ID", "Title", item.BodyTypeID);

					List<usp_CarFeatsDriveTypeSelect_Result> tableCarFeatsDriveType = entity.usp_CarFeatsDriveTypeSelect(null).ToList();
					item.CarFeatsDriveTypeList = tableCarFeatsDriveType.ToSelectList<usp_CarFeatsDriveTypeSelect_Result, SelectListItem>("ID", "Title", item.DriveTypeID);

					List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
					item.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", item.CarID);
				}
			}

			return table;
		}

		public ICarDetailsExtInt Select(int? id, bool relation = true)
		{
			usp_CarDetailsExtIntSelectTop_Result tableTemp = entity.usp_CarDetailsExtIntSelectTop(id, 1).FirstOrDefault();
			CarDetailsExtInt table = tableTemp.ChangeModel<CarDetailsExtInt>();

			if (relation)
			{
				List<usp_CarFeatsBodyTypeSelect_Result> tableCarFeatsBodyType = entity.usp_CarFeatsBodyTypeSelect(null).ToList();
				table.CarFeatsBodyTypeList = tableCarFeatsBodyType.ToSelectList<usp_CarFeatsBodyTypeSelect_Result, SelectListItem>("ID", "Title", table.BodyTypeID);

				List<usp_CarFeatsDriveTypeSelect_Result> tableCarFeatsDriveType = entity.usp_CarFeatsDriveTypeSelect(null).ToList();
				table.CarFeatsDriveTypeList = tableCarFeatsDriveType.ToSelectList<usp_CarFeatsDriveTypeSelect_Result, SelectListItem>("ID", "Title", table.DriveTypeID);

				List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
				table.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", table.CarID);
			}

			return table;
		}

		public ICarDetailsExtInt Insert(ICarDetailsExtInt table = null, int? bodyTypeID = null, int? driveTypeID = null, int? carID = null)
		{
			if (table == null)
				table = new CarDetailsExtInt();

			List<usp_CarFeatsBodyTypeSelect_Result> tableCarFeatsBodyType = entity.usp_CarFeatsBodyTypeSelect(null).ToList();
			table.CarFeatsBodyTypeList = tableCarFeatsBodyType.ToSelectList<usp_CarFeatsBodyTypeSelect_Result, SelectListItem>("ID",  "Title", bodyTypeID);

			List<usp_CarFeatsDriveTypeSelect_Result> tableCarFeatsDriveType = entity.usp_CarFeatsDriveTypeSelect(null).ToList();
			table.CarFeatsDriveTypeList = tableCarFeatsDriveType.ToSelectList<usp_CarFeatsDriveTypeSelect_Result, SelectListItem>("ID",  "Title", driveTypeID);

			List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
			table.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID",  "Title", carID);

			return table;
		}

		public bool Insert(ICarDetailsExtInt table)
		{
			var result = entity.usp_CarDetailsExtIntInsert(table.CarID, table.BodyTypeID, table.DriveTypeID, table.Tires, table.Seats, table.Doors, table.ExtColor, table.IntColor, table.TrimStyle).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ICarDetailsExtInt Update(int? id = null, ICarDetailsExtInt table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_CarFeatsBodyTypeSelect_Result> tableCarFeatsBodyType = entity.usp_CarFeatsBodyTypeSelect(null).ToList();
				table.CarFeatsBodyTypeList = tableCarFeatsBodyType.ToSelectList<usp_CarFeatsBodyTypeSelect_Result, SelectListItem>("ID", "Title", table.BodyTypeID);

				List<usp_CarFeatsDriveTypeSelect_Result> tableCarFeatsDriveType = entity.usp_CarFeatsDriveTypeSelect(null).ToList();
				table.CarFeatsDriveTypeList = tableCarFeatsDriveType.ToSelectList<usp_CarFeatsDriveTypeSelect_Result, SelectListItem>("ID", "Title", table.DriveTypeID);

				List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
				table.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", table.CarID);
			}

			return table;
		}

		public bool Update(ICarDetailsExtInt table)
		{
			var result = entity.usp_CarDetailsExtIntUpdate(table.ID, table.CarID, table.BodyTypeID, table.DriveTypeID, table.Tires, table.Seats, table.Doors, table.ExtColor, table.IntColor, table.TrimStyle).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_CarDetailsExtIntCopy(id).FirstOrDefault();

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
				entity.usp_CarDetailsExtIntDelete(id);

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
