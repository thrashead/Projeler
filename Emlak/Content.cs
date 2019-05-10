//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Emlak
{
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;

    public partial class Content
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Content()
        {
            this.ContentLang = new HashSet<ContentLang>();
        }

        public int ID { get; set; }
        public string ContentName { get; set; }
        public string Code { get; set; }
        public bool Active { get; set; }
        public Nullable<System.DateTime> AddDate { get; set; }
        public Nullable<int> AddUser { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
        public Nullable<int> UpdateUser { get; set; }
        public Nullable<int> Queue { get; set; }
        public string RouteUrl { get; set; }

        public dynamic AggColumn { get; set; }
        public dynamic Sample { get; set; }

        [JsonIgnore]
        public virtual Users Users { get; set; }
        [JsonIgnore]
        public virtual Users Users1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        [JsonIgnore]
        public virtual ICollection<ContentLang> ContentLang { get; set; }
    }
}
