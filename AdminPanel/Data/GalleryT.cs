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
    
    public partial class GalleryT
    {
        public int ID { get; set; }
        public int GalID { get; set; }
        public int TransID { get; set; }
        public string GalleryName { get; set; }
        public string ShortText1 { get; set; }
        public string ShortText2 { get; set; }
        public string Description { get; set; }
        public bool Deleted { get; set; }
    
        public virtual Gallery Gallery { get; set; }
        public virtual Translation Translation { get; set; }
    }
}