using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACar.Data;
using TDLibrary;
using Repository.CarDetailsBasicModel;

namespace Repository.CarFeatsModelModel
{
    public class CarFeatsModel : ICarFeatsModel
    {
        readonly RentACarEntities entity = new RentACarEntities();

        #region Model

        public CarFeatsModel()
        {
            CarDetailsBasicList = new List<ICarDetailsBasic>();
            CarFeatsMakeList = new List<SelectListItem>();
        }

        public int ID { get; set; }
        public int MakeID { get; set; }
        public string ModelName { get; set; }
        public string Code { get; set; }

        public string Mesaj { get; set; }

        public List<ICarDetailsBasic> CarDetailsBasicList { get; set; }

        public List<SelectListItem> CarFeatsMakeList { get; set; }

        public string CarFeatsMakeAdi { get; set; }

        #endregion

        #region Methods

        public List<CarFeatsModel> List(int? id = null, int? top = null, bool relation = true)
        {
            List<CarFeatsModel> table;

            List<usp_CarFeatsModelLinkedSelect_Result> tableTemp;
            List<usp_CarFeatsModelSelectTop_Result> tableTopTemp;

            if (top == null)
            {
                tableTemp = entity.usp_CarFeatsModelLinkedSelect(id).ToList();
                table = tableTemp.ChangeModelList<CarFeatsModel, usp_CarFeatsModelLinkedSelect_Result>();
            }
            else
            {
                tableTopTemp = entity.usp_CarFeatsModelSelectTop(id, top).ToList();
                table = tableTopTemp.ChangeModelList<CarFeatsModel, usp_CarFeatsModelSelectTop_Result>();
            }

            if (relation)
            {
                foreach (CarFeatsModel item in table)
                {
                    List<usp_CarFeatsMakeSelect_Result> tableCarFeatsMake = entity.usp_CarFeatsMakeSelect(null).ToList();
                    item.CarFeatsMakeList = tableCarFeatsMake.ToSelectList<usp_CarFeatsMakeSelect_Result, SelectListItem>("ID", "Title", item.MakeID);

                    List<usp_CarDetailsBasic_CarFeatsModelByLinkedIDSelect_Result> cardetailsbasicModelList = entity.usp_CarDetailsBasic_CarFeatsModelByLinkedIDSelect(item.ID).ToList();
                    item.CarDetailsBasicList.AddRange(cardetailsbasicModelList.ChangeModelList<CarDetailsBasic, usp_CarDetailsBasic_CarFeatsModelByLinkedIDSelect_Result>());
                }
            }

            return table;
        }

        public List<CarFeatsModel> ListAll(int? id = null, bool relation = true)
        {
            List<CarFeatsModel> table;

            List<usp_CarFeatsModelSelectAll_Result> tableTemp;

            tableTemp = entity.usp_CarFeatsModelSelectAll(id).ToList();
            table = tableTemp.ChangeModelList<CarFeatsModel, usp_CarFeatsModelSelectAll_Result>();

            if (relation)
            {
                foreach (CarFeatsModel item in table)
                {
                    List<usp_CarFeatsMakeSelect_Result> tableCarFeatsMake = entity.usp_CarFeatsMakeSelect(null).ToList();
                    item.CarFeatsMakeList = tableCarFeatsMake.ToSelectList<usp_CarFeatsMakeSelect_Result, SelectListItem>("ID", "Title", item.MakeID);

                    List<usp_CarDetailsBasic_CarFeatsModelByLinkedIDSelect_Result> cardetailsbasicModelList = entity.usp_CarDetailsBasic_CarFeatsModelByLinkedIDSelect(item.ID).ToList();
                    item.CarDetailsBasicList.AddRange(cardetailsbasicModelList.ChangeModelList<CarDetailsBasic, usp_CarDetailsBasic_CarFeatsModelByLinkedIDSelect_Result>());
                }
            }

            return table;
        }

        public ICarFeatsModel Select(int? id, bool relation = true)
        {
            usp_CarFeatsModelSelectTop_Result tableTemp = entity.usp_CarFeatsModelSelectTop(id, 1).FirstOrDefault();
            CarFeatsModel table = tableTemp.ChangeModel<CarFeatsModel>();

            if (relation)
            {
                List<usp_CarFeatsMakeSelect_Result> tableCarFeatsMake = entity.usp_CarFeatsMakeSelect(null).ToList();
                table.CarFeatsMakeList = tableCarFeatsMake.ToSelectList<usp_CarFeatsMakeSelect_Result, SelectListItem>("ID", "Title", table.MakeID);

                List<usp_CarDetailsBasic_CarFeatsModelByLinkedIDSelect_Result> cardetailsbasicModelList = entity.usp_CarDetailsBasic_CarFeatsModelByLinkedIDSelect(id).ToList();
                table.CarDetailsBasicList.AddRange(cardetailsbasicModelList.ChangeModelList<CarDetailsBasic, usp_CarDetailsBasic_CarFeatsModelByLinkedIDSelect_Result>());
            }

            return table;
        }

