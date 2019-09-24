using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACar.Data;
using TDLibrary;
using Repository.CarsTModel;
using Repository.CarDetailsFeaturesModel;
using Repository.CarDetailsBasicModel;
using Repository.CarDetailsMechanicalModel;
using Repository.CarDetailsExtIntModel;

namespace Repository.CarsModel
{
	public class Cars : ICars
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public Cars()
		{
			CarsTList = new List<ICarsT>();
			CarDetailsFeaturesList = new List<ICarDetailsFeatures>();
			CarDetailsBasicList = new List<ICarDetailsBasic>();
			CarDetailsMechanicalList = new List<ICarDetailsMechanical>();
			CarDetailsExtIntList = new List<ICarDetailsExtInt>();
			CarStatusList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public string Title { get; set; }
		public string PictureUrl { get; set; }
		public int StatusID { get; set; }
		public string Url { get; set; }
		public string Guid { get; set; }

		public string Mesaj { get; set; }

		public string OldPictureUrl { get; set; }

		public bool? HasFile { get; set; }

		public List<ICarsT> CarsTList { get; set; }
		public List<ICarDetailsFeatures> CarDetailsFeaturesList { get; set; }
		public List<ICarDetailsBasic> CarDetailsBasicList { get; set; }
		public List<ICarDetailsMechanical> CarDetailsMechanicalList { get; set; }
		public List<ICarDetailsExtInt> CarDetailsExtIntList { get; set; }

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

					List<usp_CarsT_CarsByLinkedIDSelect_Result> carstModelList = entity.usp_CarsT_CarsByLinkedIDSelect(item.ID).ToList();
					item.CarsTList.AddRange(carstModelList.ChangeModelList<CarsT, usp_CarsT_CarsByLinkedIDSelect_Result>());

					List<usp_CarDetailsFeatures_CarsByLinkedIDSelect_Result> cardetailsfeaturesModelList = entity.usp_CarDetailsFeatures_CarsByLinkedIDSelect(item.ID).ToList();
					item.CarDetailsFeaturesList.AddRange(cardetailsfeaturesModelList.ChangeModelList<CarDetailsFeatures, usp_CarDetailsFeatures_CarsByLinkedIDSelect_Result>());

					List<usp_CarDetailsBasic_CarsByLinkedIDSelect_Result> cardetailsbasicModelList = entity.usp_CarDetailsBasic_CarsByLinkedIDSelect(item.ID).ToList();
					item.CarDetailsBasicList.AddRange(cardetailsbasicModelList.ChangeModelList<CarDetailsBasic, usp_CarDetailsBasic_CarsByLinkedIDSelect_Result>());

					List<usp_CarDetailsMechanical_CarsByLinkedIDSelect_Result> cardetailsmechanicalModelList = entity.usp_CarDetailsMechanical_CarsByLinkedIDSelect(item.ID).ToList();
					item.CarDetailsMechanicalList.AddRange(cardetailsmechanicalModelList.ChangeModelList<CarDetailsMechanical, usp_CarDetailsMechanical_CarsByLinkedIDSelect_Result>());

					List<usp_CarDetailsExtInt_CarsByLinkedIDSelect_Result> cardetailsextintModelList = entity.usp_CarDetailsExtInt_CarsByLinkedIDSelect(item.ID).ToList();
					item.CarDetailsExtIntList.AddRange(cardetailsextintModelList.ChangeModelList<CarDetailsExtInt, usp_CarDetailsExtInt_CarsByLinkedIDSelect_Result>());
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

					List<usp_CarsT_CarsByLinkedIDSelect_Result> carstModelList = entity.usp_CarsT_CarsByLinkedIDSelect(item.ID).ToList();
					item.CarsTList.AddRange(carstModelList.ChangeModelList<CarsT, usp_CarsT_CarsByLinkedIDSelect_Result>());

					List<usp_CarDetailsFeatures_CarsByLinkedIDSelect_Result> cardetailsfeaturesModelList = entity.usp_CarDetailsFeatures_CarsByLinkedIDSelect(item.ID).ToList();
					item.CarDetailsFeaturesList.AddRange(cardetailsfeaturesModelList.ChangeModelList<CarDetailsFeatures, usp_CarDetailsFeatures_CarsByLinkedIDSelect_Result>());

					List<usp_CarDetailsBasic_CarsByLinkedIDSelect_Result> cardetailsbasicModelList = entity.usp_CarDetailsBasic_CarsByLinkedIDSelect(item.ID).ToList();
					item.CarDetailsBasicList.AddRange(cardetailsbasicModelList.ChangeModelList<CarDetailsBasic, usp_CarDetailsBasic_CarsByLinkedIDSelect_Result>());

					List<usp_CarDetailsMechanical_CarsByLinkedIDSelect_Result> cardetailsmechanicalModelList = entity.usp_CarDetailsMechanical_CarsByLinkedIDSelect(item.ID).ToList();
					item.CarDetailsMechanicalList.AddRange(cardetailsmechanicalModelList.ChangeModelList<CarDetailsMechanical, usp_CarDetailsMechanical_CarsByLinkedIDSelect_Result>());

					List<usp_CarDetailsExtInt_CarsByLinkedIDSelect_Result> cardetailsextintModelList = entity.usp_CarDetailsExtInt_CarsByLinkedIDSelect(item.ID).ToList();
					item.CarDetailsExtIntList.AddRange(cardetailsextintModelList.ChangeModelList<CarDetailsExtInt, usp_CarDetailsExtInt_CarsByLinkedIDSelect_Result>());
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

				List<usp_CarsT_CarsByLinkedIDSelect_Result> carstModelList = entity.usp_CarsT_CarsByLinkedIDSelect(id).ToList();
				table.CarsTList.AddRange(carstModelList.ChangeModelList<CarsT, usp_CarsT_CarsByLinkedIDSelect_Result>());

				List<usp_CarDetailsFeatures_CarsByLinkedIDSelect_Result> cardetailsfeaturesModelList = entity.usp_CarDetailsFeatures_CarsByLinkedIDSelect(id).ToList();
				table.CarDetailsFeaturesList.AddRange(cardetailsfeaturesModelList.ChangeModelList<CarDetailsFeatures, usp_CarDetailsFeatures_CarsByLinkedIDSelect_Result>());

				List<usp_CarDetailsBasic_CarsByLinkedIDSelect_Result> cardetailsbasicModelList = entity.usp_CarDetailsBasic_CarsByLinkedIDSelect(id).ToList();
				table.CarDetailsBasicList.AddRange(cardetailsbasicModelList.ChangeModelList<CarDetailsBasic, usp_CarDetailsBasic_CarsByLinkedIDSelect_Result>());

				List<usp_CarDetailsMechanical_CarsByLinkedIDSelect_Result> cardetailsmechanicalModelList = entity.usp_CarDetailsMechanical_CarsByLinkedIDSelect(id).ToList();
				table.CarDetailsMechanicalList.AddRange(cardetailsmechanicalModelList.ChangeModelList<CarDetailsMechanical, usp_CarDetailsMechanical_CarsByLinkedIDSelect_Result>());

				List<usp_CarDetailsExtInt_CarsByLinkedIDSelect_Result> cardetailsextintModelList = entity.usp_CarDetailsExtInt_CarsByLinkedIDSelect(id).ToList();
				table.CarDetailsExtIntList.AddRange(cardetailsextintModelList.ChangeModelList<CarDetailsExtInt, usp_CarDetailsExtInt_CarsByLinkedIDSelect_Result>());
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


				List<usp_CarsT_CarsByLinkedIDSelect_Result> carstModelList = entity.usp_CarsT_CarsByLinkedIDSelect(table.ID).ToList();
				table.CarsTList.AddRange(carstModelList.ChangeModelList<CarsT, usp_CarsT_CarsByLinkedIDSelect_Result>());

				List<usp_CarDetailsFeatures_CarsByLinkedIDSelect_Result> cardetailsfeaturesModelList = entity.usp_CarDetailsFeatures_CarsByLinkedIDSelect(table.ID).ToList();
				table.CarDetailsFeaturesList.AddRange(cardetailsfeaturesModelList.ChangeModelList<CarDetailsFeatures, usp_CarDetailsFeatures_CarsByLinkedIDSelect_Result>());

				List<usp_CarDetailsBasic_CarsByLinkedIDSelect_Result> cardetailsbasicModelList = entity.usp_CarDetailsBasic_CarsByLinkedIDSelect(table.ID).ToList();
				table.CarDetailsBasicList.AddRange(cardetailsbasicModelList.ChangeModelList<CarDetailsBasic, usp_CarDetailsBasic_CarsByLinkedIDSelect_Result>());

				List<usp_CarDetailsMechanical_CarsByLinkedIDSelect_Result> cardetailsmechanicalModelList = entity.usp_CarDetailsMechanical_CarsByLinkedIDSelect(table.ID).ToList();
				table.CarDetailsMechanicalList.AddRange(cardetailsmechanicalModelList.ChangeModelList<CarDetailsMechanical, usp_CarDetailsMechanical_CarsByLinkedIDSelect_Result>());

				List<usp_CarDetailsExtInt_CarsByLinkedIDSelect_Result> cardetailsextintModelList = entity.usp_CarDetailsExtInt_CarsByLinkedIDSelect(table.ID).ToList();
				table.CarDetailsExtIntList.AddRange(cardetailsextintModelList.ChangeModelList<CarDetailsExtInt, usp_CarDetailsExtInt_CarsByLinkedIDSelect_Result>());
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


				List<usp_CarsT_CarsByLinkedIDSelect_Result> carstModelList = entity.usp_CarsT_CarsByLinkedIDSelect(table.ID).ToList();
				table.CarsTList.AddRange(carstModelList.ChangeModelList<CarsT, usp_CarsT_CarsByLinkedIDSelect_Result>());

				List<usp_CarDetailsFeatures_CarsByLinkedIDSelect_Result> cardetailsfeaturesModelList = entity.usp_CarDetailsFeatures_CarsByLinkedIDSelect(table.ID).ToList();
				table.CarDetailsFeaturesList.AddRange(cardetailsfeaturesModelList.ChangeModelList<CarDetailsFeatures, usp_CarDetailsFeatures_CarsByLinkedIDSelect_Result>());

				List<usp_CarDetailsBasic_CarsByLinkedIDSelect_Result> cardetailsbasicModelList = entity.usp_CarDetailsBasic_CarsByLinkedIDSelect(table.ID).ToList();
				table.CarDetailsBasicList.AddRange(cardetailsbasicModelList.ChangeModelList<CarDetailsBasic, usp_CarDetailsBasic_CarsByLinkedIDSelect_Result>());

				List<usp_CarDetailsMechanical_CarsByLinkedIDSelect_Result> cardetailsmechanicalModelList = entity.usp_CarDetailsMechanical_CarsByLinkedIDSelect(table.ID).ToList();
				table.CarDetailsMechanicalList.AddRange(cardetailsmechanicalModelList.ChangeModelList<CarDetailsMechanical, usp_CarDetailsMechanical_CarsByLinkedIDSelect_Result>());

				List<usp_CarDetailsExtInt_CarsByLinkedIDSelect_Result> cardetailsextintModelList = entity.usp_CarDetailsExtInt_CarsByLinkedIDSelect(table.ID).ToList();
				table.CarDetailsExtIntList.AddRange(cardetailsextintModelList.ChangeModelList<CarDetailsExtInt, usp_CarDetailsExtInt_CarsByLinkedIDSelect_Result>());
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

			var result = entity.usp_CarsInsert(table.Title, table.PictureUrl, table.StatusID, table.Url, table.Guid).FirstOrDefault();

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

				List<usp_CarsT_CarsByLinkedIDSelect_Result> carstModelList = entity.usp_CarsT_CarsByLinkedIDSelect(table.ID).ToList();
				table.CarsTList.AddRange(carstModelList.ChangeModelList<CarsT, usp_CarsT_CarsByLinkedIDSelect_Result>());

				List<usp_CarDetailsFeatures_CarsByLinkedIDSelect_Result> cardetailsfeaturesModelList = entity.usp_CarDetailsFeatures_CarsByLinkedIDSelect(table.ID).ToList();
				table.CarDetailsFeaturesList.AddRange(cardetailsfeaturesModelList.ChangeModelList<CarDetailsFeatures, usp_CarDetailsFeatures_CarsByLinkedIDSelect_Result>());

				List<usp_CarDetailsBasic_CarsByLinkedIDSelect_Result> cardetailsbasicModelList = entity.usp_CarDetailsBasic_CarsByLinkedIDSelect(table.ID).ToList();
				table.CarDetailsBasicList.AddRange(cardetailsbasicModelList.ChangeModelList<CarDetailsBasic, usp_CarDetailsBasic_CarsByLinkedIDSelect_Result>());

				List<usp_CarDetailsMechanical_CarsByLinkedIDSelect_Result> cardetailsmechanicalModelList = entity.usp_CarDetailsMechanical_CarsByLinkedIDSelect(table.ID).ToList();
				table.CarDetailsMechanicalList.AddRange(cardetailsmechanicalModelList.ChangeModelList<CarDetailsMechanical, usp_CarDetailsMechanical_CarsByLinkedIDSelect_Result>());

				List<usp_CarDetailsExtInt_CarsByLinkedIDSelect_Result> cardetailsextintModelList = entity.usp_CarDetailsExtInt_CarsByLinkedIDSelect(table.ID).ToList();
				table.CarDetailsExtIntList.AddRange(cardetailsextintModelList.ChangeModelList<CarDetailsExtInt, usp_CarDetailsExtInt_CarsByLinkedIDSelect_Result>());

			}

			return table;
		}

		public bool Update(ICars table)
		{
			table.Url = table.Title.ToUrl();

			var result = entity.usp_CarsUpdate(table.ID, table.Title, table.PictureUrl, table.StatusID, table.Url).FirstOrDefault();

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



		#endregion
	}
}
