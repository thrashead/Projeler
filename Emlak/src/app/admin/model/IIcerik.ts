import { IIcerikDil } from './IIcerikDil';

export interface IIcerik {
    ID: number,
    //[Required(ErrorMessage = "Baþlýk alaný boþ olamaz ve en fazla 255 karakter olmalýdýr.")]
    //[StringLength(255)]
    Title: string,
    Url: string,
    Code: string,
    Active: boolean,
    Deleted: boolean,

    Mesaj: string,

    ContentTList: Array<IIcerikDil>
}