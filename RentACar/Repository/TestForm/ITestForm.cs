using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Repository.TestFormModel
{
	public interface ITestForm
	{
		#region Model

		int ID { get; set; }
		int CarID { get; set; }
		string Name { get; set; }
		string Mail { get; set; }
		string Phone { get; set; }
		string Message { get; set; }
		bool Accepted { get; set; }
        string SendDate { get; set; }
        string IPAddress { get; set; }

        string Mesaj { get; set; }

		List<SelectListItem> CarsList { get; set; }

		string CarsAdi { get; set; }

        bool? CopyMail { get; set; }

        #endregion

        #region Methods

        List<TestForm> List(int? id, int? top, bool relation);
		List<TestForm> ListAll(int? id, bool relation);
		ITestForm Select(int? id, bool relation);
		ITestForm Insert(ITestForm table, int? carID);
		bool Insert(ITestForm table);
		ITestForm Update(int? id, ITestForm table);
		bool Update(ITestForm table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
