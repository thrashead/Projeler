using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACar.Data;
using TDLibrary;

namespace Repository.CarDetailsBasicModel
{
	public class CarDetailsBasic : ICarDetailsBasic
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public CarDetailsBasic()
		{
			CarsList = new List<SelectListItem>();
			CarFeatsMakeList = new List<SelectListItem>();
			CarStatusList = new List<SelectListItem>();
			CarFeatsModelList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int CarID { get; set; }
		public int MakeID { get; set; }
		public int ModelID { get; set; }
		public int StatusID { get; set; }
		public int? Year { get; set; }
		public int? Price { get; set; }
		public decimal? Width { get; set; }
		public decimal? Height { get; set; }
		public decimal? Length { get; set; }
		public decimal? WheelBase { get; set; }
		public decimal? CargoCapacity { get; set; }
		public int? Mileage { get; set; }

		public string Mesaj { get; set; }

		public List<SelectListItem> CarsList { get; set; }
		public List<SelectListItem> CarFeatsMakeList { get; set; }
		public List<SelectListItem> CarStatusList { get; set; }
		public List<SelectListItem> CarFeatsModelList { get; set; }

		public string CarsAdi { get; set; }
		public string CarFeatsMakeAdi { get; set; }
		public string CarStatusAdi { get; set; }
		public string CarFeatsModelAdi { get; set; }

		#endregion

		#region Methods

		public List<CarDetailsBasic> List(int? id = null, int? top = null, bool relation = true)
		{
			List<CarDetailsBasic> table;

			List<usp_CarDetailsBasicLinkedSelect_Result> tableTemp;
			List<usp_CarDetailsBasicSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_CarDetailsBasicLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<CarDetailsBasic, usp_CarDetailsBasicLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_CarDetailsBasicSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<CarDetailsBasic, usp_CarDetailsBasicSelectTop_Result>();
			}

			if (relation)
			{
				foreach(CarDetailsBasic item in table)
				{
					List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
					item.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", item.CarID);

					List<usp_CarFeatsMakeSelect_Result> tableCarFeatsMake = entity.usp_CarFeatsMakeSelect(null).ToList();
					item.CarFeatsMakeList = tableCarFeatsMake.ToSelectList<usp_CarFeatsMakeSelect_Result, SelectListItem>("ID", "Title", item.MakeID);

					List<usp_CarStatusSelect_Result> tableCarStatus = entity.usp_CarStatusSelect(null).ToList();
					item.CarStatusList = tableCarStatus.ToSelectList<usp_CarStatusSelect_Result, SelectListItem>("ID", "Title", item.StatusID);

					List<usp_CarFeatsModelSelect_Result> tableCarFeatsModel = entity.usp_CarFeatsModelSelect(null).ToList();
					item.CarFeatsModelList = tableCarFeatsModel.ToSelectList<usp_CarFeatsModelSelect_Result, SelectListItem>("ID", "ModelName", item.ModelID);
				}
			}

			return table;
		}

		public List<CarDetailsBasic> ListAll(int? id = null, bool relation = true)
		{
			List<CarDetailsBasic> table;

			List<usp_CarDetailsBasicSelectAll_Result> tableTemp;

			tableTemp = entity.usp_CarDetailsBasicSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<CarDetailsBasic, usp_CarDetailsBasicSelectAll_Result>();

			if (relation)
			{
				foreach(CarDetailsBasic item in table)
				{
					List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
					item.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", item.CarID);

					List<usp_CarFeatsMakeSelect_Result> tableCarFeatsMake = entity.usp_CarFeatsMakeSelect(null).ToList();
					item.CarFeatsMakeList = tableCarFeatsMake.ToSelectList<usp_CarFeatsMakeSelect_Result, SelectListItem>("ID", "Title", item.MakeID);

					List<usp_CarStatusSelect_Result> tableCarStatus = entity.usp_CarStatusSelect(null).ToList();
					item.CarStatusList = tableCarStatus.ToSelectList<usp_CarStatusSelect_Result, SelectListItem>("ID", "Title", item.StatusID);

					List<usp_CarFeatsModelSelect_Result> tableCarFeatsModel = entity.usp_CarFeatsModelSelect(null).ToList();
					item.CarFeatsModelList = tableCarFeatsModel.ToSelectList<usp_CarFeatsModelSelect_Result, SelectListItem>("ID", "ModelName", item.ModelID);
				}
			}

			return table;
		}

