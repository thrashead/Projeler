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
    
    public partial class ProductT
    {
        public int ID { get; set; }
        public int ProdID { get; set; }
        public int TransID { get; set; }
        public string ProductName { get; set; }
        public string ShortText1 { get; set; }
        public string ShortText2 { get; set; }
        public string Description { get; set; }
        public bool Deleted { get; set; }
    
        public virtual Product Product { get; set; }
        public virtual Translation Translation { get; set; }
    }
}
