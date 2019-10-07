using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACar.Data;
using TDLibrary;

namespace Repository.CarVideosModel
{
	public class CarVideos : ICarVideos
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public CarVideos()
		{
			CarsList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int CarID { get; set; }
		public string VideoUrl { get; set; }
		public string Code { get; set; }

		public string Mesaj { get; set; }

		public List<SelectListItem> CarsList { get; set; }

		public string CarsAdi { get; set; }

		#endregion

		#region Methods

		public List<CarVideos> List(int? id = null, int? top = null, bool relation = true)
		{
			List<CarVideos> table;

			List<usp_CarVideosLinkedSelect_Result> tableTemp;
			List<usp_CarVideosSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_CarVideosLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<CarVideos, usp_CarVideosLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_CarVideosSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<CarVideos, usp_CarVideosSelectTop_Result>();
			}

			if (relation)
			{
				foreach(CarVideos item in table)
				{
					List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
					item.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", item.CarID);
				}
			}

			return table;
		}

		public List<CarVideos> ListAll(int? id = null, bool relation = true)
		{
			List<CarVideos> table;

			List<usp_CarVideosSelectAll_Result> tableTemp;

			tableTemp = entity.usp_CarVideosSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<CarVideos, usp_CarVideosSelectAll_Result>();

			if (relation)
			{
				foreach(CarVideos item in table)
				{
					List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
					item.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", item.CarID);
				}
			}

			return table;
		}

		public ICarVideos Select(int? id, bool relation = true)
		{
			usp_CarVideosSelectTop_Result tableTemp = entity.usp_CarVideosSelectTop(id, 1).FirstOrDefault();
			CarVideos table = tableTemp.ChangeModel<CarVideos>();

			if (relation)
			{
				List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
				table.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", table.CarID);
			}

			return table;
		}

		public List<CarVideos> SelectByCode(string code, bool relation = true)
		{
			List<usp_CarVideosSelectByCode_Result> tableTemp = entity.usp_CarVideosSelectByCode(code).ToList();
			List<CarVideos> table = tableTemp.ChangeModelList<CarVideos, usp_CarVideosSelectByCode_Result>();

			if (relation)
			{
				foreach(CarVideos item in table)
				{
					List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
					item.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", item.CarID);
				}
			}

			return table;
		}

		public ICarVideos Insert(ICarVideos table = null, int? carID = null)
		{
			if (table == null)
				table = new CarVideos();

			List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
			table.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID",  "Title", carID);

			return table;
		}

		public bool Insert(ICarVideos table)
		{
			var result = entity.usp_CarVideosInsert(table.CarID, table.VideoUrl, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ICarVideos Update(int? id = null, ICarVideos table = null)
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

		public bool Update(ICarVideos table)
		{
			var result = entity.usp_CarVideosUpdate(table.ID, table.CarID, table.VideoUrl, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_CarVideosCopy(id).FirstOrDefault();

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
				entity.usp_CarVideosDelete(id);

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
