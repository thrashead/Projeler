//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Emlak.Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class Property
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Property()
        {
            this.PropertyDetails = new HashSet<PropertyDetails>();
            this.PropertyFeatures = new HashSet<PropertyFeatures>();
            this.PropertyPictures = new HashSet<PropertyPictures>();
            this.PropertyT = new HashSet<PropertyT>();
        }
    
        public int ID { get; set; }
        public string Title { get; set; }
        public string Code { get; set; }
        public string Url { get; set; }
        public int Price { get; set; }
        public bool Forsale { get; set; }
        public Nullable<bool> NewBrand { get; set; }
        public Nullable<bool> PropOfDay { get; set; }
        public bool Active { get; set; }
        public bool Deleted { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PropertyDetails> PropertyDetails { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PropertyFeatures> PropertyFeatures { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PropertyPictures> PropertyPictures { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PropertyT> PropertyT { get; set; }
    }
}
