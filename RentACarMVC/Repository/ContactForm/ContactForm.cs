using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using RentACarMVC.Data;
using TDLibrary;

namespace Repository.ContactFormModel
{
	public class ContactForm : IContactForm
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public int ID { get; set; }
		[Required(ErrorMessage = "Sender alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
		[StringLength(255)]
		public string Sender { get; set; }
		[Required(ErrorMessage = "Mail alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
		[StringLength(255)]
		public string Mail { get; set; }
		[Required(ErrorMessage = "Phone alanı boş olamaz ve en fazla 25 karakter olmalıdır.")]
		[StringLength(25)]
		public string Phone { get; set; }
		[Required(ErrorMessage = "Message alanı boş olamaz ve en fazla 500 karakter olmalıdır.")]
		[StringLength(500)]
		public string Message { get; set; }
		public string SendDate { get; set; }
		public bool Deleted { get; set; }
        public string IPAddress { get; set; }

        public string Mesaj { get; set; }

		#endregion

		#region Methods

		public List<ContactForm> List(int? id = null, int? top = null, bool relation = true)
		{
			List<ContactForm> table;

			List<usp_ContactFormSelect_Result> tableTemp;
			List<usp_ContactFormSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_ContactFormSelect(id).ToList();
				table = tableTemp.ChangeModelList<ContactForm, usp_ContactFormSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_ContactFormSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<ContactForm, usp_ContactFormSelectTop_Result>();
			}

			return table;
		}

		public List<ContactForm> ListAll(int? id = null, bool relation = true)
		{
			List<ContactForm> table;

			List<usp_ContactFormSelectAll_Result> tableTemp;

			tableTemp = entity.usp_ContactFormSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<ContactForm, usp_ContactFormSelectAll_Result>();

			return table;
		}

		public IContactForm Select(int? id, bool relation = true)
		{
			usp_ContactFormSelectTop_Result tableTemp = entity.usp_ContactFormSelectTop(id, 1).FirstOrDefault();
			ContactForm table = tableTemp.ChangeModel<ContactForm>();

			return table;
		}

		public IContactForm Insert(IContactForm table = null, bool? none = null)
		{
			if (table == null)
				table = new ContactForm();

			return table;
		}

		public bool Insert(IContactForm table)
		{
			var result = entity.usp_ContactFormInsert(table.Sender, table.Mail, table.Phone, table.Message, table.SendDate, table.IPAddress).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public IContactForm Update(int? id = null, IContactForm table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}

			return table;
		}

		public bool Update(IContactForm table)
		{
			var result = entity.usp_ContactFormUpdate(table.ID, table.Sender, table.Mail, table.Phone, table.Message, table.SendDate, table.IPAddress).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_ContactFormCopy(id).FirstOrDefault();

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
				entity.usp_ContactFormDelete(id);

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
				entity.usp_ContactFormRemove(id);

				return true;
			}
			catch
			{
				return false;
			}
		}

        #endregion

        #region User Defined

        public DateTime? GetLastDate(string IPAddress)
        {
            DateTime? table = entity.sp_ContactFormLastDate(IPAddress).FirstOrDefault();

            return table;
        }

        #endregion
    }
}
