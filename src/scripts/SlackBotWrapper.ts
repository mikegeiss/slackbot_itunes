import * as Slackbots from 'slackbots';

export class SlackBotWrapper {

  slackbot: any;
  botConfig: any = {}

  constructor(id: string, private botName: string, private slackChannel: string) {
    console.log('Starte Bot:', botName);

    this.slackbot = new Slackbots({
      token: id,
      name: botName
    });
    this.poste('Itunes Helper wird gestartet')

    this.configureEmoji(botName);
  }

  poste(text: string) {
    this.slackbot.postMessageToChannel(this.slackChannel, text, this.botConfig, null)
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

  private configureEmoji(botName: string): void {
    if (botName === 'raspi' || botName === 'raspberry_pi') {
      this.botConfig.icon_emoji = ':raspberry_pi:'
    }
    if (botName === 'mac') {
      this.botConfig.icon_emoji = ':appleinc:'
    }
    if (botName === 'android') {
      this.botConfig.icon_emoji = ':android:'
    }
  }

}