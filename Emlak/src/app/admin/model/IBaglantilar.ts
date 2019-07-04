export interface IBaglantilar {
    ID: number,
    //[Required(ErrorMessage = "Ba�l� Tip alan� bo� olamaz.")]
    LinkTypeID: number,
    //[Required(ErrorMessage = "Ba�l� Nesne alan� bo� olamaz.")]
    LinkID: number,

    Mesaj: string,

    LinkTypesList: string[],
    LinkedItemList: string[],

    LinkedTypeID: number,
    LinkedTypeAdi: string,

    LinkedAdi: string,
    LinkedCategoryAdi: string,
    LinkedContentAdi: string,
    LinkedProductAdi: string,
    LinkedGalleryAdi: string,
    LinkedPictureAdi: string,
    LinkedFileAdi: string,
    LinkedMetaAdi: string,
    LinkedPropertyGroupAdi: string
}
