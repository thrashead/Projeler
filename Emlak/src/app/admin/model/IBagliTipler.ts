import { IBaglantilar } from './IBaglantilar';

export interface IBagliTipler {
    ID: number,
    //[Required(ErrorMessage = "Baþlýk alaný boþ olamaz ve en fazla 50 karakter olmalýdýr.")]
    //[StringLength(50)]
    Title: string,
    //[Required(ErrorMessage = "Ana Tip alaný boþ olamaz.")]
    MainTypeID: number,
    //[Required(ErrorMessage = "Ana Nesne alaný boþ olamaz.")]
    MainID: number,
    //[Required(ErrorMessage = "Baðlanacak Tip alaný boþ olamaz.")]
    LinkedTypeID: number,
    Url: string,

    Mesaj: string,

    MainTypeList: any[],
    LinkedTypeList: any[],
    MainList: any[],
    LinkList: Array<IBaglantilar>,

    MainAdi: string,
    MainCategoryAdi: string,
    MainContentAdi: string,
    MainProductAdi: string,
    MainGalleryAdi: string,
    MainPictureAdi: string,
    MainFileAdi: string,
    MainMetaAdi: string,
    MainPropertyGroupAdi: string,
    MainRealEstatesAdi: string
}