using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using RentACar.Data;
using TDLibrary;
using Repository.LangContentTModel;
using Models;
using Cacher = System.Web.HttpRuntime;
using System.Web.Caching;

namespace Repository.LangContentModel
{
    public class LangContent : ILangContent
    {
        readonly RentACarEntities entity = new RentACarEntities();

        #region Model

        public LangContent()
        {
            LangContentTList = new List<ILangContentT>();
        }

        public int ID { get; set; }
        [Required(ErrorMessage = "Title alanı boş olamaz ve en fazla 255 karakter olmalıdır.")]
        [StringLength(255)]
        public string Title { get; set; }
        [Required(ErrorMessage = "Code alanı boş olamaz ve en fazla 25 karakter olmalıdır.")]
        [StringLength(25)]
        public string Code { get; set; }
        public string ShortCode { get; set; }

        public string Mesaj { get; set; }

        public List<ILangContentT> LangContentTList { get; set; }

        #endregion

        #region Methods

        public List<LangContent> List(int? id = null, int? top = null, bool relation = true)
        {
            List<LangContent> table;

            List<usp_LangContentSelect_Result> tableTemp;
            List<usp_LangContentSelectTop_Result> tableTopTemp;

            if (top == null)
            {
                tableTemp = entity.usp_LangContentSelect(id).ToList();
                table = tableTemp.ChangeModelList<LangContent, usp_LangContentSelect_Result>();
            }
            else
            {
                tableTopTemp = entity.usp_LangContentSelectTop(id, top).ToList();
                table = tableTopTemp.ChangeModelList<LangContent, usp_LangContentSelectTop_Result>();
            }

            if (relation)
            {
                foreach (LangContent item in table)
                {
                    List<usp_LangContentT_LangContentByLinkedIDSelect_Result> langcontenttModelList = entity.usp_LangContentT_LangContentByLinkedIDSelect(item.ID).ToList();
                    item.LangContentTList.AddRange(langcontenttModelList.ChangeModelList<LangContentT, usp_LangContentT_LangContentByLinkedIDSelect_Result>());
                }
            }

            return table;
        }

        public List<LangContent> ListAll(int? id = null, bool relation = true)
        {
            List<LangContent> table;

            List<usp_LangContentSelectAll_Result> tableTemp;

            tableTemp = entity.usp_LangContentSelectAll(id).ToList();
            table = tableTemp.ChangeModelList<LangContent, usp_LangContentSelectAll_Result>();

            if (relation)
            {
                foreach (LangContent item in table)
                {
                    List<usp_LangContentT_LangContentByLinkedIDSelect_Result> langcontenttModelList = entity.usp_LangContentT_LangContentByLinkedIDSelect(item.ID).ToList();
                    item.LangContentTList.AddRange(langcontenttModelList.ChangeModelList<LangContentT, usp_LangContentT_LangContentByLinkedIDSelect_Result>());
                }
            }

            return table;
        }

        public ILangContent Select(int? id, bool relation = true)
        {
            usp_LangContentSelectTop_Result tableTemp = entity.usp_LangContentSelectTop(id, 1).FirstOrDefault();
            LangContent table = tableTemp.ChangeModel<LangContent>();

            if (relation)
            {
                List<usp_LangContentT_LangContentByLinkedIDSelect_Result> langcontenttModelList = entity.usp_LangContentT_LangContentByLinkedIDSelect(id).ToList();
                table.LangContentTList.AddRange(langcontenttModelList.ChangeModelList<LangContentT, usp_LangContentT_LangContentByLinkedIDSelect_Result>());
            }

            return table;
        }

        public List<LangContent> SelectByCode(string code, bool relation = true)
        {
            List<usp_LangContentSelectByCode_Result> tableTemp = entity.usp_LangContentSelectByCode(code).ToList();
            List<LangContent> table = tableTemp.ChangeModelList<LangContent, usp_LangContentSelectByCode_Result>();

            if (relation)
            {
                foreach (LangContent item in table)
                {
                    List<usp_LangContentT_LangContentByLinkedIDSelect_Result> langcontenttModelList = entity.usp_LangContentT_LangContentByLinkedIDSelect(item.ID).ToList();
                    item.LangContentTList.AddRange(langcontenttModelList.ChangeModelList<LangContentT, usp_LangContentT_LangContentByLinkedIDSelect_Result>());
                }
            }

            return table;
        }

