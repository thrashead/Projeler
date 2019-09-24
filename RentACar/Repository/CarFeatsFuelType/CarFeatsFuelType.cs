using System;
using System.Collections.Generic;
using System.Linq;
using RentACar.Data;
using TDLibrary;
using Repository.CarDetailsMechanicalModel;
using Repository.CarFeatsFuelTypeTModel;

namespace Repository.CarFeatsFuelTypeModel
{
	public class CarFeatsFuelType : ICarFeatsFuelType
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public CarFeatsFuelType()
		{
			CarDetailsMechanicalList = new List<ICarDetailsMechanical>();
			CarFeatsFuelTypeTList = new List<ICarFeatsFuelTypeT>();
		}

		public int ID { get; set; }
		public string Title { get; set; }

		public string Mesaj { get; set; }

		public List<ICarDetailsMechanical> CarDetailsMechanicalList { get; set; }
		public List<ICarFeatsFuelTypeT> CarFeatsFuelTypeTList { get; set; }

		#endregion

		#region Methods

		public List<CarFeatsFuelType> List(int? id = null, int? top = null, bool relation = true)
		{
			List<CarFeatsFuelType> table;

			List<usp_CarFeatsFuelTypeSelect_Result> tableTemp;
			List<usp_CarFeatsFuelTypeSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_CarFeatsFuelTypeSelect(id).ToList();
				table = tableTemp.ChangeModelList<CarFeatsFuelType, usp_CarFeatsFuelTypeSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_CarFeatsFuelTypeSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<CarFeatsFuelType, usp_CarFeatsFuelTypeSelectTop_Result>();
			}

			if (relation)
			{
				foreach(CarFeatsFuelType item in table)
				{
					List<usp_CarDetailsMechanical_CarFeatsFuelTypeByLinkedIDSelect_Result> cardetailsmechanicalModelList = entity.usp_CarDetailsMechanical_CarFeatsFuelTypeByLinkedIDSelect(item.ID).ToList();
					item.CarDetailsMechanicalList.AddRange(cardetailsmechanicalModelList.ChangeModelList<CarDetailsMechanical, usp_CarDetailsMechanical_CarFeatsFuelTypeByLinkedIDSelect_Result>());

					List<usp_CarFeatsFuelTypeT_CarFeatsFuelTypeByLinkedIDSelect_Result> carfeatsfueltypetModelList = entity.usp_CarFeatsFuelTypeT_CarFeatsFuelTypeByLinkedIDSelect(item.ID).ToList();
					item.CarFeatsFuelTypeTList.AddRange(carfeatsfueltypetModelList.ChangeModelList<CarFeatsFuelTypeT, usp_CarFeatsFuelTypeT_CarFeatsFuelTypeByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public List<CarFeatsFuelType> ListAll(int? id = null, bool relation = true)
		{
			List<CarFeatsFuelType> table;

			List<usp_CarFeatsFuelTypeSelectAll_Result> tableTemp;

			tableTemp = entity.usp_CarFeatsFuelTypeSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<CarFeatsFuelType, usp_CarFeatsFuelTypeSelectAll_Result>();

			if (relation)
			{
				foreach(CarFeatsFuelType item in table)
				{
					List<usp_CarDetailsMechanical_CarFeatsFuelTypeByLinkedIDSelect_Result> cardetailsmechanicalModelList = entity.usp_CarDetailsMechanical_CarFeatsFuelTypeByLinkedIDSelect(item.ID).ToList();
					item.CarDetailsMechanicalList.AddRange(cardetailsmechanicalModelList.ChangeModelList<CarDetailsMechanical, usp_CarDetailsMechanical_CarFeatsFuelTypeByLinkedIDSelect_Result>());

					List<usp_CarFeatsFuelTypeT_CarFeatsFuelTypeByLinkedIDSelect_Result> carfeatsfueltypetModelList = entity.usp_CarFeatsFuelTypeT_CarFeatsFuelTypeByLinkedIDSelect(item.ID).ToList();
					item.CarFeatsFuelTypeTList.AddRange(carfeatsfueltypetModelList.ChangeModelList<CarFeatsFuelTypeT, usp_CarFeatsFuelTypeT_CarFeatsFuelTypeByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public ICarFeatsFuelType Select(int? id, bool relation = true)
		{
			usp_CarFeatsFuelTypeSelectTop_Result tableTemp = entity.usp_CarFeatsFuelTypeSelectTop(id, 1).FirstOrDefault();
			CarFeatsFuelType table = tableTemp.ChangeModel<CarFeatsFuelType>();

			if (relation)
			{
				List<usp_CarDetailsMechanical_CarFeatsFuelTypeByLinkedIDSelect_Result> cardetailsmechanicalModelList = entity.usp_CarDetailsMechanical_CarFeatsFuelTypeByLinkedIDSelect(id).ToList();
				table.CarDetailsMechanicalList.AddRange(cardetailsmechanicalModelList.ChangeModelList<CarDetailsMechanical, usp_CarDetailsMechanical_CarFeatsFuelTypeByLinkedIDSelect_Result>());

				List<usp_CarFeatsFuelTypeT_CarFeatsFuelTypeByLinkedIDSelect_Result> carfeatsfueltypetModelList = entity.usp_CarFeatsFuelTypeT_CarFeatsFuelTypeByLinkedIDSelect(id).ToList();
				table.CarFeatsFuelTypeTList.AddRange(carfeatsfueltypetModelList.ChangeModelList<CarFeatsFuelTypeT, usp_CarFeatsFuelTypeT_CarFeatsFuelTypeByLinkedIDSelect_Result>());
			}

			return table;
		}

		public ICarFeatsFuelType Insert(ICarFeatsFuelType table = null, bool? none = null)
		{
			if (table == null)
				table = new CarFeatsFuelType();

			return table;
		}

		public bool Insert(ICarFeatsFuelType table)
		{
			var result = entity.usp_CarFeatsFuelTypeInsert(table.Title).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ICarFeatsFuelType Update(int? id = null, ICarFeatsFuelType table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_CarDetailsMechanical_CarFeatsFuelTypeByLinkedIDSelect_Result> cardetailsmechanicalModelList = entity.usp_CarDetailsMechanical_CarFeatsFuelTypeByLinkedIDSelect(table.ID).ToList();
				table.CarDetailsMechanicalList.AddRange(cardetailsmechanicalModelList.ChangeModelList<CarDetailsMechanical, usp_CarDetailsMechanical_CarFeatsFuelTypeByLinkedIDSelect_Result>());

				List<usp_CarFeatsFuelTypeT_CarFeatsFuelTypeByLinkedIDSelect_Result> carfeatsfueltypetModelList = entity.usp_CarFeatsFuelTypeT_CarFeatsFuelTypeByLinkedIDSelect(table.ID).ToList();
				table.CarFeatsFuelTypeTList.AddRange(carfeatsfueltypetModelList.ChangeModelList<CarFeatsFuelTypeT, usp_CarFeatsFuelTypeT_CarFeatsFuelTypeByLinkedIDSelect_Result>());

			}

			return table;
		}

		public bool Update(ICarFeatsFuelType table)
		{
			var result = entity.usp_CarFeatsFuelTypeUpdate(table.ID, table.Title).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_CarFeatsFuelTypeCopy(id).FirstOrDefault();

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
				entity.usp_CarFeatsFuelTypeDelete(id);

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
