using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using RentACar.Data;
using TDLibrary;

namespace Repository.WorkersModel
{
	public class Workers : IWorkers
	{
		readonly RentACarEntities entity = new RentACarEntities();

		#region Model

		public int ID { get; set; }
		[Required(ErrorMessage = "NameSurname alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
		[StringLength(255)]
		public string NameSurname { get; set; }
		[Required(ErrorMessage = "Position alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
		[StringLength(255)]
		public string Position { get; set; }
		[Required(ErrorMessage = "Description alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
		[StringLength(255)]
		public string Description { get; set; }
		public string PictureUrl { get; set; }
		public bool Deleted { get; set; }

		public string Mesaj { get; set; }

		public string OldPictureUrl { get; set; }

		public bool PictureUrlHasFile { get; set; }

		#endregion

		#region Methods

		public List<Workers> List(int? id = null, int? top = null, bool relation = true)
		{
			List<Workers> table;

			List<usp_WorkersSelect_Result> tableTemp;
			List<usp_WorkersSelectTop_Result> tableTopTemp;

			if (top == null)
			{
				tableTemp = entity.usp_WorkersSelect(id).ToList();
				table = tableTemp.ChangeModelList<Workers, usp_WorkersSelect_Result>();
			}
			else
			{
				tableTopTemp = entity.usp_WorkersSelectTop(id, top).ToList();
				table = tableTopTemp.ChangeModelList<Workers, usp_WorkersSelectTop_Result>();
			}

			return table;
		}

		public List<Workers> ListAll(int? id = null, bool relation = true)
		{
			List<Workers> table;

			List<usp_WorkersSelectAll_Result> tableTemp;

			tableTemp = entity.usp_WorkersSelectAll(id).ToList();
			table = tableTemp.ChangeModelList<Workers, usp_WorkersSelectAll_Result>();

			return table;
		}

		public IWorkers Select(int? id, bool relation = true)
		{
			usp_WorkersSelectTop_Result tableTemp = entity.usp_WorkersSelectTop(id, 1).FirstOrDefault();
			Workers table = tableTemp.ChangeModel<Workers>();

			return table;
		}

		public IWorkers Insert(IWorkers table = null, bool? none = null)
		{
			if (table == null)
				table = new Workers();

			return table;
		}

		public bool Insert(IWorkers table)
		{
			var result = entity.usp_WorkersInsert(table.NameSurname, table.Position, table.Description, table.PictureUrl).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public IWorkers Update(int? id = null, IWorkers table = null)
		{
			if (table == null)
			{
				table = Select(id);
			}

			return table;
		}

		public bool Update(IWorkers table)
		{
			var result = entity.usp_WorkersUpdate(table.ID, table.NameSurname, table.Position, table.Description, table.PictureUrl).FirstOrDefault();

			if(result != null)
				return true;
			else
				return false;
		}

		public bool Copy(int id)
		{
			try
			{
				var result = entity.usp_WorkersCopy(id).FirstOrDefault();

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
				entity.usp_WorkersDelete(id);

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
				entity.usp_WorkersRemove(id);

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
