using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using RentACar.Data;
using TDLibrary;
using Repository.CarDetailsMechanicalModel;
using Repository.CarFeatsEngineTypeTModel;

namespace Repository.CarFeatsEngineTypeModel
{
	public class CarFeatsEngineType : ICarFeatsEngineType
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public CarFeatsEngineType()
		{
			CarDetailsMechanicalList = new List<ICarDetailsMechanical>();
			CarFeatsEngineTypeTList = new List<ICarFeatsEngineTypeT>();
		}

		public int ID { get; set; }
		public string Title { get; set; }
		public string Code { get; set; }

		public string Mesaj { get; set; }

		public List<ICarDetailsMechanical> CarDetailsMechanicalList { get; set; }
		public List<ICarFeatsEngineTypeT> CarFeatsEngineTypeTList { get; set; }

		#endregion

		#region Methods

		public List<CarFeatsEngineType> List(int? id = null, int? top = null, bool relation = true)
		{
			List<CarFeatsEngineType> table;

			List<usp_CarFeatsEngineTypeSelect_Result> tableTemp;
			List<usp_CarFeatsEngineTypeSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_CarFeatsEngineTypeSelect(id).ToList();
				table = tableTemp.ChangeModelList<CarFeatsEngineType, usp_CarFeatsEngineTypeSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_CarFeatsEngineTypeSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<CarFeatsEngineType, usp_CarFeatsEngineTypeSelectTop_Result>();
			}

