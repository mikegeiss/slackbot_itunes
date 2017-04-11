export interface DbService{
  insertToDb(eintrag: any): Promise<any>;
  getEntryPrice(id:number):Promise<number>;
  getAllUrls():Promise<any>;

}