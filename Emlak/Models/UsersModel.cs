using System;

namespace Models
{
    public class UsersModel
	{
		public int? ID { get; set; }
		public string Username { get; set; }
		public string Password { get; set; }
		public bool Active { get; set; }
		public DateTime? AddDate { get; set; }
		public int? AddUser { get; set; }
		public DateTime? UpdateDate { get; set; }
		public int? UpdateUser { get; set; }
		public int? Queue { get; set; }
	}
}
