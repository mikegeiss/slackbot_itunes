import NodeCouchDb from 'node-couchdb';

export class CouchService {


  couch;

  constructor(protected DB_NAME: string) {
    this.couch = this.createAndInitCouchDbConnection()
  }

  createAndInitCouchDbConnection() {
    const result = new NodeCouchDb();

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

}