import * as low from 'lowdb'
import {DbService} from "./DbService";
import {ITunesService} from "./ITunesService";
export class LowDbService implements DbService {


  db;

  constructor(name: string) {
    // TODO MGe - what todo with name?
    this.db = low('db.json');

    // Set some defaults if your JSON file is empty
    this.db.defaults({appInfos: []})
      .write()

// Add a post
//     this.db.get('appInfos')
//       .push({
//         id: "1118513354",
//         url: "https://itunes.apple.com/de/lookup?id=1118513354",
//         name: "Kingdom: New Lands",
//         price: 6.99
//       })
//       .write()

  }

  insertToDb(appInfo: any) {
    // TODO MGe - check if exists
    console.log('push to db', appInfo);
    this.getAppInfos().push(appInfo).write();
    return new Promise((resolve, rejected) => {
      resolve(appInfo.url);
    });
  }

  getEntryPrice(id: number): Promise<number> {
    return new Promise((resolve, rejected) => {
      resolve(this.getAppInfos().find({id: '' + id}).value().price)
    });
  }

  private getAppInfos(): any {
    return this.db.get('appInfos');
  }


  getAllUrls() :Promise<any>{
    return new Promise((resolve, rejected) => {
      resolve(this.getAppInfos().value().map((entry) => entry.url))
    });
  }
}