import {SlackBotWrapper} from "./SlackBotWrapper";
import {ITunesDbService} from "./ITunesCouchService";
import {ItunesAppInfo} from "./ItunesAppInfo";
export class ITunesSlackBot extends SlackBotWrapper {

  constructor(id: string, botName: string, slackChannel: string, protected dbService: ITunesDbService) {
    super(id, botName, slackChannel);
  }

  posteAlleEintraege() {

    this.dbService.getUrlInfos()
      .then(
        (urlInfos) => {
          if (urlInfos.length === 0) {
            this.poste('keine Einträge in DB');
          }
          else {
            this.poste(bereiteAppInfosAufFuerSlack(urlInfos));
          }
        },
        (error) => console.log('error', error)
      );

    function bereiteAppInfosAufFuerSlack(results: ItunesAppInfo[]) {
      return results
        .sort(ItunesAppInfo.sort)
        .reduce((prev: string, curr: ItunesAppInfo) => {
          return `${prev} *${curr.trackName}* - ${curr.formattedPrice} (${curr.trackViewUrl}) \r\n\t\thttps://itunes.apple.com/de/lookup?id=${curr.trackId} \r\n`
        }, '')
    }

  }

  checkePreisUpdate() {
    this.dbService.getUrlInfos().then(
      (urlInfos: ItunesAppInfo[]) => this.performComparison(urlInfos),
      (error) => console.log("FEHLER", error)
    );

  }

  performComparison(urlInfos: ItunesAppInfo[]) {
    let time = new Date().toLocaleDateString('de-DE') + ', ' + new Date().toLocaleTimeString('de-DE')

    console.log('CHECK', time);
    let currentPrices = urlInfos.map((entry: ItunesAppInfo) => entry.price)

    // TODO MGe - wenn nichts gefunden wurde, dann entsprechende Nachricht
    urlInfos.forEach((info: ItunesAppInfo) => {
      this.dbService.getAppPreis(info.trackId).then(
        (dbPrice: number) => {
          if (dbPrice !== info.price) {
            this.poste(`Preis für App hat sich geändert: *${info.trackName}* von \`${dbPrice}\` auf \`${info.price}\``)
          }
        }
      )
    });

  }
}