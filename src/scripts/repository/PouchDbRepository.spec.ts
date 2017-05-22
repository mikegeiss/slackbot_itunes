import {} from 'mocha'
import * as PouchDB from 'pouchdb';
import {PouchDbRepository} from "./PouchDbRepository";
import {RVP} from "../testutils/RVP";
import {ItunesAppInfo} from "../domain/ItunesAppInfo";
let chai = require('chai');
let sinon = require('sinon');
let expect = chai.expect;

describe('PouchDB Repository', () => {
  let underTest: PouchDbRepository
  let dbName: string
  let compare: any

  beforeEach(() => {
    dbName = 'test_db'
    underTest = new PouchDbRepository();
    underTest.initDb(`${process.env.DB_HOST}:${process.env.DB_PORT}`, dbName)
    compare = new PouchDB(`${process.env.DB_HOST}:${process.env.DB_PORT}/${dbName}`)
  });

  afterEach(() => {
    return compare.destroy();
  });

  function createEinrag(trackId: number, price: number, url?: string): ItunesAppInfo {
    let result: ItunesAppInfo = new ItunesAppInfo();
    result.trackId = trackId;
    result.price = price;
    if (url) {
      result.trackViewUrl = url;
    }
    return result;
  }

  it('getEntry', () => {
    const trackId: number = RVP.getRandomNumber(10);
    const expectedPrice: number = RVP.getRandomMoneyValue();
    const eintrag: ItunesAppInfo = createEinrag(trackId, expectedPrice);

    return underTest.insertToDb(eintrag)
      .then((response) => {
        expect(response.ok).to.be.true;
        return underTest.getEntry(trackId);
      })
      .then((response) => {
        expect(response.price).to.equal(expectedPrice);
        expect(response.trackId).to.equal(trackId);
        return;
      });
  });

  it('getPrice', () => {
    const trackId: number = RVP.getRandomNumber(10);
    const expectedPrice: number = RVP.getRandomMoneyValue();
    const eintrag: ItunesAppInfo = createEinrag(trackId, expectedPrice);

    return underTest.insertToDb(eintrag)
      .then((response) => {
        expect(response.ok).to.be.true;
        return underTest.getEntryPrice(trackId);
      })
      .then((response) => {
        expect(response).to.equal(expectedPrice);
        return;
      });
  });

  it('getAllUrls', () => {
    return underTest.insertToDb(createEinrag(RVP.getRandomNumber(10000), RVP.getRandomMoneyValue(), "url1"))
      .then(() => {
        return underTest.insertToDb(createEinrag(RVP.getRandomNumber(10000), RVP.getRandomMoneyValue(), "url2"))
      })
      .then(() => {
        return underTest.insertToDb(createEinrag(RVP.getRandomNumber(10000), RVP.getRandomMoneyValue(), "url3"))
      })
      .then(() => {
        return underTest.getAllUrls();
      })
      .then((response) => {
        expect(response.length).to.equal(3);
        expect(response.indexOf('url1')).to.not.equal(-1);
        expect(response.indexOf('url2')).to.not.equal(-1);
        expect(response.indexOf('url3')).to.not.equal(-1);
        return;
      });
  });

  it('updateAppInfoPrice', () => {
    const trackId: number = RVP.getRandomNumber(10);
    const initialPrice: number = RVP.getRandomMoneyValue();
    const expectedPrice: number = RVP.getRandomMoneyValue();
    const eintrag: ItunesAppInfo = createEinrag(trackId, initialPrice);

    return underTest.insertToDb(eintrag)
      .then((response) => {
        expect(response.ok).to.be.true;
        eintrag.price = expectedPrice
        return underTest.updateAppInfoPrice(eintrag);
      })
      .then((response) => {
        return underTest.getEntryPrice(trackId);
      })
      .then((response) => {
        expect(response).to.equal(expectedPrice);
        return;
      });
  });

});