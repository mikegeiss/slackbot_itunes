import {ItunesAppInfo} from "../domain/ItunesAppInfo";
export interface DbRepository {
  insertToDb(eintrag: ItunesAppInfo): Promise<any>;
  getEntryPrice(id: number): Promise<number>;
  getAllUrls(): Promise<any>;
  updateAppInfoPrice(info: ItunesAppInfo): Promise<any>;
  initDb(dbUrl:string, name:string):Promise<any>;
}