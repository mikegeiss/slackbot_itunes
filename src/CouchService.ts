import * as NodeCouchDB from 'node-couchdb';
import {DbService} from "./DbService";

export class CouchDbService implements DbService{

  couch;

  constructor(protected DB_NAME: string) {
    this.couch = this.createAndInitCouchDbConnection()
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
    if (!dbs.find((entry) => entry === this.DB_NAME)) {
      console.log(`Datenbank ${this.DB_NAME} wird neu erstellt`);
      couch.createDatabase(this.DB_NAME).then(
        () => console.log(`Datenbank ${this.DB_NAME} wurde erstellt`),
        err => console.log('error beim Erstellen der DB', err)
      );
    }
    else {
      console.log(`Datenbank ${this.DB_NAME} existiert bereits`);
    }
  }

  insertToDb(eintrag: any): Promise<any> {
    return this.couch.insert(this.DB_NAME, eintrag);
  }

  getEntryPrice(id:number):Promise<number>{
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