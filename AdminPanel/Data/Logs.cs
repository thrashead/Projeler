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
    
    public partial class Logs
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public int LogProcessID { get; set; }
        public string ProcessTime { get; set; }
        public string Description { get; set; }
    
        public virtual LogProcess LogProcess { get; set; }
        public virtual Users Users { get; set; }
    }
}