        public List<LangContent> SelectByShortCode(string code, bool relation = true)
        {
            List<usp_LangContentSelectByShortCode_Result> tableTemp = entity.usp_LangContentSelectByShortCode(code).ToList();
            List<LangContent> table = tableTemp.ChangeModelList<LangContent, usp_LangContentSelectByShortCode_Result>();

            if (relation)
            {
                foreach (LangContent item in table)
                {
                    List<usp_LangContentT_LangContentByLinkedIDSelect_Result> langcontenttModelList = entity.usp_LangContentT_LangContentByLinkedIDSelect(item.ID).ToList();
                    item.LangContentTList.AddRange(langcontenttModelList.ChangeModelList<LangContentT, usp_LangContentT_LangContentByLinkedIDSelect_Result>());
                }
            }

            return table;
        }

        public ILangContent Insert(ILangContent table = null, bool? none = null)
        {
            if (table == null)
                table = new LangContent();

            return table;
        }

        public bool Insert(ILangContent table)
        {
            var result = entity.usp_LangContentInsert(table.Title, table.Code, table.ShortCode).FirstOrDefault();

            if (result != null)
                return true;
            else
                return false;
        }

        public ILangContent Update(int? id = null, ILangContent table = null)
        {
            if (table == null)
            {
                table = Select(id);
            }
            else
            {
                List<usp_LangContentT_LangContentByLinkedIDSelect_Result> langcontenttModelList = entity.usp_LangContentT_LangContentByLinkedIDSelect(table.ID).ToList();
                table.LangContentTList.AddRange(langcontenttModelList.ChangeModelList<LangContentT, usp_LangContentT_LangContentByLinkedIDSelect_Result>());
            }

            return table;
        }

        public bool Update(ILangContent table)
        {
            var result = entity.usp_LangContentUpdate(table.ID, table.Title, table.Code, table.ShortCode).FirstOrDefault();

            if (result != null)
                return true;
            else
                return false;
        }

        public bool Copy(int id)
        {
            try
            {
                var result = entity.usp_LangContentCopy(id).FirstOrDefault();

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
                entity.usp_LangContentDelete(id);

                return true;
            }
            catch
            {
                return false;
            }
        }

        #endregion

        #region User Defined

        public List<sp_LangContentDetailSelect_Result> DetailSelect(List<LangItem> codes, int? transID = null)
        {
            List<sp_LangContentDetailSelect_Result> returnTable;

            if (Cacher.Cache["LangContents"] == null)
            {
                List<sp_LangContentDetailSelect_Result> table = entity.sp_LangContentDetailSelect().ToList();

                Cacher.Cache.Insert("LangContents", table, null, DateTime.Now.AddMinutes(15), Cache.NoSlidingExpiration, CacheItemPriority.Default, null);
            }

            returnTable = Cacher.Cache["LangContents"] as List<sp_LangContentDetailSelect_Result>;

            if (transID != null)
            {
                returnTable = returnTable.Where(a => a.TransID == transID).ToList();
            }

            List<sp_LangContentDetailSelect_Result> tempTable = new List<sp_LangContentDetailSelect_Result>();

            foreach (LangItem item in codes)
            {
                if (item.Code != null && item.ShortCode != null)
                    tempTable.AddRange(returnTable.Where(a => a.ShortCode == item.ShortCode && a.Code == item.Code).ToList());
                else if (item.Code != null && item.ShortCode == null)
                    tempTable.AddRange(returnTable.Where(a => a.Code == item.Code).ToList());
                else if (item.Code == null && item.ShortCode != null)
                    tempTable.AddRange(returnTable.Where(a => a.ShortCode == item.ShortCode).ToList());
            }

            returnTable = tempTable;

            return returnTable;
        }

        public List<sp_LangContentDetailSelectByCode_Result> DetailSelectByCode(string code, int transID, int? top = null)
        {
            List<sp_LangContentDetailSelectByCode_Result> table = entity.sp_LangContentDetailSelectByCode(code, transID, top).ToList();

            return table;
        }

        public List<sp_LangContentDetailSelectByShortCode_Result> DetailSelectByShortCode(string shortCode, int transID, int? top = null)
        {
            List<sp_LangContentDetailSelectByShortCode_Result> table = entity.sp_LangContentDetailSelectByShortCode(shortCode, transID, top).ToList();

            return table;
        }

        public List<sp_LangContentDetailSelectByCodeAndShortCode_Result> DetailSelectByCodeAndShortCode(string code, string shortCode, int transID, int? top = null)
        {
            List<sp_LangContentDetailSelectByCodeAndShortCode_Result> table = entity.sp_LangContentDetailSelectByCodeAndShortCode(code, shortCode, transID, top).ToList();

            return table;
        }

        #endregion
    }
}
