using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using RentACar.Data;
using TDLibrary;
using Repository.CarDetailsExtIntModel;
using Repository.CarFeatsDriveTypeTModel;

namespace Repository.CarFeatsDriveTypeModel
{
	public class CarFeatsDriveType : ICarFeatsDriveType
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public CarFeatsDriveType()
		{
			CarDetailsExtIntList = new List<ICarDetailsExtInt>();
			CarFeatsDriveTypeTList = new List<ICarFeatsDriveTypeT>();
		}

		public int ID { get; set; }
		public string Title { get; set; }
		public string Code { get; set; }

		public string Mesaj { get; set; }

		public List<ICarDetailsExtInt> CarDetailsExtIntList { get; set; }
		public List<ICarFeatsDriveTypeT> CarFeatsDriveTypeTList { get; set; }

		#endregion

		#region Methods

		public List<CarFeatsDriveType> List(int? id = null, int? top = null, bool relation = true)
		{
			List<CarFeatsDriveType> table;

			List<usp_CarFeatsDriveTypeSelect_Result> tableTemp;
			List<usp_CarFeatsDriveTypeSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_CarFeatsDriveTypeSelect(id).ToList();
				table = tableTemp.ChangeModelList<CarFeatsDriveType, usp_CarFeatsDriveTypeSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_CarFeatsDriveTypeSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<CarFeatsDriveType, usp_CarFeatsDriveTypeSelectTop_Result>();
			}

