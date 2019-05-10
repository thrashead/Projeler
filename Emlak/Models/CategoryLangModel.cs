using System;

namespace Models
{
	public class CategoryLangModel
	{
		public int? ID { get; set; }
		public int? ParentID { get; set; }
		public string CategoryName { get; set; }
		public string Code { get; set; }
		public bool Active { get; set; }
		public bool Display { get; set; }
		public DateTime? AddDate { get; set; }
		public int? AddUser { get; set; }
		public DateTime? UpdateDate { get; set; }
		public int? UpdateUser { get; set; }
		public int? Queue { get; set; }
		public string RouteUrl { get; set; }
	}
}
