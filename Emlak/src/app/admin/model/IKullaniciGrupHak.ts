export interface IKullaniciGrupHak {
    ID: number,
    //[Required(ErrorMessage = "Kullanýcý Grubu Tablosu alaný boþ olamaz.")]
    UserGroupTableID: number,
    //[Required(ErrorMessage = "Kullanýcý Grubu Ýþlemi alaný boþ olamaz.")]
    UserGroupProcessID: number,
    Allow: boolean,

    Mesaj: string,

    UserGroupTablesList: string[],
    UserGroupProcessList: string[],

    UserGroupTablesAdi: string,
    UserGroupProcessAdi: string
}