			if (relation)
			{
				foreach(CarFeatsDriveType item in table)
				{
					List<usp_CarDetailsExtInt_CarFeatsDriveTypeByLinkedIDSelect_Result> cardetailsextintModelList = entity.usp_CarDetailsExtInt_CarFeatsDriveTypeByLinkedIDSelect(item.ID).ToList();
					item.CarDetailsExtIntList.AddRange(cardetailsextintModelList.ChangeModelList<CarDetailsExtInt, usp_CarDetailsExtInt_CarFeatsDriveTypeByLinkedIDSelect_Result>());

					List<usp_CarFeatsDriveTypeT_CarFeatsDriveTypeByLinkedIDSelect_Result> carfeatsdrivetypetModelList = entity.usp_CarFeatsDriveTypeT_CarFeatsDriveTypeByLinkedIDSelect(item.ID).ToList();
					item.CarFeatsDriveTypeTList.AddRange(carfeatsdrivetypetModelList.ChangeModelList<CarFeatsDriveTypeT, usp_CarFeatsDriveTypeT_CarFeatsDriveTypeByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public List<CarFeatsDriveType> ListAll(int? id = null, bool relation = true)
		{
			List<CarFeatsDriveType> table;

			List<usp_CarFeatsDriveTypeSelectAll_Result> tableTemp;

			tableTemp = entity.usp_CarFeatsDriveTypeSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<CarFeatsDriveType, usp_CarFeatsDriveTypeSelectAll_Result>();

			if (relation)
			{
				foreach(CarFeatsDriveType item in table)
				{
					List<usp_CarDetailsExtInt_CarFeatsDriveTypeByLinkedIDSelect_Result> cardetailsextintModelList = entity.usp_CarDetailsExtInt_CarFeatsDriveTypeByLinkedIDSelect(item.ID).ToList();
					item.CarDetailsExtIntList.AddRange(cardetailsextintModelList.ChangeModelList<CarDetailsExtInt, usp_CarDetailsExtInt_CarFeatsDriveTypeByLinkedIDSelect_Result>());

					List<usp_CarFeatsDriveTypeT_CarFeatsDriveTypeByLinkedIDSelect_Result> carfeatsdrivetypetModelList = entity.usp_CarFeatsDriveTypeT_CarFeatsDriveTypeByLinkedIDSelect(item.ID).ToList();
					item.CarFeatsDriveTypeTList.AddRange(carfeatsdrivetypetModelList.ChangeModelList<CarFeatsDriveTypeT, usp_CarFeatsDriveTypeT_CarFeatsDriveTypeByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public ICarFeatsDriveType Select(int? id, bool relation = true)
		{
			usp_CarFeatsDriveTypeSelectTop_Result tableTemp = entity.usp_CarFeatsDriveTypeSelectTop(id, 1).FirstOrDefault();
			CarFeatsDriveType table = tableTemp.ChangeModel<CarFeatsDriveType>();

			if (relation)
			{
				List<usp_CarDetailsExtInt_CarFeatsDriveTypeByLinkedIDSelect_Result> cardetailsextintModelList = entity.usp_CarDetailsExtInt_CarFeatsDriveTypeByLinkedIDSelect(id).ToList();
				table.CarDetailsExtIntList.AddRange(cardetailsextintModelList.ChangeModelList<CarDetailsExtInt, usp_CarDetailsExtInt_CarFeatsDriveTypeByLinkedIDSelect_Result>());

				List<usp_CarFeatsDriveTypeT_CarFeatsDriveTypeByLinkedIDSelect_Result> carfeatsdrivetypetModelList = entity.usp_CarFeatsDriveTypeT_CarFeatsDriveTypeByLinkedIDSelect(id).ToList();
				table.CarFeatsDriveTypeTList.AddRange(carfeatsdrivetypetModelList.ChangeModelList<CarFeatsDriveTypeT, usp_CarFeatsDriveTypeT_CarFeatsDriveTypeByLinkedIDSelect_Result>());
			}

			return table;
		}

		public List<CarFeatsDriveType> SelectByCode(string code, bool relation = true)
		{
			List<usp_CarFeatsDriveTypeSelectByCode_Result> tableTemp = entity.usp_CarFeatsDriveTypeSelectByCode(code).ToList();
			List<CarFeatsDriveType> table = tableTemp.ChangeModelList<CarFeatsDriveType, usp_CarFeatsDriveTypeSelectByCode_Result>();

			if (relation)
			{
				foreach(CarFeatsDriveType item in table)
				{
					List<usp_CarDetailsExtInt_CarFeatsDriveTypeByLinkedIDSelect_Result> cardetailsextintModelList = entity.usp_CarDetailsExtInt_CarFeatsDriveTypeByLinkedIDSelect(item.ID).ToList();
					item.CarDetailsExtIntList.AddRange(cardetailsextintModelList.ChangeModelList<CarDetailsExtInt, usp_CarDetailsExtInt_CarFeatsDriveTypeByLinkedIDSelect_Result>());

					List<usp_CarFeatsDriveTypeT_CarFeatsDriveTypeByLinkedIDSelect_Result> carfeatsdrivetypetModelList = entity.usp_CarFeatsDriveTypeT_CarFeatsDriveTypeByLinkedIDSelect(item.ID).ToList();
					item.CarFeatsDriveTypeTList.AddRange(carfeatsdrivetypetModelList.ChangeModelList<CarFeatsDriveTypeT, usp_CarFeatsDriveTypeT_CarFeatsDriveTypeByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public ICarFeatsDriveType Insert(ICarFeatsDriveType table = null, bool? none = null)
		{
			if (table == null)
				table = new CarFeatsDriveType();

			return table;
		}

		public bool Insert(ICarFeatsDriveType table)
		{
			var result = entity.usp_CarFeatsDriveTypeInsert(table.Title, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ICarFeatsDriveType Update(int? id = null, ICarFeatsDriveType table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_CarDetailsExtInt_CarFeatsDriveTypeByLinkedIDSelect_Result> cardetailsextintModelList = entity.usp_CarDetailsExtInt_CarFeatsDriveTypeByLinkedIDSelect(table.ID).ToList();
				table.CarDetailsExtIntList.AddRange(cardetailsextintModelList.ChangeModelList<CarDetailsExtInt, usp_CarDetailsExtInt_CarFeatsDriveTypeByLinkedIDSelect_Result>());

				List<usp_CarFeatsDriveTypeT_CarFeatsDriveTypeByLinkedIDSelect_Result> carfeatsdrivetypetModelList = entity.usp_CarFeatsDriveTypeT_CarFeatsDriveTypeByLinkedIDSelect(table.ID).ToList();
				table.CarFeatsDriveTypeTList.AddRange(carfeatsdrivetypetModelList.ChangeModelList<CarFeatsDriveTypeT, usp_CarFeatsDriveTypeT_CarFeatsDriveTypeByLinkedIDSelect_Result>());

			}

			return table;
		}

		public bool Update(ICarFeatsDriveType table)
		{
			var result = entity.usp_CarFeatsDriveTypeUpdate(table.ID, table.Title, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_CarFeatsDriveTypeCopy(id).FirstOrDefault();

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
				entity.usp_CarFeatsDriveTypeDelete(id);

				return true;
			}
			catch
			{
				return false;
			}
		}

        #endregion

        #region User Defined

        public List<SelectListItem> DriveTypesSelect(int? transID = null)
        {
            List<sp_DriveTypesSelect_Result> table = entity.sp_DriveTypesSelect(transID).ToList();

            return table.ToSelectList<sp_DriveTypesSelect_Result, SelectListItem>("Code", "Name", null, true);
        }

        #endregion
    }
}
