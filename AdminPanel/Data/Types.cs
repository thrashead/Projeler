//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AdminPanel.Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class Types
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Types()
        {
            this.LinkTypes = new HashSet<LinkTypes>();
            this.LinkTypes1 = new HashSet<LinkTypes>();
            this.UserGroupTables = new HashSet<UserGroupTables>();
        }
    
        public int ID { get; set; }
        public string TypeName { get; set; }
        public string Url { get; set; }
        public string TableName { get; set; }
        public bool Linkable { get; set; }
        public bool Show { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<LinkTypes> LinkTypes { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<LinkTypes> LinkTypes1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UserGroupTables> UserGroupTables { get; set; }
    }
}
