//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace RentACar.Data
{
    using System;
    
    public partial class usp_CarReservationSelect_Result
    {
        public int ID { get; set; }
        public int CarID { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string Name { get; set; }
        public string IdentityNo { get; set; }
        public string City { get; set; }
        public string DistrictPostal { get; set; }
        public string Phone { get; set; }
        public string Mail { get; set; }
        public string Address { get; set; }
        public string ProcessDate { get; set; }
        public bool Accepted { get; set; }
    }
}
