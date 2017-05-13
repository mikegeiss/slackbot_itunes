import * as PouchDB from 'pouchdb';
import {DbRepository} from "./DbRepository";
import {ItunesAppInfo} from "../domain/ItunesAppInfo";
PouchDB.plugin(require('pouchdb-find'));

export class PouchDbRepository implements DbRepository {

  private pouchInstance;
  private dbName

  initDb(dbUrl: string, name: string): any{
    this.dbName = name;
    try {
        this.pouchInstance = new PouchDB(`${dbUrl}/${this.dbName}`);
      // return this.pouchInstance.createIndex({
      //   index: {fields: ['trackId']}
      // }).then(
        // (success) => console.log('success', success),
        // (error) => console.log('error', error)
      // );
    }
    catch (exception) {
      console.error('Fehler beim Initialisieren der DB. HOST, PORT und DBName prüfen: ', exception)
    }
    // TODO MGe - check if connection erfolgreich
    // TODO MGe - initIfNotExists
    // return null;
  }

  getEntry(trackId: number): Promise<any> {
    return this.getDb().get(trackId);
  }

  // TODO MGe - ItunesObject
  insertToDb(eintrag: ItunesAppInfo): Promise<any> {
    return this.getDb().put(Object.assign(eintrag, {_id: '' + eintrag.trackId}));
  }

  getEntryPrice(id: number): Promise<number> {
    return this.pouchInstance.get(id)
      .then((response) => response.price);

  }

  getAllUrls(): Promise<any> {
    return this.getAllDocuments()
      .then((result) => {
        return result.rows
          .filter((row) => row.doc.trackViewUrl)
          .map((row) => row.doc.trackViewUrl);
      }).catch((err) => {
        console.error("Fehler bei Ermittlen der Urls", err)
      });
  }

  updateAppInfoPrice(info: ItunesAppInfo): Promise<any> {
    return this.getEntry(info.trackId)
      .then((response) => {
        response.price = info.price;
        return this.pouchInstance.put(response);
      });
  }

  getAllDocuments() {
    return this.pouchInstance.allDocs({'include_docs': true});
  }

  getDb(): any {
    return this.pouchInstance;
  }

}