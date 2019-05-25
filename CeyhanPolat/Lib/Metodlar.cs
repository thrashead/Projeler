using CeyhanPolat.Data;
using System.Collections.Generic;
using System.Linq;

namespace CeyhanPolat.Lib
{
    public class Metodlar
    {
        
    }

    public class ClearPoetrySearch
    {
        public bool Visible { get; set; }
        public string Text { get; set; }
    }

    public class Poetries
    {
        public Poetries()
        {
            CPoetryName = new ClearPoetrySearch();
            CFirstDate = new ClearPoetrySearch();
            CLastDate = new ClearPoetrySearch();
            CPoetryContainer = new ClearPoetrySearch();
        }

        public int ID { get; set; }
        public int PoetryID { get; set; }
        public int? RankID { get; set; }
        public int PoetryLangID { get; set; }
        public string PoetryName { get; set; }
        public string Poetry { get; set; }
        public string Date { get; set; }
        public string City { get; set; }
        public string RouteUrl { get; set; }
        public string Picture { get; set; }
        public List<RankPoint> Reviews { get; set; }
        public int? Queue { get; set; }
        public ClearPoetrySearch CPoetryName { get; set; }
        public ClearPoetrySearch CFirstDate { get; set; }
        public ClearPoetrySearch CLastDate { get; set; }
        public ClearPoetrySearch CPoetryContainer { get; set; }

        public static List<Poetries> GettAllPoetries()
        {
            List<Poetries> _poetList = new List<Poetries>();

            ceyhanpolatdbEntities entity = new ceyhanpolatdbEntities();

            var poetries = entity.sp_Poetries(null, null, null).ToList();

            foreach (var item in poetries)
            {
                var contentlang = entity.ContentLang.Where(a => a.ContentID == item.ID).FirstOrDefault();

                Poetries _poetry = new Poetries();
                _poetry.PoetryID = item.ID;
                _poetry.RouteUrl = item.RouteUrl;
                _poetry.PoetryName = item.Baslik;
                _poetry.PoetryLangID = contentlang.ID;
                _poetry.Date = contentlang.Code;
                _poetry.City = contentlang.ShortText;

                _poetList.Add(_poetry);
            }

            return _poetList;
        }
    }

    public class SearchPoetryJson
    {
        public string FirstDate { get; set; }
        public string LastDate { get; set; }
        public string PoetryName { get; set; }
    }
}