using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using RentACarMVC.Data;
using TDLibrary;
using Repository.CarDetailsMechanicalModel;
using Repository.CarFeatsGearsTypeTModel;

namespace Repository.CarFeatsGearsTypeModel
{
	public class CarFeatsGearsType : ICarFeatsGearsType
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public CarFeatsGearsType()
		{
			CarDetailsMechanicalList = new List<ICarDetailsMechanical>();
			CarFeatsGearsTypeTList = new List<ICarFeatsGearsTypeT>();
		}

		public int ID { get; set; }
		public string Title { get; set; }
		public string Code { get; set; }

		public string Mesaj { get; set; }

		public List<ICarDetailsMechanical> CarDetailsMechanicalList { get; set; }
		public List<ICarFeatsGearsTypeT> CarFeatsGearsTypeTList { get; set; }

		#endregion

		#region Methods

		public List<CarFeatsGearsType> List(int? id = null, int? top = null, bool relation = true)
		{
			List<CarFeatsGearsType> table;

			List<usp_CarFeatsGearsTypeSelect_Result> tableTemp;
			List<usp_CarFeatsGearsTypeSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_CarFeatsGearsTypeSelect(id).ToList();
				table = tableTemp.ChangeModelList<CarFeatsGearsType, usp_CarFeatsGearsTypeSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_CarFeatsGearsTypeSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<CarFeatsGearsType, usp_CarFeatsGearsTypeSelectTop_Result>();
			}

