import { IFormEleman } from './IFormEleman';

export interface IFormElemanGrup {
    ID: number,
    //[Required(ErrorMessage = "Baþlýk alaný boþ olamaz ve en fazla 50 karakter olmalýdýr.")]
    //[StringLength(50)]
    Title: string,
    Description: string,
    Code: string,
    Active: boolean,

    Mesaj: string,

    PropertyList: Array<IFormEleman>
}