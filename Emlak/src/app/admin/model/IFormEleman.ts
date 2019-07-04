import { IFormElemanOzellik } from './IFormElemanOzellik';
import { IFormElemanDeger } from './IFormElemanDeger';

export interface IFormEleman {
    ID: number,
    //[Required(ErrorMessage = "�zellik Tipi alan� bo� olamaz.")]
    PropTypeID: number,
    GroupID: number,
    //[Required(ErrorMessage = "Ba�l�k alan� bo� olamaz ve en fazla 50 karakter olmal�d�r.")]
    //[StringLength(50)]
    Title: string,
    Description: string,
    ErrorMessage: string,
    Code: string,
    OrderNumber: number,

    Mesaj: string,

    HasValue: boolean,

    PropertyTypesList: any[],
    PropertyGroupList: any[],

    PropertyAttributesList: Array<IFormElemanOzellik>,
    PropertyValuesList: Array<IFormElemanDeger>
}