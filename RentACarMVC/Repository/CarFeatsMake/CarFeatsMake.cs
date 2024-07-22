using System;
using System.Collections.Generic;
using System.Linq;
using RentACarMVC.Data;
using TDLibrary;
using Repository.CarDetailsBasicModel;
using Repository.CarFeatsModelModel;
using System.Web.Mvc;

namespace Repository.CarFeatsMakeModel
{
    public class CarFeatsMake : ICarFeatsMake
    {
        readonly RentACarEntities entity = new RentACarEntities();

        #region Model

        public CarFeatsMake()
        {
            CarDetailsBasicList = new List<ICarDetailsBasic>();
            CarFeatsModelList = new List<ICarFeatsModel>();
        }

        public int ID { get; set; }
        public string Title { get; set; }
        public string Code { get; set; }
        public string Url { get; set; }
        public string PictureUrl { get; set; }

        public string Mesaj { get; set; }

        public string OldPictureUrl { get; set; }

        public bool? HasFile { get; set; }

        public List<ICarDetailsBasic> CarDetailsBasicList { get; set; }
        public List<ICarFeatsModel> CarFeatsModelList { get; set; }

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
                foreach (CarFeatsMake item in table)
                {
                    List<usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect_Result> cardetailsbasicModelList = entity.usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect(item.ID).ToList();
                    item.CarDetailsBasicList.AddRange(cardetailsbasicModelList.ChangeModelList<CarDetailsBasic, usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect_Result>());

                    List<usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect_Result> carfeatsmodelModelList = entity.usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect(item.ID).ToList();
                    item.CarFeatsModelList.AddRange(carfeatsmodelModelList.ChangeModelList<CarFeatsModel, usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect_Result>());
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
                foreach (CarFeatsMake item in table)
                {
                    List<usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect_Result> cardetailsbasicModelList = entity.usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect(item.ID).ToList();
                    item.CarDetailsBasicList.AddRange(cardetailsbasicModelList.ChangeModelList<CarDetailsBasic, usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect_Result>());

                    List<usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect_Result> carfeatsmodelModelList = entity.usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect(item.ID).ToList();
                    item.CarFeatsModelList.AddRange(carfeatsmodelModelList.ChangeModelList<CarFeatsModel, usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect_Result>());
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
                List<usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect_Result> cardetailsbasicModelList = entity.usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect(id).ToList();
                table.CarDetailsBasicList.AddRange(cardetailsbasicModelList.ChangeModelList<CarDetailsBasic, usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect_Result>());

                List<usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect_Result> carfeatsmodelModelList = entity.usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect(id).ToList();
                table.CarFeatsModelList.AddRange(carfeatsmodelModelList.ChangeModelList<CarFeatsModel, usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect_Result>());
            }

            return table;
        }

        public ICarFeatsMake SelectByUrl(string url, bool relation = true)
        {
            usp_CarFeatsMakeSelectByUrl_Result tableTemp = entity.usp_CarFeatsMakeSelectByUrl(url).FirstOrDefault();
            CarFeatsMake table = tableTemp.ChangeModel<CarFeatsMake>();

            if (relation)
            {
                List<usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect_Result> cardetailsbasicModelList = entity.usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect(table.ID).ToList();
                table.CarDetailsBasicList.AddRange(cardetailsbasicModelList.ChangeModelList<CarDetailsBasic, usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect_Result>());

                List<usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect_Result> carfeatsmodelModelList = entity.usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect(table.ID).ToList();
                table.CarFeatsModelList.AddRange(carfeatsmodelModelList.ChangeModelList<CarFeatsModel, usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect_Result>());
            }

            return table;
        }

        public List<CarFeatsMake> SelectByCode(string code, bool relation = true)
        {
            List<usp_CarFeatsMakeSelectByCode_Result> tableTemp = entity.usp_CarFeatsMakeSelectByCode(code).ToList();
            List<CarFeatsMake> table = tableTemp.ChangeModelList<CarFeatsMake, usp_CarFeatsMakeSelectByCode_Result>();

            if (relation)
            {
                foreach (CarFeatsMake item in table)
                {
                    List<usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect_Result> cardetailsbasicModelList = entity.usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect(item.ID).ToList();
                    item.CarDetailsBasicList.AddRange(cardetailsbasicModelList.ChangeModelList<CarDetailsBasic, usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect_Result>());

                    List<usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect_Result> carfeatsmodelModelList = entity.usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect(item.ID).ToList();
                    item.CarFeatsModelList.AddRange(carfeatsmodelModelList.ChangeModelList<CarFeatsModel, usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect_Result>());
                }
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
            table.Url = table.Title.ToUrl();

            var result = entity.usp_CarFeatsMakeInsert(table.Title, table.Code, table.Url, table.PictureUrl).FirstOrDefault();

            if (result != null)
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
                List<usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect_Result> cardetailsbasicModelList = entity.usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect(table.ID).ToList();
                table.CarDetailsBasicList.AddRange(cardetailsbasicModelList.ChangeModelList<CarDetailsBasic, usp_CarDetailsBasic_CarFeatsMakeByLinkedIDSelect_Result>());

                List<usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect_Result> carfeatsmodelModelList = entity.usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect(table.ID).ToList();
                table.CarFeatsModelList.AddRange(carfeatsmodelModelList.ChangeModelList<CarFeatsModel, usp_CarFeatsModel_CarFeatsMakeByLinkedIDSelect_Result>());

            }

            return table;
        }

        public bool Update(ICarFeatsMake table)
        {
            table.Url = table.Title.ToUrl();

            var result = entity.usp_CarFeatsMakeUpdate(table.ID, table.Title, table.Code, table.Url, table.PictureUrl).FirstOrDefault();

            if (result != null)
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

        public List<SelectListItem> ComboCarMakes(bool withID = true, int? selectedID = null, bool addEmpty = false)
        {
            List<usp_CarFeatsMakeSelect_Result> table = entity.usp_CarFeatsMakeSelect(null).ToList();

            if (withID)
                return table.ToSelectList<usp_CarFeatsMakeSelect_Result, SelectListItem>("ID", "Title", selectedID, addEmpty, "-");
            else
                return table.ToSelectList<usp_CarFeatsMakeSelect_Result, SelectListItem>("Code", "Title", selectedID, addEmpty, "-", "all");
        }

        public List<sp_CarMakesSelect_Result> CarMakesSelect(int? top = null)
        {
            List<sp_CarMakesSelect_Result> table = entity.sp_CarMakesSelect(top).ToList();

            return table;
        }

        #endregion
    }
}
