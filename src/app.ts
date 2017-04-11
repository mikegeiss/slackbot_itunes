import {ITunesSlackBot} from "./ITunesSlackBot";
import {ITunesCouchService} from "./ITunesCouchService";

let couchService: ITunesCouchService = new ITunesCouchService(process.env.DB_NAME);
const bot: ITunesSlackBot = new ITunesSlackBot(process.env.SLACK_BOT_ID, process.env.SLACK_BOT_NAME, process.env.SLACK_CHANNEL, couchService);

bot.handleUserInput(function (data: any) {

  if (data.text === 'help') {
    bot.poste('get \r\nadde ${url}')
  }
  else if (data.text === 'get') {
    bot.posteAlleEintraege();
  }
  else if (data.text === 'check') {
    bot.checkePreisUpdate();
    setInterval(() => {
      bot.checkePreisUpdate();
    }, 600000)
  }
  else if (data.text.startsWith('adde')) {
    couchService.insertUrlToDb(data.text.substring(5)).then(
      (successUrl: string) => bot.poste(`${successUrl} erfolgreich eingetragen`)
    )
  }
  else {
    bot.poste('Ich verstehe dich nicht :stuck_out_tongue_winking_eye:');
  }

});

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

