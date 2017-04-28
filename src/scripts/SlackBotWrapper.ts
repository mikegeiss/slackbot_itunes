import * as Slackbots from 'slackbots';

export class SlackBotWrapper {

  slackbot: any;

  constructor(id: string, private botName: string, private slackChannel: string) {
    console.log('Starte Bot:', botName);
    this.slackbot = new Slackbots({
      token: id,
      name: botName
    });
  }

  poste(text: string) {
    this.slackbot.postMessageToChannel(this.slackChannel, text, {}, null)
  }

  handleUserInput(callback: any) {
    this.slackbot.on('message', function (data) {

      // console.log(data);

      if (data.username !== this.name) {
        if (data.type === 'message') {
          callback(data);
        }
      }
    });
  }

}