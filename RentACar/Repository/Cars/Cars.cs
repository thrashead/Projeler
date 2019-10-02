using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACar.Data;
using TDLibrary;
using Repository.CarDetailsExtIntModel;
using Repository.CarDetailsMechanicalModel;
using Repository.CarDetailsBasicModel;
using Repository.CarDetailsFeaturesModel;
using Repository.CarDescModel;
using Models;

namespace Repository.CarsModel
{
	public class Cars : ICars
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public Cars()
		{
			CarDetailsExtIntList = new List<ICarDetailsExtInt>();
			CarDetailsMechanicalList = new List<ICarDetailsMechanical>();
			CarDetailsBasicList = new List<ICarDetailsBasic>();
			CarDetailsFeaturesList = new List<ICarDetailsFeatures>();
			CarDescList = new List<ICarDesc>();
			CarStatusList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public string Title { get; set; }
		public string Code { get; set; }
		public string PictureUrl { get; set; }
		public int StatusID { get; set; }
		public string Url { get; set; }
		public string Guid { get; set; }

		public string Mesaj { get; set; }

		public string OldPictureUrl { get; set; }

		public bool? HasFile { get; set; }

		public List<ICarDetailsExtInt> CarDetailsExtIntList { get; set; }
		public List<ICarDetailsMechanical> CarDetailsMechanicalList { get; set; }
		public List<ICarDetailsBasic> CarDetailsBasicList { get; set; }
		public List<ICarDetailsFeatures> CarDetailsFeaturesList { get; set; }
		public List<ICarDesc> CarDescList { get; set; }

		public List<SelectListItem> CarStatusList { get; set; }

		public string CarStatusAdi { get; set; }

		#endregion

		#region Methods

		public List<Cars> List(int? id = null, int? top = null, bool relation = true)
		{
			List<Cars> table;

			List<usp_CarsLinkedSelect_Result> tableTemp;
			List<usp_CarsSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_CarsLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<Cars, usp_CarsLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_CarsSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<Cars, usp_CarsSelectTop_Result>();
			}

			if (relation)
			{
				foreach(Cars item in table)
				{
					List<usp_CarStatusSelect_Result> tableCarStatus = entity.usp_CarStatusSelect(null).ToList();
					item.CarStatusList = tableCarStatus.ToSelectList<usp_CarStatusSelect_Result, SelectListItem>("ID", "Title", item.StatusID);

					List<usp_CarDesc_CarsByLinkedIDSelect_Result> cardescModelList = entity.usp_CarDesc_CarsByLinkedIDSelect(item.ID).ToList();
					item.CarDescList.AddRange(cardescModelList.ChangeModelList<CarDesc, usp_CarDesc_CarsByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public List<Cars> ListAll(int? id = null, bool relation = true)
		{
			List<Cars> table;

			List<usp_CarsSelectAll_Result> tableTemp;

			tableTemp = entity.usp_CarsSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<Cars, usp_CarsSelectAll_Result>();

			if (relation)
			{
				foreach(Cars item in table)
				{
					List<usp_CarStatusSelect_Result> tableCarStatus = entity.usp_CarStatusSelect(null).ToList();
					item.CarStatusList = tableCarStatus.ToSelectList<usp_CarStatusSelect_Result, SelectListItem>("ID", "Title", item.StatusID);

					List<usp_CarDesc_CarsByLinkedIDSelect_Result> cardescModelList = entity.usp_CarDesc_CarsByLinkedIDSelect(item.ID).ToList();
					item.CarDescList.AddRange(cardescModelList.ChangeModelList<CarDesc, usp_CarDesc_CarsByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public ICars Select(int? id, bool relation = true)
		{
			usp_CarsSelectTop_Result tableTemp = entity.usp_CarsSelectTop(id, 1).FirstOrDefault();
			Cars table = tableTemp.ChangeModel<Cars>();

			if (relation)
			{
				List<usp_CarStatusSelect_Result> tableCarStatus = entity.usp_CarStatusSelect(null).ToList();
				table.CarStatusList = tableCarStatus.ToSelectList<usp_CarStatusSelect_Result, SelectListItem>("ID", "Title", table.StatusID);

				List<usp_CarDesc_CarsByLinkedIDSelect_Result> cardescModelList = entity.usp_CarDesc_CarsByLinkedIDSelect(id).ToList();
				table.CarDescList.AddRange(cardescModelList.ChangeModelList<CarDesc, usp_CarDesc_CarsByLinkedIDSelect_Result>());
			}

			return table;
		}

		public ICars SelectByUrl(string url, bool relation = true)
		{
			usp_CarsSelectByUrl_Result tableTemp = entity.usp_CarsSelectByUrl(url).FirstOrDefault();
			Cars table = tableTemp.ChangeModel<Cars>();

			if (relation)
			{
				List<usp_CarStatusSelect_Result> tableCarStatus = entity.usp_CarStatusSelect(null).ToList();
				table.CarStatusList = tableCarStatus.ToSelectList<usp_CarStatusSelect_Result, SelectListItem>("ID", "Title", table.StatusID);

				List<usp_CarDesc_CarsByLinkedIDSelect_Result> cardescModelList = entity.usp_CarDesc_CarsByLinkedIDSelect(table.ID).ToList();
				table.CarDescList.AddRange(cardescModelList.ChangeModelList<CarDesc, usp_CarDesc_CarsByLinkedIDSelect_Result>());
			}

			return table;
		}

		public ICars SelectByGuid(string guid, bool relation = true)
		{
			usp_CarsSelectByGuid_Result tableTemp = entity.usp_CarsSelectByGuid(guid).FirstOrDefault();
			Cars table = tableTemp.ChangeModel<Cars>();

			if (relation)
			{
				List<usp_CarStatusSelect_Result> tableCarStatus = entity.usp_CarStatusSelect(null).ToList();
				table.CarStatusList = tableCarStatus.ToSelectList<usp_CarStatusSelect_Result, SelectListItem>("ID", "Title", table.StatusID);

				List<usp_CarDesc_CarsByLinkedIDSelect_Result> cardescModelList = entity.usp_CarDesc_CarsByLinkedIDSelect(table.ID).ToList();
				table.CarDescList.AddRange(cardescModelList.ChangeModelList<CarDesc, usp_CarDesc_CarsByLinkedIDSelect_Result>());
			}

			return table;
		}

		public List<Cars> SelectByCode(string code, bool relation = true)
		{
			List<usp_CarsSelectByCode_Result> tableTemp = entity.usp_CarsSelectByCode(code).ToList();
			List<Cars> table = tableTemp.ChangeModelList<Cars, usp_CarsSelectByCode_Result>();

			if (relation)
			{
				foreach(Cars item in table)
				{
					List<usp_CarStatusSelect_Result> tableCarStatus = entity.usp_CarStatusSelect(null).ToList();
					item.CarStatusList = tableCarStatus.ToSelectList<usp_CarStatusSelect_Result, SelectListItem>("ID", "Title", item.StatusID);

					List<usp_CarDesc_CarsByLinkedIDSelect_Result> cardescModelList = entity.usp_CarDesc_CarsByLinkedIDSelect(item.ID).ToList();
					item.CarDescList.AddRange(cardescModelList.ChangeModelList<CarDesc, usp_CarDesc_CarsByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public ICars Insert(ICars table = null, int? statusID = null)
		{
			if (table == null)
				table = new Cars();

			List<usp_CarStatusSelect_Result> tableCarStatus = entity.usp_CarStatusSelect(null).ToList();
			table.CarStatusList = tableCarStatus.ToSelectList<usp_CarStatusSelect_Result, SelectListItem>("ID",  "Title", statusID);

			return table;
		}

		public bool Insert(ICars table)
		{
			table.Url = table.Title.ToUrl();

			table.Guid = Guider.GetGuid(25);

			var result = entity.usp_CarsInsert(table.Title, table.Code, table.PictureUrl, table.StatusID, table.Url, table.Guid).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ICars Update(int? id = null, ICars table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_CarStatusSelect_Result> tableCarStatus = entity.usp_CarStatusSelect(null).ToList();
				table.CarStatusList = tableCarStatus.ToSelectList<usp_CarStatusSelect_Result, SelectListItem>("ID", "Title", table.StatusID);

				List<usp_CarDesc_CarsByLinkedIDSelect_Result> cardescModelList = entity.usp_CarDesc_CarsByLinkedIDSelect(table.ID).ToList();
				table.CarDescList.AddRange(cardescModelList.ChangeModelList<CarDesc, usp_CarDesc_CarsByLinkedIDSelect_Result>());

			}

			return table;
		}

		public bool Update(ICars table)
		{
			table.Url = table.Title.ToUrl();

			var result = entity.usp_CarsUpdate(table.ID, table.Title, table.Code, table.PictureUrl, table.StatusID, table.Url).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_CarsCopy(id).FirstOrDefault();

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
				entity.usp_CarsDelete(id);

				return true;
			}
			catch
			{
				return false;
			}
		}

        #endregion

        #region User Defined

        public List<sp_CarListSelect_Result> CarListSelect(SearchFilters searchFilters = null, int? transID = null, int? top = null)
        {
            List<sp_CarListSelect_Result> table = entity.sp_CarListSelect(searchFilters.Order, transID, top).ToList();

            return table;
        }

        #endregion
    }
}