			if (relation)
			{
				foreach(CarFeatsGearsType item in table)
				{
					List<usp_CarDetailsMechanical_CarFeatsGearsTypeByLinkedIDSelect_Result> cardetailsmechanicalModelList = entity.usp_CarDetailsMechanical_CarFeatsGearsTypeByLinkedIDSelect(item.ID).ToList();
					item.CarDetailsMechanicalList.AddRange(cardetailsmechanicalModelList.ChangeModelList<CarDetailsMechanical, usp_CarDetailsMechanical_CarFeatsGearsTypeByLinkedIDSelect_Result>());

					List<usp_CarFeatsGearsTypeT_CarFeatsGearsTypeByLinkedIDSelect_Result> carfeatsgearstypetModelList = entity.usp_CarFeatsGearsTypeT_CarFeatsGearsTypeByLinkedIDSelect(item.ID).ToList();
					item.CarFeatsGearsTypeTList.AddRange(carfeatsgearstypetModelList.ChangeModelList<CarFeatsGearsTypeT, usp_CarFeatsGearsTypeT_CarFeatsGearsTypeByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public List<CarFeatsGearsType> ListAll(int? id = null, bool relation = true)
		{
			List<CarFeatsGearsType> table;

			List<usp_CarFeatsGearsTypeSelectAll_Result> tableTemp;

			tableTemp = entity.usp_CarFeatsGearsTypeSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<CarFeatsGearsType, usp_CarFeatsGearsTypeSelectAll_Result>();

			if (relation)
			{
				foreach(CarFeatsGearsType item in table)
				{
					List<usp_CarDetailsMechanical_CarFeatsGearsTypeByLinkedIDSelect_Result> cardetailsmechanicalModelList = entity.usp_CarDetailsMechanical_CarFeatsGearsTypeByLinkedIDSelect(item.ID).ToList();
					item.CarDetailsMechanicalList.AddRange(cardetailsmechanicalModelList.ChangeModelList<CarDetailsMechanical, usp_CarDetailsMechanical_CarFeatsGearsTypeByLinkedIDSelect_Result>());

					List<usp_CarFeatsGearsTypeT_CarFeatsGearsTypeByLinkedIDSelect_Result> carfeatsgearstypetModelList = entity.usp_CarFeatsGearsTypeT_CarFeatsGearsTypeByLinkedIDSelect(item.ID).ToList();
					item.CarFeatsGearsTypeTList.AddRange(carfeatsgearstypetModelList.ChangeModelList<CarFeatsGearsTypeT, usp_CarFeatsGearsTypeT_CarFeatsGearsTypeByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public ICarFeatsGearsType Select(int? id, bool relation = true)
		{
			usp_CarFeatsGearsTypeSelectTop_Result tableTemp = entity.usp_CarFeatsGearsTypeSelectTop(id, 1).FirstOrDefault();
			CarFeatsGearsType table = tableTemp.ChangeModel<CarFeatsGearsType>();

			if (relation)
			{
				List<usp_CarDetailsMechanical_CarFeatsGearsTypeByLinkedIDSelect_Result> cardetailsmechanicalModelList = entity.usp_CarDetailsMechanical_CarFeatsGearsTypeByLinkedIDSelect(id).ToList();
				table.CarDetailsMechanicalList.AddRange(cardetailsmechanicalModelList.ChangeModelList<CarDetailsMechanical, usp_CarDetailsMechanical_CarFeatsGearsTypeByLinkedIDSelect_Result>());

				List<usp_CarFeatsGearsTypeT_CarFeatsGearsTypeByLinkedIDSelect_Result> carfeatsgearstypetModelList = entity.usp_CarFeatsGearsTypeT_CarFeatsGearsTypeByLinkedIDSelect(id).ToList();
				table.CarFeatsGearsTypeTList.AddRange(carfeatsgearstypetModelList.ChangeModelList<CarFeatsGearsTypeT, usp_CarFeatsGearsTypeT_CarFeatsGearsTypeByLinkedIDSelect_Result>());
			}

			return table;
		}

		public List<CarFeatsGearsType> SelectByCode(string code, bool relation = true)
		{
			List<usp_CarFeatsGearsTypeSelectByCode_Result> tableTemp = entity.usp_CarFeatsGearsTypeSelectByCode(code).ToList();
			List<CarFeatsGearsType> table = tableTemp.ChangeModelList<CarFeatsGearsType, usp_CarFeatsGearsTypeSelectByCode_Result>();

			if (relation)
			{
				foreach(CarFeatsGearsType item in table)
				{
					List<usp_CarDetailsMechanical_CarFeatsGearsTypeByLinkedIDSelect_Result> cardetailsmechanicalModelList = entity.usp_CarDetailsMechanical_CarFeatsGearsTypeByLinkedIDSelect(item.ID).ToList();
					item.CarDetailsMechanicalList.AddRange(cardetailsmechanicalModelList.ChangeModelList<CarDetailsMechanical, usp_CarDetailsMechanical_CarFeatsGearsTypeByLinkedIDSelect_Result>());

					List<usp_CarFeatsGearsTypeT_CarFeatsGearsTypeByLinkedIDSelect_Result> carfeatsgearstypetModelList = entity.usp_CarFeatsGearsTypeT_CarFeatsGearsTypeByLinkedIDSelect(item.ID).ToList();
					item.CarFeatsGearsTypeTList.AddRange(carfeatsgearstypetModelList.ChangeModelList<CarFeatsGearsTypeT, usp_CarFeatsGearsTypeT_CarFeatsGearsTypeByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public ICarFeatsGearsType Insert(ICarFeatsGearsType table = null, bool? none = null)
		{
			if (table == null)
				table = new CarFeatsGearsType();

			return table;
		}

		public bool Insert(ICarFeatsGearsType table)
		{
			var result = entity.usp_CarFeatsGearsTypeInsert(table.Title, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ICarFeatsGearsType Update(int? id = null, ICarFeatsGearsType table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_CarDetailsMechanical_CarFeatsGearsTypeByLinkedIDSelect_Result> cardetailsmechanicalModelList = entity.usp_CarDetailsMechanical_CarFeatsGearsTypeByLinkedIDSelect(table.ID).ToList();
				table.CarDetailsMechanicalList.AddRange(cardetailsmechanicalModelList.ChangeModelList<CarDetailsMechanical, usp_CarDetailsMechanical_CarFeatsGearsTypeByLinkedIDSelect_Result>());

				List<usp_CarFeatsGearsTypeT_CarFeatsGearsTypeByLinkedIDSelect_Result> carfeatsgearstypetModelList = entity.usp_CarFeatsGearsTypeT_CarFeatsGearsTypeByLinkedIDSelect(table.ID).ToList();
				table.CarFeatsGearsTypeTList.AddRange(carfeatsgearstypetModelList.ChangeModelList<CarFeatsGearsTypeT, usp_CarFeatsGearsTypeT_CarFeatsGearsTypeByLinkedIDSelect_Result>());

			}

			return table;
		}

		public bool Update(ICarFeatsGearsType table)
		{
			var result = entity.usp_CarFeatsGearsTypeUpdate(table.ID, table.Title, table.Code).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_CarFeatsGearsTypeCopy(id).FirstOrDefault();

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
				entity.usp_CarFeatsGearsTypeDelete(id);

				return true;
			}
			catch
			{
				return false;
			}
		}

        #endregion

        #region User Defined

        public List<SelectListItem> ComboGearTypes(int? transID = null, bool withID = true, int? selectedID = null, bool addEmpty = false)
        {
            List<sp_GearTypesSelect_Result> table = entity.sp_GearTypesSelect(transID).ToList();

            if (withID)
                return table.ToSelectList<sp_GearTypesSelect_Result, SelectListItem>("ID", "Name", selectedID, addEmpty);
            else
                return table.ToSelectList<sp_GearTypesSelect_Result, SelectListItem>("Code", "Name", selectedID, addEmpty, "-", "all");
        }

        #endregion
    }
}
