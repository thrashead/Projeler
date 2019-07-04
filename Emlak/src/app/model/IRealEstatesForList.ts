import { IRealEstates } from './IRealEstates';

export interface IRealEstatesForList {
    DetayLogo: string,
    Baslik: string,
    Adet: number,
    SayfaSayisi: number,
    Sayfa: number,
    Pictures: Array<IRealEstates>
}