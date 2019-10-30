using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using Emlak.Data;
using TDLibrary;

namespace Models
{
	public class EmlakYeni
	{
		readonly EmlakEntities entity = new EmlakEntities();

		#region Model

		public EmlakYeni()
		{
			PropertyTList = new List<EmlakYeniDil>();
			PropertyPicturesList = new List<EmlakResim>();
			PropertyFeaturesList = new List<EmlakOzellik>();
			PropertyDetailsList = new List<EmlakDetay>();
			PropertyCategoriesList = new List<SelectListItem>();
		}

		public int ID { get; set; }
		public int? CatID { get; set; }
		public string Title { get; set; }
		public string Code { get; set; }
		public string Url { get; set; }
		public int Price { get; set; }
		public bool Forsale { get; set; }
		public bool? NewBrand { get; set; }
		public bool? PropOfDay { get; set; }
		public bool Active { get; set; }
		public bool Deleted { get; set; }

		public string Mesaj { get; set; }

		public List<EmlakYeniDil> PropertyTList { get; set; }
		public List<EmlakResim> PropertyPicturesList { get; set; }
		public List<EmlakOzellik> PropertyFeaturesList { get; set; }
		public List<EmlakDetay> PropertyDetailsList { get; set; }

		public List<SelectListItem> PropertyCategoriesList { get; set; }

		public string PropertyCategoriesAdi { get; set; }

		#endregion

		#region Methods

		public List<EmlakYeni> List(int? id = null, int? top = null, bool relation = true)
		{
			List<EmlakYeni> table;

			List<usp_PropertyLinkedSelect_Result> tableTemp;
			List<usp_PropertySelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_PropertyLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<EmlakYeni, usp_PropertyLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_PropertySelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<EmlakYeni, usp_PropertySelectTop_Result>();
			}

