using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACarMVC.Data;
using TDLibrary;

namespace Repository.TestFormModel
{
	public class TestForm : ITestForm
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public TestForm()
		{
			CarsList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int CarID { get; set; }
		public string Name { get; set; }
		public string Mail { get; set; }
		public string Phone { get; set; }
		public string Message { get; set; }
		public bool Accepted { get; set; }
        public string SendDate { get; set; }
        public string IPAddress { get; set; }

        public string Mesaj { get; set; }

		public List<SelectListItem> CarsList { get; set; }

		public string CarsAdi { get; set; }
        public bool? CopyMail { get; set; }

        #endregion

        #region Methods

        public List<TestForm> List(int? id = null, int? top = null, bool relation = true)
		{
			List<TestForm> table;

			List<usp_TestFormLinkedSelect_Result> tableTemp;
			List<usp_TestFormSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_TestFormLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<TestForm, usp_TestFormLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_TestFormSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<TestForm, usp_TestFormSelectTop_Result>();
			}

			if (relation)
			{
				foreach(TestForm item in table)
				{
					List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
					item.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", item.CarID);
				}
			}

			return table;
		}

		public List<TestForm> ListAll(int? id = null, bool relation = true)
		{
			List<TestForm> table;

			List<usp_TestFormSelectAll_Result> tableTemp;

			tableTemp = entity.usp_TestFormSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<TestForm, usp_TestFormSelectAll_Result>();

			if (relation)
			{
				foreach(TestForm item in table)
				{
					List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
					item.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", item.CarID);
				}
			}

			return table;
		}

		public ITestForm Select(int? id, bool relation = true)
		{
			usp_TestFormSelectTop_Result tableTemp = entity.usp_TestFormSelectTop(id, 1).FirstOrDefault();
			TestForm table = tableTemp.ChangeModel<TestForm>();

			if (relation)
			{
				List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
				table.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", table.CarID);
			}

			return table;
		}

		public ITestForm Insert(ITestForm table = null, int? carID = null)
		{
			if (table == null)
				table = new TestForm();

			List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
			table.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID",  "Title", carID);

			return table;
		}

		public bool Insert(ITestForm table)
		{
			var result = entity.usp_TestFormInsert(table.CarID, table.Name, table.Mail, table.Phone, table.Message, table.Accepted, table.SendDate, table.IPAddress).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ITestForm Update(int? id = null, ITestForm table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
				table.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", table.CarID);
			}

			return table;
		}

		public bool Update(ITestForm table)
		{
			var result = entity.usp_TestFormUpdate(table.ID, table.CarID, table.Name, table.Mail, table.Phone, table.Message, table.Accepted, table.SendDate, table.IPAddress).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_TestFormCopy(id).FirstOrDefault();

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
				entity.usp_TestFormDelete(id);

				return true;
			}
			catch
			{
				return false;
			}
		}

        #endregion

        #region User Defined

        public DateTime? GetLastDate(string IPAddress)
        {
            DateTime? table = entity.sp_TestFormLastDate(IPAddress).FirstOrDefault();

            return table;
        }

        #endregion
    }
}
