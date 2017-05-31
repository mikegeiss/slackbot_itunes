import {} from 'mocha'
import * as PouchDB from 'pouchdb';
import {ITunesDbService} from "./ITunesDbService";
import {ItunesAppInfo} from "../domain/ItunesAppInfo";

let chai = require('chai');
let sinon = require('sinon');
let expect = chai.expect;

describe('ITunesDbService - integrativ', () => {

  let underTest: ITunesDbService;
  let dbName: string
  let compare: any

  beforeEach(() => {
    dbName = 'test_db'
    underTest = new ITunesDbService(`${process.env.DB_HOST}:${process.env.DB_PORT}`, dbName)
    compare = new PouchDB(`${process.env.DB_HOST}:${process.env.DB_PORT}/${dbName}`)
  });

  afterEach(() => {
    return compare.destroy();
  });

  it('insertUrlToDb', () => {
    const id: string = '561521557';
    return underTest.insertUrlToDb(id)
      .then((response) => {
        expect(response).to.equal(`https://itunes.apple.com/de/lookup?id=${id}`)
      });
  });

  it('getUrlInfos', () => {
    const agricolaId: string = '561521557';
    return underTest.insertUrlToDb(agricolaId)
      .then((success): void => {
        expect(success).to.equal(`https://itunes.apple.com/de/lookup?id=${agricolaId}`);
      })
      .then((): Promise<ItunesAppInfo[]> => {
        return underTest.getUrlInfos()
      })
      .then((success: ItunesAppInfo[]): void => {
        expect(success[0].trackName).to.equal('Agricola')
        return;
      });
  });

});