export interface IKullaniciGrupTablo {
    ID: number,
    //[Required(ErrorMessage = "Tablo alan� bo� olamaz.")]
    TypeID: number,
    //[Required(ErrorMessage = "Kullan�c� Grubu alan� bo� olamaz.")]
    UserGroupID: number,

    Mesaj: string,

    TypesList: any[],
    UserGroupsList: any[],

    TypeAdi: string,
    UserGroupAdi: string
}
