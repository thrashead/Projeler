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
    
    public partial class BodyProgram
    {
        public int ID { get; set; }
        public int EgzersizID { get; set; }
        public int GunID { get; set; }
        public int AgirlikTipID { get; set; }
        public int Set { get; set; }
        public string Tekrar { get; set; }
        public decimal Agirlik { get; set; }
    
        public virtual BodyAgirlikTip BodyAgirlikTip { get; set; }
        public virtual BodyEgzersiz BodyEgzersiz { get; set; }
        public virtual BodyGun BodyGun { get; set; }
    }
}