			if (relation)
			{
				foreach(EmlakYeni item in table)
				{
					List<usp_PropertyCategoriesSelect_Result> tablePropertyCategories = entity.usp_PropertyCategoriesSelect(null).ToList();
					item.PropertyCategoriesList = tablePropertyCategories.ToSelectList<usp_PropertyCategoriesSelect_Result, SelectListItem>("ID", "Title", item.CatID);

					List<usp_PropertyT_PropertyByLinkedIDSelect_Result> propertytModelList = entity.usp_PropertyT_PropertyByLinkedIDSelect(item.ID).ToList();
					item.PropertyTList.AddRange(propertytModelList.ChangeModelList<EmlakYeniDil, usp_PropertyT_PropertyByLinkedIDSelect_Result>());

					List<usp_PropertyPictures_PropertyByLinkedIDSelect_Result> propertypicturesModelList = entity.usp_PropertyPictures_PropertyByLinkedIDSelect(item.ID).ToList();
					item.PropertyPicturesList.AddRange(propertypicturesModelList.ChangeModelList<EmlakResim, usp_PropertyPictures_PropertyByLinkedIDSelect_Result>());

					List<usp_PropertyFeatures_PropertyByLinkedIDSelect_Result> propertyfeaturesModelList = entity.usp_PropertyFeatures_PropertyByLinkedIDSelect(item.ID).ToList();
					item.PropertyFeaturesList.AddRange(propertyfeaturesModelList.ChangeModelList<EmlakOzellik, usp_PropertyFeatures_PropertyByLinkedIDSelect_Result>());

					List<usp_PropertyDetails_PropertyByLinkedIDSelect_Result> propertydetailsModelList = entity.usp_PropertyDetails_PropertyByLinkedIDSelect(item.ID).ToList();
					item.PropertyDetailsList.AddRange(propertydetailsModelList.ChangeModelList<EmlakDetay, usp_PropertyDetails_PropertyByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public List<EmlakYeni> ListAll(int? id = null, bool relation = true)
		{
			List<EmlakYeni> table;

			List<usp_PropertySelectAll_Result> tableTemp;

			tableTemp = entity.usp_PropertySelectAll(id).ToList();
			table = tableTemp.ChangeModelList<EmlakYeni, usp_PropertySelectAll_Result>();

			if (relation)
			{
				foreach(EmlakYeni item in table)
				{
					List<usp_PropertyCategoriesSelect_Result> tablePropertyCategories = entity.usp_PropertyCategoriesSelect(null).ToList();
					item.PropertyCategoriesList = tablePropertyCategories.ToSelectList<usp_PropertyCategoriesSelect_Result, SelectListItem>("ID", "Title", item.CatID);

					List<usp_PropertyT_PropertyByLinkedIDSelect_Result> propertytModelList = entity.usp_PropertyT_PropertyByLinkedIDSelect(item.ID).ToList();
					item.PropertyTList.AddRange(propertytModelList.ChangeModelList<EmlakYeniDil, usp_PropertyT_PropertyByLinkedIDSelect_Result>());

					List<usp_PropertyPictures_PropertyByLinkedIDSelect_Result> propertypicturesModelList = entity.usp_PropertyPictures_PropertyByLinkedIDSelect(item.ID).ToList();
					item.PropertyPicturesList.AddRange(propertypicturesModelList.ChangeModelList<EmlakResim, usp_PropertyPictures_PropertyByLinkedIDSelect_Result>());

					List<usp_PropertyFeatures_PropertyByLinkedIDSelect_Result> propertyfeaturesModelList = entity.usp_PropertyFeatures_PropertyByLinkedIDSelect(item.ID).ToList();
					item.PropertyFeaturesList.AddRange(propertyfeaturesModelList.ChangeModelList<EmlakOzellik, usp_PropertyFeatures_PropertyByLinkedIDSelect_Result>());

					List<usp_PropertyDetails_PropertyByLinkedIDSelect_Result> propertydetailsModelList = entity.usp_PropertyDetails_PropertyByLinkedIDSelect(item.ID).ToList();
					item.PropertyDetailsList.AddRange(propertydetailsModelList.ChangeModelList<EmlakDetay, usp_PropertyDetails_PropertyByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public EmlakYeni Select(int? id, bool relation = true)
		{
			usp_PropertySelectTop_Result tableTemp = entity.usp_PropertySelectTop(id, 1).FirstOrDefault();
			EmlakYeni table = tableTemp.ChangeModel<EmlakYeni>();

			if (relation)
			{
				List<usp_PropertyCategoriesSelect_Result> tablePropertyCategories = entity.usp_PropertyCategoriesSelect(null).ToList();
				table.PropertyCategoriesList = tablePropertyCategories.ToSelectList<usp_PropertyCategoriesSelect_Result, SelectListItem>("ID", "Title", table.CatID);

				List<usp_PropertyT_PropertyByLinkedIDSelect_Result> propertytModelList = entity.usp_PropertyT_PropertyByLinkedIDSelect(id).ToList();
				table.PropertyTList.AddRange(propertytModelList.ChangeModelList<EmlakYeniDil, usp_PropertyT_PropertyByLinkedIDSelect_Result>());

				List<usp_PropertyPictures_PropertyByLinkedIDSelect_Result> propertypicturesModelList = entity.usp_PropertyPictures_PropertyByLinkedIDSelect(id).ToList();
				table.PropertyPicturesList.AddRange(propertypicturesModelList.ChangeModelList<EmlakResim, usp_PropertyPictures_PropertyByLinkedIDSelect_Result>());

				List<usp_PropertyFeatures_PropertyByLinkedIDSelect_Result> propertyfeaturesModelList = entity.usp_PropertyFeatures_PropertyByLinkedIDSelect(id).ToList();
				table.PropertyFeaturesList.AddRange(propertyfeaturesModelList.ChangeModelList<EmlakOzellik, usp_PropertyFeatures_PropertyByLinkedIDSelect_Result>());

				List<usp_PropertyDetails_PropertyByLinkedIDSelect_Result> propertydetailsModelList = entity.usp_PropertyDetails_PropertyByLinkedIDSelect(id).ToList();
				table.PropertyDetailsList.AddRange(propertydetailsModelList.ChangeModelList<EmlakDetay, usp_PropertyDetails_PropertyByLinkedIDSelect_Result>());
			}

			return table;
		}

		public EmlakYeni SelectByUrl(string url, bool relation = true)
		{
			usp_PropertySelectByUrl_Result tableTemp = entity.usp_PropertySelectByUrl(url).FirstOrDefault();
			EmlakYeni table = tableTemp.ChangeModel<EmlakYeni>();

			if (relation)
			{
				List<usp_PropertyCategoriesSelect_Result> tablePropertyCategories = entity.usp_PropertyCategoriesSelect(null).ToList();
				table.PropertyCategoriesList = tablePropertyCategories.ToSelectList<usp_PropertyCategoriesSelect_Result, SelectListItem>("ID", "Title", table.CatID);

				List<usp_PropertyT_PropertyByLinkedIDSelect_Result> propertytModelList = entity.usp_PropertyT_PropertyByLinkedIDSelect(table.ID).ToList();
				table.PropertyTList.AddRange(propertytModelList.ChangeModelList<EmlakYeniDil, usp_PropertyT_PropertyByLinkedIDSelect_Result>());

				List<usp_PropertyPictures_PropertyByLinkedIDSelect_Result> propertypicturesModelList = entity.usp_PropertyPictures_PropertyByLinkedIDSelect(table.ID).ToList();
				table.PropertyPicturesList.AddRange(propertypicturesModelList.ChangeModelList<EmlakResim, usp_PropertyPictures_PropertyByLinkedIDSelect_Result>());

				List<usp_PropertyFeatures_PropertyByLinkedIDSelect_Result> propertyfeaturesModelList = entity.usp_PropertyFeatures_PropertyByLinkedIDSelect(table.ID).ToList();
				table.PropertyFeaturesList.AddRange(propertyfeaturesModelList.ChangeModelList<EmlakOzellik, usp_PropertyFeatures_PropertyByLinkedIDSelect_Result>());

				List<usp_PropertyDetails_PropertyByLinkedIDSelect_Result> propertydetailsModelList = entity.usp_PropertyDetails_PropertyByLinkedIDSelect(table.ID).ToList();
				table.PropertyDetailsList.AddRange(propertydetailsModelList.ChangeModelList<EmlakDetay, usp_PropertyDetails_PropertyByLinkedIDSelect_Result>());
			}

			return table;
		}

		public List<EmlakYeni> SelectByCode(string code, bool relation = true)
		{
			List<usp_PropertySelectByCode_Result> tableTemp = entity.usp_PropertySelectByCode(code).ToList();
			List<EmlakYeni> table = tableTemp.ChangeModelList<EmlakYeni, usp_PropertySelectByCode_Result>();

			if (relation)
			{
				foreach(EmlakYeni item in table)
				{
					List<usp_PropertyCategoriesSelect_Result> tablePropertyCategories = entity.usp_PropertyCategoriesSelect(null).ToList();
					item.PropertyCategoriesList = tablePropertyCategories.ToSelectList<usp_PropertyCategoriesSelect_Result, SelectListItem>("ID", "Title", item.CatID);

					List<usp_PropertyT_PropertyByLinkedIDSelect_Result> propertytModelList = entity.usp_PropertyT_PropertyByLinkedIDSelect(item.ID).ToList();
					item.PropertyTList.AddRange(propertytModelList.ChangeModelList<EmlakYeniDil, usp_PropertyT_PropertyByLinkedIDSelect_Result>());

					List<usp_PropertyPictures_PropertyByLinkedIDSelect_Result> propertypicturesModelList = entity.usp_PropertyPictures_PropertyByLinkedIDSelect(item.ID).ToList();
					item.PropertyPicturesList.AddRange(propertypicturesModelList.ChangeModelList<EmlakResim, usp_PropertyPictures_PropertyByLinkedIDSelect_Result>());

					List<usp_PropertyFeatures_PropertyByLinkedIDSelect_Result> propertyfeaturesModelList = entity.usp_PropertyFeatures_PropertyByLinkedIDSelect(item.ID).ToList();
					item.PropertyFeaturesList.AddRange(propertyfeaturesModelList.ChangeModelList<EmlakOzellik, usp_PropertyFeatures_PropertyByLinkedIDSelect_Result>());

					List<usp_PropertyDetails_PropertyByLinkedIDSelect_Result> propertydetailsModelList = entity.usp_PropertyDetails_PropertyByLinkedIDSelect(item.ID).ToList();
					item.PropertyDetailsList.AddRange(propertydetailsModelList.ChangeModelList<EmlakDetay, usp_PropertyDetails_PropertyByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public EmlakYeni Insert(EmlakYeni table = null, int? catID = null)
		{
			if (table == null)
				table = new EmlakYeni();

			List<usp_PropertyCategoriesSelect_Result> tablePropertyCategories = entity.usp_PropertyCategoriesSelect(null).ToList();
			table.PropertyCategoriesList = tablePropertyCategories.ToSelectList<usp_PropertyCategoriesSelect_Result, SelectListItem>("ID",  "Title", catID);

			return table;
		}

		public bool Insert(EmlakYeni table)
		{
			table.Url = table.Title.ToUrl();

			var result = entity.usp_PropertyInsert(table.CatID, table.Title, table.Code, table.Url, table.Price, table.Forsale, table.NewBrand, table.PropOfDay, table.Active).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public EmlakYeni Update(int? id = null, EmlakYeni table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_PropertyCategoriesSelect_Result> tablePropertyCategories = entity.usp_PropertyCategoriesSelect(null).ToList();
				table.PropertyCategoriesList = tablePropertyCategories.ToSelectList<usp_PropertyCategoriesSelect_Result, SelectListItem>("ID", "Title", table.CatID);

				List<usp_PropertyT_PropertyByLinkedIDSelect_Result> propertytModelList = entity.usp_PropertyT_PropertyByLinkedIDSelect(table.ID).ToList();
				table.PropertyTList.AddRange(propertytModelList.ChangeModelList<EmlakYeniDil, usp_PropertyT_PropertyByLinkedIDSelect_Result>());

				List<usp_PropertyPictures_PropertyByLinkedIDSelect_Result> propertypicturesModelList = entity.usp_PropertyPictures_PropertyByLinkedIDSelect(table.ID).ToList();
				table.PropertyPicturesList.AddRange(propertypicturesModelList.ChangeModelList<EmlakResim, usp_PropertyPictures_PropertyByLinkedIDSelect_Result>());

				List<usp_PropertyFeatures_PropertyByLinkedIDSelect_Result> propertyfeaturesModelList = entity.usp_PropertyFeatures_PropertyByLinkedIDSelect(table.ID).ToList();
				table.PropertyFeaturesList.AddRange(propertyfeaturesModelList.ChangeModelList<EmlakOzellik, usp_PropertyFeatures_PropertyByLinkedIDSelect_Result>());

				List<usp_PropertyDetails_PropertyByLinkedIDSelect_Result> propertydetailsModelList = entity.usp_PropertyDetails_PropertyByLinkedIDSelect(table.ID).ToList();
				table.PropertyDetailsList.AddRange(propertydetailsModelList.ChangeModelList<EmlakDetay, usp_PropertyDetails_PropertyByLinkedIDSelect_Result>());

			}

			return table;
		}

		public bool Update(EmlakYeni table)
		{
			table.Url = table.Title.ToUrl();

			var result = entity.usp_PropertyUpdate(table.ID, table.CatID, table.Title, table.Code, table.Url, table.Price, table.Forsale, table.NewBrand, table.PropOfDay, table.Active).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_PropertyCopy(id).FirstOrDefault();

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
				entity.usp_PropertyDelete(id);

				return true;
			}
			catch
			{
				return false;
			}
		}

		public bool Remove(int? id = null)
		{
			try
			{
				entity.usp_PropertyRemove(id);

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
