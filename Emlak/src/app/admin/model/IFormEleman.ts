import { IFormElemanOzellik } from './IFormElemanOzellik';
import { IFormElemanDeger } from './IFormElemanDeger';

export interface IFormEleman {
    ID: number,
    //[Required(ErrorMessage = "Özellik Tipi alaný boþ olamaz.")]
    PropTypeID: number,
    GroupID: number,
    //[Required(ErrorMessage = "Baþlýk alaný boþ olamaz ve en fazla 50 karakter olmalýdýr.")]
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