			if (relation)
			{
				foreach(CarFeatsEngineType item in table)
				{
					List<usp_CarDetailsMechanical_CarFeatsEngineTypeByLinkedIDSelect_Result> cardetailsmechanicalModelList = entity.usp_CarDetailsMechanical_CarFeatsEngineTypeByLinkedIDSelect(item.ID).ToList();
					item.CarDetailsMechanicalList.AddRange(cardetailsmechanicalModelList.ChangeModelList<CarDetailsMechanical, usp_CarDetailsMechanical_CarFeatsEngineTypeByLinkedIDSelect_Result>());

					List<usp_CarFeatsEngineTypeT_CarFeatsEngineTypeByLinkedIDSelect_Result> carfeatsenginetypetModelList = entity.usp_CarFeatsEngineTypeT_CarFeatsEngineTypeByLinkedIDSelect(item.ID).ToList();
					item.CarFeatsEngineTypeTList.AddRange(carfeatsenginetypetModelList.ChangeModelList<CarFeatsEngineTypeT, usp_CarFeatsEngineTypeT_CarFeatsEngineTypeByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public List<CarFeatsEngineType> ListAll(int? id = null, bool relation = true)
		{
			List<CarFeatsEngineType> table;

			List<usp_CarFeatsEngineTypeSelectAll_Result> tableTemp;

			tableTemp = entity.usp_CarFeatsEngineTypeSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<CarFeatsEngineType, usp_CarFeatsEngineTypeSelectAll_Result>();

			if (relation)
			{
				foreach(CarFeatsEngineType item in table)
				{
					List<usp_CarDetailsMechanical_CarFeatsEngineTypeByLinkedIDSelect_Result> cardetailsmechanicalModelList = entity.usp_CarDetailsMechanical_CarFeatsEngineTypeByLinkedIDSelect(item.ID).ToList();
					item.CarDetailsMechanicalList.AddRange(cardetailsmechanicalModelList.ChangeModelList<CarDetailsMechanical, usp_CarDetailsMechanical_CarFeatsEngineTypeByLinkedIDSelect_Result>());

					List<usp_CarFeatsEngineTypeT_CarFeatsEngineTypeByLinkedIDSelect_Result> carfeatsenginetypetModelList = entity.usp_CarFeatsEngineTypeT_CarFeatsEngineTypeByLinkedIDSelect(item.ID).ToList();
					item.CarFeatsEngineTypeTList.AddRange(carfeatsenginetypetModelList.ChangeModelList<CarFeatsEngineTypeT, usp_CarFeatsEngineTypeT_CarFeatsEngineTypeByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public ICarFeatsEngineType Select(int? id, bool relation = true)
		{
			usp_CarFeatsEngineTypeSelectTop_Result tableTemp = entity.usp_CarFeatsEngineTypeSelectTop(id, 1).FirstOrDefault();
			CarFeatsEngineType table = tableTemp.ChangeModel<CarFeatsEngineType>();

			if (relation)
			{
				List<usp_CarDetailsMechanical_CarFeatsEngineTypeByLinkedIDSelect_Result> cardetailsmechanicalModelList = entity.usp_CarDetailsMechanical_CarFeatsEngineTypeByLinkedIDSelect(id).ToList();
				table.CarDetailsMechanicalList.AddRange(cardetailsmechanicalModelList.ChangeModelList<CarDetailsMechanical, usp_CarDetailsMechanical_CarFeatsEngineTypeByLinkedIDSelect_Result>());

				List<usp_CarFeatsEngineTypeT_CarFeatsEngineTypeByLinkedIDSelect_Result> carfeatsenginetypetModelList = entity.usp_CarFeatsEngineTypeT_CarFeatsEngineTypeByLinkedIDSelect(id).ToList();
				table.CarFeatsEngineTypeTList.AddRange(carfeatsenginetypetModelList.ChangeModelList<CarFeatsEngineTypeT, usp_CarFeatsEngineTypeT_CarFeatsEngineTypeByLinkedIDSelect_Result>());
			}

			return table;
		}

		public List<CarFeatsEngineType> SelectByCode(string code, bool relation = true)
		{
			List<usp_CarFeatsEngineTypeSelectByCode_Result> tableTemp = entity.usp_CarFeatsEngineTypeSelectByCode(code).ToList();
			List<CarFeatsEngineType> table = tableTemp.ChangeModelList<CarFeatsEngineType, usp_CarFeatsEngineTypeSelectByCode_Result>();

			if (relation)
			{
				foreach(CarFeatsEngineType item in table)
				{
					List<usp_CarDetailsMechanical_CarFeatsEngineTypeByLinkedIDSelect_Result> cardetailsmechanicalModelList = entity.usp_CarDetailsMechanical_CarFeatsEngineTypeByLinkedIDSelect(item.ID).ToList();
					item.CarDetailsMechanicalList.AddRange(cardetailsmechanicalModelList.ChangeModelList<CarDetailsMechanical, usp_CarDetailsMechanical_CarFeatsEngineTypeByLinkedIDSelect_Result>());

					List<usp_CarFeatsEngineTypeT_CarFeatsEngineTypeByLinkedIDSelect_Result> carfeatsenginetypetModelList = entity.usp_CarFeatsEngineTypeT_CarFeatsEngineTypeByLinkedIDSelect(item.ID).ToList();
					item.CarFeatsEngineTypeTList.AddRange(carfeatsenginetypetModelList.ChangeModelList<CarFeatsEngineTypeT, usp_CarFeatsEngineTypeT_CarFeatsEngineTypeByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public ICarFeatsEngineType Insert(ICarFeatsEngineType table = null, bool? none = null)
		{
			if (table == null)
				table = new CarFeatsEngineType();

			return table;
		}

		public bool Insert(ICarFeatsEngineType table)
		{
			var result = entity.usp_CarFeatsEngineTypeInsert(table.Title, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ICarFeatsEngineType Update(int? id = null, ICarFeatsEngineType table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_CarDetailsMechanical_CarFeatsEngineTypeByLinkedIDSelect_Result> cardetailsmechanicalModelList = entity.usp_CarDetailsMechanical_CarFeatsEngineTypeByLinkedIDSelect(table.ID).ToList();
				table.CarDetailsMechanicalList.AddRange(cardetailsmechanicalModelList.ChangeModelList<CarDetailsMechanical, usp_CarDetailsMechanical_CarFeatsEngineTypeByLinkedIDSelect_Result>());

				List<usp_CarFeatsEngineTypeT_CarFeatsEngineTypeByLinkedIDSelect_Result> carfeatsenginetypetModelList = entity.usp_CarFeatsEngineTypeT_CarFeatsEngineTypeByLinkedIDSelect(table.ID).ToList();
				table.CarFeatsEngineTypeTList.AddRange(carfeatsenginetypetModelList.ChangeModelList<CarFeatsEngineTypeT, usp_CarFeatsEngineTypeT_CarFeatsEngineTypeByLinkedIDSelect_Result>());

			}

			return table;
		}

		public bool Update(ICarFeatsEngineType table)
		{
			var result = entity.usp_CarFeatsEngineTypeUpdate(table.ID, table.Title, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_CarFeatsEngineTypeCopy(id).FirstOrDefault();

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
				entity.usp_CarFeatsEngineTypeDelete(id);

				return true;
			}
			catch
			{
				return false;
			}
		}

        #endregion

        #region User Defined

        public List<SelectListItem> ComboEngineTypes(int? transID = null, bool withID = true, int? selectedID = null, bool addEmpty = false)
        {
            List<sp_EngineTypesSelect_Result> table = entity.sp_EngineTypesSelect(transID).ToList();

            if (withID)
                return table.ToSelectList<sp_EngineTypesSelect_Result, SelectListItem>("ID", "Name", selectedID, addEmpty);
            else
                return table.ToSelectList<sp_EngineTypesSelect_Result, SelectListItem>("Code", "Name", selectedID, addEmpty, "-", "all");
        }

        #endregion
    }
}
