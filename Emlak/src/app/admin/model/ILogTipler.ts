import { ILogIslem } from './ILogIslem';

export interface ILogTipler {
    ID: number,
    //[Required(ErrorMessage = "�sim alan� bo� olamaz ve en fazla 50 karakter olmal�d�r.")]
    //[StringLength(50)]
    Name: string,
    //[Required(ErrorMessage = "K�sa �sim alan� bo� olamaz ve en fazla 5 karakter olmal�d�r.")]
    //[StringLength(5)]
    ShortName: string,
    Description: string,

    Mesaj: string,

    LogProcessList: Array<ILogIslem>
}
