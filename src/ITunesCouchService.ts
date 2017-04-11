import {CouchService} from "./CouchService";
import {ITunesService} from "./ITunesService";
import {ItunesAppInfo} from "./ItunesAppInfo";

export class ITunesCouchService extends CouchService {

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
      this.getAllUrls().then((urls) => {
          let urlInfoPromises = urls.map(ITunesService.retrieveUrlInfo);
          resolve(Promise.all(urlInfoPromises));
        },
        (error) => console.log("FEHLER", error)
      );
    });
  }

  getAppPreis(id: number): Promise<number> {
    return new Promise((resolve, rejected) => {
      this.couch.get(this.DB_NAME, '' + id)
        .then(({data, headers, status}) => {
          resolve(data.price);
          // data is json response
          // headers is an object with all response headers
          // status is statusCode number
        }, err => {
          console.log('error', err);
          // either request error occured
          // ...or err.code=EDOCMISSING if document is missing
          // ...or err.code=EUNKNOWN if statusCode is unexpected
        });
    });

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

  getAllUrls() {
    return this.getAllDocuments().then(
      (result) => {
        return result.data.rows.map((row) => row.doc.url);
      },
      (error) => console.log("FEHLER", error)
    )
  }

  getAllDocuments() {
    return this.couch.get(this.DB_NAME, '_all_docs', {'include_docs': true});
  }

}