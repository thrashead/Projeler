export interface IKullaniciGrupHak {
    ID: number,
    //[Required(ErrorMessage = "Kullan�c� Grubu Tablosu alan� bo� olamaz.")]
    UserGroupTableID: number,
    //[Required(ErrorMessage = "Kullan�c� Grubu ��lemi alan� bo� olamaz.")]
    UserGroupProcessID: number,
    Allow: boolean,

    Mesaj: string,

    UserGroupTablesList: any[],
    UserGroupProcessList: any[],

    UserGroupTablesAdi: string,
    UserGroupProcessAdi: string
}