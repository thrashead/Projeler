using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TDLibrary;

namespace Lib
{
    internal class AramaNesnesi
    {
        internal AramaNesnesi()
        {
            this.Guid = Guider.GetGuid(true);
            this.Keyword = null;
            this.JobTime = 0;
            this.City = new List<int>();
            this.WorkType = new List<int>();
            this.Sector = new List<int>();
            this.Departmant = new List<int>();
            this.Position = new List<int>();
            this.Education = new List<int>();
            this.Experience = new List<int>();
            this.Other = new List<int>();
            this.Military = 0;
            this.Gender = 0;
        }

        internal string Guid { get; set; }
        internal string Keyword { get; set; }
        internal int JobTime { get; set; }
        internal List<int> City { get; set; }
        internal List<int> WorkType { get; set; }
        internal List<int> Sector { get; set; }
        internal List<int> Departmant { get; set; }
        internal List<int> Position { get; set; }
        internal List<int> Education { get; set; }
        internal List<int> Experience { get; set; }
        internal List<int> Other { get; set; }
        internal int Military { get; set; }
        internal int Gender { get; set; }

        internal AramaNesnesi GetByGuid(string guid)
        {
            return new AramaNesnesi();
        }
    }
}