using System;
using System.Collections.Generic;
using System.Linq;
using RentACarMVC.Data;
using TDLibrary;

namespace Repository.NewsletterModel
{
	public class Newsletter : INewsletter
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public int ID { get; set; }
		public string Name { get; set; }
		public string Mail { get; set; }
		public bool Active { get; set; }

		public string Mesaj { get; set; }

		#endregion

		#region Methods

		public List<Newsletter> List(int? id = null, int? top = null, bool relation = true)
		{
			List<Newsletter> table;

			List<usp_NewsletterSelect_Result> tableTemp;
			List<usp_NewsletterSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_NewsletterSelect(id).ToList();
				table = tableTemp.ChangeModelList<Newsletter, usp_NewsletterSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_NewsletterSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<Newsletter, usp_NewsletterSelectTop_Result>();
			}

			return table;
		}

		public List<Newsletter> ListAll(int? id = null, bool relation = true)
		{
			List<Newsletter> table;

			List<usp_NewsletterSelectAll_Result> tableTemp;

			tableTemp = entity.usp_NewsletterSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<Newsletter, usp_NewsletterSelectAll_Result>();

			return table;
		}

		public INewsletter Select(int? id, bool relation = true)
		{
			usp_NewsletterSelectTop_Result tableTemp = entity.usp_NewsletterSelectTop(id, 1).FirstOrDefault();
			Newsletter table = tableTemp.ChangeModel<Newsletter>();

			return table;
		}

		public INewsletter Insert(INewsletter table = null, bool? none = null)
		{
			if (table == null)
				table = new Newsletter();

			return table;
		}

		public bool Insert(INewsletter table)
		{
			var result = entity.usp_NewsletterInsert(table.Name, table.Mail, table.Active).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public INewsletter Update(int? id = null, INewsletter table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}

			return table;
		}

		public bool Update(INewsletter table)
		{
			var result = entity.usp_NewsletterUpdate(table.ID, table.Name, table.Mail, table.Active).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_NewsletterCopy(id).FirstOrDefault();

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
				entity.usp_NewsletterDelete(id);

				return true;
			}
			catch
			{
				return false;
			}
		}

		#endregion
	}
}
