using System;
using System.Collections.Generic;
using System.Linq;
using RentACar.Data;
using TDLibrary;
using Repository.CarDetailsExtIntModel;
using Repository.CarFeatsBodyTypeTModel;

namespace Repository.CarFeatsBodyTypeModel
{
	public class CarFeatsBodyType : ICarFeatsBodyType
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public CarFeatsBodyType()
		{
			CarDetailsExtIntList = new List<ICarDetailsExtInt>();
			CarFeatsBodyTypeTList = new List<ICarFeatsBodyTypeT>();
		}

		public int ID { get; set; }
		public string Title { get; set; }
		public string Code { get; set; }

		public string Mesaj { get; set; }

		public List<ICarDetailsExtInt> CarDetailsExtIntList { get; set; }
		public List<ICarFeatsBodyTypeT> CarFeatsBodyTypeTList { get; set; }

		#endregion

		#region Methods

		public List<CarFeatsBodyType> List(int? id = null, int? top = null, bool relation = true)
		{
			List<CarFeatsBodyType> table;

			List<usp_CarFeatsBodyTypeSelect_Result> tableTemp;
			List<usp_CarFeatsBodyTypeSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_CarFeatsBodyTypeSelect(id).ToList();
				table = tableTemp.ChangeModelList<CarFeatsBodyType, usp_CarFeatsBodyTypeSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_CarFeatsBodyTypeSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<CarFeatsBodyType, usp_CarFeatsBodyTypeSelectTop_Result>();
			}

