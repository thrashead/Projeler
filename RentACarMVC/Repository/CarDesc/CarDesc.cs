using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACarMVC.Data;
using TDLibrary;
using Repository.CarDescTModel;

namespace Repository.CarDescModel
{
	public class CarDesc : ICarDesc
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public CarDesc()
		{
			CarDescTList = new List<ICarDescT>();
			CarsList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int CarID { get; set; }
		public string Title { get; set; }
		public string Code { get; set; }

		public string Mesaj { get; set; }

		public List<ICarDescT> CarDescTList { get; set; }

		public List<SelectListItem> CarsList { get; set; }

		public string CarsAdi { get; set; }

		#endregion

		#region Methods

		public List<CarDesc> List(int? id = null, int? top = null, bool relation = true)
		{
			List<CarDesc> table;

			List<usp_CarDescLinkedSelect_Result> tableTemp;
			List<usp_CarDescSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_CarDescLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<CarDesc, usp_CarDescLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_CarDescSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<CarDesc, usp_CarDescSelectTop_Result>();
			}

			if (relation)
			{
				foreach(CarDesc item in table)
				{
					List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
					item.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", item.CarID);

					List<usp_CarDescT_CarDescByLinkedIDSelect_Result> cardesctModelList = entity.usp_CarDescT_CarDescByLinkedIDSelect(item.ID).ToList();
					item.CarDescTList.AddRange(cardesctModelList.ChangeModelList<CarDescT, usp_CarDescT_CarDescByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public List<CarDesc> ListAll(int? id = null, bool relation = true)
		{
			List<CarDesc> table;

			List<usp_CarDescSelectAll_Result> tableTemp;

			tableTemp = entity.usp_CarDescSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<CarDesc, usp_CarDescSelectAll_Result>();

			if (relation)
			{
				foreach(CarDesc item in table)
				{
					List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
					item.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", item.CarID);

					List<usp_CarDescT_CarDescByLinkedIDSelect_Result> cardesctModelList = entity.usp_CarDescT_CarDescByLinkedIDSelect(item.ID).ToList();
					item.CarDescTList.AddRange(cardesctModelList.ChangeModelList<CarDescT, usp_CarDescT_CarDescByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public ICarDesc Select(int? id, bool relation = true)
		{
			usp_CarDescSelectTop_Result tableTemp = entity.usp_CarDescSelectTop(id, 1).FirstOrDefault();
			CarDesc table = tableTemp.ChangeModel<CarDesc>();

			if (relation)
			{
				List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
				table.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", table.CarID);

				List<usp_CarDescT_CarDescByLinkedIDSelect_Result> cardesctModelList = entity.usp_CarDescT_CarDescByLinkedIDSelect(id).ToList();
				table.CarDescTList.AddRange(cardesctModelList.ChangeModelList<CarDescT, usp_CarDescT_CarDescByLinkedIDSelect_Result>());
			}

			return table;
		}

		public List<CarDesc> SelectByCode(string code, bool relation = true)
		{
			List<usp_CarDescSelectByCode_Result> tableTemp = entity.usp_CarDescSelectByCode(code).ToList();
			List<CarDesc> table = tableTemp.ChangeModelList<CarDesc, usp_CarDescSelectByCode_Result>();

			if (relation)
			{
				foreach(CarDesc item in table)
				{
					List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
					item.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", item.CarID);

					List<usp_CarDescT_CarDescByLinkedIDSelect_Result> cardesctModelList = entity.usp_CarDescT_CarDescByLinkedIDSelect(item.ID).ToList();
					item.CarDescTList.AddRange(cardesctModelList.ChangeModelList<CarDescT, usp_CarDescT_CarDescByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public ICarDesc Insert(ICarDesc table = null, int? carID = null)
		{
			if (table == null)
				table = new CarDesc();

			List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
			table.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID",  "Title", carID);

			return table;
		}

		public bool Insert(ICarDesc table)
		{
			var result = entity.usp_CarDescInsert(table.CarID, table.Title, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ICarDesc Update(int? id = null, ICarDesc table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
				table.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", table.CarID);

				List<usp_CarDescT_CarDescByLinkedIDSelect_Result> cardesctModelList = entity.usp_CarDescT_CarDescByLinkedIDSelect(table.ID).ToList();
				table.CarDescTList.AddRange(cardesctModelList.ChangeModelList<CarDescT, usp_CarDescT_CarDescByLinkedIDSelect_Result>());
			}

			return table;
		}

		public bool Update(ICarDesc table)
		{
			var result = entity.usp_CarDescUpdate(table.ID, table.CarID, table.Title, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_CarDescCopy(id).FirstOrDefault();

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
				entity.usp_CarDescDelete(id);

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
