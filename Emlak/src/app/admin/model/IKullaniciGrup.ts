import { IKullaniciGrupTablo } from './IKullaniciGrupTablo';
import { IKullaniciGrupHak } from './IKullaniciGrupHak';
import { IKullanicilar } from './IKullanicilar';

export interface IKullaniciGrup {
    ID: number,
    //[Required(ErrorMessage = "�sim alan� bo� olamaz ve en fazla 25 karakter olmal�d�r.")]
    //[StringLength(25)]
    Name: string,
    //[Required(ErrorMessage = "K�sa �sim alan� bo� olamaz ve en fazla 5 karakter olmal�d�r.")]
    //[StringLength(5)]
    ShortName: string,
    Description: string,

    Mesaj: string,

    UserGroupTablesList: Array<IKullaniciGrupTablo>,
    UserGroupRightsList: Array<IKullaniciGrupHak>,
    UsersList: Array<IKullanicilar>
}