		public ICarDetailsBasic Select(int? id, bool relation = true)
		{
			usp_CarDetailsBasicSelectTop_Result tableTemp = entity.usp_CarDetailsBasicSelectTop(id, 1).FirstOrDefault();
			CarDetailsBasic table = tableTemp.ChangeModel<CarDetailsBasic>();

			if (relation)
			{
				List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
				table.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", table.CarID);

				List<usp_CarFeatsMakeSelect_Result> tableCarFeatsMake = entity.usp_CarFeatsMakeSelect(null).ToList();
				table.CarFeatsMakeList = tableCarFeatsMake.ToSelectList<usp_CarFeatsMakeSelect_Result, SelectListItem>("ID", "Title", table.MakeID);

				List<usp_CarStatusSelect_Result> tableCarStatus = entity.usp_CarStatusSelect(null).ToList();
				table.CarStatusList = tableCarStatus.ToSelectList<usp_CarStatusSelect_Result, SelectListItem>("ID", "Title", table.StatusID);

				List<usp_CarFeatsModelSelect_Result> tableCarFeatsModel = entity.usp_CarFeatsModelSelect(null).ToList();
				table.CarFeatsModelList = tableCarFeatsModel.ToSelectList<usp_CarFeatsModelSelect_Result, SelectListItem>("ID", "ModelName", table.ModelID);
			}

			return table;
		}

		public ICarDetailsBasic Insert(ICarDetailsBasic table = null, int? carID = null, int? makeID = null, int? statusID = null, int? modelID = null)
		{
			if (table == null)
				table = new CarDetailsBasic();

			List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
			table.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID",  "Title", carID);

			List<usp_CarFeatsMakeSelect_Result> tableCarFeatsMake = entity.usp_CarFeatsMakeSelect(null).ToList();
			table.CarFeatsMakeList = tableCarFeatsMake.ToSelectList<usp_CarFeatsMakeSelect_Result, SelectListItem>("ID",  "Title", makeID);

			List<usp_CarStatusSelect_Result> tableCarStatus = entity.usp_CarStatusSelect(null).ToList();
			table.CarStatusList = tableCarStatus.ToSelectList<usp_CarStatusSelect_Result, SelectListItem>("ID",  "Title", statusID);

			List<usp_CarFeatsModelSelect_Result> tableCarFeatsModel = entity.usp_CarFeatsModelSelect(null).ToList();
			table.CarFeatsModelList = tableCarFeatsModel.ToSelectList<usp_CarFeatsModelSelect_Result, SelectListItem>("ID",  "ModelName", modelID);

			return table;
		}

		public bool Insert(ICarDetailsBasic table)
		{
			var result = entity.usp_CarDetailsBasicInsert(table.CarID, table.MakeID, table.ModelID, table.StatusID, table.Year, table.Price, table.Width, table.Height, table.Length, table.WheelBase, table.CargoCapacity, table.Mileage).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ICarDetailsBasic Update(int? id = null, ICarDetailsBasic table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
				table.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", table.CarID);

				List<usp_CarFeatsMakeSelect_Result> tableCarFeatsMake = entity.usp_CarFeatsMakeSelect(null).ToList();
				table.CarFeatsMakeList = tableCarFeatsMake.ToSelectList<usp_CarFeatsMakeSelect_Result, SelectListItem>("ID", "Title", table.MakeID);

				List<usp_CarStatusSelect_Result> tableCarStatus = entity.usp_CarStatusSelect(null).ToList();
				table.CarStatusList = tableCarStatus.ToSelectList<usp_CarStatusSelect_Result, SelectListItem>("ID", "Title", table.StatusID);

				List<usp_CarFeatsModelSelect_Result> tableCarFeatsModel = entity.usp_CarFeatsModelSelect(null).ToList();
				table.CarFeatsModelList = tableCarFeatsModel.ToSelectList<usp_CarFeatsModelSelect_Result, SelectListItem>("ID", "ModelName", table.ModelID);
			}

			return table;
		}

		public bool Update(ICarDetailsBasic table)
		{
			var result = entity.usp_CarDetailsBasicUpdate(table.ID, table.CarID, table.MakeID, table.ModelID, table.StatusID, table.Year, table.Price, table.Width, table.Height, table.Length, table.WheelBase, table.CargoCapacity, table.Mileage).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_CarDetailsBasicCopy(id).FirstOrDefault();

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
				entity.usp_CarDetailsBasicDelete(id);

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
