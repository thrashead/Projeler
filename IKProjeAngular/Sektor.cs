//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace IKProjeAngular
{
    using System;
    using System.Collections.Generic;
    
    public partial class Sektor
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Sektor()
        {
            this.OzgecmisDeneyim = new HashSet<OzgecmisDeneyim>();
            this.TercihSektor = new HashSet<TercihSektor>();
        }
    
        public int ID { get; set; }
        public string Baslik { get; set; }
        public int Kod { get; set; }
        public bool Aktif { get; set; }
        public string Guid { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OzgecmisDeneyim> OzgecmisDeneyim { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TercihSektor> TercihSektor { get; set; }
    }
}
