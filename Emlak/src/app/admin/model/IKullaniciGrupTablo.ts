export interface IKullaniciGrupTablo {
    ID: number,
    //[Required(ErrorMessage = "Tablo alaný boþ olamaz.")]
    TypeID: number,
    //[Required(ErrorMessage = "Kullanýcý Grubu alaný boþ olamaz.")]
    UserGroupID: number,

    Mesaj: string,

    TypesList: string[],
    UserGroupsList: string[],

    TypeAdi: string,
    UserGroupAdi: string
}
