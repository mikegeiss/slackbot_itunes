import * as PouchDB from 'pouchdb';
import {DbRepository} from "./DbRepository";
import {ItunesAppInfo} from "../domain/ItunesAppInfo";

export class PouchDbRepository implements DbRepository {

  private pouchInstance;
  private dbName

  initDb(dbUrl: string, name: string): Promise<any> {
    this.dbName = name;
    try {
      this.pouchInstance = new PouchDB(`${dbUrl}/${this.dbName}`);
    }
    catch (exception) {
      console.error('Fehler beim Initialisieren der DB. HOST, PORT und DBName prüfen: ', exception)
    }
    // TODO MGe - initIfNotExists
    return null;
  }

  insertToDb(eintrag: any): Promise<any> {
    return undefined;
  }

  getEntryPrice(id: number): Promise<number> {
    return undefined;
  }

  getAllUrls(): Promise<any> {
    return this.getAllDocuments().then(
      (result) => {
        return result.rows.map((row) => row.doc.url);
      },
      (error) => console.error("Fehler bei Zugriff auf Datenbank", error)
    )
  }

  updateAppInfoPrice(info: ItunesAppInfo): Promise<any> {
    return undefined;
  }

  getAllDocuments() {
    return this.pouchInstance.allDocs({'include_docs': true});
  }

}