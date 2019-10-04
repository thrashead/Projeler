using System.Collections.Generic;
using System.Linq;
using RentACar.Data;
using TDLibrary;
using Repository.CarDetailsBasicModel;
using Repository.CarStatusTModel;
using System.Web.Mvc;

namespace Repository.CarStatusModel
{
	public class CarStatus : ICarStatus
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public CarStatus()
		{
			CarDetailsBasicList = new List<ICarDetailsBasic>();
			CarStatusTList = new List<ICarStatusT>();
		}

		public int ID { get; set; }
		public string Title { get; set; }
		public string Code { get; set; }

		public string Mesaj { get; set; }

		public List<ICarDetailsBasic> CarDetailsBasicList { get; set; }
		public List<ICarStatusT> CarStatusTList { get; set; }

		#endregion

		#region Methods

		public List<CarStatus> List(int? id = null, int? top = null, bool relation = true)
		{
			List<CarStatus> table;

			List<usp_CarStatusSelect_Result> tableTemp;
			List<usp_CarStatusSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_CarStatusSelect(id).ToList();
				table = tableTemp.ChangeModelList<CarStatus, usp_CarStatusSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_CarStatusSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<CarStatus, usp_CarStatusSelectTop_Result>();
			}

			if (relation)
			{
				foreach(CarStatus item in table)
				{
					List<usp_CarDetailsBasic_CarStatusByLinkedIDSelect_Result> cardetailsbasicModelList = entity.usp_CarDetailsBasic_CarStatusByLinkedIDSelect(item.ID).ToList();
					item.CarDetailsBasicList.AddRange(cardetailsbasicModelList.ChangeModelList<CarDetailsBasic, usp_CarDetailsBasic_CarStatusByLinkedIDSelect_Result>());

					List<usp_CarStatusT_CarStatusByLinkedIDSelect_Result> carstatustModelList = entity.usp_CarStatusT_CarStatusByLinkedIDSelect(item.ID).ToList();
					item.CarStatusTList.AddRange(carstatustModelList.ChangeModelList<CarStatusT, usp_CarStatusT_CarStatusByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public List<CarStatus> ListAll(int? id = null, bool relation = true)
		{
			List<CarStatus> table;

			List<usp_CarStatusSelectAll_Result> tableTemp;

			tableTemp = entity.usp_CarStatusSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<CarStatus, usp_CarStatusSelectAll_Result>();

			if (relation)
			{
				foreach(CarStatus item in table)
				{
					List<usp_CarDetailsBasic_CarStatusByLinkedIDSelect_Result> cardetailsbasicModelList = entity.usp_CarDetailsBasic_CarStatusByLinkedIDSelect(item.ID).ToList();
					item.CarDetailsBasicList.AddRange(cardetailsbasicModelList.ChangeModelList<CarDetailsBasic, usp_CarDetailsBasic_CarStatusByLinkedIDSelect_Result>());

					List<usp_CarStatusT_CarStatusByLinkedIDSelect_Result> carstatustModelList = entity.usp_CarStatusT_CarStatusByLinkedIDSelect(item.ID).ToList();
					item.CarStatusTList.AddRange(carstatustModelList.ChangeModelList<CarStatusT, usp_CarStatusT_CarStatusByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public ICarStatus Select(int? id, bool relation = true)
		{
			usp_CarStatusSelectTop_Result tableTemp = entity.usp_CarStatusSelectTop(id, 1).FirstOrDefault();
			CarStatus table = tableTemp.ChangeModel<CarStatus>();

			if (relation)
			{
				List<usp_CarDetailsBasic_CarStatusByLinkedIDSelect_Result> cardetailsbasicModelList = entity.usp_CarDetailsBasic_CarStatusByLinkedIDSelect(id).ToList();
				table.CarDetailsBasicList.AddRange(cardetailsbasicModelList.ChangeModelList<CarDetailsBasic, usp_CarDetailsBasic_CarStatusByLinkedIDSelect_Result>());

				List<usp_CarStatusT_CarStatusByLinkedIDSelect_Result> carstatustModelList = entity.usp_CarStatusT_CarStatusByLinkedIDSelect(id).ToList();
				table.CarStatusTList.AddRange(carstatustModelList.ChangeModelList<CarStatusT, usp_CarStatusT_CarStatusByLinkedIDSelect_Result>());
			}

			return table;
		}

		public List<CarStatus> SelectByCode(string code, bool relation = true)
		{
			List<usp_CarStatusSelectByCode_Result> tableTemp = entity.usp_CarStatusSelectByCode(code).ToList();
			List<CarStatus> table = tableTemp.ChangeModelList<CarStatus, usp_CarStatusSelectByCode_Result>();

			if (relation)
			{
				foreach(CarStatus item in table)
				{
					List<usp_CarDetailsBasic_CarStatusByLinkedIDSelect_Result> cardetailsbasicModelList = entity.usp_CarDetailsBasic_CarStatusByLinkedIDSelect(item.ID).ToList();
					item.CarDetailsBasicList.AddRange(cardetailsbasicModelList.ChangeModelList<CarDetailsBasic, usp_CarDetailsBasic_CarStatusByLinkedIDSelect_Result>());

					List<usp_CarStatusT_CarStatusByLinkedIDSelect_Result> carstatustModelList = entity.usp_CarStatusT_CarStatusByLinkedIDSelect(item.ID).ToList();
					item.CarStatusTList.AddRange(carstatustModelList.ChangeModelList<CarStatusT, usp_CarStatusT_CarStatusByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public ICarStatus Insert(ICarStatus table = null, bool? none = null)
		{
			if (table == null)
				table = new CarStatus();

			return table;
		}

		public bool Insert(ICarStatus table)
		{
			var result = entity.usp_CarStatusInsert(table.Title, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ICarStatus Update(int? id = null, ICarStatus table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_CarDetailsBasic_CarStatusByLinkedIDSelect_Result> cardetailsbasicModelList = entity.usp_CarDetailsBasic_CarStatusByLinkedIDSelect(table.ID).ToList();
				table.CarDetailsBasicList.AddRange(cardetailsbasicModelList.ChangeModelList<CarDetailsBasic, usp_CarDetailsBasic_CarStatusByLinkedIDSelect_Result>());

				List<usp_CarStatusT_CarStatusByLinkedIDSelect_Result> carstatustModelList = entity.usp_CarStatusT_CarStatusByLinkedIDSelect(table.ID).ToList();
				table.CarStatusTList.AddRange(carstatustModelList.ChangeModelList<CarStatusT, usp_CarStatusT_CarStatusByLinkedIDSelect_Result>());

			}

			return table;
		}

		public bool Update(ICarStatus table)
		{
			var result = entity.usp_CarStatusUpdate(table.ID, table.Title, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_CarStatusCopy(id).FirstOrDefault();

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
				entity.usp_CarStatusDelete(id);

				return true;
			}
			catch
			{
				return false;
			}
		}

        #endregion

        #region User Defined

        public List<SelectListItem> ComboCarStatus(int? transID = null, bool withID = true, int? selectedID = null, bool addEmpty = false)
        {
            List<sp_CarStatusSelect_Result> table = entity.sp_CarStatusSelect(transID).ToList();

            if (withID)
                return table.ToSelectList<sp_CarStatusSelect_Result, SelectListItem>("ID", "Name", selectedID, addEmpty);
            else
                return table.ToSelectList<sp_CarStatusSelect_Result, SelectListItem>("Code", "Name", selectedID, addEmpty, "-", "all");
        }

        #endregion
    }
}
