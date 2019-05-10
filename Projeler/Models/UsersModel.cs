using System;
using TDFramework.Common.TDModel;
using TDFramework.Common.Attributes;

namespace Models.UsersModel
{
	public class Users : ITDModel
	{
		[PKey]
		[IDColumn]
		public int ID { get; set; }
		public string Username { get; set; }
		public string Password { get; set; }
		public bool? Active { get; set; }

		[AggregateColumn]
		public dynamic AggColumn { get; set; }
	}

	public enum UsersColumns
	{
		ID,
		Username,
		Password,
		Active
	}
}
