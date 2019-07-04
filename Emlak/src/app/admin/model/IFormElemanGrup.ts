import { IFormEleman } from './IFormEleman';

export interface IFormElemanGrup {
    ID: number,
    //[Required(ErrorMessage = "Ba�l�k alan� bo� olamaz ve en fazla 50 karakter olmal�d�r.")]
    //[StringLength(50)]
    Title: string,
    Description: string,
    Code: string,
    Active: boolean,

    Mesaj: string,

    PropertyList: Array<IFormEleman>
}