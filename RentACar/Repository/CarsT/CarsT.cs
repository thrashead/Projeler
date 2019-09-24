using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACar.Data;
using TDLibrary;

namespace Repository.CarsTModel
{
	public class CarsT : ICarsT
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public CarsT()
		{
			TranslationList = new List<SelectListItem>();
			CarsList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int CarID { get; set; }
		public int TransID { get; set; }
		public string ShortDescription { get; set; }
		[AllowHtml]
		public string Description { get; set; }
		public string ShortDescription2 { get; set; }
		[AllowHtml]
		public string Description2 { get; set; }

		public string Mesaj { get; set; }

		public List<SelectListItem> TranslationList { get; set; }
		public List<SelectListItem> CarsList { get; set; }

		public string TranslationAdi { get; set; }
		public string CarsAdi { get; set; }

		#endregion

		#region Methods

		public List<CarsT> List(int? id = null, int? top = null, bool relation = true)
		{
			List<CarsT> table;

			List<usp_CarsTLinkedSelect_Result> tableTemp;
			List<usp_CarsTSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_CarsTLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<CarsT, usp_CarsTLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_CarsTSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<CarsT, usp_CarsTSelectTop_Result>();
			}

			if (relation)
			{
				foreach(CarsT item in table)
				{
					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);

					List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
					item.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", item.CarID);
				}
			}

			return table;
		}

		public List<CarsT> ListAll(int? id = null, bool relation = true)
		{
			List<CarsT> table;

			List<usp_CarsTSelectAll_Result> tableTemp;

			tableTemp = entity.usp_CarsTSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<CarsT, usp_CarsTSelectAll_Result>();

			if (relation)
			{
				foreach(CarsT item in table)
				{
					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);

					List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
					item.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", item.CarID);
				}
			}

			return table;
		}

		public ICarsT Select(int? id, bool relation = true)
		{
			usp_CarsTSelectTop_Result tableTemp = entity.usp_CarsTSelectTop(id, 1).FirstOrDefault();
			CarsT table = tableTemp.ChangeModel<CarsT>();

			if (relation)
			{
				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);

				List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
				table.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", table.CarID);
			}

			return table;
		}

		public ICarsT Insert(ICarsT table = null, int? transID = null, int? carID = null)
		{
			if (table == null)
				table = new CarsT();

			List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
			table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID",  "TransName", transID);

			List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
			table.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID",  "Title", carID);

			return table;
		}

		public bool Insert(ICarsT table)
		{
			var result = entity.usp_CarsTInsert(table.CarID, table.TransID, table.ShortDescription, table.Description, table.ShortDescription2, table.Description2).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ICarsT Update(int? id = null, ICarsT table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);

				List<usp_CarsSelect_Result> tableCars = entity.usp_CarsSelect(null).ToList();
				table.CarsList = tableCars.ToSelectList<usp_CarsSelect_Result, SelectListItem>("ID", "Title", table.CarID);
			}

			return table;
		}

		public bool Update(ICarsT table)
		{
			var result = entity.usp_CarsTUpdate(table.ID, table.CarID, table.TransID, table.ShortDescription, table.Description, table.ShortDescription2, table.Description2).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_CarsTCopy(id).FirstOrDefault();

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
				entity.usp_CarsTDelete(id);

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
