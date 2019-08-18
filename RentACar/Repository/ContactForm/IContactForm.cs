using System;
using System.Collections.Generic;

namespace Repository.ContactFormModel
{
	public interface IContactForm
	{
		#region Model

		int ID { get; set; }
		string Sender { get; set; }
		string Mail { get; set; }
		string Phone { get; set; }
		string Message { get; set; }
		string SendDate { get; set; }
		bool Deleted { get; set; }

		string Mesaj { get; set; }

		#endregion

		#region Methods

		List<ContactForm> List(int? id, int? top, bool relation);
		List<ContactForm> ListAll(int? id, bool relation);
		IContactForm Select(int? id, bool relation);
		IContactForm Insert(IContactForm table, bool? none);
		bool Insert(IContactForm table);
		IContactForm Update(int? id, IContactForm table);
		bool Update(IContactForm table);
		bool Copy(int id);
		bool Delete(int? id);
		bool Remove(int? id);

		#endregion
	}
}
