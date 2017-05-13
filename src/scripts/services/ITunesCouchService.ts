import {ITunesService} from "./ITunesService";
import {ItunesAppInfo} from "../domain/ItunesAppInfo";
import {DbRepository} from "../repository/DbRepository";
import {CouchDbRepository} from "../repository/CouchDbRepository";
import {PouchDbRepository} from "../repository/PouchDbRepository";

export class ITunesDbService {

  dbService: DbRepository;

  constructor(dbUrl:string, name:string) {
    this.dbService = new PouchDbRepository();
    this.dbService.initDb(dbUrl, name)
  }

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
          (error) => console.error('Eintrag einfügen fehlerhaft', error)
        );
      // TODO MGe - in der letzten Ausgabe nochmal den Titel mit auusgeben,vermutlich vorher den titel holen
    })

  }

// TODO MGe - eher getUrlsAusDb.map(url).retrieveUrlInfo()
  getUrlInfos(): Promise<any> {

    return new Promise((resolve, rejected) => {
      this.dbService.getAllUrls().then((urls: any[]) => {
          let urlInfoPromises = urls.map(ITunesService.retrieveUrlInfo);
          resolve(Promise.all(urlInfoPromises));
        },
        (error) => console.log("FEHLER 1", error)
      );
    });
  }

  getAppPreis(id: number): Promise<number> {
    return this.dbService.getEntryPrice(id);
  }

  // this.couch.getAllUrls().then((urls) => {
  //     let urlInfoPromises = urls.map(ITunesService.retrieveUrlInfo);
  //     Promise.all(urlInfoPromises).then(performComparison);
  //   },
  //   (error) => console.log("FEHLER", error)
  // )
  // }
  insertAppInfo(appInfo: ItunesAppInfo, url) {
    return this.dbService.insertToDb({
      trackId: appInfo.trackId,
      url: url,
      name: appInfo.trackName,
      price: appInfo.price
    });
  }

  updateAppInfoPrice(info: ItunesAppInfo) {
    this.dbService.updateAppInfoPrice(info);
  }

}