			if (relation)
			{
				foreach(CarFeatsBodyType item in table)
				{
					List<usp_CarDetailsExtInt_CarFeatsBodyTypeByLinkedIDSelect_Result> cardetailsextintModelList = entity.usp_CarDetailsExtInt_CarFeatsBodyTypeByLinkedIDSelect(item.ID).ToList();
					item.CarDetailsExtIntList.AddRange(cardetailsextintModelList.ChangeModelList<CarDetailsExtInt, usp_CarDetailsExtInt_CarFeatsBodyTypeByLinkedIDSelect_Result>());

					List<usp_CarFeatsBodyTypeT_CarFeatsBodyTypeByLinkedIDSelect_Result> carfeatsbodytypetModelList = entity.usp_CarFeatsBodyTypeT_CarFeatsBodyTypeByLinkedIDSelect(item.ID).ToList();
					item.CarFeatsBodyTypeTList.AddRange(carfeatsbodytypetModelList.ChangeModelList<CarFeatsBodyTypeT, usp_CarFeatsBodyTypeT_CarFeatsBodyTypeByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public List<CarFeatsBodyType> ListAll(int? id = null, bool relation = true)
		{
			List<CarFeatsBodyType> table;

			List<usp_CarFeatsBodyTypeSelectAll_Result> tableTemp;

			tableTemp = entity.usp_CarFeatsBodyTypeSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<CarFeatsBodyType, usp_CarFeatsBodyTypeSelectAll_Result>();

			if (relation)
			{
				foreach(CarFeatsBodyType item in table)
				{
					List<usp_CarDetailsExtInt_CarFeatsBodyTypeByLinkedIDSelect_Result> cardetailsextintModelList = entity.usp_CarDetailsExtInt_CarFeatsBodyTypeByLinkedIDSelect(item.ID).ToList();
					item.CarDetailsExtIntList.AddRange(cardetailsextintModelList.ChangeModelList<CarDetailsExtInt, usp_CarDetailsExtInt_CarFeatsBodyTypeByLinkedIDSelect_Result>());

					List<usp_CarFeatsBodyTypeT_CarFeatsBodyTypeByLinkedIDSelect_Result> carfeatsbodytypetModelList = entity.usp_CarFeatsBodyTypeT_CarFeatsBodyTypeByLinkedIDSelect(item.ID).ToList();
					item.CarFeatsBodyTypeTList.AddRange(carfeatsbodytypetModelList.ChangeModelList<CarFeatsBodyTypeT, usp_CarFeatsBodyTypeT_CarFeatsBodyTypeByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public ICarFeatsBodyType Select(int? id, bool relation = true)
		{
			usp_CarFeatsBodyTypeSelectTop_Result tableTemp = entity.usp_CarFeatsBodyTypeSelectTop(id, 1).FirstOrDefault();
			CarFeatsBodyType table = tableTemp.ChangeModel<CarFeatsBodyType>();

			if (relation)
			{
				List<usp_CarDetailsExtInt_CarFeatsBodyTypeByLinkedIDSelect_Result> cardetailsextintModelList = entity.usp_CarDetailsExtInt_CarFeatsBodyTypeByLinkedIDSelect(id).ToList();
				table.CarDetailsExtIntList.AddRange(cardetailsextintModelList.ChangeModelList<CarDetailsExtInt, usp_CarDetailsExtInt_CarFeatsBodyTypeByLinkedIDSelect_Result>());

				List<usp_CarFeatsBodyTypeT_CarFeatsBodyTypeByLinkedIDSelect_Result> carfeatsbodytypetModelList = entity.usp_CarFeatsBodyTypeT_CarFeatsBodyTypeByLinkedIDSelect(id).ToList();
				table.CarFeatsBodyTypeTList.AddRange(carfeatsbodytypetModelList.ChangeModelList<CarFeatsBodyTypeT, usp_CarFeatsBodyTypeT_CarFeatsBodyTypeByLinkedIDSelect_Result>());
			}

			return table;
		}

		public List<CarFeatsBodyType> SelectByCode(string code, bool relation = true)
		{
			List<usp_CarFeatsBodyTypeSelectByCode_Result> tableTemp = entity.usp_CarFeatsBodyTypeSelectByCode(code).ToList();
			List<CarFeatsBodyType> table = tableTemp.ChangeModelList<CarFeatsBodyType, usp_CarFeatsBodyTypeSelectByCode_Result>();

			if (relation)
			{
				foreach(CarFeatsBodyType item in table)
				{
					List<usp_CarDetailsExtInt_CarFeatsBodyTypeByLinkedIDSelect_Result> cardetailsextintModelList = entity.usp_CarDetailsExtInt_CarFeatsBodyTypeByLinkedIDSelect(item.ID).ToList();
					item.CarDetailsExtIntList.AddRange(cardetailsextintModelList.ChangeModelList<CarDetailsExtInt, usp_CarDetailsExtInt_CarFeatsBodyTypeByLinkedIDSelect_Result>());

					List<usp_CarFeatsBodyTypeT_CarFeatsBodyTypeByLinkedIDSelect_Result> carfeatsbodytypetModelList = entity.usp_CarFeatsBodyTypeT_CarFeatsBodyTypeByLinkedIDSelect(item.ID).ToList();
					item.CarFeatsBodyTypeTList.AddRange(carfeatsbodytypetModelList.ChangeModelList<CarFeatsBodyTypeT, usp_CarFeatsBodyTypeT_CarFeatsBodyTypeByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public ICarFeatsBodyType Insert(ICarFeatsBodyType table = null, bool? none = null)
		{
			if (table == null)
				table = new CarFeatsBodyType();

			return table;
		}

		public bool Insert(ICarFeatsBodyType table)
		{
			var result = entity.usp_CarFeatsBodyTypeInsert(table.Title, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ICarFeatsBodyType Update(int? id = null, ICarFeatsBodyType table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_CarDetailsExtInt_CarFeatsBodyTypeByLinkedIDSelect_Result> cardetailsextintModelList = entity.usp_CarDetailsExtInt_CarFeatsBodyTypeByLinkedIDSelect(table.ID).ToList();
				table.CarDetailsExtIntList.AddRange(cardetailsextintModelList.ChangeModelList<CarDetailsExtInt, usp_CarDetailsExtInt_CarFeatsBodyTypeByLinkedIDSelect_Result>());

				List<usp_CarFeatsBodyTypeT_CarFeatsBodyTypeByLinkedIDSelect_Result> carfeatsbodytypetModelList = entity.usp_CarFeatsBodyTypeT_CarFeatsBodyTypeByLinkedIDSelect(table.ID).ToList();
				table.CarFeatsBodyTypeTList.AddRange(carfeatsbodytypetModelList.ChangeModelList<CarFeatsBodyTypeT, usp_CarFeatsBodyTypeT_CarFeatsBodyTypeByLinkedIDSelect_Result>());

			}

			return table;
		}

		public bool Update(ICarFeatsBodyType table)
		{
			var result = entity.usp_CarFeatsBodyTypeUpdate(table.ID, table.Title, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_CarFeatsBodyTypeCopy(id).FirstOrDefault();

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
				entity.usp_CarFeatsBodyTypeDelete(id);

				return true;
			}
			catch
			{
				return false;
			}
		}

        #endregion

        #region User Defined

        public List<sp_BodyTypesSelect_Result> BodyTypesSelect(int? transID = null)
        {
            List<sp_BodyTypesSelect_Result> table = entity.sp_BodyTypesSelect(transID).ToList();

            return table;
        }

        #endregion
    }
}
