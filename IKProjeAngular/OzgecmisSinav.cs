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
    
    public partial class OzgecmisSinav
    {
        public int ID { get; set; }
        public int KullaniciID { get; set; }
        public string Baslik { get; set; }
        public string Kurum { get; set; }
        public string Tarih { get; set; }
        public string Puan { get; set; }
        public string Aciklama { get; set; }
        public string Guid { get; set; }
    
        public virtual Kullanici Kullanici { get; set; }
    }
}
