using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACar.Data;
using TDLibrary;

namespace Repository.CarPicturesModel
{
	public class CarPictures : ICarPictures
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public CarPictures()
		{
			CarsList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int CarID { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public string PictureUrl { get; set; }
		public string Code { get; set; }
		public string ShortCode { get; set; }
		public bool IsMainPicture { get; set; }

		public string Mesaj { get; set; }

		public string OldPictureUrl { get; set; }

		public bool? HasFile { get; set; }

		public List<SelectListItem> CarsList { get; set; }

		public string CarsAdi { get; set; }

		#endregion

		#region Methods

		public List<CarPictures> List(int? id = null, int? top = null, bool relation = true)
		{
			List<CarPictures> table;

			List<usp_CarPicturesLinkedSelect_Result> tableTemp;
			List<usp_CarPicturesSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_CarPicturesLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<CarPictures, usp_CarPicturesLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_CarPicturesSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<CarPictures, usp_CarPicturesSelectTop_Result>();
			}

			if (relation)
			{
				foreach(CarPictures item in table)
				{
					List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
					item.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", item.CarID);
				}
			}

			return table;
		}

		public List<CarPictures> ListAll(int? id = null, bool relation = true)
		{
			List<CarPictures> table;

			List<usp_CarPicturesSelectAll_Result> tableTemp;

			tableTemp = entity.usp_CarPicturesSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<CarPictures, usp_CarPicturesSelectAll_Result>();

			if (relation)
			{
				foreach(CarPictures item in table)
				{
					List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
					item.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", item.CarID);
				}
			}

			return table;
		}

		public ICarPictures Select(int? id, bool relation = true)
		{
			usp_CarPicturesSelectTop_Result tableTemp = entity.usp_CarPicturesSelectTop(id, 1).FirstOrDefault();
			CarPictures table = tableTemp.ChangeModel<CarPictures>();

			if (relation)
			{
				List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
				table.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", table.CarID);
			}

			return table;
		}

		public List<CarPictures> SelectByCode(string code, bool relation = true)
		{
			List<usp_CarPicturesSelectByCode_Result> tableTemp = entity.usp_CarPicturesSelectByCode(code).ToList();
			List<CarPictures> table = tableTemp.ChangeModelList<CarPictures, usp_CarPicturesSelectByCode_Result>();

			if (relation)
			{
				foreach(CarPictures item in table)
				{
					List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
					item.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", item.CarID);
				}
			}

			return table;
		}

		public List<CarPictures> SelectByShortCode(string code, bool relation = true)
		{
			List<usp_CarPicturesSelectByShortCode_Result> tableTemp = entity.usp_CarPicturesSelectByShortCode(code).ToList();
			List<CarPictures> table = tableTemp.ChangeModelList<CarPictures, usp_CarPicturesSelectByShortCode_Result>();

			if (relation)
			{
				foreach(CarPictures item in table)
				{
					List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
					item.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", item.CarID);
				}
			}

			return table;
		}

		public ICarPictures Insert(ICarPictures table = null, int? carID = null)
		{
			if (table == null)
				table = new CarPictures();

			List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
			table.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID",  "Title", carID);

			return table;
		}

		public bool Insert(ICarPictures table)
		{
			var result = entity.usp_CarPicturesInsert(table.CarID, table.Title, table.Description, table.PictureUrl, table.Code, table.ShortCode, table.IsMainPicture).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ICarPictures Update(int? id = null, ICarPictures table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
				table.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", table.CarID);
			}

			return table;
		}

		public bool Update(ICarPictures table)
		{
			var result = entity.usp_CarPicturesUpdate(table.ID, table.CarID, table.Title, table.Description, table.PictureUrl, table.Code, table.ShortCode, table.IsMainPicture).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_CarPicturesCopy(id).FirstOrDefault();

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
				entity.usp_CarPicturesDelete(id);

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
