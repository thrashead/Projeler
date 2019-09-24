using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACar.Data;
using TDLibrary;

namespace Repository.CarStatusTModel
{
	public class CarStatusT : ICarStatusT
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public CarStatusT()
		{
			TranslationList = new List<SelectListItem>();
			CarStatusList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int StatusID { get; set; }
		public int TransID { get; set; }
		public string Name { get; set; }

		public string Mesaj { get; set; }

		public List<SelectListItem> TranslationList { get; set; }
		public List<SelectListItem> CarStatusList { get; set; }

		public string TranslationAdi { get; set; }
		public string CarStatusAdi { get; set; }

		#endregion

		#region Methods

		public List<CarStatusT> List(int? id = null, int? top = null, bool relation = true)
		{
			List<CarStatusT> table;

			List<usp_CarStatusTLinkedSelect_Result> tableTemp;
			List<usp_CarStatusTSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_CarStatusTLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<CarStatusT, usp_CarStatusTLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_CarStatusTSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<CarStatusT, usp_CarStatusTSelectTop_Result>();
			}

			if (relation)
			{
				foreach(CarStatusT item in table)
				{
					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);

					List<usp_CarStatusSelect_Result> tableCarStatus = entity.usp_CarStatusSelect(null).ToList();
					item.CarStatusList = tableCarStatus.ToSelectList<usp_CarStatusSelect_Result, SelectListItem>("ID", "Title", item.StatusID);
				}
			}

			return table;
		}

		public List<CarStatusT> ListAll(int? id = null, bool relation = true)
		{
			List<CarStatusT> table;

			List<usp_CarStatusTSelectAll_Result> tableTemp;

			tableTemp = entity.usp_CarStatusTSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<CarStatusT, usp_CarStatusTSelectAll_Result>();

			if (relation)
			{
				foreach(CarStatusT item in table)
				{
					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);

					List<usp_CarStatusSelect_Result> tableCarStatus = entity.usp_CarStatusSelect(null).ToList();
					item.CarStatusList = tableCarStatus.ToSelectList<usp_CarStatusSelect_Result, SelectListItem>("ID", "Title", item.StatusID);
				}
			}

			return table;
		}

		public ICarStatusT Select(int? id, bool relation = true)
		{
			usp_CarStatusTSelectTop_Result tableTemp = entity.usp_CarStatusTSelectTop(id, 1).FirstOrDefault();
			CarStatusT table = tableTemp.ChangeModel<CarStatusT>();

			if (relation)
			{
				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);

				List<usp_CarStatusSelect_Result> tableCarStatus = entity.usp_CarStatusSelect(null).ToList();
				table.CarStatusList = tableCarStatus.ToSelectList<usp_CarStatusSelect_Result, SelectListItem>("ID", "Title", table.StatusID);
			}

			return table;
		}

		public ICarStatusT Insert(ICarStatusT table = null, int? transID = null, int? statusID = null)
		{
			if (table == null)
				table = new CarStatusT();

			List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
			table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID",  "TransName", transID);

			List<usp_CarStatusSelect_Result> tableCarStatus = entity.usp_CarStatusSelect(null).ToList();
			table.CarStatusList = tableCarStatus.ToSelectList<usp_CarStatusSelect_Result, SelectListItem>("ID",  "Title", statusID);

			return table;
		}

		public bool Insert(ICarStatusT table)
		{
			var result = entity.usp_CarStatusTInsert(table.StatusID, table.TransID, table.Name).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ICarStatusT Update(int? id = null, ICarStatusT table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);

				List<usp_CarStatusSelect_Result> tableCarStatus = entity.usp_CarStatusSelect(null).ToList();
				table.CarStatusList = tableCarStatus.ToSelectList<usp_CarStatusSelect_Result, SelectListItem>("ID", "Title", table.StatusID);
			}

			return table;
		}

		public bool Update(ICarStatusT table)
		{
			var result = entity.usp_CarStatusTUpdate(table.ID, table.StatusID, table.TransID, table.Name).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_CarStatusTCopy(id).FirstOrDefault();

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
				entity.usp_CarStatusTDelete(id);

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
