using System;
using System.Collections.Generic;
using System.Linq;
using RentACar.Data;
using TDLibrary;
using Repository.CarFeatsModelModel;
using Repository.CarDetailsBasicModel;

namespace Repository.CarFeatsMakeModel
{
	public class CarFeatsMake : ICarFeatsMake
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public CarFeatsMake()
		{
			CarFeatsModelList = new List<ICarFeatsModel>();
			CarDetailsBasicList = new List<ICarDetailsBasic>();
		}

		public int ID { get; set; }
		public string MakeName { get; set; }
		public string Url { get; set; }
		public string PictureUrl { get; set; }

		public string Mesaj { get; set; }

		public string OldPictureUrl { get; set; }

		public bool? HasFile { get; set; }

		public List<ICarFeatsModel> CarFeatsModelList { get; set; }
		public List<ICarDetailsBasic> CarDetailsBasicList { get; set; }

		#endregion

		#region Methods

		public List<CarFeatsMake> List(int? id = null, int? top = null, bool relation = true)
		{
			List<CarFeatsMake> table;

			List<usp_CarFeatsMakeSelect_Result> tableTemp;
			List<usp_CarFeatsMakeSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_CarFeatsMakeSelect(id).ToList();
				table = tableTemp.ChangeModelList<CarFeatsMake, usp_CarFeatsMakeSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_CarFeatsMakeSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<CarFeatsMake, usp_CarFeatsMakeSelectTop_Result>();
			}

			if (relation)
			{
				foreach(CarFeatsMake item in table)
				{
					List<usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect_Result> carfeatsmodelModelList = entity.usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect(item.ID).ToList();
					item.CarFeatsModelList.AddRange(carfeatsmodelModelList.ChangeModelList<CarFeatsModel, usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect_Result>());

					List<usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect_Result> cardetailsbasicModelList = entity.usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect(item.ID).ToList();
					item.CarDetailsBasicList.AddRange(cardetailsbasicModelList.ChangeModelList<CarDetailsBasic, usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public List<CarFeatsMake> ListAll(int? id = null, bool relation = true)
		{
			List<CarFeatsMake> table;

			List<usp_CarFeatsMakeSelectAll_Result> tableTemp;

			tableTemp = entity.usp_CarFeatsMakeSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<CarFeatsMake, usp_CarFeatsMakeSelectAll_Result>();

			if (relation)
			{
				foreach(CarFeatsMake item in table)
				{
					List<usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect_Result> carfeatsmodelModelList = entity.usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect(item.ID).ToList();
					item.CarFeatsModelList.AddRange(carfeatsmodelModelList.ChangeModelList<CarFeatsModel, usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect_Result>());

					List<usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect_Result> cardetailsbasicModelList = entity.usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect(item.ID).ToList();
					item.CarDetailsBasicList.AddRange(cardetailsbasicModelList.ChangeModelList<CarDetailsBasic, usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public ICarFeatsMake Select(int? id, bool relation = true)
		{
			usp_CarFeatsMakeSelectTop_Result tableTemp = entity.usp_CarFeatsMakeSelectTop(id, 1).FirstOrDefault();
			CarFeatsMake table = tableTemp.ChangeModel<CarFeatsMake>();

			if (relation)
			{
				List<usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect_Result> carfeatsmodelModelList = entity.usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect(id).ToList();
				table.CarFeatsModelList.AddRange(carfeatsmodelModelList.ChangeModelList<CarFeatsModel, usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect_Result>());

				List<usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect_Result> cardetailsbasicModelList = entity.usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect(id).ToList();
				table.CarDetailsBasicList.AddRange(cardetailsbasicModelList.ChangeModelList<CarDetailsBasic, usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect_Result>());
			}

			return table;
		}

		public ICarFeatsMake SelectByUrl(string url, bool relation = true)
		{
			usp_CarFeatsMakeSelectByUrl_Result tableTemp = entity.usp_CarFeatsMakeSelectByUrl(url).FirstOrDefault();
			CarFeatsMake table = tableTemp.ChangeModel<CarFeatsMake>();

			if (relation)
			{
				List<usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect_Result> carfeatsmodelModelList = entity.usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect(table.ID).ToList();
				table.CarFeatsModelList.AddRange(carfeatsmodelModelList.ChangeModelList<CarFeatsModel, usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect_Result>());

				List<usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect_Result> cardetailsbasicModelList = entity.usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect(table.ID).ToList();
				table.CarDetailsBasicList.AddRange(cardetailsbasicModelList.ChangeModelList<CarDetailsBasic, usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect_Result>());
			}

			return table;
		}

		public ICarFeatsMake Insert(ICarFeatsMake table = null, bool? none = null)
		{
			if (table == null)
				table = new CarFeatsMake();

			return table;
		}

		public bool Insert(ICarFeatsMake table)
		{
			table.Url = table.MakeName.ToUrl();

			var result = entity.usp_CarFeatsMakeInsert(table.MakeName, table.Url, table.PictureUrl).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ICarFeatsMake Update(int? id = null, ICarFeatsMake table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect_Result> carfeatsmodelModelList = entity.usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect(table.ID).ToList();
				table.CarFeatsModelList.AddRange(carfeatsmodelModelList.ChangeModelList<CarFeatsModel, usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect_Result>());

				List<usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect_Result> cardetailsbasicModelList = entity.usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect(table.ID).ToList();
				table.CarDetailsBasicList.AddRange(cardetailsbasicModelList.ChangeModelList<CarDetailsBasic, usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect_Result>());

			}

			return table;
		}

		public bool Update(ICarFeatsMake table)
		{
			table.Url = table.MakeName.ToUrl();

			var result = entity.usp_CarFeatsMakeUpdate(table.ID, table.MakeName, table.Url, table.PictureUrl).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_CarFeatsMakeCopy(id).FirstOrDefault();

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
				entity.usp_CarFeatsMakeDelete(id);

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
