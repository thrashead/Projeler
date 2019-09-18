using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using System.Linq;
using RealEstate.Data;
using TDLibrary;
using Repository.BlogVideosModel;
using Repository.BlogPicturesModel;
using Repository.BlogCommentsModel;
using Repository.BlogTModel;
using System;

namespace Repository.BlogModel
{
	public class Blog : IBlog
	{
		readonly RealEstateEntities entity = new RealEstateEntities();

		#region Model

		public Blog()
		{
			BlogVideosList = new List<IBlogVideos>();
			BlogPicturesList = new List<IBlogPictures>();
			BlogCommentsList = new List<IBlogComments>();
			BlogTList = new List<IBlogT>();
            BlogCategoryList = new List<SelectListItem>();
            WorkersList = new List<SelectListItem>();
        }

        public int ID { get; set; }
		[Required(ErrorMessage = "BlogCatID alanı boş olamaz ve BlogCatID alanına en az 0 değeri girmelisiniz.")]
		[Range(0, int.MaxValue, ErrorMessage = "BlogCatID alanı boş olamaz ve BlogCatID alanına en az 0 değeri girmelisiniz.")]
		public int BlogCatID { get; set; }
		[Required(ErrorMessage = "Title alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
		[StringLength(255)]
		public string Title { get; set; }
		public string Code { get; set; }
		public string Url { get; set; }
		[Required(ErrorMessage = "Sender alanı boş olamaz ve Sender alanına en az 0 değeri girmelisiniz.")]
		[Range(0, int.MaxValue, ErrorMessage = "Sender alanı boş olamaz ve Sender alanına en az 0 değeri girmelisiniz.")]
		public int Sender { get; set; }
		public string SendDate { get; set; }
		public string PictureUrl { get; set; }
		public int? ReadTime { get; set; }
        public string Tags { get; set; }

        public string Mesaj { get; set; }

		public string OldPictureUrl { get; set; }

        public bool? HasFile { get; set; }

		public List<IBlogVideos> BlogVideosList { get; set; }
		public List<IBlogPictures> BlogPicturesList { get; set; }
		public List<IBlogComments> BlogCommentsList { get; set; }
		public List<IBlogT> BlogTList { get; set; }

		public List<SelectListItem> WorkersList { get; set; }
		public List<SelectListItem> BlogCategoryList { get; set; }

		public string BlogCategoryAdi { get; set; }
        public string WorkersAdi { get; set; }

        #endregion

        #region Methods

        public List<Blog> List(int? id = null, int? top = null, bool relation = true)
		{
			List<Blog> table;

			List<usp_BlogLinkedSelect_Result> tableTemp;
			List<usp_BlogSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_BlogLinkedSelect(id).ToList();
				table = tableTemp.ChangeModelList<Blog, usp_BlogLinkedSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_BlogSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<Blog, usp_BlogSelectTop_Result>();
			}

			if (relation)
			{
				foreach(Blog item in table)
                {
                    List<usp_BlogCategorySelect_Result> tableBlogCategory = entity.usp_BlogCategorySelect(null).ToList();
                    item.BlogCategoryList = tableBlogCategory.ToSelectList<usp_BlogCategorySelect_Result, SelectListItem>("ID", "Title", item.BlogCatID);

                    List<usp_WorkersSelect_Result> tableWorkers = entity.usp_WorkersSelect(null).ToList();
                    item.WorkersList = tableWorkers.ToSelectList<usp_WorkersSelect_Result, SelectListItem>("ID", "NameSurname", item.Sender);

                    List<usp_BlogVideos_BlogByLinkedIDSelect_Result> blogvideosModelList = entity.usp_BlogVideos_BlogByLinkedIDSelect(item.ID).ToList();
					item.BlogVideosList.AddRange(blogvideosModelList.ChangeModelList<BlogVideos, usp_BlogVideos_BlogByLinkedIDSelect_Result>());

					List<usp_BlogPictures_BlogByLinkedIDSelect_Result> blogpicturesModelList = entity.usp_BlogPictures_BlogByLinkedIDSelect(item.ID).ToList();
					item.BlogPicturesList.AddRange(blogpicturesModelList.ChangeModelList<BlogPictures, usp_BlogPictures_BlogByLinkedIDSelect_Result>());

					List<usp_BlogComments_BlogByLinkedIDSelect_Result> blogcommentsModelList = entity.usp_BlogComments_BlogByLinkedIDSelect(item.ID).ToList();
					item.BlogCommentsList.AddRange(blogcommentsModelList.ChangeModelList<BlogComments, usp_BlogComments_BlogByLinkedIDSelect_Result>());

					List<usp_BlogT_BlogByLinkedIDSelect_Result> blogtModelList = entity.usp_BlogT_BlogByLinkedIDSelect(item.ID).ToList();
					item.BlogTList.AddRange(blogtModelList.ChangeModelList<BlogT, usp_BlogT_BlogByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public List<Blog> ListAll(int? id = null, bool relation = true)
		{
			List<Blog> table;

			List<usp_BlogSelectAll_Result> tableTemp;

			tableTemp = entity.usp_BlogSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<Blog, usp_BlogSelectAll_Result>();

			if (relation)
			{
				foreach(Blog item in table)
				{
					List<usp_BlogCategorySelect_Result> tableBlogCategory = entity.usp_BlogCategorySelect(null).ToList();
					item.BlogCategoryList = tableBlogCategory.ToSelectList<usp_BlogCategorySelect_Result, SelectListItem>("ID", "Title", item.BlogCatID);

                    List<usp_WorkersSelect_Result> tableWorkers = entity.usp_WorkersSelect(null).ToList();
                    item.WorkersList = tableWorkers.ToSelectList<usp_WorkersSelect_Result, SelectListItem>("ID", "NameSurname", item.Sender);

                    List<usp_BlogVideos_BlogByLinkedIDSelect_Result> blogvideosModelList = entity.usp_BlogVideos_BlogByLinkedIDSelect(item.ID).ToList();
					item.BlogVideosList.AddRange(blogvideosModelList.ChangeModelList<BlogVideos, usp_BlogVideos_BlogByLinkedIDSelect_Result>());

					List<usp_BlogPictures_BlogByLinkedIDSelect_Result> blogpicturesModelList = entity.usp_BlogPictures_BlogByLinkedIDSelect(item.ID).ToList();
					item.BlogPicturesList.AddRange(blogpicturesModelList.ChangeModelList<BlogPictures, usp_BlogPictures_BlogByLinkedIDSelect_Result>());

					List<usp_BlogComments_BlogByLinkedIDSelect_Result> blogcommentsModelList = entity.usp_BlogComments_BlogByLinkedIDSelect(item.ID).ToList();
					item.BlogCommentsList.AddRange(blogcommentsModelList.ChangeModelList<BlogComments, usp_BlogComments_BlogByLinkedIDSelect_Result>());

					List<usp_BlogT_BlogByLinkedIDSelect_Result> blogtModelList = entity.usp_BlogT_BlogByLinkedIDSelect(item.ID).ToList();
					item.BlogTList.AddRange(blogtModelList.ChangeModelList<BlogT, usp_BlogT_BlogByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public IBlog Select(int? id, bool relation = true)
		{
			usp_BlogSelectTop_Result tableTemp = entity.usp_BlogSelectTop(id, 1).FirstOrDefault();
			Blog table = tableTemp.ChangeModel<Blog>();

			if (relation)
			{
				List<usp_BlogCategorySelect_Result> tableBlogCategory = entity.usp_BlogCategorySelect(null).ToList();
				table.BlogCategoryList = tableBlogCategory.ToSelectList<usp_BlogCategorySelect_Result, SelectListItem>("ID", "Title", table.BlogCatID);

                List<usp_WorkersSelect_Result> tableWorkers = entity.usp_WorkersSelect(null).ToList();
                table.WorkersList = tableWorkers.ToSelectList<usp_WorkersSelect_Result, SelectListItem>("ID", "NameSurname", table.Sender);

                List<usp_BlogVideos_BlogByLinkedIDSelect_Result> blogvideosModelList = entity.usp_BlogVideos_BlogByLinkedIDSelect(id).ToList();
				table.BlogVideosList.AddRange(blogvideosModelList.ChangeModelList<BlogVideos, usp_BlogVideos_BlogByLinkedIDSelect_Result>());

				List<usp_BlogPictures_BlogByLinkedIDSelect_Result> blogpicturesModelList = entity.usp_BlogPictures_BlogByLinkedIDSelect(id).ToList();
				table.BlogPicturesList.AddRange(blogpicturesModelList.ChangeModelList<BlogPictures, usp_BlogPictures_BlogByLinkedIDSelect_Result>());

				List<usp_BlogComments_BlogByLinkedIDSelect_Result> blogcommentsModelList = entity.usp_BlogComments_BlogByLinkedIDSelect(id).ToList();
				table.BlogCommentsList.AddRange(blogcommentsModelList.ChangeModelList<BlogComments, usp_BlogComments_BlogByLinkedIDSelect_Result>());

				List<usp_BlogT_BlogByLinkedIDSelect_Result> blogtModelList = entity.usp_BlogT_BlogByLinkedIDSelect(id).ToList();
				table.BlogTList.AddRange(blogtModelList.ChangeModelList<BlogT, usp_BlogT_BlogByLinkedIDSelect_Result>());
			}

			return table;
		}

		public IBlog SelectByUrl(string url, bool relation = true)
		{
			usp_BlogSelectByUrl_Result tableTemp = entity.usp_BlogSelectByUrl(url).FirstOrDefault();
			Blog table = tableTemp.ChangeModel<Blog>();

			if (relation)
			{
				List<usp_BlogCategorySelect_Result> tableBlogCategory = entity.usp_BlogCategorySelect(null).ToList();
				table.BlogCategoryList = tableBlogCategory.ToSelectList<usp_BlogCategorySelect_Result, SelectListItem>("ID", "Title", table.BlogCatID);

                List<usp_WorkersSelect_Result> tableWorkers = entity.usp_WorkersSelect(null).ToList();
                table.WorkersList = tableWorkers.ToSelectList<usp_WorkersSelect_Result, SelectListItem>("ID", "NameSurname", table.Sender);

                List<usp_BlogVideos_BlogByLinkedIDSelect_Result> blogvideosModelList = entity.usp_BlogVideos_BlogByLinkedIDSelect(table.ID).ToList();
				table.BlogVideosList.AddRange(blogvideosModelList.ChangeModelList<BlogVideos, usp_BlogVideos_BlogByLinkedIDSelect_Result>());

				List<usp_BlogPictures_BlogByLinkedIDSelect_Result> blogpicturesModelList = entity.usp_BlogPictures_BlogByLinkedIDSelect(table.ID).ToList();
				table.BlogPicturesList.AddRange(blogpicturesModelList.ChangeModelList<BlogPictures, usp_BlogPictures_BlogByLinkedIDSelect_Result>());

				List<usp_BlogComments_BlogByLinkedIDSelect_Result> blogcommentsModelList = entity.usp_BlogComments_BlogByLinkedIDSelect(table.ID).ToList();
				table.BlogCommentsList.AddRange(blogcommentsModelList.ChangeModelList<BlogComments, usp_BlogComments_BlogByLinkedIDSelect_Result>());

				List<usp_BlogT_BlogByLinkedIDSelect_Result> blogtModelList = entity.usp_BlogT_BlogByLinkedIDSelect(table.ID).ToList();
				table.BlogTList.AddRange(blogtModelList.ChangeModelList<BlogT, usp_BlogT_BlogByLinkedIDSelect_Result>());
			}

			return table;
		}

		public List<Blog> SelectByCode(string code, bool relation = true)
		{
			List<usp_BlogSelectByCode_Result> tableTemp = entity.usp_BlogSelectByCode(code).ToList();
			List<Blog> table = tableTemp.ChangeModelList<Blog, usp_BlogSelectByCode_Result>();

			if (relation)
			{
				foreach(Blog item in table)
				{
					List<usp_BlogCategorySelect_Result> tableBlogCategory = entity.usp_BlogCategorySelect(null).ToList();
					item.BlogCategoryList = tableBlogCategory.ToSelectList<usp_BlogCategorySelect_Result, SelectListItem>("ID", "Title", item.BlogCatID);

                    List<usp_WorkersSelect_Result> tableWorkers = entity.usp_WorkersSelect(null).ToList();
                    item.WorkersList = tableWorkers.ToSelectList<usp_WorkersSelect_Result, SelectListItem>("ID", "NameSurname", item.Sender);

                    List<usp_BlogVideos_BlogByLinkedIDSelect_Result> blogvideosModelList = entity.usp_BlogVideos_BlogByLinkedIDSelect(item.ID).ToList();
					item.BlogVideosList.AddRange(blogvideosModelList.ChangeModelList<BlogVideos, usp_BlogVideos_BlogByLinkedIDSelect_Result>());

					List<usp_BlogPictures_BlogByLinkedIDSelect_Result> blogpicturesModelList = entity.usp_BlogPictures_BlogByLinkedIDSelect(item.ID).ToList();
					item.BlogPicturesList.AddRange(blogpicturesModelList.ChangeModelList<BlogPictures, usp_BlogPictures_BlogByLinkedIDSelect_Result>());

					List<usp_BlogComments_BlogByLinkedIDSelect_Result> blogcommentsModelList = entity.usp_BlogComments_BlogByLinkedIDSelect(item.ID).ToList();
					item.BlogCommentsList.AddRange(blogcommentsModelList.ChangeModelList<BlogComments, usp_BlogComments_BlogByLinkedIDSelect_Result>());

					List<usp_BlogT_BlogByLinkedIDSelect_Result> blogtModelList = entity.usp_BlogT_BlogByLinkedIDSelect(item.ID).ToList();
					item.BlogTList.AddRange(blogtModelList.ChangeModelList<BlogT, usp_BlogT_BlogByLinkedIDSelect_Result>());
				}
			}

			return table;
		}

		public IBlog Insert(IBlog table = null, int? blogCatID = null, int? sender = null)
		{
			if (table == null)
				table = new Blog();

			List<usp_BlogCategorySelect_Result> tableBlogCategory = entity.usp_BlogCategorySelect(null).ToList();
			table.BlogCategoryList = tableBlogCategory.ToSelectList<usp_BlogCategorySelect_Result, SelectListItem>("ID",  "Title", blogCatID);

            List<usp_WorkersSelect_Result> tableWorkers = entity.usp_WorkersSelect(null).ToList();
            table.WorkersList = tableWorkers.ToSelectList<usp_WorkersSelect_Result, SelectListItem>("ID", "NameSurname", sender);

            return table;
		}

		public bool Insert(IBlog table)
		{
			table.Url = table.Title.ToUrl();
            table.SendDate = DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString();
            table.Tags = table.Tags.Trim().Replace("  ", " ").Replace(", ", ",");

            var result = entity.usp_BlogInsert(table.BlogCatID, table.Title, table.Code, table.Url, table.Sender, table.SendDate, table.PictureUrl, table.Tags).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public IBlog Update(int? id = null, IBlog table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}
			else
			{
				List<usp_BlogCategorySelect_Result> tableBlogCategory = entity.usp_BlogCategorySelect(null).ToList();
				table.BlogCategoryList = tableBlogCategory.ToSelectList<usp_BlogCategorySelect_Result, SelectListItem>("ID", "Title", table.BlogCatID);

                List<usp_WorkersSelect_Result> tableWorkers = entity.usp_WorkersSelect(null).ToList();
                table.WorkersList = tableWorkers.ToSelectList<usp_WorkersSelect_Result, SelectListItem>("ID", "NameSurname", table.Sender);

                List<usp_BlogVideos_BlogByLinkedIDSelect_Result> blogvideosModelList = entity.usp_BlogVideos_BlogByLinkedIDSelect(table.ID).ToList();
				table.BlogVideosList.AddRange(blogvideosModelList.ChangeModelList<BlogVideos, usp_BlogVideos_BlogByLinkedIDSelect_Result>());

				List<usp_BlogPictures_BlogByLinkedIDSelect_Result> blogpicturesModelList = entity.usp_BlogPictures_BlogByLinkedIDSelect(table.ID).ToList();
				table.BlogPicturesList.AddRange(blogpicturesModelList.ChangeModelList<BlogPictures, usp_BlogPictures_BlogByLinkedIDSelect_Result>());

				List<usp_BlogComments_BlogByLinkedIDSelect_Result> blogcommentsModelList = entity.usp_BlogComments_BlogByLinkedIDSelect(table.ID).ToList();
				table.BlogCommentsList.AddRange(blogcommentsModelList.ChangeModelList<BlogComments, usp_BlogComments_BlogByLinkedIDSelect_Result>());

				List<usp_BlogT_BlogByLinkedIDSelect_Result> blogtModelList = entity.usp_BlogT_BlogByLinkedIDSelect(table.ID).ToList();
				table.BlogTList.AddRange(blogtModelList.ChangeModelList<BlogT, usp_BlogT_BlogByLinkedIDSelect_Result>());

			}

			return table;
		}

		public bool Update(IBlog table)
		{
			table.Url = table.Title.ToUrl();
            table.SendDate = DateTime.Now.ToShortDateString() + " " + DateTime.Now.ToShortTimeString();
            table.Tags = table.Tags.Trim().Replace("  ", " ").Replace(", ", ",");

            var result = entity.usp_BlogUpdate(table.ID, table.BlogCatID, table.Title, table.Code, table.Url, table.Sender, table.SendDate, table.PictureUrl, table.Tags).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_BlogCopy(id).FirstOrDefault();

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
				entity.usp_BlogDelete(id);

				return true;
			}
			catch
			{
				return false;
			}
		}

        #endregion

        #region User Defined

        public List<sp_BlogDetailSelect_Result> DetailSelect(int? sender = null, int? transID = null, int? top = null)
        {
            sender = sender < 0 ? null : sender;
            List<sp_BlogDetailSelect_Result> table = entity.sp_BlogDetailSelect(sender, transID, top).ToList();

            return table;
        }

        public sp_BlogDetailByUrlSelect_Result DetailSelectByUrl(string url, int? transID = null)
        {
            sp_BlogDetailByUrlSelect_Result table = entity.sp_BlogDetailByUrlSelect(url, transID).FirstOrDefault();

            return table;
        }

        public List<sp_BlogDetailByCodeSelect_Result> DetailSelectByCode(string code, int? transID = null, int? top = null)
        {
            List<sp_BlogDetailByCodeSelect_Result> table = entity.sp_BlogDetailByCodeSelect(code, transID, top).ToList();

            return table;
        }

        public List<sp_BlogPopularSelect_Result> PopularSelect(int? transID = null, int? top = null)
        {
            List<sp_BlogPopularSelect_Result> table = entity.sp_BlogPopularSelect(transID, top).ToList();

            return table;
        }

        public List<sp_BlogSimilarSelect_Result> SimilarSelect(string tags, int? transID = null, int? top = null)
        {
            List<sp_BlogSimilarSelect_Result> table = entity.sp_BlogSimilarSelect(tags, transID, top).ToList();

            return table;
        }

        #endregion
    }
}
