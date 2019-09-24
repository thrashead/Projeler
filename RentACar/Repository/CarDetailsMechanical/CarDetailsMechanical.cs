using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACar.Data;
using TDLibrary;

namespace Repository.CarDetailsMechanicalModel
{
	public class CarDetailsMechanical : ICarDetailsMechanical
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public CarDetailsMechanical()
		{
			CarFeatsEngineTypeList = new List<SelectListItem>();
			CarFeatsFuelTypeList = new List<SelectListItem>();
			CarFeatsGearsTypeList = new List<SelectListItem>();
			CarsList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int CarID { get; set; }
		public int EngineTypeID { get; set; }
		public int? EngineCapacity { get; set; }
		public int? Cylinders { get; set; }
		public int? Horsepower { get; set; }
		public int FuelTypeID { get; set; }
		public int? FuelCapacity { get; set; }
		public string CityFuelEconomy { get; set; }
		public string HighwayFuelEconomy { get; set; }
		public int GearsTypeID { get; set; }
		public int? GearsNumber { get; set; }
		public int Drivetrain { get; set; }

		public string Mesaj { get; set; }

		public List<SelectListItem> CarFeatsEngineTypeList { get; set; }
		public List<SelectListItem> CarFeatsFuelTypeList { get; set; }
		public List<SelectListItem> CarFeatsGearsTypeList { get; set; }
		public List<SelectListItem> CarsList { get; set; }

		public string CarFeatsEngineTypeAdi { get; set; }
		public string CarFeatsFuelTypeAdi { get; set; }
		public string CarFeatsGearsTypeAdi { get; set; }
		public string CarsAdi { get; set; }

		#endregion

		#region Methods

		public List<CarDetailsMechanical> List(int? id = null, int? top = null, bool relation = true)
		{
			List<CarDetailsMechanical> table;

			List<usp_CarDetailsMechanicalLinkedSelect_Result> tableTemp;
			List<usp_CarDetailsMechanicalSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_CarDetailsMechanicalLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<CarDetailsMechanical, usp_CarDetailsMechanicalLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_CarDetailsMechanicalSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<CarDetailsMechanical, usp_CarDetailsMechanicalSelectTop_Result>();
			}

			if (relation)
			{
				foreach(CarDetailsMechanical item in table)
				{
					List<usp_CarFeatsEngineTypeSelect_Result> tableCarFeatsEngineType = entity.usp_CarFeatsEngineTypeSelect(null).ToList();
					item.CarFeatsEngineTypeList = tableCarFeatsEngineType.ToSelectList<usp_CarFeatsEngineTypeSelect_Result, SelectListItem>("ID", "Title", item.EngineTypeID);

					List<usp_CarFeatsFuelTypeSelect_Result> tableCarFeatsFuelType = entity.usp_CarFeatsFuelTypeSelect(null).ToList();
					item.CarFeatsFuelTypeList = tableCarFeatsFuelType.ToSelectList<usp_CarFeatsFuelTypeSelect_Result, SelectListItem>("ID", "Title", item.FuelTypeID);

					List<usp_CarFeatsGearsTypeSelect_Result> tableCarFeatsGearsType = entity.usp_CarFeatsGearsTypeSelect(null).ToList();
					item.CarFeatsGearsTypeList = tableCarFeatsGearsType.ToSelectList<usp_CarFeatsGearsTypeSelect_Result, SelectListItem>("ID", "Title", item.GearsTypeID);

					List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
					item.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", item.CarID);
				}
			}

			return table;
		}

		public List<CarDetailsMechanical> ListAll(int? id = null, bool relation = true)
		{
			List<CarDetailsMechanical> table;

			List<usp_CarDetailsMechanicalSelectAll_Result> tableTemp;

			tableTemp = entity.usp_CarDetailsMechanicalSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<CarDetailsMechanical, usp_CarDetailsMechanicalSelectAll_Result>();

			if (relation)
			{
				foreach(CarDetailsMechanical item in table)
				{
					List<usp_CarFeatsEngineTypeSelect_Result> tableCarFeatsEngineType = entity.usp_CarFeatsEngineTypeSelect(null).ToList();
					item.CarFeatsEngineTypeList = tableCarFeatsEngineType.ToSelectList<usp_CarFeatsEngineTypeSelect_Result, SelectListItem>("ID", "Title", item.EngineTypeID);

					List<usp_CarFeatsFuelTypeSelect_Result> tableCarFeatsFuelType = entity.usp_CarFeatsFuelTypeSelect(null).ToList();
					item.CarFeatsFuelTypeList = tableCarFeatsFuelType.ToSelectList<usp_CarFeatsFuelTypeSelect_Result, SelectListItem>("ID", "Title", item.FuelTypeID);

					List<usp_CarFeatsGearsTypeSelect_Result> tableCarFeatsGearsType = entity.usp_CarFeatsGearsTypeSelect(null).ToList();
					item.CarFeatsGearsTypeList = tableCarFeatsGearsType.ToSelectList<usp_CarFeatsGearsTypeSelect_Result, SelectListItem>("ID", "Title", item.GearsTypeID);

					List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
					item.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", item.CarID);
				}
			}

			return table;
		}

