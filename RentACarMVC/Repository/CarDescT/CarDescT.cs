using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using RentACarMVC.Data;
using TDLibrary;

namespace Repository.CarDescTModel
{
	public class CarDescT : ICarDescT
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public CarDescT()
		{
			TranslationList = new List<SelectListItem>();
			CarDescList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int CarDescID { get; set; }
		public int TransID { get; set; }
		public string Title { get; set; }
		public string ShortDescription { get; set; }
		[AllowHtml]
		public string Description { get; set; }
		public string ShortDescription2 { get; set; }
		[AllowHtml]
		public string Description2 { get; set; }

		public string Mesaj { get; set; }

		public List<SelectListItem> TranslationList { get; set; }
		public List<SelectListItem> CarDescList { get; set; }

		public string TranslationAdi { get; set; }
		public string CarDescAdi { get; set; }

		#endregion

		#region Methods

		public List<CarDescT> List(int? id = null, int? top = null, bool relation = true)
		{
			List<CarDescT> table;

			List<usp_CarDescTLinkedSelect_Result> tableTemp;
			List<usp_CarDescTSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_CarDescTLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<CarDescT, usp_CarDescTLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_CarDescTSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<CarDescT, usp_CarDescTSelectTop_Result>();
			}

			if (relation)
			{
				foreach(CarDescT item in table)
				{
					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);

					List<usp_CarDescSelect_Result> tableCarDesc = entity.usp_CarDescSelect(null).ToList();
					item.CarDescList = tableCarDesc.ToSelectList<usp_CarDescSelect_Result, SelectListItem>("ID", "Title", item.CarDescID);
				}
			}

			return table;
		}

		public List<CarDescT> ListAll(int? id = null, bool relation = true)
		{
			List<CarDescT> table;

			List<usp_CarDescTSelectAll_Result> tableTemp;

			tableTemp = entity.usp_CarDescTSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<CarDescT, usp_CarDescTSelectAll_Result>();

			if (relation)
			{
				foreach(CarDescT item in table)
				{
					List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
					item.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", item.TransID);

					List<usp_CarDescSelect_Result> tableCarDesc = entity.usp_CarDescSelect(null).ToList();
					item.CarDescList = tableCarDesc.ToSelectList<usp_CarDescSelect_Result, SelectListItem>("ID", "Title", item.CarDescID);
				}
			}

			return table;
		}

		public ICarDescT Select(int? id, bool relation = true)
		{
			usp_CarDescTSelectTop_Result tableTemp = entity.usp_CarDescTSelectTop(id, 1).FirstOrDefault();
			CarDescT table = tableTemp.ChangeModel<CarDescT>();

			if (relation)
			{
				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);

				List<usp_CarDescSelect_Result> tableCarDesc = entity.usp_CarDescSelect(null).ToList();
				table.CarDescList = tableCarDesc.ToSelectList<usp_CarDescSelect_Result, SelectListItem>("ID", "Title", table.CarDescID);
			}

			return table;
		}

		public ICarDescT Insert(ICarDescT table = null, int? transID = null, int? carDescID = null)
		{
			if (table == null)
				table = new CarDescT();

			List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
			table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID",  "TransName", transID);

			List<usp_CarDescSelect_Result> tableCarDesc = entity.usp_CarDescSelect(null).ToList();
			table.CarDescList = tableCarDesc.ToSelectList<usp_CarDescSelect_Result, SelectListItem>("ID",  "Title", carDescID);

			return table;
		}

		public bool Insert(ICarDescT table)
		{
			var result = entity.usp_CarDescTInsert(table.CarDescID, table.TransID, table.Title, table.ShortDescription, table.Description, table.ShortDescription2, table.Description2).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public ICarDescT Update(int? id = null, ICarDescT table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_TranslationSelect_Result> tableTranslation = entity.usp_TranslationSelect(null).ToList();
				table.TranslationList = tableTranslation.ToSelectList<usp_TranslationSelect_Result, SelectListItem>("ID", "TransName", table.TransID);

				List<usp_CarDescSelect_Result> tableCarDesc = entity.usp_CarDescSelect(null).ToList();
				table.CarDescList = tableCarDesc.ToSelectList<usp_CarDescSelect_Result, SelectListItem>("ID", "Title", table.CarDescID);
			}

			return table;
		}

		public bool Update(ICarDescT table)
		{
			var result = entity.usp_CarDescTUpdate(table.ID, table.CarDescID, table.TransID, table.Title, table.ShortDescription, table.Description, table.ShortDescription2, table.Description2).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_CarDescTCopy(id).FirstOrDefault();

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
				entity.usp_CarDescTDelete(id);

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
