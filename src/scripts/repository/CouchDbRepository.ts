import * as NodeCouchDB from 'node-couchdb';
import {DbRepository} from "./DbRepository";
import {ItunesAppInfo} from "../domain/ItunesAppInfo";

export class CouchDbRepository implements DbRepository {
  getEntry(id: number): Promise<ItunesAppInfo> {
    return undefined;
  }

  private couchInstance;
  private dbName

  initDb(dbUrl:string, name: string): Promise<any> {
    this.dbName = name;
    this.couchInstance = this.createAndInitCouchDbConnection()
    return null;
  }

  updateAppInfoPrice(info: ItunesAppInfo): Promise<any> {
    return undefined;
  }

  createAndInitCouchDbConnection() {
    const result = new NodeCouchDB();

    result.listDatabases().then(
      dbs => this.createDbIfNotExists(result, dbs),
      err => console.log('error beim Ermitteln der DBs')
    );

    return result;
  }

  createDbIfNotExists(couch, dbs) {
    if (!dbs.find((entry) => entry === this.dbName)) {
      console.log(`Datenbank ${this.dbName} wird neu erstellt`);
      couch.createDatabase(this.dbName).then(
        () => console.log(`Datenbank ${this.dbName} wurde erstellt`),
        err => console.log('error beim Erstellen der DB', err)
      );
    }
    else {
      console.log(`Datenbank ${this.dbName} existiert bereits`);
    }
  }

  insertToDb(eintrag: any): Promise<any> {
    return this.couchInstance.insert(this.dbName, eintrag);
  }

  getEntryPrice(id: number): Promise<number> {
    return new Promise((resolve, rejected) => {
      this.couchInstance.get(this.dbName, '' + id)
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

  getAllUrls(): Promise<any> {
    return this.getAllDocuments().then(
      (result) => {
        return result.data.rows.map((row) => row.doc.url);
      },
      (error) => console.log("FEHLER 3", error)
    )
  }

  getAllDocuments() {
    return this.couchInstance.get(this.dbName, '_all_docs', {'include_docs': true});
  }

}