        public ICarFeatsModel Insert(ICarFeatsModel table = null, int? makeID = null)
        {
            if (table == null)
                table = new CarFeatsModel();

            List<usp_CarFeatsMakeSelect_Result> tableCarFeatsMake = entity.usp_CarFeatsMakeSelect(null).ToList();
            table.CarFeatsMakeList = tableCarFeatsMake.ToSelectList<usp_CarFeatsMakeSelect_Result, SelectListItem>("ID", "Title", makeID);

            return table;
        }

        public bool Insert(ICarFeatsModel table)
        {
            var result = entity.usp_CarFeatsModelInsert(table.MakeID, table.ModelName, table.Code).FirstOrDefault();

            if (result != null)
                return true;
            else
                return false;
        }

        public ICarFeatsModel Update(int? id = null, ICarFeatsModel table = null)
        {
            if (table == null)
            {
                table = Select(id);
            }
            else
            {
                List<usp_CarFeatsMakeSelect_Result> tableCarFeatsMake = entity.usp_CarFeatsMakeSelect(null).ToList();
                table.CarFeatsMakeList = tableCarFeatsMake.ToSelectList<usp_CarFeatsMakeSelect_Result, SelectListItem>("ID", "Title", table.MakeID);

                List<usp_CarDetailsBasic_CarFeatsModelByLinkedIDSelect_Result> cardetailsbasicModelList = entity.usp_CarDetailsBasic_CarFeatsModelByLinkedIDSelect(table.ID).ToList();
                table.CarDetailsBasicList.AddRange(cardetailsbasicModelList.ChangeModelList<CarDetailsBasic, usp_CarDetailsBasic_CarFeatsModelByLinkedIDSelect_Result>());
            }

            return table;
        }

        public bool Update(ICarFeatsModel table)
        {
            var result = entity.usp_CarFeatsModelUpdate(table.ID, table.MakeID, table.ModelName, table.Code).FirstOrDefault();

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Copy(int id)
        {
            try
            {
                var result = entity.usp_CarFeatsModelCopy(id).FirstOrDefault();

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
                entity.usp_CarFeatsModelDelete(id);

                return true;
            }
            catch
            {
                return false;
            }
        }

        #endregion

        #region User Defined

        public List<SelectListItem> CarModelsSelect(bool withID = true, int? selectedID = null, bool addEmpty = false)
        {
            List<usp_CarFeatsModelSelect_Result> table = entity.usp_CarFeatsModelSelect(null).ToList();

            if (withID)
                return table.ToSelectList<usp_CarFeatsModelSelect_Result, SelectListItem>("ID", "ModelName", selectedID, addEmpty);
            else
                return table.ToSelectList<usp_CarFeatsModelSelect_Result, SelectListItem>("Code", "ModelName", selectedID, addEmpty, "-", "all");
        }

        public List<SelectListItem> ComboCarModelsByMakeID(int? makeID = null, bool withID = true, int? selectedID = null, bool addEmpty = false)
        {
            List<sp_CarModelsByMakeID_Result> table = entity.sp_CarModelsByMakeID(makeID).ToList();

            if (withID)
                return table.ToSelectList<sp_CarModelsByMakeID_Result, SelectListItem>("ID", "ModelName", selectedID, addEmpty);
            else
                return table.ToSelectList<sp_CarModelsByMakeID_Result, SelectListItem>("Code", "ModelName", selectedID, addEmpty, "-", "all");
        }

        public List<SelectListItem> ComboCarModelsByMakeCode(string makeCode = null, bool withID = true, int? selectedID = null, bool addEmpty = false)
        {
            List<sp_CarModelsByMakeCode_Result> table = entity.sp_CarModelsByMakeCode(makeCode).ToList();

            if (withID)
                return table.ToSelectList<sp_CarModelsByMakeCode_Result, SelectListItem>("ID", "ModelName", selectedID, addEmpty);
            else
                return table.ToSelectList<sp_CarModelsByMakeCode_Result, SelectListItem>("Code", "ModelName", selectedID, addEmpty, "-", "all");
        }

        #endregion
    }
}
