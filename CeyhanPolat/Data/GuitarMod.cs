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
    
    public partial class GuitarMod
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public GuitarMod()
        {
            this.GuitarPlanMod = new HashSet<GuitarPlanMod>();
        }
    
        public int ID { get; set; }
        public string Isim { get; set; }
        public string Formul { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<GuitarPlanMod> GuitarPlanMod { get; set; }
    }
}