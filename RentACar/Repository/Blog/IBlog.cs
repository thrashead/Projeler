using System.Collections.Generic;
using System.Web.Mvc;
using Repository.BlogVideosModel;
using Repository.BlogPicturesModel;
using Repository.BlogCommentsModel;
using Repository.BlogTModel;

namespace Repository.BlogModel
{
	public interface IBlog
	{
		#region Model

		int ID { get; set; }
		int BlogCatID { get; set; }
		string Title { get; set; }
		string Code { get; set; }
		string Url { get; set; }
        int Sender { get; set; }
		string SendDate { get; set; }
		string PictureUrl { get; set; }
		int? ReadTime { get; set; }

		string Mesaj { get; set; }

		string OldPictureUrl { get; set; }

		bool? HasFile { get; set; }

		List<IBlogVideos> BlogVideosList { get; set; }
		List<IBlogPictures> BlogPicturesList { get; set; }
		List<IBlogComments> BlogCommentsList { get; set; }
		List<IBlogT> BlogTList { get; set; }

		List<SelectListItem> BlogCategoryList { get; set; }
        List<SelectListItem> WorkersList { get; set; }

		string BlogCategoryAdi { get; set; }
        string WorkersAdi { get; set; }

        #endregion

        #region Methods

        List<Blog> List(int? id, int? top, bool relation);
		List<Blog> ListAll(int? id, bool relation);
		IBlog Select(int? id, bool relation);
		IBlog SelectByUrl(string url, bool relation);
		List<Blog> SelectByCode(string code, bool relation);
		IBlog Insert(IBlog table, int? blogCatID, int? sender);
		bool Insert(IBlog table);
		IBlog Update(int? id, IBlog table);
		bool Update(IBlog table);
		bool Copy(int id);
		bool Delete(int? id);

		#endregion
	}
}
