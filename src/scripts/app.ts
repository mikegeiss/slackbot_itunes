import {ITunesSlackBot} from "./ITunesSlackBot";
import * as http from "http";
import {ITunesDbService} from "./services/ITunesDbService";




    let dbService: ITunesDbService = new ITunesDbService(process.env.DB_HOST + ':' + process.env.DB_PORT, process.env.DB_NAME);
    const bot: ITunesSlackBot = new ITunesSlackBot(process.env.SLACK_BOT_ID, process.env.SLACK_BOT_NAME, process.env.SLACK_CHANNEL, dbService);
// new ElectronService();

    bot.checkePreisUpdate();
    setInterval(() => {
      bot.checkePreisUpdate();
    }, 3600000);

    bot.handleUserInput(function (data: any) {
      if (data.bot_id) {
        return;
      }
      else if (data.text === 'help') {
        bot.poste('get \r\nadde ${url}')
      }
      else if (data.text === 'get') {
        bot.posteAlleEintraege();
      }
      else if (data.text === 'check') {
        bot.poste('Prüfung wird durchgeführt')
        bot.checkePreisUpdate();
        // setInterval(() => {
        //   bot.checkePreisUpdate();
        // }, 600000)
      }
      else if (data.text.startsWith('adde')) {
        dbService.insertUrlToDb(data.text.substring(5)).then(
          (successUrl: string) => bot.poste(`${successUrl} erfolgreich eingetragen`)
        )
      }
      else if (data.text.startsWith('addList')) {
        let input: string = data.text.substring(8);
        input.split(' ').forEach((id) => {
          dbService.insertUrlToDb(id).then(
            (successUrl: string) => bot.poste(`${successUrl} erfolgreich eingetragen`)
          )
        })

      }
      else {
        bot.poste('Ich verstehe dich nicht :stuck_out_tongue_winking_eye:');
      }
    });

// http.createServer(function (request, response) {
//
//   console.log('request starting for ');
//
// }).listen(process.env.PORT);
//

// bot.on('start', function () {
//     // more information about additional params https://api.slack.com/methods/chat.postMessage

//     // // define channel, where bot exist. You can adjust it there https://my.slack.com/services
//     // bot.postMessageToChannel('testitunesbot', 'meow!', params);

//     // // define existing username instead of 'user_name'
//     // bot.postMessageToUser('user_name', 'meow!', params);

//     // // If you add a 'slackbot' property,
//     // // you will post to another user's slackbot channel instead of a direct message
//     // bot.postMessageToUser('user_name', 'meow!', { 'slackbot': true, icon_emoji: ':cat:' });

//     // define private group instead of 'private_group', where bot exist
//     // bot.postMessageToGroup('testitunesbot', 'meow!', params);
// });

