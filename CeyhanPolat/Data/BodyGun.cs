//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CeyhanPolat.Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class BodyGun
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public BodyGun()
        {
            this.BodyProgram = new HashSet<BodyProgram>();
        }
    
        public int ID { get; set; }
        public int HaftaID { get; set; }
        public System.DateTime Tarih { get; set; }
        public bool Iptal { get; set; }
    
        public virtual BodyHafta BodyHafta { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<BodyProgram> BodyProgram { get; set; }
    }
}