		public ICarDetailsMechanical Select(int? id, bool relation = true)
		{
			usp_CarDetailsMechanicalSelectTop_Result tableTemp = entity.usp_CarDetailsMechanicalSelectTop(id, 1).FirstOrDefault();
			CarDetailsMechanical table = tableTemp.ChangeModel<CarDetailsMechanical>();

			if (relation)
			{
				List<usp_CarFeatsEngineTypeSelect_Result> tableCarFeatsEngineType = entity.usp_CarFeatsEngineTypeSelect(null).ToList();
				table.CarFeatsEngineTypeList = tableCarFeatsEngineType.ToSelectList<usp_CarFeatsEngineTypeSelect_Result, SelectListItem>("ID", "Title", table.EngineTypeID);

				List<usp_CarFeatsFuelTypeSelect_Result> tableCarFeatsFuelType = entity.usp_CarFeatsFuelTypeSelect(null).ToList();
				table.CarFeatsFuelTypeList = tableCarFeatsFuelType.ToSelectList<usp_CarFeatsFuelTypeSelect_Result, SelectListItem>("ID", "Title", table.FuelTypeID);

				List<usp_CarFeatsGearsTypeSelect_Result> tableCarFeatsGearsType = entity.usp_CarFeatsGearsTypeSelect(null).ToList();
				table.CarFeatsGearsTypeList = tableCarFeatsGearsType.ToSelectList<usp_CarFeatsGearsTypeSelect_Result, SelectListItem>("ID", "Title", table.GearsTypeID);

				List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
				table.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", table.CarID);
			}

			return table;
		}

		public ICarDetailsMechanical Insert(ICarDetailsMechanical table = null, int? engineTypeID = null, int? fuelTypeID = null, int? gearsTypeID = null, int? carID = null)
		{
			if (table == null)
				table = new CarDetailsMechanical();

			List<usp_CarFeatsEngineTypeSelect_Result> tableCarFeatsEngineType = entity.usp_CarFeatsEngineTypeSelect(null).ToList();
			table.CarFeatsEngineTypeList = tableCarFeatsEngineType.ToSelectList<usp_CarFeatsEngineTypeSelect_Result, SelectListItem>("ID",  "Title", engineTypeID);

			List<usp_CarFeatsFuelTypeSelect_Result> tableCarFeatsFuelType = entity.usp_CarFeatsFuelTypeSelect(null).ToList();
			table.CarFeatsFuelTypeList = tableCarFeatsFuelType.ToSelectList<usp_CarFeatsFuelTypeSelect_Result, SelectListItem>("ID",  "Title", fuelTypeID);

			List<usp_CarFeatsGearsTypeSelect_Result> tableCarFeatsGearsType = entity.usp_CarFeatsGearsTypeSelect(null).ToList();
			table.CarFeatsGearsTypeList = tableCarFeatsGearsType.ToSelectList<usp_CarFeatsGearsTypeSelect_Result, SelectListItem>("ID",  "Title", gearsTypeID);

			List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
			table.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID",  "Title", carID);

			return table;
		}

		public bool Insert(ICarDetailsMechanical table)
		{
			var result = entity.usp_CarDetailsMechanicalInsert(table.CarID, table.EngineTypeID, table.EngineCapacity, table.Cylinders, table.Horsepower, table.FuelTypeID, table.FuelCapacity, table.CityFuelEconomy, table.HighwayFuelEconomy, table.GearsTypeID, table.GearsNumber, table.Drivetrain).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ICarDetailsMechanical Update(int? id = null, ICarDetailsMechanical table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_CarFeatsEngineTypeSelect_Result> tableCarFeatsEngineType = entity.usp_CarFeatsEngineTypeSelect(null).ToList();
				table.CarFeatsEngineTypeList = tableCarFeatsEngineType.ToSelectList<usp_CarFeatsEngineTypeSelect_Result, SelectListItem>("ID", "Title", table.EngineTypeID);

				List<usp_CarFeatsFuelTypeSelect_Result> tableCarFeatsFuelType = entity.usp_CarFeatsFuelTypeSelect(null).ToList();
				table.CarFeatsFuelTypeList = tableCarFeatsFuelType.ToSelectList<usp_CarFeatsFuelTypeSelect_Result, SelectListItem>("ID", "Title", table.FuelTypeID);

				List<usp_CarFeatsGearsTypeSelect_Result> tableCarFeatsGearsType = entity.usp_CarFeatsGearsTypeSelect(null).ToList();
				table.CarFeatsGearsTypeList = tableCarFeatsGearsType.ToSelectList<usp_CarFeatsGearsTypeSelect_Result, SelectListItem>("ID", "Title", table.GearsTypeID);

				List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
				table.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", table.CarID);
			}

			return table;
		}

		public bool Update(ICarDetailsMechanical table)
		{
			var result = entity.usp_CarDetailsMechanicalUpdate(table.ID, table.CarID, table.EngineTypeID, table.EngineCapacity, table.Cylinders, table.Horsepower, table.FuelTypeID, table.FuelCapacity, table.CityFuelEconomy, table.HighwayFuelEconomy, table.GearsTypeID, table.GearsNumber, table.Drivetrain).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_CarDetailsMechanicalCopy(id).FirstOrDefault();

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
				entity.usp_CarDetailsMechanicalDelete(id);

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
