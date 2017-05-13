export class ItunesAppInfo {

  trackViewUrl: string;
  currency: string;
  artistId: number;
  price: number;
  trackId: number;
  trackName: string;
  formattedPrice: string;

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