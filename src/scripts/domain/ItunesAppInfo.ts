export class ItunesAppInfo {

  trackViewUrl: string;
  currency: string;
  artistId: number;
  price: number;
  trackId: number;
  trackName: string;
  formattedPrice: string;

  static create(input: any): ItunesAppInfo {
    let result = new ItunesAppInfo();
    result.trackId = input.trackId;
    result.trackViewUrl = input.trackViewUrl;
    result.price = input.price;
    result.trackName = input.trackName;
    result.formattedPrice = input.formattedPrice;
    return result;
  }

  static sort(first: ItunesAppInfo, second: ItunesAppInfo): number {
    if (first.trackName < second.trackName) {
      return -1;
    }
    if (first.trackName > second.trackName) {
      return 1;
    }
    return 0
  }
}