import {CouchDbService} from "./CouchService";
import {ITunesService} from "./ITunesService";
import {ItunesAppInfo} from "./ItunesAppInfo";
import {LowDbService} from "./LowDbService";

export class ITunesDbService extends LowDbService {

  insertUrlToDb(url: string): Promise<any> {

    if (url.startsWith('http')) {
      url = url.replace(">", "").replace("<", "");
    }
    else {
      url = 'https://itunes.apple.com/de/lookup?id=' + url
    }
    return new Promise((resolve, rejected) => {
      // TODO MGe - check if is valid itunes url
      ITunesService.retrieveUrlInfo(url)
        .then((appInfo: ItunesAppInfo) => this.insertAppInfo(appInfo, url), (error) => console.log(error))
        .then(
          (result) => {
            console.log(`*${url}* korrekt eingefügt`),// TODO poste(`*${url}* korrekt eingefügt`),
              resolve(url);
          },
          (error) => console.log('eintrag fehlerhaft einfügen', error)
        );
      // TODO MGe - in der letzten Ausgabe nochmal den Titel mit auusgeben,vermutlich vorher den titel holen
    })

  }

  getUrlInfos(): Promise<any> {

    return new Promise((resolve, rejected) => {
      this.getAllUrls().then((urls: any[]) => {
          console.log(urls);
          let urlInfoPromises = urls.map(ITunesService.retrieveUrlInfo);
          resolve(Promise.all(urlInfoPromises));
        },
        (error) => console.log("FEHLER", error)
      );
    });
  }

  getAppPreis(id: number): Promise<number> {
    return this.getEntryPrice(id);

  }

  // this.couch.getAllUrls().then((urls) => {
  //     let urlInfoPromises = urls.map(ITunesService.retrieveUrlInfo);
  //     Promise.all(urlInfoPromises).then(performComparison);
  //   },
  //   (error) => console.log("FEHLER", error)
  // )
  // }
  insertAppInfo(appInfo: ItunesAppInfo, url) {
    return this.insertToDb({
      _id: '' + appInfo.trackId,
      url: url,
      name: appInfo.trackName,
      price: appInfo.price
    });
  }

}